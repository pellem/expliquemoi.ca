import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: true,  // assure que les styles de base Tailwind s'appliquent
    }),
  ],
});
