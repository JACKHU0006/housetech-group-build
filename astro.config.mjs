import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://housetech-ch.com',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
