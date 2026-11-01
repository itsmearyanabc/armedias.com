import type { APIRoute } from 'astro';
import { destroySession } from '../../../server/auth';

export const prerender = false;

export const POST: APIRoute = ({ cookies }) => {
  destroySession(cookies);
  return Response.json({ ok: true });
};
