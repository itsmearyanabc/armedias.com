// Builds the logo files from brand/logo-source.webp (transparent background). Run: npm run logo
//  - src/assets/logo-mark.png        header and admin logo
//  - public/favicon.ico, favicon.png browser tab and search-result icon
//  - public/apple-touch-icon.png     iPhone home screen
//  - public/icon-512.png             structured-data logo and large icon
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

// Crop first in its own pass: sharp would otherwise trim before extracting
const crop = await sharp('brand/logo-source.webp')
  .extract({ left: 330, top: 105, width: 815, height: 600 }) // the "AR" + bird symbol
  .toBuffer();
const mark = await sharp(crop).trim({ threshold: 1 }).png().toBuffer();

await sharp(mark).resize({ width: 240 }).png({ compressionLevel: 9 }).toFile('src/assets/logo-mark.png');

/** The mark centred on a white square, so it reads on light and dark backgrounds. */
const icon = async (size) => {
  const pad = Math.round(size * 0.12);
  const inner = await sharp(mark).resize(size - pad * 2, size - pad * 2, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: '#ffffff' } })
    .composite([{ input: inner, gravity: 'center' }]).png({ compressionLevel: 9 }).toBuffer();
};

writeFileSync('public/favicon.png', await icon(48));
writeFileSync('public/apple-touch-icon.png', await icon(180));
writeFileSync('public/icon-512.png', await icon(512));

// favicon.ico with 16, 32 and 48 px PNG images (crawlers often fetch /favicon.ico directly)
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map(icon));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((s, i) => {
  const e = 6 + 16 * i;
  header.writeUInt8(s, e); header.writeUInt8(s, e + 1); header.writeUInt8(0, e + 2); header.writeUInt8(0, e + 3);
  header.writeUInt16LE(1, e + 4); header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(pngs[i].length, e + 8); header.writeUInt32LE(offset, e + 12);
  offset += pngs[i].length;
});
writeFileSync('public/favicon.ico', Buffer.concat([header, ...pngs]));
console.log('wrote logo-mark.png, favicon.ico, favicon.png, apple-touch-icon.png, icon-512.png');
