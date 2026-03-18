import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_BJWMEMYF.mjs';
import 'piccolore';
import { g as getCollection, r as resolveImage, $ as $$BaseLayout } from '../chunks/BaseLayout_BfZ6Bsvd.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_CrOe6wqg.mjs';
export { renderers } from '../renderers.mjs';

const $$Realizacje = createComponent(async ($$result, $$props, $$slots) => {
  const realizacje = await getCollection("realizacje");
  const fallbackImage = "/hero-placeholder.svg";
  const sorted = await Promise.all(
    [...realizacje].sort((a, b) => a.data.title.localeCompare(b.data.title, "pl")).map(async (item) => ({
      ...item,
      displayImage: item.data.image ?? fallbackImage,
      imageMeta: await resolveImage(item.data.image)
    }))
  );
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Realizacje | Thermo Vitae" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="py-16 lg:py-24 bg-background-gray" id="realizacje"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-16"> <p class="uppercase tracking-wider text-sm text-text-inactive mb-4">
NASZE REALIZACJE
</p> <h1 class="text-3xl lg:text-4xl font-bold mb-4 text-text-primary">
Wszystkie realizacje
</h1> <p class="text-lg text-text-body max-w-2xl mx-auto">
Lista wszystkich projektow Thermo Vitae.
</p> </div> <div class="grid md:grid-cols-2 gap-6"> ${sorted.map((item) => renderTemplate`<a${addAttribute(`/realizacje/${item.data.slug}`, "href")} class="group relative bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"> <div class="relative h-80 overflow-hidden"> ${item.imageMeta ? renderTemplate`${renderComponent($$result2, "Image", $$Image, { "src": item.imageMeta, "alt": item.data.title, "class": "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500", "widths": [640, 960, 1080], "sizes": "(min-width: 768px) 50vw, 100vw", "loading": "lazy" })}` : renderTemplate`<img${addAttribute(item.displayImage, "src")}${addAttribute(item.data.title, "alt")} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async">`} </div> <div class="p-6"> <h2 class="text-xl font-bold mb-2 text-text-primary">${item.data.title}</h2> <p class="text-text-inactive text-sm mb-2">${item.data.location}</p> <p class="text-text-body">${item.data.short_description}</p> </div> <div class="absolute top-4 right-4 bg-card px-3 py-1 rounded-full shadow-lg"> <span class="text-xs font-semibold text-brand-forest-green">${item.data.status}</span> </div> </a>`)} </div> </div> </section> ` })}`;
}, "/home/kamil/projects/thermo-vitae-astro/src/pages/realizacje.astro", void 0);

const $$file = "/home/kamil/projects/thermo-vitae-astro/src/pages/realizacje.astro";
const $$url = "/realizacje";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Realizacje,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
