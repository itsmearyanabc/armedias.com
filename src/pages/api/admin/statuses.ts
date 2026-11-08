// Lead status management from Settings. The database enforces the rules (built-in
// statuses, names in use, the default); this endpoint validates input and relays errors.
//   POST   { name, color }            create a status
//   PATCH  { id, name, color }        rename / recolour
//   PATCH  { id, makeDefault: true }  make it the default for new leads
//   DELETE { id }                     delete an unused custom status
import type { APIRoute } from 'astro';
import { bad, dbFail, guard, jsonBody, ok } from '../../../server/admin-api';
import { parseStatusInput } from '../../../server/leads';
import { supabase } from '../../../server/supabase';

export const prerender = false;

const idOf = (body: Record<string, unknown>) => (Number.isInteger(body.id) && (body.id as number) > 0 ? (body.id as number) : null);

export const POST: APIRoute = async (ctx) => {
  const denied = guard(ctx);
  if (denied) return denied;
  const body = await jsonBody(ctx.request);
  if (!body) return bad('Invalid request.');
  const input = parseStatusInput(body);
  if ('error' in input) return bad(input.error, 422);
  try {
    return ok({ id: await supabase.rpc<number>('create_lead_status', { p_name: input.name, p_color: input.color }) });
  } catch (err) {
    return dbFail(err);
  }
};

export const PATCH: APIRoute = async (ctx) => {
  const denied = guard(ctx);
  if (denied) return denied;
  const body = await jsonBody(ctx.request);
  const id = body && idOf(body);
  if (!body || !id) return bad('Invalid request.');
  try {
    if (body.makeDefault === true) {
      await supabase.rpc('set_default_lead_status', { p_id: id });
      return ok();
    }
    const input = parseStatusInput(body);
    if ('error' in input) return bad(input.error, 422);
    await supabase.rpc('update_lead_status', { p_id: id, p_name: input.name, p_color: input.color });
    return ok(input);
  } catch (err) {
    return dbFail(err);
  }
};

export const DELETE: APIRoute = async (ctx) => {
  const denied = guard(ctx);
  if (denied) return denied;
  const body = await jsonBody(ctx.request);
  const id = body && idOf(body);
  if (!id) return bad('Invalid request.');
  try {
    await supabase.rpc('delete_lead_status', { p_id: id });
    return ok();
  } catch (err) {
    return dbFail(err);
  }
};
