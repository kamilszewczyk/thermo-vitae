// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import icon from "astro-icon";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from '@keystatic/astro'
import vercel from '@astrojs/vercel';

const siteMode = process.env.SITE_MODE ?? 'production';
const hostingProvider = process.env.HOSTING_PROVIDER ?? 'none';
const enableKeystatic = siteMode === 'editor';
const useVercelAdapter = enableKeystatic && hostingProvider === 'vercel';

// https://astro.build/config
export default defineConfig({
  output: enableKeystatic ? 'server' : 'static',
  adapter: useVercelAdapter ? vercel({
      includeFiles: [
        'src/content',
        'public/images'
      ],
    }) : undefined,
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    icon(),
    react(),
    markdoc(),
    ...(enableKeystatic ? [keystatic()] : []),
  ],
  security: {
    allowedDomains: [
      {
        hostname: 'thermo-vitae.vercel.app'
      }
    ]
  }
});