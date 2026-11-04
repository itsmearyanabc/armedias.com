// Plain-text version of the service, industry and market pages for AI search tools, built
// from the same data files as the pages so the two never drift apart.
import { site, markets } from '../data/site';
import { services } from '../data/services';
import { industries } from '../data/industries';
import { delhiServices, delhiAreas } from '../data/delhi';
import { delhiWorkingStyle } from '../data/working-style';
import { indiaCities } from '../data/cities';

const url = (path: string) => new URL(path, site.url).href;
const list = (items: string[]) => items.map((i) => `- ${i}`).join('\n');
const faqs = (items: { q: string; a: string }[]) => items.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n');

export function GET() {
  const a = site.address;
  const body = [
    `# ${site.name}`,
    `> ${site.name} is an IT services company founded on 1 January 2024 by ${site.founder.name} in New Delhi, India. ${site.tagline}`,
    [
      `- Website: ${site.url}/`,
      `- Address: ${a.street}, ${a.locality} ${a.postalCode}, ${a.countryName}`,
      `- Email: ${site.email}`,
      `- Phone: ${site.phone}`,
      `- GSTIN: ${site.gstin}`,
      `- Markets: ${markets.map((m) => m.country).join(', ')}`,
    ].join('\n'),
    '## Services',
    ...services.map((s) => [
      `### ${s.name}`,
      `URL: ${url(`/services/${s.slug}/`)}`,
      s.lead,
      `Who it is for:\n${list(s.forWho)}`,
      `What we deliver:\n${list(s.deliverables)}`,
      `Technology: ${s.tech.join(', ')}`,
      `Typical timeline: ${s.timeline}`,
      faqs(s.faqs),
    ].join('\n\n')),
    '## Industries',
    ...industries.map((i) => [
      `### ${i.name}`,
      `URL: ${url(`/industries/${i.slug}/`)}`,
      i.lead,
      `What we build:\n${list(i.builds.map((b) => `${b.t}: ${b.d}`))}`,
      faqs(i.faqs),
    ].join('\n\n')),
    '## Markets',
    ...markets.map((m) => [
      `### ${m.country}`,
      `URL: ${url(`/locations/${m.slug}/`)}`,
      `Serving ${m.area}. ${m.intro}`,
      `Local needs:\n${list(m.needs)}`,
      faqs([m.faq]),
    ].join('\n\n')),
    '## Delhi NCR',
    `URL: ${url('/locations/delhi/')}`,
    `Office in Kirti Nagar, New Delhi, serving ${delhiAreas.join(', ')}.`,
    `How we work with Delhi clients:\n${list(delhiWorkingStyle.map((w) => `${w.t}: ${w.d}`))}`,
    ...delhiServices.map((d) => [
      `### ${d.h1}`,
      `URL: ${url(`/locations/delhi/${d.slug}/`)}`,
      d.lead,
      `What we build:\n${list(d.builds.map((b) => `${b.t}: ${b.d}`))}`,
      faqs(d.faqs),
    ].join('\n\n')),
    '## Cities in India',
    ...indiaCities.map((c) => [
      `### ${c.h1}`,
      `URL: ${url(`/locations/india/${c.slug}/`)}`,
      `Serving ${c.area}. ${c.lead}`,
      `What businesses there ask for:\n${list(c.needs.map((n) => `${n.t}: ${n.d}`))}`,
      faqs(c.faqs),
    ].join('\n\n')),
  ].join('\n\n');

  return new Response(`${body}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
