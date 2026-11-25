// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://zelux.co.uk',
  output: 'static',
  trailingSlash: 'never',
  // Inline the (small) stylesheet so first paint needs no extra round trip.
  build: { format: 'file', inlineStylesheets: 'always' },
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
