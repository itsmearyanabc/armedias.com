// Shared guard and helpers for the admin JSON endpoints under /api/admin/.
import type { APIContext, APIRoute } from 'astro';
import { isAuthenticated } from './auth';
import { dbMessage, deleteRecords, isRuleError, parseIds } from './leads';

const fail = (error: string, status: number) => Response.json({ ok: false, error }, { status });

/**
 * Null when the request comes from a signed-in admin on this site's own pages, otherwise
 * the error response. Changes must come from the admin page itself (same Origin), on top
 * of the SameSite=Strict session cookie.
 */
export function guard({ request, cookies, url }: APIContext): Response | null {
  if (!isAuthenticated(cookies)) return fail('Not signed in.', 401);
  if (request.method !== 'GET' && request.headers.get('origin') !== url.origin) return fail('Request blocked.', 403);
  return null;
}

/** The parsed JSON body, or null when it isn't a JSON object. */
export async function jsonBody(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const body = await request.json();
    return body && typeof body === 'object' && !Array.isArray(body) ? (body as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

export const ok = (extra: Record<string, unknown> = {}) => Response.json({ ok: true, ...extra });
export const bad = (error: string, status = 400) => fail(error, status);
export const dbFail = (err: unknown) => {
  if (isRuleError(err)) return fail(dbMessage(err), 422);
  console.error('admin api:', (err as Error).message);
  return fail(dbMessage(err), 502);
};

/** DELETE handler shared by the admin record lists (leads, applications). */
export const deleteHandler = (table: 'leads' | 'applications'): APIRoute => async (ctx) => {
  const denied = guard(ctx);
  if (denied) return denied;
  const body = await jsonBody(ctx.request);
  if (!body) return bad('Invalid request.');
  const ids = parseIds(body.ids);
  if (!ids.length) return bad('Nothing selected.');
  try {
    return ok({ deleted: await deleteRecords(table, ids) });
  } catch (err) {
    return dbFail(err);
  }
};
