import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  base: '',
  server: {
    port: 5173,
    host: true,
  },
  resolve: {
    alias: {
      '@employees': path.resolve(__dirname, './src/features/employees'),
      '@': path.resolve(__dirname, './src'),
    },
  },
});
