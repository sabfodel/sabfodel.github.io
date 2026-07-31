import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE } from '../site';

export async function GET(context: APIContext) {
  const notes = await getCollection('notes', (n) => !n.data.draft);
  const journal = await getCollection('journal', (p) => !p.data.draft);

  const items = [
    ...notes.map((n) => ({
      title: n.data.title,
      pubDate: n.data.date,
      description: n.data.summary ?? '',
      link: `/notes/${n.id}/`,
      categories: n.data.tags,
    })),
    ...journal.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.summary ?? '',
      link: `/journal/${p.id}/`,
      categories: p.data.tags,
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site!,
    items,
    customData: `<language>en</language>`,
  });
}
