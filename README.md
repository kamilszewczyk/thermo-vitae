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
