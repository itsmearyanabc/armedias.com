// Job application endpoint: saved to Supabase (visible in /admin/) and emailed.
import type { APIRoute } from 'astro';
import { clientIp } from '../../server/auth';
import { markEmailSent, saveSubmission } from '../../server/leads';
import { isEmail, line, notify, optionalUrl, rateLimiter, responder, text } from '../../server/forms';

export const prerender = false;

const limit = rateLimiter(5 * 60_000);

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const respond = responder(request, '/careers/');

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return respond(false, 'Invalid form submission.', 400);
  }
  if (line(form, 'website', 200)) return respond(true);

  const name = line(form, 'name', 100);
  const email = line(form, 'email', 150);
  const phone = line(form, 'phone', 30);
  const role = line(form, 'role', 80);
  const experience = line(form, 'experience', 40);
  const location = line(form, 'location', 100);
  const portfolio = optionalUrl(line(form, 'portfolio', 300));
  const cv = optionalUrl(line(form, 'cv', 300));
  const message = text(form, 'message', 3000);

  if (!name || !role) return respond(false, 'Please fill in all required fields.', 422);
  if (!isEmail(email)) return respond(false, 'Please enter a valid email address.', 422);
  if (cv === null || portfolio === null) return respond(false, 'Please enter valid links (starting with https://).', 422);
  if (!cv) return respond(false, 'Please add a link to your CV.', 422);

  const ip = clientIp(request, clientAddress);
  if (limit.tooSoon(ip)) return respond(false, 'You just applied. Please wait a few minutes before sending another application.', 429);

  const saved = await saveSubmission('applications', {
    created_at: new Date().toISOString(), name, email, phone: phone || null, role, experience: experience || null,
    location: location || null, portfolio: portfolio || null, cv, message: message || null,
  });
  limit.mark(ip);

  const sent = await notify(`Job application: ${role} from ${name}`, [
    `Name:       ${name}`,
    `Email:      ${email}`,
    `Phone:      ${phone || '-'}`,
    `Role:       ${role}`,
    `Experience: ${experience || '-'}`,
    `Location:   ${location || '-'}`,
    `Portfolio:  ${portfolio || '-'}`,
    `CV:         ${cv}`,
    '',
    message || '(no message)',
  ].join('\n'), { name, address: email });
  if (sent) await markEmailSent(saved);

  return respond(true);
};
