// Delete selected leads from the admin panel.
import type { APIRoute } from 'astro';
import { db } from '../../../server/db';
import { isAuthenticated } from '../../../server/auth';

export const prerender = false;

export const DELETE: APIRoute = async ({ request, cookies }) => {
  if (!isAuthenticated(cookies)) return Response.json({ ok: false, error: 'Not signed in.' }, { status: 401 });

  let ids: number[];
  try {
    const body = (await request.json()) as { ids?: unknown };
    ids = Array.isArray(body.ids) ? body.ids.filter((n): n is number => Number.isInteger(n)).slice(0, 5000) : [];
  } catch {
    return Response.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }
  if (!ids.length) return Response.json({ ok: false, error: 'Nothing selected.' }, { status: 400 });

  const del = db.prepare('DELETE FROM submissions WHERE id = ?');
  let deleted = 0;
  db.exec('BEGIN');
  try {
    for (const id of ids) deleted += Number(del.run(id).changes);
    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
  return Response.json({ ok: true, deleted });
};
