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
const useGithubStorage = process.env.KEYSTATIC_STORAGE_KIND === 'github';

if (enableKeystatic && useGithubStorage) {
  const requiredEditorEnv = [
    'KEYSTATIC_GITHUB_REPO',
    'KEYSTATIC_GITHUB_CLIENT_ID',
    'KEYSTATIC_GITHUB_CLIENT_SECRET',
    'KEYSTATIC_SECRET',
  ];

  const missingEnv = requiredEditorEnv.filter((name) => !process.env[name]);

  if (missingEnv.length > 0) {
    throw new Error(
      `Missing required Keystatic GitHub env vars in editor mode: ${missingEnv.join(', ')}`
    );
  }
}

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