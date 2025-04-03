import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import inject from 'vite-plugin-inject'; // Temporarily remove this plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // inject({
    //   process: 'process/browser',
    // }),
    react(),
  ],
  server: {
    port: 5125,
    host: true,
    allowedHosts: ['lending.retry.host']
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});