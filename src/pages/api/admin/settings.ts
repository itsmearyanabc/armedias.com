// Save settings from the admin panel: the WhatsApp link, or the social profile links.
import type { APIRoute } from 'astro';
import { guard } from '../../../server/admin-api';
import { parseSocials, parseWhatsApp, setSetting, whatsAppUrl } from '../../../server/settings';

export const prerender = false;

export const POST: APIRoute = async (ctx) => {
  const denied = guard(ctx);
  if (denied) return denied;
  const { request } = ctx;

  let body: { whatsapp?: unknown; message?: unknown; socials?: Record<string, unknown> };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  if (body.socials) {
    const socials = parseSocials(body.socials);
    if ('error' in socials) return Response.json({ ok: false, error: socials.error }, { status: 422 });
    setSetting('socials', JSON.stringify(socials));
    return Response.json({ ok: true, socials });
  }
  const parsed = parseWhatsApp(String(body.whatsapp ?? ''), String(body.message ?? ''));
  if ('error' in parsed) return Response.json({ ok: false, error: parsed.error }, { status: 422 });

  setSetting('whatsapp', JSON.stringify(parsed));
  return Response.json({ ok: true, url: whatsAppUrl(parsed) });
};
