// Tells IndexNow search engines (Bing, Yandex, Seznam, Naver and others that share the
// protocol) that every page in the sitemap changed, so they recrawl soon after a deploy.
// The key file public/3e17eeb933baa7a27093542b359faf23.txt proves the site owns this key. Run: node scripts/indexnow.mjs
import { readFileSync } from 'node:fs';

const KEY = '3e17eeb933baa7a27093542b359faf23';
const HOST = 'armedias.com';
const urls = [...readFileSync('dist/client/sitemap-0.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: submitted ${urls.length} URLs -> HTTP ${res.status}`);
