// Receives Google Form responses from the Apps Script in the connected form.
// Authenticated with the connection key from Settings (Authorization: Bearer <key>).
import type { APIRoute } from 'astro';
import { authorized, ingest, parseBatch } from '../../../server/google-forms';
import { dbMessage } from '../../../server/leads';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  if (!authorized(request)) return Response.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'invalid json' }, { status: 400 });
  }
  const batch = parseBatch(body);
  if (!batch) return Response.json({ ok: false, error: 'invalid batch' }, { status: 422 });
  try {
    return Response.json({ ok: true, ...(await ingest(batch)) });
  } catch (err) {
    // The script keeps these responses and retries them
    return Response.json({ ok: false, error: dbMessage(err) }, { status: 502 });
  }
};
