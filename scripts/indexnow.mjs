// Tells IndexNow search engines (Bing, Yandex, Seznam, Naver and others that share the
// protocol) which pages a deploy added, changed or removed, so they recrawl just those.
// IndexNow asks sites not to resubmit unchanged pages (https://www.indexnow.org/faq), so each
// page is compared with the release this deploy replaced.
// The key file public/3e17eeb933baa7a27093542b359faf23.txt proves the site owns this key.
// deploy/deploy.sh runs it from the new release:  node scripts/indexnow.mjs <previous release folder>
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const KEY = '3e17eeb933baa7a27093542b359faf23';
const HOST = 'armedias.com';

const previous = process.argv[2];
if (!previous) {
  console.log('IndexNow: no previous release given, nothing submitted (usage: node scripts/indexnow.mjs <previous release folder>)');
  process.exit(0);
}

// Page URLs in a release's sitemaps; none when the release has no build (the first deploy)
function pages(release) {
  const dir = join(release, 'dist/client');
  if (!existsSync(dir)) return new Set();
  const sitemaps = readdirSync(dir).filter((f) => /^sitemap-\d+\.xml$/.test(f));
  return new Set(sitemaps.flatMap((f) => [...readFileSync(join(dir, f), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])));
}

// What a search engine reads on a page: the built HTML minus scripts (JSON-LD kept), styles,
// class and style attributes, scoped-style markers and hashed CSS/JS file names, which all
// change on design-only deploys. Null when the release has no such page.
function content(release, url) {
  const file = join(release, 'dist/client', decodeURIComponent(new URL(url).pathname), 'index.html');
  if (!existsSync(file)) return null;
  return readFileSync(file, 'utf8')
    .replace(/<script\b(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/g, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, '')
    .replace(/ (?:class|style)="[^"]*"/g, '')
    .replace(/ data-astro-cid-\w+(?:="[^"]*")?/g, '')
    .replace(/\/_astro\/[^"'\s)]+\.(?:css|js)\b/g, '/_astro/');
}

const before = pages(previous);
const after = pages('.');
const urlList = [
  ...[...after].filter((url) => !before.has(url) || content(previous, url) !== content('.', url)),
  ...[...before].filter((url) => !after.has(url)),
];
if (urlList.length === 0) {
  console.log('IndexNow: no pages added, changed or removed, nothing submitted');
  process.exit(0);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: submitted ${urlList.length} added, changed or removed pages -> HTTP ${res.status}`);
for (const url of urlList) console.log(`  ${url}`);
