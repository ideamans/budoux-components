import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react()],
  root: './react',
  server: {
    port: 5173
  },
  resolve: {
    alias: {
      'budoux-components/react': resolve(__dirname, '../dist/react/react/index.js'),
      'budoux-components/vue': resolve(__dirname, '../dist/vue/vue/index.js'),
      'budoux-components/astro': resolve(__dirname, '../dist/astro')
    }
  }
});