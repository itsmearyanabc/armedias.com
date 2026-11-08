// Google Forms -> leads. A small Apps Script inside the Google Form (see
// google-forms-script.ts) posts responses to /api/integrations/google-forms/ with a bearer
// key. This module owns that key, the question -> lead field mapping, turning responses
// into leads (duplicates skipped by response id) and the sync history.
import { randomBytes, createHash, timingSafeEqual } from 'node:crypto';
import { db } from './db';
import { getSetting, setSetting } from './settings';
import { supabase } from './supabase';

export const LEAD_FIELDS = {
  name: 'Name', email: 'Email', phone: 'Phone', company: 'Company', service: 'Service',
  country: 'Country', budget: 'Budget', message: 'Message',
} as const;
export type LeadField = keyof typeof LEAD_FIELDS;
const MAX_LEN: Record<LeadField, number> = { name: 100, email: 150, phone: 30, company: 120, service: 80, country: 60, budget: 40, message: 5000 };

export interface GoogleFormsConfig {
  token: string;
  connectedAt: string;
  webAppUrl: string;                       // the script's web app, for "Sync now"
  formId: string;
  formTitle: string;
  questions: string[];                     // question titles seen so far, in first-seen order
  fieldMap: Record<string, LeadField | ''>; // question title -> lead field ('' = keep in message)
}

const KEY = 'google_forms';

export function getConfig(): GoogleFormsConfig | null {
  try {
    const raw = getSetting(KEY);
    return raw ? (JSON.parse(raw) as GoogleFormsConfig) : null;
  } catch {
    return null;
  }
}
const saveConfig = (c: GoogleFormsConfig) => setSetting(KEY, JSON.stringify(c));

/** Create (or replace) the connection key. Replacing it cuts off any script using the old one. */
export function connect(): GoogleFormsConfig {
  const old = getConfig();
  const config: GoogleFormsConfig = {
    token: randomBytes(24).toString('base64url'),
    connectedAt: new Date().toISOString(),
    webAppUrl: old?.webAppUrl ?? '',
    formId: old?.formId ?? '',
    formTitle: old?.formTitle ?? '',
    questions: old?.questions ?? [],
    fieldMap: old?.fieldMap ?? {},
  };
  saveConfig(config);
  logSync(old ? 'key replaced' : 'connected', {});
  return config;
}

/** Remove the key so the script can no longer send. Leads already imported stay. */
export function disconnect() {
  db.prepare('DELETE FROM settings WHERE key = ?').run(KEY);
  logSync('disconnected', {});
}

/** True when the request carries the current connection key. */
export function authorized(request: Request): boolean {
  const config = getConfig();
  const sent = (request.headers.get('authorization') ?? '').replace(/^Bearer\s+/i, '');
  if (!config || !sent) return false;
  const a = createHash('sha256').update(sent).digest();
  const b = createHash('sha256').update(config.token).digest();
  return timingSafeEqual(a, b);
}

export function setWebAppUrl(input: string): string | { error: string } {
  const config = getConfig();
  if (!config) return { error: 'Connect first.' };
  const raw = input.trim();
  if (raw) {
    let url: URL;
    try { url = new URL(raw); } catch { return { error: 'That link is not valid.' }; }
    if (url.protocol !== 'https:' || url.hostname !== 'script.google.com' || !/^\/macros\/s\/[\w-]+\/exec$/.test(url.pathname)) {
      return { error: 'Paste the web app URL from Apps Script (https://script.google.com/macros/s/…/exec).' };
    }
  }
  saveConfig({ ...config, webAppUrl: raw });
  return raw;
}

export function setFieldMap(map: Record<string, unknown>): GoogleFormsConfig | { error: string } {
  const config = getConfig();
  if (!config) return { error: 'Connect first.' };
  const next: GoogleFormsConfig['fieldMap'] = {};
  for (const q of config.questions) {
    const v = map[q];
    next[q] = typeof v === 'string' && v in LEAD_FIELDS ? (v as LeadField) : '';
  }
  const used = Object.values(next).filter(Boolean);
  const twice = used.find((f, i) => used.indexOf(f) !== i);
  if (twice) return { error: `Only one question can fill "${LEAD_FIELDS[twice as LeadField]}".` };
  const updated = { ...config, fieldMap: next };
  saveConfig(updated);
  return updated;
}

/** A sensible first mapping for a question, from its wording. */
export function guessField(question: string): LeadField | '' {
  const q = question.toLowerCase();
  if (/e-?mail/.test(q)) return 'email';
  if (/phone|mobile|whatsapp|contact number/.test(q)) return 'phone';
  if (/company|business|organi[sz]ation|brand/.test(q)) return 'company';
  if (/budget/.test(q)) return 'budget';
  if (/country|location|where are you/.test(q)) return 'country';
  if (/service|interested in|looking for|type of project/.test(q)) return 'service';
  if (/message|project|details|describe|tell us|requirement|anything else/.test(q)) return 'message';
  if (/name/.test(q)) return 'name';
  return '';
}

// ---------------------------------------------------------------------------
// Incoming responses
// ---------------------------------------------------------------------------

export interface FormResponse { responseId: string; submittedAt: string; answers: Record<string, string> }
export interface IncomingBatch { formId: string; formTitle: string; trigger: string; responses: FormResponse[] }

const TRIGGERS = new Set(['submit', 'retry', 'recent', 'all']);

/** Parse the script's JSON; null when it isn't the expected shape. */
export function parseBatch(body: unknown): IncomingBatch | null {
  if (!body || typeof body !== 'object') return null;
  const b = body as Record<string, unknown>;
  if (!Array.isArray(b.responses) || b.responses.length > 500) return null;
  const responses: FormResponse[] = [];
  for (const r of b.responses as Record<string, unknown>[]) {
    if (!r || typeof r !== 'object') return null;
    const id = String(r.responseId ?? '');
    const at = Date.parse(String(r.submittedAt ?? ''));
    if (!/^[\w-]{1,200}$/.test(id) || Number.isNaN(at) || !r.answers || typeof r.answers !== 'object') return null;
    const answers: Record<string, string> = {};
    for (const [q, a] of Object.entries(r.answers as Record<string, unknown>).slice(0, 100)) {
      const question = q.replace(/\s+/g, ' ').trim().slice(0, 300);
      const answer = String(a ?? '').trim().slice(0, 5000);
      if (question && answer) answers[question] = answer;
    }
    responses.push({ responseId: id, submittedAt: new Date(at).toISOString(), answers });
  }
  return {
    formId: String(b.formId ?? '').replace(/[^\w-]/g, '').slice(0, 200),
    formTitle: String(b.formTitle ?? '').trim().slice(0, 200),
    trigger: TRIGGERS.has(String(b.trigger)) ? String(b.trigger) : 'submit',
    responses,
  };
}

const oneLine = (v: string, max: number) => v.replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);

/** A lead row from one response. Unmapped answers are kept at the end of the message. */
export function toLead(r: FormResponse, formId: string, map: GoogleFormsConfig['fieldMap']): Record<string, unknown> {
  const fields: Partial<Record<LeadField, string>> = {};
  const rest: string[] = [];
  for (const [q, a] of Object.entries(r.answers)) {
    const f = map[q];
    if (f && !fields[f]) fields[f] = f === 'message' ? a.slice(0, MAX_LEN.message) : oneLine(a, MAX_LEN[f]);
    else rest.push(`${q}: ${a}`);
  }
  const extra = rest.length ? `${fields.message ? '\n\n' : ''}Other answers:\n${rest.join('\n')}` : '';
  const email = fields.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) ? fields.email : '';
  return {
    created_at: r.submittedAt,
    source: 'google_forms',
    external_id: `gforms:${formId || 'form'}:${r.responseId}`,
    name: fields.name || email || 'Google Forms respondent',
    email,
    phone: fields.phone || null,
    company: fields.company || null,
    service: fields.service || null,
    country: fields.country || null,
    budget: fields.budget || null,
    message: (`${fields.message ?? ''}${extra}`.trim() || '(no answers)').slice(0, 8000),
  };
}

export interface SyncResult { received: number; inserted: number; duplicates: number; failed: number; errors: string[] }

/** Save a batch of responses as leads; already imported responses are skipped. */
export async function ingest(batch: IncomingBatch): Promise<SyncResult> {
  let config = getConfig()!;
  // Learn new questions, with a guessed mapping the admin can change
  const fresh = [...new Set(batch.responses.flatMap((r) => Object.keys(r.answers)))].filter((q) => !config.questions.includes(q));
  if (fresh.length || batch.formId !== config.formId || (batch.formTitle && batch.formTitle !== config.formTitle)) {
    const taken = new Set(Object.values(config.fieldMap).filter(Boolean));
    const fieldMap = { ...config.fieldMap };
    for (const q of fresh) {
      const g = guessField(q);
      fieldMap[q] = g && !taken.has(g) ? g : '';
      if (fieldMap[q]) taken.add(fieldMap[q]);
    }
    config = { ...config, questions: [...config.questions, ...fresh].slice(0, 200), fieldMap, formId: batch.formId || config.formId, formTitle: batch.formTitle || config.formTitle };
    saveConfig(config);
  }

  const result: SyncResult = { received: batch.responses.length, inserted: 0, duplicates: 0, failed: 0, errors: [] };
  const rows = batch.responses.map((r) => toLead(r, config.formId, config.fieldMap));
  try {
    result.inserted = rows.length ? await supabase.insertIgnoringDuplicates('leads', rows, 'external_id') : 0;
  } catch {
    // Find the rows that fail, one by one, so one bad response doesn't block the rest
    for (const row of rows) {
      try {
        result.inserted += await supabase.insertIgnoringDuplicates('leads', [row], 'external_id');
      } catch (err) {
        result.failed++;
        if (result.errors.length < 5) result.errors.push((err as Error).message.slice(0, 200));
      }
    }
  }
  result.duplicates = result.received - result.inserted - result.failed;
  logSync(batch.trigger, result);
  return result;
}

// ---------------------------------------------------------------------------
// "Sync now": ask the script's web app to send responses
// ---------------------------------------------------------------------------

export async function requestSync(mode: 'recent' | 'all'): Promise<{ ok: boolean; message: string }> {
  const config = getConfig();
  if (!config) return { ok: false, message: 'Not connected.' };
  if (!config.webAppUrl) return { ok: false, message: 'Add the web app URL first (setup step 3).' };
  const url = new URL(config.webAppUrl);
  url.searchParams.set('token', config.token);
  url.searchParams.set('mode', mode);
  try {
    const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(120_000) });
    const body = (await res.json().catch(() => null)) as { ok?: boolean; error?: string; sent?: number; inserted?: number; failed?: number } | null;
    if (!res.ok || !body?.ok) {
      const message = body?.error === 'unauthorized' ? 'The script has a different key. Copy the script again.' : `The script did not run (${body?.error ?? `HTTP ${res.status}`}).`;
      logSync(`sync ${mode}`, { failed: 0, error: message });
      return { ok: false, message };
    }
    return { ok: true, message: `Sent ${body.sent ?? 0} response(s): ${body.inserted ?? 0} new, ${(body.sent ?? 0) - (body.inserted ?? 0) - (body.failed ?? 0)} already imported${body.failed ? `, ${body.failed} failed (will retry)` : ''}.` };
  } catch (err) {
    const message = `Could not reach the script (${(err as Error).name}).`;
    logSync(`sync ${mode}`, { error: message });
    return { ok: false, message };
  }
}

// ---------------------------------------------------------------------------
// History
// ---------------------------------------------------------------------------

export interface SyncLogRow { id: number; ts: string; trigger: string; received: number; inserted: number; duplicates: number; failed: number; error: string | null }

function logSync(trigger: string, r: Partial<SyncResult> & { error?: string }) {
  db.prepare('INSERT INTO sync_log (ts, trigger, received, inserted, duplicates, failed, error) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .run(new Date().toISOString(), trigger, r.received ?? 0, r.inserted ?? 0, r.duplicates ?? 0, r.failed ?? 0, r.error ?? (r.errors?.length ? r.errors.join(' | ') : null));
  db.prepare('DELETE FROM sync_log WHERE id NOT IN (SELECT id FROM sync_log ORDER BY id DESC LIMIT 500)').run();
}

export const syncHistory = (limit = 15) =>
  db.prepare('SELECT * FROM sync_log ORDER BY id DESC LIMIT ?').all(limit) as unknown as SyncLogRow[];
