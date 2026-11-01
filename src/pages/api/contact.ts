// Contact form endpoint. Runs on the Node server behind nginx; every other page is static.
// Each lead is saved to the database (visible in /admin/) and emailed to CONTACT_TO.
// JSON response for the in-page form (Accept: application/json); a redirect for no-JS posts.
import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';
import { db } from '../../server/db';
import { clientIp } from '../../server/auth';
import { countryOf } from '../../server/analytics';

export const prerender = false;

const RATE_LIMIT_MS = 60_000;
const lastSent = new Map<string, number>();

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

// Single line, bounded length, so values are safe inside mail headers
const line = (form: FormData, key: string, max: number) =>
  String(form.get(key) ?? '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const wantsJson = (request.headers.get('accept') ?? '').includes('application/json');
  const respond = (ok: boolean, error = '', status = 200) =>
    wantsJson
      ? Response.json(ok ? { ok: true } : { ok: false, error }, { status })
      : new Response(null, { status: 303, headers: { Location: ok ? '/thank-you/' : '/contact/?error=1' } });

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return respond(false, 'Invalid form submission.', 400);
  }

  // Honeypot: real visitors never see this field. Pretend success so bots don't retry.
  if (line(form, 'website', 200)) return respond(true);

  const name = line(form, 'name', 100);
  const email = line(form, 'email', 150);
  const phone = line(form, 'phone', 30);
  const company = line(form, 'company', 120);
  const service = line(form, 'service', 80);
  const country = line(form, 'country', 60);
  const budget = line(form, 'budget', 40);
  const message = String(form.get('message') ?? '').trim().slice(0, 5000);

  if (!name || !service || !country || !message) return respond(false, 'Please fill in all required fields.', 422);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return respond(false, 'Please enter a valid email address.', 422);

  const page = line(form, 'page', 200);
  const ip = clientIp(request, clientAddress);
  const now = Date.now();
  if (now - (lastSent.get(ip) ?? 0) < RATE_LIMIT_MS) {
    return respond(false, 'You just sent a message. Please wait a minute before sending another.', 429);
  }

  // Save first: the lead is never lost even if email delivery fails
  const { lastInsertRowid } = db.prepare(`INSERT INTO submissions
    (created_at, name, email, phone, company, service, country, budget, message, page, visitor_country)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(new Date().toISOString(), name, email, phone || null, company || null, service, country, budget || null, message, page || null, countryOf(request));
  lastSent.set(ip, now);

  if (env('SMTP_HOST')) try {
    await transport.sendMail({
      from: `"AR Medias Website" <${env('SMTP_USER')}>`,
      to: env('CONTACT_TO') || env('SMTP_USER'),
      replyTo: { name, address: email },
      subject: `New enquiry: ${service} (${country}) from ${name}`,
      text: [
        `Name:     ${name}`,
        `Email:    ${email}`,
        `Phone:    ${phone || '-'}`,
        `Company:  ${company || '-'}`,
        `Service:  ${service}`,
        `Country:  ${country}`,
        `Budget:   ${budget || '-'}`,
        `Page:     ${page || '-'}`,
        '',
        'Message:',
        message,
        '',
        '---',
        `Sent from armedias.com/contact/ on ${new Date().toISOString()}`,
      ].join('\n'),
    });
    db.prepare('UPDATE submissions SET email_sent = 1 WHERE id = ?').run(lastInsertRowid);
  } catch (err) {
    // Already saved and visible in /admin/, so the visitor still gets a success message
    console.error('contact: email notification failed', err);
  }

  for (const [key, t] of lastSent) if (now - t > RATE_LIMIT_MS) lastSent.delete(key);
  return respond(true);
};
