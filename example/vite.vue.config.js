import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [vue()],
  root: './vue',
  server: {
    port: 5174
  },
  resolve: {
    alias: {
      'budoux-components/react': resolve(__dirname, '../dist/react/react/index.js'),
      'budoux-components/vue': resolve(__dirname, '../dist/vue/vue/index.js'),
      'budoux-components/astro': resolve(__dirname, '../dist/astro')
    }
  }
});