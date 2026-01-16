import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: '../dist',
    // Don't empty outDir - other packages build there too
    emptyOutDir: false,
  },
});
