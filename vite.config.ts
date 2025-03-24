import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 81
    allowedHosts: ['lending.retry.host']
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
