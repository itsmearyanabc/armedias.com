// Portfolio. Add real projects here; the Work page, homepage logo strip and service pages
// read from this list. Only list clients who agreed to be shown. For work under NDA,
// leave `client` empty and describe the business instead (e.g. "Real-estate brokerage").
//
// Images: put screenshots in src/assets/work/ and logos (SVG or PNG) in src/assets/clients/,
// then import them below. Example:
//
//   import acmeShot from '../assets/work/acme-crm.png';
//   import acmeLogo from '../assets/clients/acme.svg';
//   {
//     slug: 'acme-real-estate-crm',
//     client: 'Acme Realty',            // or '' to keep the client anonymous
//     business: 'Real-estate brokerage',
//     country: 'UAE',
//     year: 2025,
//     services: ['crm-development', 'ai-automation'],
//     title: 'A CRM that answers every property enquiry in seconds',
//     summary: 'Custom CRM with WhatsApp lead capture, agent routing and AI replies.',
//     challenge: 'Leads arrived from portals, WhatsApp and calls, and many were never followed up.',
//     solution: 'One pipeline for every lead source, automatic assignment and AI first replies.',
//     results: ['Every enquiry logged automatically', 'Replies in under a minute'],
//     tech: ['Laravel', 'React', 'WhatsApp Business API', 'OpenAI'],
//     url: 'https://example.com',
//     image: acmeShot,
//     logo: acmeLogo,
//   },
import type { ImageMetadata } from 'astro';

export interface Project {
  slug: string;
  client: string;
  business: string;
  country: string;
  year: number;
  services: string[]; // slugs from services.ts
  title: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  tech: string[];
  url?: string;
  image?: ImageMetadata;
  logo?: ImageMetadata;
}

export const projects: Project[] = [];

/** Clients shown in the rolling logo strip: named clients that supplied a logo. */
export const clientLogos = projects.filter((p) => p.client && p.logo) as (Project & { logo: ImageMetadata })[];
