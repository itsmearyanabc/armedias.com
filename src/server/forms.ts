// Shared handling for public forms (contact, careers): field reading, per-IP rate limit,
// JSON-or-redirect responses and email notifications.
import nodemailer from 'nodemailer';

const env = (key: string) => process.env[key] ?? '';

const transport = nodemailer.createTransport({
  host: env('SMTP_HOST'),
  port: Number(env('SMTP_PORT') || 465),
  secure: Number(env('SMTP_PORT') || 465) === 465,
  auth: { user: env('SMTP_USER'), pass: env('SMTP_PASS') },
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 15_000,
});

/** Single line, bounded length, so values are safe inside mail headers. */
export const line = (form: FormData, key: string, max: number) =>
  String(form.get(key) ?? '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);

export const text = (form: FormData, key: string, max: number) => String(form.get(key) ?? '').trim().slice(0, max);

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/** An http(s) URL or empty; anything else is rejected. */
export function optionalUrl(v: string): string | null {
  if (!v) return '';
  try {
    const u = new URL(/^https?:\/\//i.test(v) ? v : `https://${v}`);
    return u.protocol === 'https:' || u.protocol === 'http:' ? u.href : null;
  } catch {
    return null;
  }
}

/** One submission per IP per window, per form. */
export function rateLimiter(windowMs: number) {
  const last = new Map<string, number>();
  return {
    tooSoon: (ip: string) => Date.now() - (last.get(ip) ?? 0) < windowMs,
    mark: (ip: string) => {
      const now = Date.now();
      last.set(ip, now);
      for (const [k, t] of last) if (now - t > windowMs) last.delete(k);
    },
  };
}

/** JSON for the in-page form (Accept: application/json), a redirect for no-JS posts. */
export function responder(request: Request, failPath: string) {
  const wantsJson = (request.headers.get('accept') ?? '').includes('application/json');
  return (ok: boolean, error = '', status = 200) =>
    wantsJson
      ? Response.json(ok ? { ok: true } : { ok: false, error }, { status })
      : new Response(null, { status: 303, headers: { Location: ok ? '/thank-you/' : `${failPath}?error=1` } });
}

/** Email the site owner. Returns false (and logs) when SMTP is missing or fails. */
export async function notify(subject: string, body: string, replyTo: { name: string; address: string }): Promise<boolean> {
  if (!env('SMTP_HOST')) return false;
  try {
    await transport.sendMail({
      from: `"AR Medias Website" <${env('SMTP_USER')}>`,
      to: env('CONTACT_TO') || env('SMTP_USER'),
      replyTo,
      subject,
      text: body,
    });
    return true;
  } catch (err) {
    console.error('notify: email failed', err);
    return false;
  }
}
