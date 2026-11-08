// Minimal server-side client for Supabase's REST API (PostgREST), using fetch so the site
// needs no extra package. Only the Node server uses it, with the project's secret key from
// the environment; the key never reaches the browser.
const TIMEOUT_MS = 10_000;

export class SupabaseError extends Error {
  constructor(message: string, readonly status: number, readonly code?: string) {
    super(message);
    this.name = 'SupabaseError';
  }
}

function config() {
  const url = (process.env.SUPABASE_URL ?? '').replace(/\/+$/, '');
  const key = process.env.SUPABASE_SECRET_KEY ?? '';
  if (!url || !key) throw new SupabaseError('Supabase is not configured on the server (SUPABASE_URL, SUPABASE_SECRET_KEY).', 503, 'not_configured');
  return { url, key };
}

export const supabaseConfigured = () => !!(process.env.SUPABASE_URL && process.env.SUPABASE_SECRET_KEY);

async function call<T>(path: string, init: RequestInit & { prefer?: string } = {}): Promise<{ data: T; count: number | null }> {
  const { url, key } = config();
  const headers = new Headers(init.headers);
  headers.set('apikey', key);
  headers.set('Accept', 'application/json');
  if (init.body !== undefined) headers.set('Content-Type', 'application/json');
  if (init.prefer) headers.set('Prefer', init.prefer);

  let res: Response;
  try {
    res = await fetch(`${url}/rest/v1/${path}`, { ...init, headers, signal: AbortSignal.timeout(TIMEOUT_MS) });
  } catch (err) {
    throw new SupabaseError(`Could not reach the database (${(err as Error).name}).`, 503, 'unreachable');
  }
  const raw = await res.text();
  let body: unknown = null;
  if (raw) {
    try { body = JSON.parse(raw); } catch { body = raw; }
  }
  if (!res.ok) {
    const e = (body && typeof body === 'object' ? body : {}) as { message?: string; code?: string };
    throw new SupabaseError(e.message || `Database request failed (${res.status}).`, res.status, e.code);
  }
  const range = res.headers.get('content-range');
  const total = range?.split('/')[1];
  return { data: body as T, count: total && total !== '*' ? Number(total) : null };
}

const idList = (ids: readonly number[]) => `in.(${ids.map((n) => Math.trunc(n)).join(',')})`;

export const supabase = {
  /** Call a database function: POST /rpc/<name>. */
  rpc: async <T>(fn: string, args: Record<string, unknown> = {}) =>
    (await call<T>(`rpc/${fn}`, { method: 'POST', body: JSON.stringify(args) })).data,

  /** Select rows with a PostgREST query string (built by callers from fixed values only). */
  select: async <T>(table: string, query: string) => (await call<T[]>(`${table}?${query}`)).data,

  /** Count rows matching a PostgREST filter. */
  count: async (table: string, filter = '') =>
    (await call<unknown[]>(`${table}?select=id&limit=1${filter ? `&${filter}` : ''}`, { prefer: 'count=exact' })).count ?? 0,

  /** Insert one row and return it. */
  insert: async <T>(table: string, row: Record<string, unknown>) =>
    (await call<T[]>(`${table}?select=*`, { method: 'POST', body: JSON.stringify(row), prefer: 'return=representation' })).data[0],

  /** Insert rows, skipping any whose unique key (onConflict) already exists. Returns rows inserted. */
  insertIgnoringDuplicates: async (table: string, rows: Record<string, unknown>[], onConflict: string) =>
    (await call<unknown[]>(`${table}?on_conflict=${onConflict}&select=id`, {
      method: 'POST', body: JSON.stringify(rows), prefer: 'resolution=ignore-duplicates,return=representation',
    })).data.length,

  update: async (table: string, ids: readonly number[], patch: Record<string, unknown>) =>
    void (await call(`${table}?id=${idList(ids)}`, { method: 'PATCH', body: JSON.stringify(patch), prefer: 'return=minimal' })),

  /** Delete rows by id; returns how many were removed. */
  deleteIds: async (table: string, ids: readonly number[]) =>
    (await call<unknown[]>(`${table}?id=${idList(ids)}&select=id`, { method: 'DELETE', prefer: 'return=representation' })).data.length,
};
