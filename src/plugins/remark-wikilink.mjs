/**
 * Obsidian tarzı wikilink desteği.
 *
 *   [[berry-phase]]              -> <a href="/notes/berry-phase/">The Berry phase — …</a>
 *   [[berry-phase|geometric]]    -> <a href="/notes/berry-phase/">geometric</a>
 *   [[berry-phase#Setup]]        -> <a href="/notes/berry-phase/#setup">…</a>
 *   ![[violin.jpg]]              -> <img src="/img/violin.jpg">
 *   ![[violin.jpg|Practice room] -> alt metniyle
 *
 * Hedef bulunamazsa metin olduğu gibi bırakılır ve derlemede uyarı basılır —
 * böylece kırık bağlantı sessizce kaybolmaz.
 */
import fs from 'node:fs';
import path from 'node:path';
import { visit } from 'unist-util-visit';

const CONTENT_DIR = path.resolve('src/content');
const IMG_DIR = path.resolve('public/img');

/** içerik klasörü -> URL öneki */
const SECTIONS = {
  notes: '/notes/',
  projects: '/projects/',
  journal: '/journal/',
  reading: '/reading/',
  practice: '/practice/',
};

const WIKILINK = /(!?)\[\[([^\][\n]+)\]\]/g;

/** Astro'nun başlık kimlikleriyle aynı biçim (github-slugger'a yakın) */
function slugifyHeading(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-');
}

function readTitle(file) {
  try {
    const head = fs.readFileSync(file, 'utf8').slice(0, 2000);
    const fm = head.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fm) return null;
    const m = fm[1].match(/^title:\s*(.+)$/m);
    if (!m) return null;
    return m[1].trim().replace(/^["']|["']$/g, '');
  } catch {
    return null;
  }
}

/** Her çağrıda taze kurulur; dev sunucuda yeni dosya anında tanınsın diye. */
function buildIndex() {
  const pages = new Map();
  for (const [dir, prefix] of Object.entries(SECTIONS)) {
    const abs = path.join(CONTENT_DIR, dir);
    if (!fs.existsSync(abs)) continue;
    for (const f of fs.readdirSync(abs)) {
      if (!f.endsWith('.md') || f.startsWith('_')) continue;
      const slug = f.slice(0, -3);
      pages.set(slug, {
        url: `${prefix}${slug}/`,
        title: readTitle(path.join(abs, f)) ?? slug,
      });
    }
  }

  const images = new Set();
  if (fs.existsSync(IMG_DIR)) {
    for (const f of fs.readdirSync(IMG_DIR)) images.add(f);
  }

  return { pages, images };
}

export default function remarkWikiLink() {
  return (tree, file) => {
    const { pages, images } = buildIndex();
    const where = file?.history?.[0] ? path.basename(file.history[0]) : 'markdown';

    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index === null || !node.value.includes('[[')) return;

      const out = [];
      let cursor = 0;
      let match;
      WIKILINK.lastIndex = 0;

      while ((match = WIKILINK.exec(node.value)) !== null) {
        const [full, bang, inner] = match;

        if (match.index > cursor) {
          out.push({ type: 'text', value: node.value.slice(cursor, match.index) });
        }
        cursor = match.index + full.length;

        const [rawTarget, rawLabel] = inner.split('|').map((s) => s.trim());

        if (bang === '!') {
          // ![[dosya.png]] — görsel gömme
          if (images.has(rawTarget)) {
            out.push({
              type: 'image',
              url: `/img/${rawTarget}`,
              alt: rawLabel ?? '',
              title: null,
            });
          } else {
            console.warn(`[wikilink] ${where}: public/img/${rawTarget} bulunamadı`);
            out.push({ type: 'text', value: full });
          }
          continue;
        }

        const [slug, heading] = rawTarget.split('#').map((s) => s.trim());
        const entry = pages.get(slug);

        if (!entry) {
          console.warn(`[wikilink] ${where}: "${slug}" adında bir sayfa yok`);
          out.push({ type: 'text', value: full });
          continue;
        }

        const url = heading ? `${entry.url}#${slugifyHeading(heading)}` : entry.url;
        out.push({
          type: 'link',
          url,
          title: null,
          children: [{ type: 'text', value: rawLabel ?? entry.title }],
        });
      }

      if (out.length === 0) return;
      if (cursor < node.value.length) {
        out.push({ type: 'text', value: node.value.slice(cursor) });
      }

      parent.children.splice(index, 1, ...out);
      return index + out.length;
    });
  };
}
