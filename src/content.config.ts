import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Study notes — the main body of the site. */
const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    tags: z.array(z.string()).default([]),
    /** Groups the note on the index page, e.g. "condensed matter" */
    field: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

/** Things I build. */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    repo: z.string().optional(),
    lang: z.string().optional(),
    status: z.enum(['active', 'paused', 'done', 'idea']).default('active'),
    tags: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

/** Free-form writing. */
const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    tags: z.array(z.string()).default([]),
    mood: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { notes, projects, journal };
