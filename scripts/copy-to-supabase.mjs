// One-time copy of leads and job applications from the server's SQLite database into
// Supabase. Safe to run more than once: rows already copied (same legacy_id) are skipped.
// Nothing is deleted from SQLite.
//
// On the VPS, after running supabase/migrations/0001_lead_management.sql:
//   cd /var/www/armedias/current
//   /opt/node24/bin/node --env-file=/var/www/armedias/.env scripts/copy-to-supabase.mjs
import { DatabaseSync } from 'node:sqlite';
import { join } from 'node:path';

const url = (process.env.SUPABASE_URL ?? '').replace(/\/+$/, '');
const key = process.env.SUPABASE_SECRET_KEY ?? '';
if (!url || !key) {
  console.error('Set SUPABASE_URL and SUPABASE_SECRET_KEY in the .env file first.');
  process.exit(1);
}
const file = join(process.env.DATA_DIR || join(process.cwd(), '.data'), 'armedias.db');
const db = new DatabaseSync(file, { readOnly: true });

async function copy(table, rows) {
  let inserted = 0;
  for (let i = 0; i < rows.length; i += 200) {
    const res = await fetch(`${url}/rest/v1/${table}?on_conflict=legacy_id&select=id`, {
      method: 'POST',
      headers: { apikey: key, 'Content-Type': 'application/json', Prefer: 'resolution=ignore-duplicates,return=representation' },
      body: JSON.stringify(rows.slice(i, i + 200)),
    });
    const body = await res.json().catch(() => null);
    if (!res.ok) throw new Error(`${table}: ${res.status} ${body?.message ?? ''}`);
    inserted += body.length;
  }
  return inserted;
}

const iso = (t) => new Date(t).toISOString();
const leads = db.prepare('SELECT * FROM submissions ORDER BY id').all().map((r) => ({
  legacy_id: r.id, created_at: iso(r.created_at), name: r.name, email: r.email, phone: r.phone, company: r.company,
  service: r.service, country: r.country, budget: r.budget, message: r.message, page: r.page,
  visitor_country: r.visitor_country, email_sent: !!r.email_sent,
}));
const applications = db.prepare('SELECT * FROM applications ORDER BY id').all().map((r) => ({
  legacy_id: r.id, created_at: iso(r.created_at), name: r.name, email: r.email, phone: r.phone, role: r.role,
  experience: r.experience, location: r.location, portfolio: r.portfolio, cv: r.cv, message: r.message, email_sent: !!r.email_sent,
}));

console.log(`SQLite (${file}): ${leads.length} leads, ${applications.length} applications`);
console.log(`Copied ${await copy('leads', leads)} new leads (already there are skipped)`);
console.log(`Copied ${await copy('applications', applications)} new applications`);
