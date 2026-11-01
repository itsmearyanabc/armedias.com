// Pageview beacon sent by every public page (see Base.astro).
import type { APIRoute } from 'astro';
import { recordPageview } from '../../server/analytics';
import { clientIp } from '../../server/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const text = await request.text();
    if (text.length < 2000) {
      const { p, r } = JSON.parse(text) as { p?: string; r?: string };
      if (typeof p === 'string') recordPageview(request, clientIp(request, clientAddress), p, typeof r === 'string' ? r : '');
    }
  } catch { /* malformed beacons are ignored */ }
  return new Response(null, { status: 204 });
};
