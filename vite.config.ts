import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 5173 belongs to the ERP app (mavro-frontend); the website keeps its own port.
export default defineConfig({
  plugins: [react()],
  server: { port: 5180, strictPort: true },
  preview: { port: 5181, strictPort: true },
  // The three.js hero scene is one lazy chunk (~150 kB gzip) loaded after the page is idle; it is never on the
  // critical path, so the warning threshold is raised to cover it rather than splitting it further.
  build: { cssCodeSplit: false, assetsInlineLimit: 2048, chunkSizeWarningLimit: 650 },
});
