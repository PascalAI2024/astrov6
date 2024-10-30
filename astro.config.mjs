import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://cosmic-ai.blog',
  integrations: [tailwind()],
  output: 'static',
  build: {
    assets: 'assets'
  },
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
            if (id.includes('components/game')) {
              return 'game';
            }
          }
        }
      }
    },
    ssr: {
      noExternal: ['@astrojs/*']
    }
  }
});