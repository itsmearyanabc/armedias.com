// Builds a 1200x630 share image per page (see src/lib/og.ts) when the site is built.
import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getPosts } from '../../lib/blog';
import { categories } from '../../content.config';
import { ogSlug, staticOgPages, type OgCard } from '../../lib/og';

export async function getStaticPaths() {
  const posts = await getPosts();
  const cards: [string, OgCard][] = [
    ...Object.entries(staticOgPages),
    ...posts.map((p) => [`/blog/${p.id}/`, { title: p.data.title, label: categories[p.data.category] }] as [string, OgCard]),
  ];
  return cards.map(([path, card]) => ({ params: { slug: ogSlug(path) }, props: card }));
}

// Read from the project (the build runs at its root); bundling moves this file, so no relative URL
const mark = readFileSync(join(process.cwd(), 'src/assets/logo-mark.png')).toString('base64');
const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function wrap(text: string, max: number): string[] {
  const lines: string[] = [];
  for (const word of text.split(' ')) {
    const last = lines.at(-1);
    if (last && (last + ' ' + word).length <= max) lines[lines.length - 1] = `${last} ${word}`;
    else lines.push(word);
  }
  return lines;
}

export const GET: APIRoute = async ({ props }) => {
  const { title, label } = props as OgCard;
  let size = 68;
  let lines = wrap(title, 26);
  if (lines.length > 3) { size = 56; lines = wrap(title, 32); }
  const top = 360 - ((lines.length - 1) * size * 1.12) / 2;
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="g1" cx="88%" cy="10%" r="65%"><stop offset="0" stop-color="#ff7a1a" stop-opacity=".35"/><stop offset="1" stop-color="#ff7a1a" stop-opacity="0"/></radialGradient>
    <radialGradient id="g2" cx="10%" cy="100%" r="60%"><stop offset="0" stop-color="#556b2f" stop-opacity=".55"/><stop offset="1" stop-color="#556b2f" stop-opacity="0"/></radialGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff7a1a"/><stop offset="1" stop-color="#ffc93c"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#13213a"/>
  <rect width="1200" height="630" fill="url(#g1)"/><rect width="1200" height="630" fill="url(#g2)"/>
  <rect x="0" y="0" width="14" height="630" fill="url(#bar)"/>
  <rect x="72" y="64" width="112" height="84" rx="18" fill="#ffffff"/>
  <image href="data:image/png;base64,${mark}" x="82" y="72" width="92" height="68"/>
  <text x="206" y="118" font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="6" fill="#ffffff"><tspan fill="#a9c46c">AR</tspan> MEDIAS</text>
  <text x="72" y="${top - size * 0.95}" font-family="Helvetica, Arial, sans-serif" font-size="26" font-weight="700" letter-spacing="5" fill="#ffb36b">${esc(label.toUpperCase())}</text>
  ${lines.map((l, i) => `<text x="72" y="${top + i * size * 1.12}" font-family="Helvetica, Arial, sans-serif" font-size="${size}" font-weight="700" fill="#ffffff">${esc(l)}</text>`).join('')}
  <text x="72" y="572" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#ffffff" fill-opacity=".6">armedias.com · New Delhi · Serving 7 countries</text>
</svg>`;
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
