// Change the status of one or more leads: POST { ids: number[], statusId: number }.
import type { APIRoute } from 'astro';
import { bad, dbFail, guard, jsonBody, ok } from '../../../server/admin-api';
import { parseIds, setLeadStatus } from '../../../server/leads';

export const prerender = false;

export const POST: APIRoute = async (ctx) => {
  const denied = guard(ctx);
  if (denied) return denied;
  const body = await jsonBody(ctx.request);
  if (!body) return bad('Invalid request.');
  const ids = parseIds(body.ids);
  const statusId = body.statusId;
  if (!ids.length) return bad('Nothing selected.');
  if (!Number.isInteger(statusId) || (statusId as number) <= 0) return bad('Pick a status.');
  try {
    return ok({ changed: await setLeadStatus(ids, statusId as number) });
  } catch (err) {
    return dbFail(err);
  }
};
