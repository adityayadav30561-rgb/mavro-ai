import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * `vite preview` serves dist/ the way a static host does: a clean URL ('/pipeline-check') gets its prerendered
 * dist/<path>/index.html, and an unknown URL gets dist/404.html with status 404. Without this, preview answers
 * every path with the homepage. The dev server needs nothing: it serves index.html and the client renders the
 * route itself.
 */
function staticHost(): Plugin {
  return {
    name: 'mavro-static-host',
    configurePreviewServer(server) {
      const dist = path.resolve(server.config.root, server.config.build.outDir);
      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url ?? '/', 'http://localhost');
        if (url.pathname === '/' || path.extname(url.pathname)) return next();
        const page = path.join(url.pathname.replace(/\/+$/, ''), 'index.html');
        if (existsSync(path.join(dist, page))) req.url = `/${page.replace(/\\/g, '/').replace(/^\//, '')}${url.search}`;
        else {
          res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
          return res.end(readFileSync(path.join(dist, '404.html')));
        }
        next();
      });
    },
  };
}

// 5173 belongs to the ERP app (mavro-frontend); the website keeps its own port.
export default defineConfig({
  plugins: [react(), staticHost()],
  server: { port: 5180, strictPort: true },
  preview: { port: 5181, strictPort: true },
  // The main bundle carries the module catalogue and page data (~185 kB gzip); the warning threshold covers it.
  // The manifest tells scripts/prerender.mjs which chunk each page module is in, so every page preloads its own.
  build: { cssCodeSplit: false, assetsInlineLimit: 2048, chunkSizeWarningLimit: 650, manifest: true },
});
