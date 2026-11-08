// Add an internal note to a lead: POST { leadId, body }. Notes never change the enquiry.
import type { APIRoute } from 'astro';
import { bad, dbFail, guard, jsonBody, ok } from '../../../server/admin-api';
import { supabase } from '../../../server/supabase';

export const prerender = false;

export const POST: APIRoute = async (ctx) => {
  const denied = guard(ctx);
  if (denied) return denied;
  const body = await jsonBody(ctx.request);
  if (!body) return bad('Invalid request.');
  const leadId = body.leadId;
  const note = String(body.body ?? '').trim();
  if (!Number.isInteger(leadId) || (leadId as number) <= 0) return bad('Invalid request.');
  if (!note) return bad('Write a note first.', 422);
  if (note.length > 5000) return bad('Keep notes under 5,000 characters.', 422);
  try {
    return ok({ note: await supabase.rpc('add_lead_note', { p_lead: leadId, p_body: note }) });
  } catch (err) {
    return dbFail(err);
  }
};
