// Leads and job applications, stored in Supabase. Owns the record shapes, the admin list
// filters and status changes. When Supabase can't be reached, new submissions wait in a
// local outbox table and are sent on the next successful contact, so nothing is lost.
import { db } from './db';
import { supabase, SupabaseError } from './supabase';

export interface LeadStatus {
  id: number; slug: string; name: string; color: string; sort_order: number;
  is_system: boolean; is_default: boolean; counts_as_converted: boolean;
}

export interface Lead {
  id: number; created_at: string; name: string; email: string; phone: string | null; company: string | null;
  service: string | null; country: string | null; budget: string | null; message: string; page: string | null;
  visitor_country: string | null; email_sent: boolean; status_id: number; status_changed_at: string | null;
  source: LeadSource; external_id: string | null;
}

export const LEAD_SOURCES = { website: 'Website form', google_forms: 'Google Forms', manual: 'Manual entry' } as const;
export type LeadSource = keyof typeof LEAD_SOURCES;
export const isLeadSource = (v: unknown): v is LeadSource => typeof v === 'string' && v in LEAD_SOURCES;

export interface Application {
  id: number; created_at: string; name: string; email: string; phone: string | null; role: string; experience: string | null;
  location: string | null; portfolio: string | null; cv: string | null; message: string | null; email_sent: boolean;
}

type Table = 'leads' | 'applications';

// ---------------------------------------------------------------------------
// Saving new submissions (with the outbox fallback)
// ---------------------------------------------------------------------------

/** Where a new submission ended up: in Supabase, or queued locally until Supabase is back. */
export type Saved = { table: Table; id: number } | { table: Table; outboxId: number };

export async function saveSubmission(table: Table, row: Record<string, unknown>): Promise<Saved> {
  try {
    const created = await supabase.insert<{ id: number }>(table, row);
    void flushOutbox();
    return { table, id: created.id };
  } catch (err) {
    console.error(`leads: saving to Supabase failed, queued locally (${(err as Error).message})`);
    const { lastInsertRowid } = db.prepare('INSERT INTO outbox (created_at, kind, payload) VALUES (?, ?, ?)')
      .run(new Date().toISOString(), table, JSON.stringify(row));
    return { table, outboxId: Number(lastInsertRowid) };
  }
}

export async function markEmailSent(saved: Saved) {
  if ('id' in saved) {
    await supabase.update(saved.table, [saved.id], { email_sent: true }).catch((err) =>
      console.error('leads: could not record email delivery', (err as Error).message));
  } else {
    db.prepare(`UPDATE outbox SET payload = json_set(payload, '$.email_sent', json('true')) WHERE id = ?`).run(saved.outboxId);
  }
}

interface OutboxRow { id: number; kind: Table; payload: string; attempts: number }
let flushing = false;

/** Send queued submissions to Supabase, oldest first. Stops at the first failure. */
export async function flushOutbox(): Promise<number> {
  if (flushing) return 0;
  flushing = true;
  let sent = 0;
  try {
    const rows = db.prepare('SELECT id, kind, payload, attempts FROM outbox ORDER BY id LIMIT 100').all() as unknown as OutboxRow[];
    for (const row of rows) {
      try {
        await supabase.insert(row.kind, JSON.parse(row.payload));
        db.prepare('DELETE FROM outbox WHERE id = ?').run(row.id);
        sent++;
      } catch (err) {
        db.prepare('UPDATE outbox SET attempts = attempts + 1, last_error = ? WHERE id = ?').run((err as Error).message.slice(0, 500), row.id);
        break;
      }
    }
  } finally {
    flushing = false;
  }
  return sent;
}

export const outboxSize = () => (db.prepare('SELECT COUNT(*) AS n FROM outbox').get() as { n: number }).n;

// Retry queued submissions every five minutes while the server runs
setInterval(() => { if (outboxSize()) void flushOutbox(); }, 5 * 60_000).unref();

// ---------------------------------------------------------------------------
// Admin: statuses
// ---------------------------------------------------------------------------

export const listStatuses = () =>
  supabase.select<LeadStatus>('lead_statuses', 'select=id,slug,name,color,sort_order,is_system,is_default,counts_as_converted&order=sort_order.asc,id.asc');

export const HEX_COLOR = /^#[0-9a-f]{6}$/i;

/** Validate a status name and colour typed by the admin. */
export function parseStatusInput(body: { name?: unknown; color?: unknown }): { name: string; color: string } | { error: string } {
  const name = String(body.name ?? '').replace(/\s+/g, ' ').trim();
  const color = String(body.color ?? '').trim().toLowerCase();
  if (!name) return { error: 'Give the status a name.' };
  if (name.length > 40) return { error: 'Keep the name under 40 characters.' };
  if (!HEX_COLOR.test(color)) return { error: 'Pick a colour.' };
  return { name, color };
}

// ---------------------------------------------------------------------------
// Admin: lead list
// ---------------------------------------------------------------------------

export const PAGE_SIZE = 50;
const DAY = /^\d{4}-\d{2}-\d{2}$/;
// Dates in the filters are India dates: a day runs from 00:00 to 24:00 IST.
const IST = '+05:30';

export interface LeadFilters {
  tab: string;          // 'all' or a status slug
  q: string;
  country: string;
  service: string;
  source: LeadSource | '';
  from: string;         // YYYY-MM-DD (IST) or ''
  to: string;           // YYYY-MM-DD (IST) or ''
  sort: 'newest' | 'oldest';
  page: number;         // 1-based
}

export function parseLeadFilters(params: URLSearchParams): LeadFilters {
  const day = (k: string) => { const v = params.get(k) ?? ''; return DAY.test(v) && !Number.isNaN(Date.parse(v)) ? v : ''; };
  const page = Number.parseInt(params.get('page') ?? '1', 10);
  return {
    tab: /^[a-z0-9-]{1,60}$/.test(params.get('tab') ?? '') ? params.get('tab')! : 'all',
    q: (params.get('q') ?? '').trim().slice(0, 100),
    country: (params.get('country') ?? '').slice(0, 60),
    service: (params.get('service') ?? '').slice(0, 80),
    source: isLeadSource(params.get('source')) ? (params.get('source') as LeadSource) : '',
    from: day('from'),
    to: day('to'),
    sort: params.get('sort') === 'oldest' ? 'oldest' : 'newest',
    page: Number.isFinite(page) && page > 0 ? Math.min(page, 10_000) : 1,
  };
}

/** The filters as query parameters, leaving out defaults, so links stay short. */
export function filterParams(f: LeadFilters, overrides: Partial<LeadFilters> = {}): URLSearchParams {
  const merged = { ...f, ...overrides };
  const p = new URLSearchParams();
  if (merged.tab !== 'all') p.set('tab', merged.tab);
  if (merged.q) p.set('q', merged.q);
  if (merged.country) p.set('country', merged.country);
  if (merged.service) p.set('service', merged.service);
  if (merged.source) p.set('source', merged.source);
  if (merged.from) p.set('from', merged.from);
  if (merged.to) p.set('to', merged.to);
  if (merged.sort !== 'newest') p.set('sort', merged.sort);
  if (merged.page > 1) p.set('page', String(merged.page));
  return p;
}

export interface LeadPage {
  rows: Lead[];
  total: number;                       // leads in the current tab after filters
  all: number;                         // leads in every tab after filters
  counts: Record<string, number>;      // status id -> leads after filters
  countries: string[];
  services: string[];
}

function nextDay(day: string): string {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

export async function leadPage(f: LeadFilters, statuses: LeadStatus[]): Promise<LeadPage> {
  const status = f.tab === 'all' ? null : statuses.find((s) => s.slug === f.tab)?.id ?? -1;
  return supabase.rpc<LeadPage>('lead_page', {
    p_status: status,
    p_q: f.q || null,
    p_country: f.country || null,
    p_service: f.service || null,
    p_source: f.source || null,
    p_from: f.from ? `${f.from}T00:00:00${IST}` : null,
    p_to: f.to ? `${nextDay(f.to)}T00:00:00${IST}` : null,
    p_oldest_first: f.sort === 'oldest',
    p_limit: PAGE_SIZE,
    p_offset: (f.page - 1) * PAGE_SIZE,
  });
}

/** Change the status of leads; returns how many actually changed. */
export const setLeadStatus = (ids: number[], statusId: number) =>
  supabase.rpc<number>('set_lead_status', { p_ids: ids, p_status: statusId });

export interface LeadNote { id: number; lead_id: number; created_at: string; body: string }
export interface LeadActivity { id: number; lead_id: number; created_at: string; kind: string; detail: Record<string, unknown> }
export interface LeadDetail { lead: Lead; notes: LeadNote[]; activity: LeadActivity[] }

export interface LeadStats {
  total: number; spam: number; converted: number;
  by_status: Record<string, number>;
  by_source: Record<string, number>;
  by_country: { label: string; n: number }[];
  by_service: { label: string; n: number }[];
  monthly: { month: string; n: number }[];
}

/** Lead analytics, computed in the database from the leads themselves. */
export const leadStats = () => supabase.rpc<LeadStats>('lead_stats');

/** One lead with its notes and history, or null when it doesn't exist. */
export const leadDetail = (id: number) => supabase.rpc<LeadDetail | null>('lead_detail', { p_id: id });

export const deleteRecords = (table: Table, ids: number[]) => supabase.deleteIds(table, ids);

export const listApplications = () =>
  supabase.select<Application>('applications', 'select=*&order=created_at.desc,id.desc&limit=2000');

/** Leads received since an ISO timestamp, for the overview card. */
export const leadsSince = (iso: string) => supabase.count('leads', `created_at=gte.${encodeURIComponent(iso)}`);

/** True for the rule messages our database functions raise on purpose (SQLSTATE P0001). */
export const isRuleError = (err: unknown) => err instanceof SupabaseError && err.code === 'P0001';

/** A message that's safe to show the admin for a failed database call. */
export function dbMessage(err: unknown): string {
  if (isRuleError(err)) return (err as SupabaseError).message;
  if (err instanceof SupabaseError && (err.code === 'not_configured' || err.code === 'unreachable')) return err.message;
  return 'Something went wrong talking to the database. Please try again.';
}

/** Read a list of positive integer ids from a JSON body field. */
export function parseIds(value: unknown, max = 5000): number[] {
  return Array.isArray(value) ? [...new Set(value.filter((n): n is number => Number.isInteger(n) && n > 0))].slice(0, max) : [];
}
