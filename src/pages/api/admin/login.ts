import type { APIRoute } from 'astro';
import { attemptLogin, clientIp, createSession } from '../../../server/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, clientAddress, url }) => {
  let body: { email?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }
  const email = typeof body.email === 'string' ? body.email.slice(0, 200) : '';
  const password = typeof body.password === 'string' ? body.password.slice(0, 200) : '';

  const result = attemptLogin(clientIp(request, clientAddress), email, password);
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
