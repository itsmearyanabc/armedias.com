// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';
import { readdirSync, readFileSync } from 'node:fs';

// Real last-modified dates for blog posts (from their frontmatter) so the sitemap only
// claims a change date where one is known.
// Resolved from this file, so builds work from any working directory
const blogDir = new URL('./src/content/blog/', import.meta.url);
const postDates = Object.fromEntries(
  readdirSync(blogDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const fm = readFileSync(new URL(f, blogDir), 'utf8');
      const date = fm.match(/^updated:\s*(\S+)/m)?.[1] ?? fm.match(/^published:\s*(\S+)/m)?.[1];
      return [`/blog/${f.replace(/\.md$/, '')}/`, date];
    }),
);

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
  integrations: [sitemap({
      filter: (page) => !/\/(thank-you|lab|admin)\//.test(page),
      serialize: (item) => {
        const date = postDates[new URL(item.url).pathname];
        return date ? { ...item, lastmod: new Date(date).toISOString() } : item;
      },
    })],
  vite: { plugins: [tailwindcss()] },
});
