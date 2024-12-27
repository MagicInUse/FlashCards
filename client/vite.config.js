import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: './dist',
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'localhost:3001/',
        changeOrigin: true,
        secure: true,
      },
      '/auth': {
        target: 'localhost:3001/',
        changeOrigin: true,
        secure: true
      },
      '/graphql': {
        target: 'localhost:3001/',
        changeOrigin: true,
        secure: true
      },
    },
  },
});