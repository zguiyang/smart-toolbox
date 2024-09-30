import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '#': path.resolve(__dirname, './'),
    },
  },
  server: {
    port: 3009,
    open: false,
  },
});
