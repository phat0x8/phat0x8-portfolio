import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const casebooks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/casebooks' }),
  schema: z.object({
    title: z.string(),
    titleVi: z.string(),
    summary: z.string(),
    summaryVi: z.string(),
    category: z.enum(['DFIR Lab', 'SysAdmin RCA', 'AppSec', 'Automation & SOP']),
    date: z.string(),
    readTime: z.string(),
    status: z.string().default('Sanitized & Verified'),
    tags: z.array(z.string()),
    repoUrl: z.string().url().optional(),
    impact: z.string(),
    impactVi: z.string(),
    order: z.number().default(10),
  }),
});

export const collections = { casebooks };
