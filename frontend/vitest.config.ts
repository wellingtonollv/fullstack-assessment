import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/shared/tests/setupTests.ts',
    alias: {
      '@employees': path.resolve(__dirname, './src/features/employees'),
      '@': path.resolve(__dirname, './src'),
    },
  },
});
