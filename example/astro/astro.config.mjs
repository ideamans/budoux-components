import { defineConfig } from 'astro/config';

export default defineConfig({
  server: {
    port: 5175
  },
  vite: {
    server: {
      fs: {
        allow: [
          // Allow serving files from the project root
          '../..',
          // Allow serving files from node_modules
          '..'
        ]
      }
    }
  }
});