// How a lead found the site: the first page they landed on in this visit, the site that
// sent them and any campaign tags, as reported by the contact form (see scripts/forms.ts).
// This module owns turning those raw values into a stored record with a channel name.

export interface Attribution {
  channel: string;        // e.g. 'Google search', 'AI assistant', 'Direct'
  landing: string | null; // first page of the visit, e.g. /locations/delhi/
  referrer: string | null; // host that sent the visitor, e.g. google.com
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}

const clean = (v: FormDataEntryValue | null, max: number) => String(v ?? '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, max) || null;

// Checked in order: the AI entries must come before the general Google and Bing ones
const CHANNELS: [RegExp, string][] = [
  [/(^|\.)(chatgpt\.com|chat\.openai\.com|openai\.com|perplexity\.ai|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com|you\.com|phind\.com)$/, 'AI assistant'],
  [/(^|\.)google\.[a-z.]+$/, 'Google search'],
  [/(^|\.)bing\.com$/, 'Bing search'],
  [/(^|\.)(duckduckgo\.com|yahoo\.com|yandex\.[a-z]+|baidu\.com|ecosia\.org|brave\.com|startpage\.com)$/, 'Other search engine'],
  [/(^|\.)(linkedin\.com|lnkd\.in|instagram\.com|facebook\.com|fb\.com|x\.com|t\.co|twitter\.com|youtube\.com|whatsapp\.com|wa\.me|reddit\.com)$/, 'Social media'],
];

function channelOf(referrer: string | null, source: string | null, medium: string | null): string {
  if (medium && /^(cpc|ppc|paid|paidsearch|paid-social|display|ads?)$/i.test(medium)) return 'Paid ads';
  if (source) return 'Campaign link';
  if (!referrer) return 'Direct or unknown';
  return CHANNELS.find(([re]) => re.test(referrer))?.[1] ?? 'Other website';
}

/** The attribution record for a submitted form, or null when the form sent none. */
export function readAttribution(form: FormData): Attribution | null {
  const rawLanding = clean(form.get('landing'), 200);
  const landing = rawLanding && rawLanding.startsWith('/') && !rawLanding.startsWith('//') ? rawLanding : null;
  const rawReferrer = clean(form.get('referrer'), 100)?.toLowerCase().replace(/^www\./, '') ?? null;
  const referrer = rawReferrer && /^[a-z0-9.-]+\.[a-z]{2,}$/.test(rawReferrer) ? rawReferrer : null;
  const utm_source = clean(form.get('utm_source'), 80);
  const utm_medium = clean(form.get('utm_medium'), 80);
  const utm_campaign = clean(form.get('utm_campaign'), 80);
  if (!landing && !referrer && !utm_source && !utm_medium && !utm_campaign) return null;
  return { channel: channelOf(referrer, utm_source, utm_medium), landing, referrer, utm_source, utm_medium, utm_campaign };
}
