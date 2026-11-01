// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://armedias.com',
  trailingSlash: 'always',
  // Pages are prerendered to static HTML (served by nginx); only /api/* runs on Node.
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  // nginx forwards the public host and HTTPS scheme. Trusting them for armedias.com lets
  // Astro's origin check accept form posts from https://armedias.com behind the proxy.
  security: { allowedDomains: [{ hostname: 'armedias.com', protocol: 'https' }] },
  build: { format: 'directory', inlineStylesheets: 'auto' },
  // Load a page in the background when a visitor hovers or taps its link, so the click feels instant
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [sitemap({ filter: (page) => !/\/(thank-you|lab)\//.test(page) })],
  vite: { plugins: [tailwindcss()] },
});
