import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const editorMode = process.env.SITE_MODE === 'editor';

  if (!editorMode) {
    return new Response(JSON.stringify({ ok: false, reason: 'not-editor-mode' }), {
      status: 404,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  }

  const status = {
    ok: true,
    editorMode,
    hostingProvider: process.env.HOSTING_PROVIDER ?? 'none',
    env: {
      KEYSTATIC_STORAGE_KIND: process.env.KEYSTATIC_STORAGE_KIND ?? null,
      KEYSTATIC_GITHUB_REPO: Boolean(process.env.KEYSTATIC_GITHUB_REPO),
      KEYSTATIC_GITHUB_CLIENT_ID: Boolean(process.env.KEYSTATIC_GITHUB_CLIENT_ID),
      KEYSTATIC_GITHUB_CLIENT_SECRET: Boolean(process.env.KEYSTATIC_GITHUB_CLIENT_SECRET),
      KEYSTATIC_SECRET: Boolean(process.env.KEYSTATIC_SECRET),
    },
  };

  return new Response(JSON.stringify(status, null, 2), {
    status: 200,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
};

