import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const galeriaDir = fileURLToPath(new URL('public/images/galeria', import.meta.url));

function galeriaManifest(): Plugin {
  const virtualId = 'virtual:galeria-manifest';
  const resolvedVirtualId = '\0' + virtualId;

  function listImages(): string[] {
    try {
      return readdirSync(galeriaDir)
        .filter((f) => /\.(jpe?g|png|gif|webp|avif|bmp|JPE?G|PNG|GIF|WEBP|AVIF|BMP)$/i.test(f))
        .sort((a, b) => a.localeCompare(b))
        .map((f) => `/images/galeria/${f}`);
    } catch {
      return [];
    }
  }

  return {
    name: 'galeria-manifest',
    resolveId(id) {
      if (id === virtualId) return resolvedVirtualId;
    },
    load(id) {
      if (id !== resolvedVirtualId) return;
      const images = listImages();
      return `export const galleryImages = ${JSON.stringify(images)};`;
    },
    configureServer(server) {
      server.watcher.add(galeriaDir);
      server.watcher.on('change', (path) => {
        if (path.startsWith(galeriaDir)) {
          server.ws.send({ type: 'full-reload' });
        }
      });
      server.watcher.on('add', (path) => {
        if (path.startsWith(galeriaDir)) {
          server.ws.send({ type: 'full-reload' });
        }
      });
      server.watcher.on('unlink', (path) => {
        if (path.startsWith(galeriaDir)) {
          server.ws.send({ type: 'full-reload' });
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), galeriaManifest()],
  server: {
    allowedHosts: ['.trycloudflare.com'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    include: ['lucide-react'],
  },
});
