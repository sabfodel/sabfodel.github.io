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

/** Books, with a review attached. */
const reading = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reading' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    year: z.number().optional(),
    status: z.enum(['reading', 'done', 'abandoned', 'planned']).default('reading'),
    rating: z.number().min(0).max(5).optional(),
    started: z.coerce.date().optional(),
    finished: z.coerce.date().optional(),
    /** Path under public/, e.g. /img/covers/foo.jpg */
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
    summary: z.string().optional(),
  }),
});

/** Things I'm learning that aren't physics — violin, and whatever comes next. */
const practice = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/practice' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    /** Groups entries on the index page, e.g. "violin" */
    discipline: z.string().default('misc'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
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

/** Standalone markdown pages (currently just /uses/). */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    updated: z.coerce.date().optional(),
    summary: z.string().optional(),
  }),
});

export const collections = { notes, projects, reading, practice, journal, pages };
