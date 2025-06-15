import { defineConfig } from 'astro/config';

export default defineConfig({
  server: {
    port: 5175
  },
  vite: {
    server: {
      fs: {
        allow: [
          // Allow access to parent directories for dist files
          '../..'
        ]
      }
    }
  }
});