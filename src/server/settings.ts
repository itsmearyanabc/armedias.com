// Site settings editable from /admin/, stored in the database.
import { db } from './db';
import { site } from '../data/site';

export function getSetting(key: string): string | undefined {
  return (db.prepare('SELECT value FROM settings WHERE key = ?').get(key) as { value: string } | undefined)?.value;
}

export function setSetting(key: string, value: string) {
  db.prepare(`INSERT INTO settings (key, value, updated_at) VALUES (?, ?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`)
    .run(key, value, new Date().toISOString());
}

export interface WhatsAppSetting { number: string; message: string }

const DEFAULT_NUMBER = new URL(site.whatsappDefault).pathname.replace(/\D/g, '');

export function getWhatsApp(): WhatsAppSetting {
  try {
    const saved = JSON.parse(getSetting('whatsapp') ?? '{}') as Partial<WhatsAppSetting>;
    return { number: saved.number || DEFAULT_NUMBER, message: saved.message ?? '' };
  } catch {
    return { number: DEFAULT_NUMBER, message: '' };
  }
}

/** Parse what the admin typed: a phone number in any format, or a wa.me / api.whatsapp.com link. */
export function parseWhatsApp(input: string, message: string): WhatsAppSetting | { error: string } {
  const raw = input.trim();
  let number = raw;
  let text = message.trim();
  if (/^https?:\/\//i.test(raw)) {
    let url: URL;
    try { url = new URL(raw); } catch { return { error: 'That link is not valid.' }; }
    const host = url.hostname.replace(/^www\./, '');
    if (host === 'wa.me') number = url.pathname;
    else if (host === 'api.whatsapp.com' || host === 'whatsapp.com') number = url.searchParams.get('phone') ?? '';
    else return { error: 'Use a wa.me link or a phone number.' };
    text ||= url.searchParams.get('text') ?? '';
  }
  number = number.replace(/\D/g, '');
  if (number.length < 8 || number.length > 15) return { error: 'Enter the full number with country code, e.g. 91 77018 97557.' };
  if (text.length > 500) return { error: 'Keep the message under 500 characters.' };
  return { number, message: text };
}

export function whatsAppUrl({ number, message }: WhatsAppSetting): string {
  return `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}

export function countEvent(name: string) {
  db.prepare(`INSERT INTO event_counts (day, name, count) VALUES (?, ?, 1)
    ON CONFLICT(day, name) DO UPDATE SET count = count + 1`).run(new Date().toISOString().slice(0, 10), name);
}

export function eventTotal(name: string, sinceDay: string): number {
  return (db.prepare('SELECT COALESCE(SUM(count), 0) AS n FROM event_counts WHERE name = ? AND day >= ?').get(name, sinceDay) as { n: number }).n;
}

// Social profile links shown as footer icons. Each network accepts only its own domains.
export const socialNetworks = {
  linkedin: { label: 'LinkedIn', hosts: ['linkedin.com'] },
  instagram: { label: 'Instagram', hosts: ['instagram.com'] },
  facebook: { label: 'Facebook', hosts: ['facebook.com', 'fb.com'] },
  x: { label: 'X', hosts: ['x.com', 'twitter.com'] },
} as const;
export type SocialKey = keyof typeof socialNetworks;
export type Socials = Partial<Record<SocialKey, string>>;

export function getSocials(): Socials {
  try {
    return JSON.parse(getSetting('socials') ?? '{}') as Socials;
  } catch {
    return {};
  }
}

/** Validate what the admin typed. Empty fields remove that icon. */
export function parseSocials(input: Record<string, unknown>): Socials | { error: string } {
  const out: Socials = {};
  for (const [key, { label, hosts }] of Object.entries(socialNetworks) as [SocialKey, (typeof socialNetworks)[SocialKey]][]) {
    let raw = String(input[key] ?? '').trim();
    if (!raw) continue;
    if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`;
    let url: URL;
    try { url = new URL(raw); } catch { return { error: `${label}: that link is not valid.` }; }
    const host = url.hostname.replace(/^(www|m)\./, '');
    if (!hosts.some((h) => host === h || host.endsWith(`.${h}`))) return { error: `${label}: use a link on ${hosts[0]}.` };
    url.protocol = 'https:';
    out[key] = url.href;
  }
  return out;
}
