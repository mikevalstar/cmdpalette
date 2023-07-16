import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://cmdpalette.dev',
  integrations: [solid(), react()],
  markdown: {
    syntaxHighlight: 'prism',
  },
});
