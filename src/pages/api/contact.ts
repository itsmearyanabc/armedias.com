// Contact form endpoint. Runs on the Node server behind nginx; every other page is static.
// Each lead is checked for spam, saved to Supabase (visible in /admin/) and emailed to CONTACT_TO.
import type { APIRoute } from 'astro';
import { clientIp } from '../../server/auth';
import { countryOf } from '../../server/analytics';
import { markEmailSent, saveSubmission } from '../../server/leads';
import { readAttribution } from '../../server/attribution';
import { isDuplicate, recordSubmission, verifyTurnstile, waitMs } from '../../server/spam-guard';
import { isEmail, line, notify, responder, text } from '../../server/forms';
import { budgets, countryChoices, serviceChoices } from '../../data/form-options';

export const prerender = false;

const LIMITS = { minGapMs: 60_000, perHour: 5 };

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
  const other = line(form, 'service_other', 80);
  // "Other" comes with the visitor's own wording
  const service = picked === 'Other' ? (other ? `Other: ${other}` : '') : picked;
  const country = line(form, 'country', 60);
  const budget = line(form, 'budget', 40);
  const message = text(form, 'message', 5000);
  const page = line(form, 'page', 200);

  if (!name || !service || !country || !message) return respond(false, 'Please fill in all required fields.', 422);
  if (!isEmail(email)) return respond(false, 'Please enter a valid email address.', 422);
  if (phone && !/^[+\d\s().-]{5,30}$/.test(phone)) return respond(false, 'Please enter a valid phone number.', 422);
  // Only the choices the form offers (bots posting arbitrary values are turned away)
  if ((picked !== 'Other' && !serviceChoices.includes(picked)) || !countryChoices.includes(country) || (budget && !budgets.includes(budget))) {
    return respond(false, 'Please choose from the options in the form.', 422);
  }

  const ip = clientIp(request, clientAddress);
  const wait = waitMs('contact', ip, LIMITS);
  if (wait) return respond(false, `Please wait ${Math.ceil(wait / 60_000)} minute(s) before sending another message.`, 429);

  const check = await verifyTurnstile(line(form, 'cf-turnstile-response', 2048), ip);
  if (!check.ok) return respond(false, 'The security check did not pass. Please try again.', 403);

  // The same enquiry sent twice (double click, retry) is accepted once
  const fingerprint = [email, message];
  if (isDuplicate('contact', fingerprint)) return respond(true);

  const attribution = readAttribution(form);

  // Save first: the lead is never lost even if email delivery fails. New leads get the
  // default status chosen in Settings.
  const saved = await saveSubmission('leads', {
    created_at: new Date().toISOString(), name, email, phone: phone || null, company: company || null, service, country,
    budget: budget || null, message, page: page || null, visitor_country: countryOf(request),
    ...(attribution ? { attribution } : {}),
  });
  recordSubmission('contact', ip, fingerprint);

  const sent = await notify(`New enquiry: ${service} (${country}) from ${name}`, [
    `Name:     ${name}`,
    `Email:    ${email}`,
    `Phone:    ${phone || '-'}`,
    `Company:  ${company || '-'}`,
    `Service:  ${service}`,
    `Country:  ${country}`,
    `Budget:   ${budget || '-'}`,
    `Page:     ${page || '-'}`,
    `Found via: ${attribution ? `${attribution.channel}${attribution.landing ? `, landed on ${attribution.landing}` : ''}` : '-'}`,
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
