const FMT = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

export function formatDate(date: Date | undefined): string {
  if (!date) return '';
  return FMT.format(date);
}

export function isoDate(date: Date | undefined): string {
  if (!date) return '';
  return date.toISOString().slice(0, 10);
}

/** Newest first */
export function byDateDesc<T extends { data: { date: Date } }>(a: T, b: T): number {
  return b.data.date.valueOf() - a.data.date.valueOf();
}

export const STATUS: Record<string, string> = {
  active: 'active',
  paused: 'paused',
  done: 'finished',
  idea: 'idea',
  reading: 'reading',
  abandoned: 'abandoned',
  planned: 'up next',
};

/** 4 -> "★★★★" + "☆" */
export function starParts(rating: number | undefined): { on: string; off: string } {
  if (rating === undefined) return { on: '', off: '' };
  const full = Math.round(rating);
  return { on: '★'.repeat(full), off: '☆'.repeat(Math.max(0, 5 - full)) };
}

/** The card already shows a language badge — don't repeat it as a tag. */
export function tagsWithoutLang(tags: string[], lang?: string): string[] {
  if (!lang) return tags;
  const l = lang.toLowerCase();
  return tags.filter((t) => t.toLowerCase() !== l);
}
