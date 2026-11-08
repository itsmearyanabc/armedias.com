// Spam protection for the public forms: Cloudflare Turnstile verification, per-IP rate
// limits and duplicate detection. Limits and duplicates are kept in SQLite (hashed, never
// raw IPs or messages) so they survive server restarts.
import { createHash } from 'node:crypto';
import { db } from './db';

db.exec(`
  CREATE TABLE IF NOT EXISTS form_events (
    form TEXT NOT NULL,
    kind TEXT NOT NULL,      -- 'ip' (one row per accepted submission) or 'dup' (message fingerprint)
    key TEXT NOT NULL,       -- sha256 of the IP or of the submission's identifying fields
    ts INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS form_events_lookup ON form_events (form, kind, key, ts);
`);

const hash = (s: string) => createHash('sha256').update(s).digest('hex');
const DAY_MS = 86_400_000;

export interface FormLimits {
  minGapMs: number;          // between two submissions from one IP
  perHour: number;           // submissions per IP per rolling hour
}

/** Milliseconds this IP must wait before submitting this form again, or 0. */
export function waitMs(form: string, ip: string, limits: FormLimits, now = Date.now()): number {
  const key = hash(`${form}|${ip}`);
  const recent = db.prepare('SELECT ts FROM form_events WHERE form = ? AND kind = ? AND key = ? AND ts > ? ORDER BY ts DESC')
    .all(form, 'ip', key, now - 3_600_000) as { ts: number }[];
  if (recent.length && now - recent[0].ts < limits.minGapMs) return limits.minGapMs - (now - recent[0].ts);
  if (recent.length >= limits.perHour) return recent[recent.length - 1].ts + 3_600_000 - now;
  return 0;
}

/** True when the same submission (fingerprint fields) was accepted in the last 24 hours. */
export function isDuplicate(form: string, fields: string[], now = Date.now()): boolean {
  const key = hash(`${form}|${fields.map((f) => f.trim().toLowerCase().replace(/\s+/g, ' ')).join('|')}`);
  return !!db.prepare('SELECT 1 FROM form_events WHERE form = ? AND kind = ? AND key = ? AND ts > ?').get(form, 'dup', key, now - DAY_MS);
}

/** Record an accepted submission for the rate limit and duplicate checks. */
export function recordSubmission(form: string, ip: string, fields: string[], now = Date.now()) {
  const dupKey = hash(`${form}|${fields.map((f) => f.trim().toLowerCase().replace(/\s+/g, ' ')).join('|')}`);
  db.prepare('INSERT INTO form_events (form, kind, key, ts) VALUES (?, ?, ?, ?), (?, ?, ?, ?)')
    .run(form, 'ip', hash(`${form}|${ip}`), now, form, 'dup', dupKey, now);
  db.prepare('DELETE FROM form_events WHERE ts < ?').run(now - DAY_MS);
}

export type TurnstileResult =
  | { ok: true; skipped?: 'not-configured' | 'unreachable' }
  | { ok: false; codes: string[] };

/**
 * Check a Turnstile token with Cloudflare's Siteverify API. Without TURNSTILE_SECRET_KEY the
 * check is off. A token that Cloudflare rejects (or a missing token) fails. If Cloudflare
 * itself can't be reached, the submission is let through and logged, so an outage at
 * Cloudflare never loses a real enquiry.
 */
export async function verifyTurnstile(token: string, ip: string): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY ?? '';
  if (!secret) return { ok: true, skipped: 'not-configured' };
  if (!token || token.length > 2048) return { ok: false, codes: ['missing-input-response'] };
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = (await res.json()) as { success?: boolean; 'error-codes'?: string[] };
    return body.success ? { ok: true } : { ok: false, codes: body['error-codes'] ?? [] };
  } catch (err) {
    console.error('turnstile: siteverify unreachable, letting the submission through', (err as Error).message);
    return { ok: true, skipped: 'unreachable' };
  }
}
