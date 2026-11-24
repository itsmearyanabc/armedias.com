// Social share images: one per page, generated at build time by src/pages/og/[slug].png.ts.
// Base.astro uses ogPathFor() so every page links the image made for it; pages without
// their own card use the homepage card.
import { services } from '../data/services';
import { industries } from '../data/industries';
import { markets, site } from '../data/site';
import { projects } from '../data/projects';
import { costGuides } from '../data/cost-guides';
import { worldCities } from '../data/world-cities';
import { dubaiServices } from '../data/dubai';

export interface OgCard { title: string; label: string }

export const staticOgPages: Record<string, OgCard> = {
  '/': { title: 'We build the software that runs your business', label: 'Software company · New Delhi' },
  '/services/': { title: 'Web, apps, CRM/ERP and AI automation from one team', label: 'Services' },
  '/industries/': { title: 'Software built around how your industry works', label: 'Industries' },
  '/work/': { title: `${site.projectsDelivered}+ projects. Real results.`, label: 'Our work' },
  '/pricing/': { title: 'Clear, fixed quotes. No surprise invoices.', label: 'Pricing' },
  '/process/': { title: 'A clear path from idea to launch', label: 'Our process' },
  '/about/': { title: 'The technology partner behind your growth', label: 'About' },
  '/about/aryan-yadav/': { title: 'Aryan Yadav, Founder of AR Medias', label: 'Founder' },
  '/careers/': { title: 'Build software that businesses run on', label: 'Careers' },
  '/contact/': { title: "Let's talk about your project", label: 'Contact' },
  '/blog/': { title: 'Guides for growing businesses', label: 'Blog' },
  ...Object.fromEntries(services.map((s) => [`/services/${s.slug}/`, { title: s.headline, label: s.name }])),
  ...Object.fromEntries(industries.map((i) => [`/industries/${i.slug}/`, { title: i.headline, label: i.name }])),
  ...Object.fromEntries(markets.map((m) => [`/locations/${m.slug}/`, { title: `Software, app & AI automation company for ${m.country}`, label: m.city }])),
  ...Object.fromEntries(projects.map((p) => [`/work/${p.slug}/`, { title: p.title, label: p.client ? `Case study · ${p.client}` : 'Case study' }])),
  ...Object.fromEntries(costGuides.map((g) => [`/pricing/${g.slug}/`, { title: `${g.h1} ${g.h1Accent}`, label: 'Cost guide 2026' }])),
  ...Object.fromEntries(worldCities.map((c) => [`/locations/${c.market}/${c.slug}/`, { title: c.h1, label: c.name }])),
  ...Object.fromEntries(dubaiServices.map((d) => [`/locations/uae/dubai/${d.slug}/`, { title: d.h1, label: 'Dubai' }])),
};

/** File name for a page path: "/" -> "home", "/services/crm/" -> "services--crm". */
export const ogSlug = (path: string) => (path === '/' ? 'home' : path.replace(/^\/|\/$/g, '').replaceAll('/', '--'));

const isPost = (path: string) => /^\/blog\/(?!category\/)[^/]+\/$/.test(path);

/** The share image for a page path; the homepage card when the page has none of its own. */
export function ogPathFor(path: string): string {
  return staticOgPages[path] || isPost(path) ? `/og/${ogSlug(path)}.png` : '/og/home.png';
}
