// Contact form endpoint. Runs on the Node server behind nginx; every other page is static.
// Each lead is saved to Supabase (visible in /admin/) and emailed to CONTACT_TO.
import type { APIRoute } from 'astro';
import { clientIp } from '../../server/auth';
import { countryOf } from '../../server/analytics';
import { markEmailSent, saveSubmission } from '../../server/leads';
import { isEmail, line, notify, rateLimiter, responder, text } from '../../server/forms';

export const prerender = false;

const limit = rateLimiter(60_000);

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const respond = responder(request, '/contact/');

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
  const picked = line(form, 'service', 80);
  // "Other" comes with the visitor's own wording
  const service = picked === 'Other' ? (line(form, 'service_other', 80) ? `Other: ${line(form, 'service_other', 80)}` : '') : picked;
  const country = line(form, 'country', 60);
  const budget = line(form, 'budget', 40);
  const message = text(form, 'message', 5000);
  const page = line(form, 'page', 200);

  if (!name || !service || !country || !message) return respond(false, 'Please fill in all required fields.', 422);
  if (!isEmail(email)) return respond(false, 'Please enter a valid email address.', 422);

  const ip = clientIp(request, clientAddress);
  if (limit.tooSoon(ip)) return respond(false, 'You just sent a message. Please wait a minute before sending another.', 429);

  // Save first: the lead is never lost even if email delivery fails. New leads get the
  // default status chosen in Settings.
  const saved = await saveSubmission('leads', {
    created_at: new Date().toISOString(), name, email, phone: phone || null, company: company || null, service, country,
    budget: budget || null, message, page: page || null, visitor_country: countryOf(request),
  });
  limit.mark(ip);

  const sent = await notify(`New enquiry: ${service} (${country}) from ${name}`, [
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
    `Sent from armedias.com on ${new Date().toISOString()}`,
  ].join('\n'), { name, address: email });
  if (sent) await markEmailSent(saved);

  return respond(true);
};
