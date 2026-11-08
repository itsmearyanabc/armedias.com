// Add a lead by hand from the admin panel (source: Manual entry).
// POST { name, email, phone, company, service, country, budget, message, statusId? }
import type { APIRoute } from 'astro';
import { bad, dbFail, guard, jsonBody, ok } from '../../../server/admin-api';
import { supabase } from '../../../server/supabase';

export const prerender = false;

const str = (v: unknown, max: number) => String(v ?? '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);

export const POST: APIRoute = async (ctx) => {
  const denied = guard(ctx);
  if (denied) return denied;
  const body = await jsonBody(ctx.request);
  if (!body) return bad('Invalid request.');
  const name = str(body.name, 100);
  const email = str(body.email, 150);
  const message = String(body.message ?? '').trim().slice(0, 5000);
  if (!name) return bad('Enter a name.', 422);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad('That email address is not valid.', 422);
  const statusId = Number.isInteger(body.statusId) && (body.statusId as number) > 0 ? (body.statusId as number) : null;
  try {
    const lead = await supabase.insert<{ id: number }>('leads', {
      source: 'manual', name, email,
      phone: str(body.phone, 30) || null, company: str(body.company, 120) || null, service: str(body.service, 80) || null,
      country: str(body.country, 60) || null, budget: str(body.budget, 40) || null,
      message: message || '(added manually)',
      ...(statusId ? { status_id: statusId } : {}),
    });
    return ok({ id: lead.id });
  } catch (err) {
    return dbFail(err);
  }
};
