import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// Deployed as a GitHub Pages *user site* (repo: sabfodel/sabfodel.github.io),
// so the site lives at the domain root and needs no `base`.
export default defineConfig({
  site: 'https://sabfodel.github.io',
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: 'poimandres',
      wrap: true,
    },
  },
});
