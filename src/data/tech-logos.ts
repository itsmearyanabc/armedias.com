// Official technology logos from Simple Icons (CC0), keyed by the names in site.ts `tech`.
// AWS and OpenAI are not in Simple Icons (removed at the brands' request), so they have no
// entry here and render as a styled wordmark instead.
import {
  siAstro, siClaude, siDocker, siFigma, siFirebase, siFlutter, siKotlin, siLaravel, siMake, siMongodb,
  siN8n, siNextdotjs, siNodedotjs, siPostgresql, siPython, siReact, siShopify, siSwift, siWordpress,
} from 'simple-icons';

export interface TechLogo { path: string; hex: string }

export const techLogos: Record<string, TechLogo> = {
  React: siReact,
  'Next.js': siNextdotjs,
  Astro: siAstro,
  'Node.js': siNodedotjs,
  Laravel: siLaravel,
  Python: siPython,
  Flutter: siFlutter,
  'React Native': siReact,
  Swift: siSwift,
  Kotlin: siKotlin,
  PostgreSQL: siPostgresql,
  MongoDB: siMongodb,
  Firebase: siFirebase,
  Claude: siClaude,
  n8n: siN8n,
  Make: siMake,
  Shopify: siShopify,
  WordPress: siWordpress,
  Figma: siFigma,
  Docker: siDocker,
};

/** Stable id for a logo's <symbol> in TechSprite. */
export const techSymbolId = (name: string) => `tech-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
