// Text for the share images, drawn as vector outlines instead of <text>. The images are
// rendered with sharp on the server, which has no fonts installed: <text> there came out as
// empty boxes. Outlining with the site's own font files makes the result identical anywhere.
//
// Fonts are static Fontsource files (SIL Open Font License) in src/assets/fonts/. They cover
// Latin only; a character they lack is skipped rather than drawn as a box.
import { create, type Font } from 'fontkitten';
// `?inline` makes the bundler embed each file as a data URL, so no path has to be resolved
// at build time (the server may start from another folder)
import displayData from '../assets/fonts/space-grotesk-latin-700-normal.woff2?inline';
import bodyData from '../assets/fonts/inter-latin-500-normal.woff2?inline';
import bodyBoldData from '../assets/fonts/inter-latin-700-normal.woff2?inline';

/** Decodes a `?inline` data URL into its bytes. */
export const dataUrlBytes = (url: string) => Buffer.from(url.slice(url.indexOf(',') + 1), 'base64');

const load = (url: string) => create(dataUrlBytes(url)) as Font;

export const fonts = {
  display: load(displayData),
  body: load(bodyData),
  bodyBold: load(bodyBoldData),
};

const glyphs = (font: Font, text: string) => font.glyphsForString(text).filter((g) => g.id !== 0);

/** Width in pixels of `text` at `size`, with `tracking` extra pixels after each character. */
export function measure(font: Font, text: string, size: number, tracking = 0): number {
  const s = size / font.unitsPerEm;
  return glyphs(font, text).reduce((w, g) => w + g.advanceWidth * s + tracking, 0) - (text ? tracking : 0);
}

/** SVG paths for `text` with its baseline starting at (x, y). */
export function textPaths(font: Font, text: string, x: number, y: number, size: number, fill: string, tracking = 0, opacity = 1): string {
  const s = size / font.unitsPerEm;
  let pen = x;
  const parts: string[] = [];
  for (const g of glyphs(font, text)) {
    const d = g.path.toSVG();
    if (d) parts.push(`<path transform="translate(${pen.toFixed(2)} ${y}) scale(${s.toFixed(5)} ${(-s).toFixed(5)})" d="${d}"/>`);
    pen += g.advanceWidth * s + tracking;
  }
  return `<g fill="${fill}"${opacity < 1 ? ` fill-opacity="${opacity}"` : ''}>${parts.join('')}</g>`;
}

/** Splits `text` into lines no wider than `maxWidth` pixels. */
export function wrap(font: Font, text: string, size: number, maxWidth: number): string[] {
  const lines: string[] = [];
  for (const word of text.split(/\s+/)) {
    const last = lines.at(-1);
    if (last && measure(font, `${last} ${word}`, size) <= maxWidth) lines[lines.length - 1] = `${last} ${word}`;
    else lines.push(word);
  }
  return lines;
}
