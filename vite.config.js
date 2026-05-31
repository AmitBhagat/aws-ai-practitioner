import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Using relative base paths makes this compatible with any custom domain or subpath on GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});
