// Renders public/og-default.png (1200x630), the image shown when links are shared.
// Run: node scripts/og-image.mjs
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const mark = readFileSync(new URL('../src/assets/logo-mark.png', import.meta.url)).toString('base64');
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="g" cx="85%" cy="15%" r="70%"><stop offset="0" stop-color="#a9c46c" stop-opacity=".45"/><stop offset="1" stop-color="#a9c46c" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#13213a"/>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="72" y="72" width="132" height="100" rx="20" fill="#ffffff"/>
  <image href="data:image/png;base64,${mark}" x="84" y="78" width="108" height="88"/>
  <text x="228" y="140" font-family="Helvetica, Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="6" fill="#ffffff"><tspan fill="#a9c46c">AR</tspan> MEDIAS</text>
  <text x="72" y="330" font-family="Helvetica, Arial, sans-serif" font-size="68" font-weight="700" fill="#ffffff">We build the software</text>
  <text x="72" y="410" font-family="Helvetica, Arial, sans-serif" font-size="68" font-weight="700" fill="#a9c46c">that runs your business.</text>
  <text x="72" y="520" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#ffffff" fill-opacity=".75">Websites · Mobile Apps · CRM &amp; ERP · AI Automation</text>
  <text x="72" y="566" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#ffffff" fill-opacity=".55">armedias.com · New Delhi · Serving 7 countries</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(new URL('../public/og-default.png', import.meta.url).pathname);
console.log('wrote public/og-default.png');
