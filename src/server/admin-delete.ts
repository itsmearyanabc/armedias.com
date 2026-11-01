// DELETE handler shared by the admin record lists (leads, applications).
import type { APIRoute } from 'astro';
import { deleteRows } from './db';
import { isAuthenticated } from './auth';

export const deleteHandler = (table: 'submissions' | 'applications'): APIRoute => async ({ request, cookies }) => {
  if (!isAuthenticated(cookies)) return Response.json({ ok: false, error: 'Not signed in.' }, { status: 401 });

  let ids: number[];
  try {
    const body = (await request.json()) as { ids?: unknown };
    ids = Array.isArray(body.ids) ? body.ids.filter((n): n is number => Number.isInteger(n)).slice(0, 5000) : [];
  } catch {
    return Response.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }
  if (!ids.length) return Response.json({ ok: false, error: 'Nothing selected.' }, { status: 400 });

  return Response.json({ ok: true, deleted: deleteRows(table, ids) });
};
