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
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [sitemap({ filter: (page) => !page.includes('/thank-you/') })],
  vite: { plugins: [tailwindcss()] },
});
