import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the built app works from any sub-path (e.g. GitHub Pages /ketocompanion/).
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    // Recharts (with its React/D3 deps) is one ~550 kB vendor chunk; that's expected for this demo.
    chunkSizeWarningLimit: 650,
    rollupOptions: {
      output: {
        manualChunks: { charts: ['recharts'] },
      },
    },
  },
});
