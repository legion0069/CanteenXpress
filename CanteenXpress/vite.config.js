import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Change from 'dist' to 'public' for Vercel
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: true, // Allows access from any network
    port: process.env.PORT || 3000, // Uses environment variable or defaults to 3000
    strictPort: true, // Ensures it fails if the port is unavailable
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});
