# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

# Thermo Vitae Astro

## Icons
We use `astro-icon` for icons with Iconify sets (e.g., Lucide, Tabler).

### Install
Already installed in this project. If reinstalling:

```bash
npm install astro-icon
```

### Usage
Import the default Icon component in `.astro` files:

```astro
---
import Icon from 'astro-icon';
---
<div>
  <Icon name="lucide:leaf" width="24" height="24" aria-hidden="true" />
</div>
```

- Use `name` with an Iconify identifier (e.g., `lucide:leaf`, `tabler:chart-bar`).
- Prefer explicit `width` and `height` for consistent sizing. You can also use Tailwind classes:

```astro
<Icon name="lucide:menu" class="w-6 h-6" />
```

### Accessibility
- Decorative icons should include `aria-hidden="true"`.
- If conveying meaning, add `aria-label` or wrap with an accessible text description.

### Consistency
- Preferred set: `lucide:*` for a clean, consistent look.
- Keep styling via token-based classes from `src/styles/global.css` (e.g., `text-text-body`, `text-brand-forest-green`).

### Examples in project
- Header uses `lucide:phone`, `lucide:menu`.
- Features uses `lucide:leaf`, `lucide:coins`, `lucide:settings`, `lucide:award`.
- Process uses `lucide:message-circle`, `lucide:ruler`, `lucide:wrench`, `lucide:headphones`.

### Troubleshooting
- If an icon fails to render, verify the name identifier exists on Iconify and matches the chosen set.
- Type errors about props usually mean using the wrong prop name; prefer `name` or `class` for sizing. Some versions may support size props differently.

## Deployment: Editor on Netlify, Public on PHP

Recommended choice for this repo: **Netlify** for editor hosting.

Why this is a good fit for your goal (editor only + free tier):

- Netlify handles Astro server output well via `@astrojs/netlify`.
- You can keep public production fully outside Netlify by deploying only `dist/` to your PHP server.
- This repo now supports an editor-only mode with optional Basic Auth gate.

### Environment split

- `editor` environment (Netlify): `SITE_MODE=editor`, Keystatic enabled.
- `production` environment (your PHP server): `SITE_MODE=production`, static build only.

### Scripts

```bash
npm run dev:editor
npm run build:editor
npm run build:prod
```

### Netlify editor project setup

Build settings are drafted in `netlify.toml`:

- build command: `npm run build:editor`
- publish directory: `dist`
- sets `SITE_MODE=editor` and `HOSTING_PROVIDER=netlify`
- sends `X-Robots-Tag: noindex, nofollow`

Set these environment variables in Netlify UI:

- `KEYSTATIC_STORAGE_KIND=github`
- `KEYSTATIC_GITHUB_REPO=<owner/repo>`
- `KEYSTATIC_GITHUB_CLIENT_ID=<github-oauth-client-id>`
- `KEYSTATIC_GITHUB_CLIENT_SECRET=<github-oauth-client-secret>`
- `KEYSTATIC_SECRET=<long-random-secret>`
- `EDITOR_BASIC_AUTH_USER=<username>` (optional but recommended)
- `EDITOR_BASIC_AUTH_PASSWORD=<strong-password>` (optional but recommended)

### PHP production deploy

Build static files locally or in CI and upload only `dist/` to your PHP server:

```bash
npm run build:prod
```

### Notes on Vercel vs Netlify for this use-case

- Both can host the editor.
- For this repository draft, Netlify is already wired and tends to be straightforward for editor-only SSR + static/public split.
- If you want, Vercel can be added in a follow-up pass with an env-switched adapter path.

### GitHub Actions

Two CI workflows are included:

- `Editor CI` (`.github/workflows/editor-ci.yml`)
  - Runs `astro check` in editor mode
  - Runs `build:editor` (Netlify adapter path)
  - Uses `KEYSTATIC_STORAGE_KIND=github`
  - Reads `KEYSTATIC_GITHUB_REPO` from repository variable `vars.KEYSTATIC_GITHUB_REPO`
  - Uploads `dist` as `editor-dist` artifact
- `Production Static CI` (`.github/workflows/production-static-ci.yml`)
  - Runs `astro check` in production mode
  - Runs `build:prod` (static output for PHP server)
  - Uploads `dist` as `production-dist` artifact

Both workflows run on pull requests, pushes to `main`, and manual dispatch.

### Finish setup checklist (Netlify editor)

1. Create a dedicated Netlify site for editor access
   - Connect it to this GitHub repository.
   - Keep this site unpublished in navigation/indexing terms (already set with `X-Robots-Tag` in `netlify.toml`).

2. Configure Netlify environment variables (Site settings -> Environment variables)
   - `SITE_MODE=editor`
   - `HOSTING_PROVIDER=netlify`
   - `KEYSTATIC_STORAGE_KIND=github`
   - `KEYSTATIC_GITHUB_REPO=<owner/repo>`
   - `KEYSTATIC_GITHUB_CLIENT_ID=<github-oauth-client-id>`
   - `KEYSTATIC_GITHUB_CLIENT_SECRET=<github-oauth-client-secret>`
   - `KEYSTATIC_SECRET=<long-random-secret>`
   - `EDITOR_BASIC_AUTH_USER=<editor-user>`
   - `EDITOR_BASIC_AUTH_PASSWORD=<strong-password>`

3. Confirm build settings
   - Build command: `npm run build:editor`
   - Publish directory: `dist`
   - These are already declared in `netlify.toml`.

4. Trigger first deploy and validate editor routes
   - Open deployed site and confirm HTTP Basic Auth prompt appears.
   - Open `/keystatic` and confirm editor UI loads.

5. Validate Git-backed editing flow
   - Make a small content change in Keystatic.
   - Confirm commit/PR appears in the configured GitHub repository.
   - Merge the change to your production branch.

6. Run production build and deploy to PHP server
   - Use static output only (`npm run build:prod`).
   - Upload/sync `dist/` to your PHP host.

7. Configure GitHub Actions repository variable
   - Add `KEYSTATIC_GITHUB_REPO` under GitHub Actions Variables.
   - This is used by `.github/workflows/editor-ci.yml`.

### Quick verification commands

```bash
npm run astro -- check
npm run build:editor
npm run build:prod
```

### Troubleshooting: "Unable to load collection" with JSON parse error

If Keystatic shows `Unable to load collection` and `JSON.parse: unexpected end of data`, the API route usually returned an empty/failed response.

Most common fix for Netlify editor deployments:

- ensure all GitHub storage env vars are set: `KEYSTATIC_GITHUB_REPO`, `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`
- redeploy after updating env vars (Netlify does not always apply them to old deploys)
- open Netlify Function logs for `/api/keystatic/*` and confirm no auth/config errors
- verify the GitHub OAuth app callback URL points to your editor domain
  - `https://<your-editor-domain>/api/keystatic/github/oauth/callback`
