// Companies AR Medias has worked with, shown in the rolling belt above "Industries" on the
// homepage. Only list clients who agreed to be shown. A logo is optional: without one the
// name is shown as a clean wordmark.
//
// Logos (SVG or PNG, ideally transparent) go in src/assets/clients/, then:
//   import acme from '../assets/clients/acme.svg';
//   { name: 'Acme Realty', logo: acme, url: 'https://acme.example' },
import type { ImageMetadata } from 'astro';

export interface Client { name: string; logo?: ImageMetadata; url?: string }

export const clients: Client[] = [];
