import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.housetech-ch.com',
  build: {
    inlineStylesheets: 'auto',
    assetsInlineLimit: 4096,
  },
  vite: {
    build: {
      cssMinify: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    optimizeDeps: {
      include: ['astro'],
    },
  },
  compressHTML: true,
  server: {
    compress: true,
  },
});
