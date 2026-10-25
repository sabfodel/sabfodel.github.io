import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkWikiLink from './src/plugins/remark-wikilink.mjs';

// Deployed as a GitHub Pages *user site* (repo: sabfodel/sabfodel.github.io),
// so the site lives at the domain root and needs no `base`.
export default defineConfig({
  site: 'https://sabfodel.github.io',
  // Yalnızca ShaderGradient arka planı için (React + three.js adası)
  integrations: [react()],
  markdown: {
    // remarkMath önce: $...$ matematik düğümlerine ayrılsın, wikilink yalnızca
    // geriye kalan düz metne baksın.
    remarkPlugins: [remarkMath, remarkWikiLink],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: 'poimandres',
      wrap: true,
    },
  },
});
