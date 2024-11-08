import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext', // You can set this to target specific browsers
  },
  optimizeDeps: {
    include: ['tesseract.js'], // Specify which dependencies to pre-bundle
  }
});