// Admin authentication: credentials from environment variables, escalating lockouts per
// IP address, and server-side sessions referenced by an HttpOnly cookie.
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import type { AstroCookies } from 'astro';
import { db } from './db';

export const SESSION_COOKIE = 'am_admin';
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;
const GUARD_RESET_MS = 24 * 60 * 60 * 1000; // a clean day forgives earlier failures

// Lockout schedule: 3 tries then 30 s, 2 tries then 1 min, then 1 try per lock
// starting at 10 min and doubling each time.
function rule(stage: number): { tries: number; lockMs: number } {
  if (stage === 0) return { tries: 3, lockMs: 30_000 };
  if (stage === 1) return { tries: 2, lockMs: 60_000 };
  return { tries: 1, lockMs: 10 * 60_000 * 2 ** (stage - 2) };
}

interface Guard { ip: string; stage: number; failures: number; locked_until: number; last_attempt: number }

function guardFor(ip: string, now: number): Guard {
  const row = db.prepare('SELECT * FROM login_guard WHERE ip = ?').get(ip) as Guard | undefined;
  if (!row || (now - row.last_attempt > GUARD_RESET_MS && row.locked_until < now)) {
    return { ip, stage: 0, failures: 0, locked_until: 0, last_attempt: 0 };
  }
  return row;
}

function saveGuard(g: Guard) {
  db.prepare(`INSERT INTO login_guard (ip, stage, failures, locked_until, last_attempt) VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(ip) DO UPDATE SET stage = excluded.stage, failures = excluded.failures,
    locked_until = excluded.locked_until, last_attempt = excluded.last_attempt`)
    .run(g.ip, g.stage, g.failures, g.locked_until, g.last_attempt);
}

/** Milliseconds this IP must still wait, or 0 when it may try. */
export function lockRemaining(ip: string, now = Date.now()): number {
  return Math.max(0, guardFor(ip, now).locked_until - now);
}

function sameSecret(a: string, b: string): boolean {
  // Hash first so the comparison is constant-time regardless of length
  const ha = createHash('sha256').update(a).digest();
  const hb = createHash('sha256').update(b).digest();
  return timingSafeEqual(ha, hb);
}

export type LoginResult =
  | { ok: true }
  | { ok: false; reason: 'locked'; retryMs: number }
  | { ok: false; reason: 'invalid'; triesLeft: number; retryMs: number }
  | { ok: false; reason: 'not-configured' };

export function attemptLogin(ip: string, email: string, password: string, now = Date.now()): LoginResult {
  const adminEmail = process.env.ADMIN_EMAIL ?? '';
  const adminPassword = process.env.ADMIN_PASSWORD ?? '';
  if (!adminEmail || !adminPassword) return { ok: false, reason: 'not-configured' };

  const g = guardFor(ip, now);
  if (g.locked_until > now) return { ok: false, reason: 'locked', retryMs: g.locked_until - now };

  // Evaluate both so timing doesn't reveal which one was wrong
  const emailOk = sameSecret(email.trim().toLowerCase(), adminEmail.trim().toLowerCase());
  const passOk = sameSecret(password, adminPassword);
  if (emailOk && passOk) {
    db.prepare('DELETE FROM login_guard WHERE ip = ?').run(ip);
    return { ok: true };
  }

  g.failures += 1;
  g.last_attempt = now;
  const { tries, lockMs } = rule(g.stage);
  if (g.failures >= tries) {
    g.locked_until = now + lockMs;
    g.stage += 1;
    g.failures = 0;
    saveGuard(g);
    return { ok: false, reason: 'invalid', triesLeft: 0, retryMs: lockMs };
  }
  saveGuard(g);
  return { ok: false, reason: 'invalid', triesLeft: tries - g.failures, retryMs: 0 };
}

const hashToken = (t: string) => createHash('sha256').update(t).digest('hex');

export function createSession(cookies: AstroCookies, secure: boolean) {
  const token = randomBytes(32).toString('base64url');
  const expires = Date.now() + SESSION_TTL_MS;
  db.prepare('DELETE FROM sessions WHERE expires_at < ?').run(Date.now());
  db.prepare('INSERT INTO sessions (token_hash, expires_at) VALUES (?, ?)').run(hashToken(token), expires);
  cookies.set(SESSION_COOKIE, token, {
    httpOnly: true, secure, sameSite: 'strict', path: '/', expires: new Date(expires),
  });
}

export function isAuthenticated(cookies: AstroCookies): boolean {
  const token = cookies.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  const row = db.prepare('SELECT expires_at FROM sessions WHERE token_hash = ?').get(hashToken(token)) as { expires_at: number } | undefined;
  return !!row && row.expires_at > Date.now();
}

export function destroySession(cookies: AstroCookies) {
  const token = cookies.get(SESSION_COOKIE)?.value;
  if (token) db.prepare('DELETE FROM sessions WHERE token_hash = ?').run(hashToken(token));
  cookies.delete(SESSION_COOKIE, { path: '/' });
}

/** Client IP. nginx resolves the real visitor IP (including behind Cloudflare) into X-Real-IP. */
export function clientIp(request: Request, fallback: string): string {
  return request.headers.get('x-real-ip') || fallback;
}
