export { renderers } from '../../renderers.mjs';

function isValidRepoFormat(value) {
  if (!value) return false;
  const cleaned = value.trim().replace(/\.git$/, "");
  if (cleaned.startsWith("https://") || cleaned.startsWith("http://")) {
    try {
      const url = new URL(cleaned);
      const parts2 = url.pathname.replace(/^\/+/, "").split("/").filter(Boolean);
      return parts2.length >= 2;
    } catch {
      return false;
    }
  }
  const parts = cleaned.split("/").filter(Boolean);
  return parts.length === 2;
}
const GET = () => {
  const editorMode = process.env.SITE_MODE === "editor";
  if (!editorMode) {
    return new Response(JSON.stringify({ ok: false, reason: "not-editor-mode" }), {
      status: 404,
      headers: { "content-type": "application/json; charset=utf-8" }
    });
  }
  const rawRepo = process.env.PUBLIC_KEYSTATIC_GITHUB_REPO;
  const status = {
    ok: true,
    editorMode,
    hostingProvider: process.env.HOSTING_PROVIDER ?? "none",
    env: {
      PUBLIC_KEYSTATIC_STORAGE_KIND: process.env.PUBLIC_KEYSTATIC_STORAGE_KIND ?? null,
      PUBLIC_KEYSTATIC_GITHUB_REPO: Boolean(rawRepo),
      KEYSTATIC_GITHUB_REPO_VALID: isValidRepoFormat(rawRepo),
      KEYSTATIC_GITHUB_CLIENT_ID: Boolean(process.env.KEYSTATIC_GITHUB_CLIENT_ID),
      KEYSTATIC_GITHUB_CLIENT_SECRET: Boolean(process.env.KEYSTATIC_GITHUB_CLIENT_SECRET),
      KEYSTATIC_SECRET: Boolean(process.env.KEYSTATIC_SECRET)
    }
  };
  return new Response(JSON.stringify(status, null, 2), {
    status: 200,
    headers: { "content-type": "application/json; charset=utf-8" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
