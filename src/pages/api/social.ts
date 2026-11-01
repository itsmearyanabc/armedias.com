// Public list of social profile links set in /admin/, read by the footer icons.
import type { APIRoute } from 'astro';
import { getSocials } from '../../server/settings';

export const prerender = false;

export const GET: APIRoute = () =>
  Response.json(getSocials(), { headers: { 'Cache-Control': 'public, max-age=300' } });
