// Redirects to the WhatsApp chat set in /admin/ and counts the click.
import type { APIRoute } from 'astro';
import { countEvent, getWhatsApp, whatsAppUrl } from '../../server/settings';

export const prerender = false;

const BOT = /bot|crawl|spider|slurp|headless|preview/i;

export const GET: APIRoute = ({ request }) => {
  if (!BOT.test(request.headers.get('user-agent') ?? '')) countEvent('whatsapp_click');
  return new Response(null, {
    status: 302,
    headers: { Location: whatsAppUrl(getWhatsApp()), 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' },
  });
};
