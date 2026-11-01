// Social share images: one per page, generated at build time by src/pages/og/[slug].png.ts.
// Base.astro uses ogPathFor() so every page links the image made for it.
import { services } from '../data/services';
import { industries } from '../data/industries';
import { markets } from '../data/site';

export interface OgCard { title: string; label: string }

export const staticOgPages: Record<string, OgCard> = {
  '/': { title: 'We build the software that runs your business', label: 'AR Medias' },
  '/services/': { title: 'Web, apps, CRM/ERP and AI automation from one team', label: 'Services' },
  '/industries/': { title: 'Software built around how your industry works', label: 'Industries' },
  '/work/': { title: '200+ projects. Real results.', label: 'Our work' },
  '/pricing/': { title: 'Clear, fixed quotes. No surprise invoices.', label: 'Pricing' },
  '/process/': { title: 'A clear path from idea to launch', label: 'Our process' },
  '/about/': { title: 'The technology partner behind your growth', label: 'About' },
  '/about/aryan-yadav/': { title: 'Aryan Yadav, Founder of AR Medias', label: 'Founder' },
  '/careers/': { title: 'Build software that businesses run on', label: 'Careers' },
  '/contact/': { title: "Let's talk about your project", label: 'Contact' },
  '/blog/': { title: 'Guides for growing businesses', label: 'Blog' },
  ...Object.fromEntries(services.map((s) => [`/services/${s.slug}/`, { title: s.h1, label: s.name }])),
  ...Object.fromEntries(industries.map((i) => [`/industries/${i.slug}/`, { title: i.h1, label: i.name }])),
  ...Object.fromEntries(markets.map((m) => [`/locations/${m.slug}/`, { title: `Software, app & AI automation company for ${m.country}`, label: m.city }])),
};

/** File name for a page path: "/" -> "home", "/services/crm/" -> "services--crm". */
export const ogSlug = (path: string) => (path === '/' ? 'home' : path.replace(/^\/|\/$/g, '').replaceAll('/', '--'));

const isPost = (path: string) => /^\/blog\/(?!category\/)[^/]+\/$/.test(path);

export function ogPathFor(path: string): string | undefined {
  return staticOgPages[path] || isPost(path) ? `/og/${ogSlug(path)}.png` : undefined;
}
