// Builds a 1200x630 share image per page (see src/lib/og.ts) when the site is built. This is
// the picture WhatsApp, LinkedIn, X and others show under a shared armedias.com link.
// All text is outlined by src/lib/og-text.ts, so the server needs no installed fonts.
//
// Design: white card with the page title (last word in orange, underlined), a product
// mock-up on the right, and the client logos as proof. The proof line counts clients.ts,
// so it stays true as clients are added or removed.
import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { getPosts } from '../../lib/blog';
import { categories } from '../../content.config';
import { ogSlug, staticOgPages, type OgCard } from '../../lib/og';
import { dataUrlBytes, fonts, measure, textPaths, wrap } from '../../lib/og-text';
import { clients } from '../../data/clients';
import markData from '../../assets/logo-mark.png?inline';

export async function getStaticPaths() {
  const posts = await getPosts();
  const cards: [string, OgCard][] = [
    ...Object.entries(staticOgPages),
    ...posts.map((p) => [`/blog/${p.id}/`, { title: p.data.title, label: categories[p.data.category] }] as [string, OgCard]),
  ];
  return cards.map(([path, card]) => ({ params: { slug: ogSlug(path) }, props: card }));
}

const NAVY = '#13213a';
const EMBER = '#ff7a1a';
const EMBER_TEXT = '#c2410c';
const SUN = '#ffc93c';
const OLIVE = '#556b2f';
const LIME = '#a9c46c';
const X = 72;
const TITLE_MAX = 540;

const b64 = (dataUrl: string) => dataUrlBytes(dataUrl).toString('base64');
const mark = b64(markData);

// Client logo files, matched to clients.ts by file name (the import's src keeps it)
const logoFiles = import.meta.glob<string>('../../assets/clients/*.png', { query: '?inline', import: 'default', eager: true });
const logoByName = new Map(Object.entries(logoFiles).map(([path, url]) => [path.split('/').pop()!.replace('.png', ''), b64(url)]));
const proof = clients
  .map((c) => logoByName.get(c.logo.src.split('/').pop()!.split(/[.?]/)[0]))
  .filter((l): l is string => Boolean(l))
  .slice(0, 6);
const proofTitle = `Trusted by ${clients.length} companies`;
const proofNames = `${clients.slice(0, 3).map((c) => c.name).join(', ')} & more`;

/** Largest title size that fits in three lines. */
function fitTitle(title: string) {
  for (const size of [66, 60, 54, 48, 44]) {
    const lines = wrap(fonts.display, title, size, TITLE_MAX);
    if (lines.length <= 3) return { size, lines };
  }
  return { size: 44, lines: wrap(fonts.display, title, 44, TITLE_MAX).slice(0, 3) };
}

const defs = `
  <radialGradient id="b1" r="50%"><stop offset="0" stop-color="${EMBER}" stop-opacity=".22"/><stop offset="1" stop-color="${EMBER}" stop-opacity="0"/></radialGradient>
  <radialGradient id="b2" r="50%"><stop offset="0" stop-color="${LIME}" stop-opacity=".3"/><stop offset="1" stop-color="${LIME}" stop-opacity="0"/></radialGradient>
  <radialGradient id="b3" r="50%"><stop offset="0" stop-color="${SUN}" stop-opacity=".26"/><stop offset="1" stop-color="${SUN}" stop-opacity="0"/></radialGradient>
  <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="${NAVY}" stroke-opacity=".05"/></pattern>
  <linearGradient id="fade" x1="0" x2="1"><stop offset="0" stop-color="#fff"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <filter id="sh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="18" stdDeviation="20" flood-color="${NAVY}" flood-opacity=".18"/></filter>
  <filter id="sh2" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="${NAVY}" flood-opacity=".2"/></filter>
  <linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${EMBER}" stop-opacity=".35"/><stop offset="1" stop-color="${EMBER}" stop-opacity="0"/></linearGradient>
  <linearGradient id="bar" x1="0" x2="1"><stop offset="0" stop-color="${EMBER}"/><stop offset="1" stop-color="${SUN}"/></linearGradient>`;

// Dashboard, "new enquiry" toast and phone, drawn simply so the card reads as software
const curve = 'M118 250 C 150 240, 170 210, 200 216 S 250 190, 280 180 S 330 150, 360 152 S 395 128, 404 124';
const mockup = `
  <g transform="translate(690 118)" filter="url(#sh)">
    <rect width="440" height="300" rx="20" fill="#fff" stroke="${NAVY}" stroke-opacity=".08"/>
    <rect width="440" height="38" rx="20" fill="#f7f8f4"/><rect y="20" width="440" height="18" fill="#f7f8f4"/>
    <circle cx="22" cy="19" r="5.5" fill="#ff5f57"/><circle cx="40" cy="19" r="5.5" fill="${SUN}"/><circle cx="58" cy="19" r="5.5" fill="${LIME}"/>
    <rect x="150" y="11" width="140" height="16" rx="8" fill="#fff"/>${textPaths(fonts.body, 'armedias.com', 182, 24, 11, NAVY, 0, 0.5)}
    <rect y="38" width="88" height="262" fill="${NAVY}"/>
    <rect x="16" y="58" width="56" height="8" rx="4" fill="#fff" fill-opacity=".85"/>
    <rect x="16" y="84" width="44" height="7" rx="3.5" fill="#fff" fill-opacity=".35"/><rect x="16" y="104" width="50" height="7" rx="3.5" fill="${EMBER}"/>
    <rect x="16" y="124" width="40" height="7" rx="3.5" fill="#fff" fill-opacity=".35"/><rect x="16" y="144" width="48" height="7" rx="3.5" fill="#fff" fill-opacity=".35"/>
    ${[0, 1, 2].map((i) => `<rect x="${104 + i * 108}" y="54" width="96" height="62" rx="12" fill="${['#fff4eb', '#f1f6e6', '#fff8e1'][i]}"/><rect x="${116 + i * 108}" y="68" width="40" height="7" rx="3.5" fill="${NAVY}" fill-opacity=".35"/><rect x="${116 + i * 108}" y="84" width="${[58, 48, 64][i]}" height="16" rx="5" fill="${[EMBER, OLIVE, '#d99a00'][i]}"/>`).join('')}
    <rect x="104" y="130" width="312" height="150" rx="12" fill="#fafbf8"/>
    <path d="${curve} L404 268 L118 268Z" fill="url(#area)"/>
    <path d="${curve}" fill="none" stroke="${EMBER}" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="404" cy="124" r="6" fill="#fff" stroke="${EMBER}" stroke-width="3"/>
    <rect x="118" y="142" width="70" height="8" rx="4" fill="${NAVY}" fill-opacity=".5"/>
  </g>
  <g transform="translate(652 346)" filter="url(#sh2)">
    <rect width="236" height="66" rx="16" fill="#fff"/>
    <circle cx="34" cy="33" r="18" fill="#25d366"/><path d="M26 33 l6 6 11 -12" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    ${textPaths(fonts.bodyBold, 'New enquiry', 62, 29, 16, NAVY)}${textPaths(fonts.body, 'Replied in seconds', 62, 50, 14, NAVY, 0, 0.55)}
  </g>
  <g transform="translate(1018 300) rotate(5)" filter="url(#sh)">
    <rect width="132" height="250" rx="26" fill="${NAVY}"/>
    <rect x="7" y="7" width="118" height="236" rx="20" fill="#fff"/>
    <rect x="50" y="14" width="32" height="7" rx="3.5" fill="${NAVY}" fill-opacity=".8"/>
    <rect x="16" y="34" width="100" height="62" rx="12" fill="url(#bar)"/>
    <rect x="16" y="108" width="72" height="8" rx="4" fill="${NAVY}" fill-opacity=".7"/>
    <rect x="16" y="124" width="92" height="7" rx="3.5" fill="${NAVY}" fill-opacity=".25"/>
    <rect x="16" y="138" width="84" height="7" rx="3.5" fill="${NAVY}" fill-opacity=".25"/>
    <rect x="16" y="160" width="100" height="40" rx="10" fill="#f1f6e6"/><rect x="26" y="174" width="50" height="7" rx="3.5" fill="${OLIVE}"/>
    <rect x="16" y="210" width="100" height="22" rx="11" fill="${NAVY}"/>
  </g>`;

// Overlapping client logos with the proof line beside them
const STEP = 52;
const logoStack = proof.map((l, i) => `<g transform="translate(${X + i * STEP} 518)"><circle cx="29" cy="29" r="31" fill="#fff"/><image href="data:image/png;base64,${l}" x="3" y="3" width="52" height="52"/></g>`).join('');
const proofX = X + (proof.length - 1) * STEP + 62 + 22;
const proofBlock = proof.length
  ? `${logoStack}${textPaths(fonts.bodyBold, proofTitle, proofX, 543, 20, NAVY)}${textPaths(fonts.body, proofNames, proofX, 570, 17, NAVY, 0, 0.6)}`
  : '';

// The site address as a dark pill, top right
const site = 'armedias.com';
const siteW = measure(fonts.bodyBold, site, 20);
const pillW = siteW + 82;
const pillX = 1128 - pillW;
const sitePill = `<rect x="${pillX}" y="40" width="${pillW}" height="50" rx="25" fill="${NAVY}"/>${textPaths(fonts.bodyBold, site, pillX + 26, 72, 20, '#fff')}<path d="M${pillX + pillW - 44} 65 h18 m-8 -8 l8 8 -8 8" fill="none" stroke="${SUN}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;

const brand = `
  <rect x="${X}" y="52" width="80" height="60" rx="14" fill="#fff" stroke="${NAVY}" stroke-opacity=".1" filter="url(#sh2)"/>
  <image href="data:image/png;base64,${mark}" x="${X + 7}" y="57" width="66" height="50"/>
  ${textPaths(fonts.display, 'AR', X + 100, 92, 26, OLIVE, 5)}
  ${textPaths(fonts.display, 'MEDIAS', X + 100 + measure(fonts.display, 'AR ', 26, 5), 92, 26, NAVY, 5)}`;

export const GET: APIRoute = async ({ props }) => {
  const { title, label } = props as OgCard;
  const { size, lines } = fitTitle(title);
  const lineH = Math.round(size * 1.1);
  const top = 228 + (3 - lines.length) * lineH * 0.5 + size * 0.75;

  // The last word is orange and underlined, like the accent words on the site
  const last = lines.at(-1)!;
  const cut = last.lastIndexOf(' ');
  const head = cut > 0 ? last.slice(0, cut + 1) : '';
  const tail = cut > 0 ? last.slice(cut + 1) : last;
  const lastY = top + (lines.length - 1) * lineH;
  const tailX = X + measure(fonts.display, head, size);
  const tailW = measure(fonts.display, tail, size);
  const titleSvg = lines.slice(0, -1).map((l, i) => textPaths(fonts.display, l, X, top + i * lineH, size, NAVY)).join('')
    + textPaths(fonts.display, head, X, lastY, size, NAVY)
    + textPaths(fonts.display, tail, tailX, lastY, size, EMBER)
    + `<path d="M${tailX} ${lastY + 20} C ${tailX + tailW * 0.3} ${lastY + 29}, ${tailX + tailW * 0.7} ${lastY + 14}, ${tailX + tailW} ${lastY + 23}" fill="none" stroke="${EMBER}" stroke-width="7" stroke-linecap="round"/>`;

  const labelText = label.toUpperCase();
  const labelY = top - size - 44;
  const labelW = measure(fonts.bodyBold, labelText, 15, 2.4) + 48;
  const labelSvg = `<rect x="${X}" y="${labelY}" width="${labelW}" height="34" rx="17" fill="${EMBER}" fill-opacity=".12"/><circle cx="${X + 18}" cy="${labelY + 17}" r="5" fill="${EMBER}"/>${textPaths(fonts.bodyBold, labelText, X + 32, labelY + 23, 15, EMBER_TEXT, 2.4)}`;

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>${defs}</defs>
  <rect width="1200" height="630" fill="#fff"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#fade)"/>
  <circle cx="1010" cy="120" r="330" fill="url(#b1)"/><circle cx="760" cy="600" r="260" fill="url(#b2)"/><circle cx="1160" cy="560" r="200" fill="url(#b3)"/>
  <rect width="1200" height="8" fill="url(#bar)"/>
  ${brand}
  ${sitePill}
  ${labelSvg}
  ${titleSvg}
  ${mockup}
  ${proofBlock}
</svg>`;
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
