// Cookieless visitor analytics. A visitor is identified per day by hashing their IP and
// browser with a random salt that rotates daily, so no IP addresses or cookies are stored
// and visitors can't be tracked across days.
import { createHash, randomBytes } from 'node:crypto';
import { db } from './db';

const BOT = /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|facebookexternalhit|curl|wget|python|monitor/i;
const RETENTION_DAYS = 400;

const today = () => new Date().toISOString().slice(0, 10);

function saltFor(day: string): string {
  const row = db.prepare('SELECT salt FROM salts WHERE day = ?').get(day) as { salt: string } | undefined;
  if (row) return row.salt;
  const salt = randomBytes(16).toString('hex');
  db.prepare('INSERT OR IGNORE INTO salts (day, salt) VALUES (?, ?)').run(day, salt);
  db.prepare('DELETE FROM salts WHERE day < ?').run(day); // yesterday's salt is gone for good
  db.prepare("DELETE FROM pageviews WHERE day < date('now', ?)").run(`-${RETENTION_DAYS} days`);
  return (db.prepare('SELECT salt FROM salts WHERE day = ?').get(day) as { salt: string }).salt;
}

function deviceOf(ua: string): string {
  if (/ipad|tablet/i.test(ua)) return 'Tablet';
  if (/mobi|android|iphone/i.test(ua)) return 'Mobile';
  return 'Desktop';
}

/** Cloudflare's visitor country, when the request came through Cloudflare. */
export function countryOf(request: Request): string {
  const c = (request.headers.get('cf-ipcountry') || '').toUpperCase();
  return /^[A-Z]{2}$/.test(c) && c !== 'XX' && c !== 'T1' ? c : 'Unknown';
}

export function recordPageview(request: Request, ip: string, path: string, referrer: string) {
  const ua = request.headers.get('user-agent') || '';
  if (!ua || BOT.test(ua)) return;
  if (!path.startsWith('/') || path.startsWith('/admin') || path.length > 300) return;

  const day = today();
  const visitor = createHash('sha256').update(`${saltFor(day)}|${ip}|${ua}`).digest('hex').slice(0, 24);

  let refHost = '';
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, '');
    if (host && host !== new URL(request.url).hostname.replace(/^www\./, '') && host !== 'armedias.com') refHost = host;
  } catch { /* direct visit */ }

  db.prepare('INSERT INTO pageviews (ts, day, path, referrer, country, device, visitor) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .run(new Date().toISOString(), day, path, refHost || null, countryOf(request), deviceOf(ua), visitor);
}

export interface Stats {
  views: number;
  visitors: number;
  today: { views: number; visitors: number };
  daily: { day: string; views: number; visitors: number }[];
  countries: { country: string; visitors: number }[];
  pages: { path: string; views: number }[];
  referrers: { referrer: string; visitors: number }[];
  devices: { device: string; visitors: number }[];
}

export function getStats(days: number): Stats {
  const since = new Date(Date.now() - (days - 1) * 86_400_000).toISOString().slice(0, 10);
  const one = <T>(sql: string, ...p: (string | number)[]) => db.prepare(sql).get(...p) as T;
  const all = <T>(sql: string, ...p: (string | number)[]) => db.prepare(sql).all(...p) as T[];

  // Visitor hashes are per day, so "visitors" over a range is the sum of daily uniques
  const views = one<{ n: number }>('SELECT COUNT(*) AS n FROM pageviews WHERE day >= ?', since).n;
  const visitors = one<{ n: number }>(
    'SELECT COALESCE(SUM(v), 0) AS n FROM (SELECT COUNT(DISTINCT visitor) AS v FROM pageviews WHERE day >= ? GROUP BY day)', since).n;
  const t = today();
  const todayRow = one<{ views: number; visitors: number }>(
    'SELECT COUNT(*) AS views, COUNT(DISTINCT visitor) AS visitors FROM pageviews WHERE day = ?', t);

  const dailyRows = all<{ day: string; views: number; visitors: number }>(
    'SELECT day, COUNT(*) AS views, COUNT(DISTINCT visitor) AS visitors FROM pageviews WHERE day >= ? GROUP BY day', since);
  const byDay = new Map(dailyRows.map((r) => [r.day, r]));
  const daily = Array.from({ length: days }, (_, i) => {
    const day = new Date(Date.now() - (days - 1 - i) * 86_400_000).toISOString().slice(0, 10);
    return byDay.get(day) ?? { day, views: 0, visitors: 0 };
  });

  return {
    views,
    visitors,
    today: todayRow,
    daily,
    countries: all(`SELECT country, SUM(v) AS visitors FROM (SELECT country, day, COUNT(DISTINCT visitor) AS v FROM pageviews WHERE day >= ? GROUP BY country, day) GROUP BY country ORDER BY visitors DESC LIMIT 20`, since),
    pages: all('SELECT path, COUNT(*) AS views FROM pageviews WHERE day >= ? GROUP BY path ORDER BY views DESC LIMIT 15', since),
    referrers: all(`SELECT referrer, COUNT(DISTINCT visitor || day) AS visitors FROM pageviews WHERE day >= ? AND referrer IS NOT NULL GROUP BY referrer ORDER BY visitors DESC LIMIT 10`, since),
    devices: all('SELECT device, COUNT(DISTINCT visitor || day) AS visitors FROM pageviews WHERE day >= ? GROUP BY device ORDER BY visitors DESC', since),
  };
}
