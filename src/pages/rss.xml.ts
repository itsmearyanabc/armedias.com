import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../data/site';
import { getPosts } from '../lib/blog';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: `${site.name} Blog`,
    description: 'Practical guides on websites, apps, CRM, ERP and AI automation for growing businesses.',
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.published,
      link: `/blog/${p.id}/`,
    })),
  });
}
