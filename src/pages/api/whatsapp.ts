// Redirects to the WhatsApp chat set in /admin/ and counts the click.
import type { APIRoute } from 'astro';
import { countEvent, getWhatsApp, whatsAppUrl } from '../../server/settings';

export const prerender = false;

const BOT = /bot|crawl|spider|slurp|headless|preview/i;

export const GET: APIRoute = ({ request, url }) => {
  if (!BOT.test(request.headers.get('user-agent') ?? '')) {
    countEvent('whatsapp_click');
    // Which page the click came from, when the browser says (same site only, path only)
    try {
      const from = new URL(request.headers.get('referer') ?? '');
      if (from.host === url.host && from.pathname.length <= 150) countEvent(`whatsapp_page:${from.pathname}`);
    } catch { /* no or unparseable referrer */ }
  }
  // A page can prefill the chat, for example the cost planner's summary (plain text, capped).
  // The number always comes from the admin setting, so this can't redirect anywhere else.
  const text = url.searchParams.get('text')?.trim().slice(0, 1000);
  const setting = getWhatsApp();
  return new Response(null, {
    status: 302,
    headers: { Location: whatsAppUrl(text ? { ...setting, message: text } : setting), 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' },
  });
};
