// Save settings from the admin panel.
import type { APIRoute } from 'astro';
import { isAuthenticated } from '../../../server/auth';
import { parseWhatsApp, setSetting, whatsAppUrl } from '../../../server/settings';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!isAuthenticated(cookies)) return Response.json({ ok: false, error: 'Not signed in.' }, { status: 401 });

  let body: { whatsapp?: unknown; message?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }
  const parsed = parseWhatsApp(String(body.whatsapp ?? ''), String(body.message ?? ''));
  if ('error' in parsed) return Response.json({ ok: false, error: parsed.error }, { status: 422 });

  setSetting('whatsapp', JSON.stringify(parsed));
  return Response.json({ ok: true, url: whatsAppUrl(parsed) });
};
