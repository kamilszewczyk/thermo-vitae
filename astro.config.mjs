// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import icon from "astro-icon";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from '@keystatic/astro'
import netlify from '@astrojs/netlify';

const siteMode = process.env.SITE_MODE ?? 'production';
const hostingProvider = process.env.HOSTING_PROVIDER ?? 'none';
const enableKeystatic = siteMode === 'editor';
const useNetlifyAdapter = enableKeystatic && hostingProvider === 'netlify';

// https://astro.build/config
export default defineConfig({
  output: enableKeystatic ? 'server' : 'static',
  adapter: useNetlifyAdapter ? netlify() : undefined,
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    icon(),
    react(),
    markdoc(),
    ...(enableKeystatic ? [keystatic()] : []),
  ],
});