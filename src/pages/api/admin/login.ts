import type { APIRoute } from 'astro';
import { attemptLogin, clientIp, createSession } from '../../../server/auth';
import { verifyTurnstile } from '../../../server/spam-guard';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, clientAddress, url }) => {
  let body: { email?: unknown; password?: unknown; token?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }
  const email = typeof body.email === 'string' ? body.email.slice(0, 200) : '';
  const password = typeof body.password === 'string' ? body.password.slice(0, 200) : '';

  const ip = clientIp(request, clientAddress);
  // Human check first. A failed check is not a password attempt, so it never adds to the lockout.
  const check = await verifyTurnstile(typeof body.token === 'string' ? body.token : '', ip);
  if (!check.ok) return Response.json({ ok: false, error: 'Please tick "Verify you are human" and try again.', check: true }, { status: 403 });

  const result = attemptLogin(ip, email, password);
  if (result.ok) {
    const secure = url.protocol === 'https:' || request.headers.get('x-forwarded-proto') === 'https';
    createSession(cookies, secure);
    return Response.json({ ok: true });
  }
  switch (result.reason) {
    case 'not-configured':
      return Response.json({ ok: false, error: 'Admin login is not configured on the server.' }, { status: 503 });
    case 'locked':
      return Response.json({ ok: false, error: 'Too many attempts.', retryMs: result.retryMs }, { status: 429 });
    case 'invalid':
      return Response.json({ ok: false, error: 'Wrong email or password.', triesLeft: result.triesLeft, retryMs: result.retryMs }, { status: 401 });
  }
};
