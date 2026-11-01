// SQLite database for leads, analytics and admin security state, using Node's built-in
// driver (no native modules to compile on the VPS). Lives in DATA_DIR, outside the release
// folders, so data survives deploys.
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const dir = process.env.DATA_DIR || join(process.cwd(), '.data');
mkdirSync(dir, { recursive: true });

export const db = new DatabaseSync(join(dir, 'armedias.db'));

db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA busy_timeout = 3000;

  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    service TEXT,
    country TEXT,
    budget TEXT,
    message TEXT NOT NULL,
    page TEXT,
    visitor_country TEXT,
    email_sent INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS pageviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ts TEXT NOT NULL,
    day TEXT NOT NULL,
    path TEXT NOT NULL,
    referrer TEXT,
    country TEXT,
    device TEXT,
    visitor TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS pageviews_day ON pageviews(day);

  CREATE TABLE IF NOT EXISTS salts (day TEXT PRIMARY KEY, salt TEXT NOT NULL);

  CREATE TABLE IF NOT EXISTS login_guard (
    ip TEXT PRIMARY KEY,
    stage INTEGER NOT NULL DEFAULT 0,
    failures INTEGER NOT NULL DEFAULT 0,
    locked_until INTEGER NOT NULL DEFAULT 0,
    last_attempt INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    role TEXT NOT NULL,
    experience TEXT,
    location TEXT,
    portfolio TEXT,
    cv TEXT,
    message TEXT,
    email_sent INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  -- Daily counters for simple events such as WhatsApp clicks
  CREATE TABLE IF NOT EXISTS event_counts (
    day TEXT NOT NULL,
    name TEXT NOT NULL,
    count INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (day, name)
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token_hash TEXT PRIMARY KEY,
    expires_at INTEGER NOT NULL
  );
`);

/** Delete rows by id from an admin-managed table; returns how many were removed. */
export function deleteRows(table: 'submissions' | 'applications', ids: number[]): number {
  const del = db.prepare(`DELETE FROM ${table} WHERE id = ?`);
  let deleted = 0;
  db.exec('BEGIN');
  try {
    for (const id of ids) deleted += Number(del.run(id).changes);
    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
  return deleted;
}
