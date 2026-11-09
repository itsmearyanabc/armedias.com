import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const categories = {
  crm: 'CRM',
  erp: 'ERP',
  'ai-automation': 'AI & Automation',
  'web-apps': 'Web & Apps',
} as const;

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().max(170),
    category: z.enum(Object.keys(categories) as [keyof typeof categories, ...(keyof typeof categories)[]]),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    // Service page this article supports; drives the in-article call to action
    service: z.string(),
    draft: z.boolean().default(false),
    // Short answers drawn from the article, shown at its end and marked up as FAQPage
    faqs: z.array(z.object({ q: z.string().max(120), a: z.string().max(400) })).default([]),
  }),
});

export const collections = { blog };
