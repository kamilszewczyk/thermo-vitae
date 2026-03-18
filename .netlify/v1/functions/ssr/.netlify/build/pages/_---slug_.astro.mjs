import { c as createComponent, r as renderComponent, a as renderTemplate, d as createAstro } from '../chunks/astro/server_BJWMEMYF.mjs';
import 'piccolore';
import { a as renderEntry, $ as $$BaseLayout, g as getCollection } from '../chunks/BaseLayout_BfZ6Bsvd.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  const pages = await getCollection("pages");
  return pages.filter((page) => page.id !== "home").map((page) => ({
    params: { slug: page.id.replace(/\.mdoc$/, "") },
    props: { page }
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { page } = Astro2.props;
  const { Content } = await renderEntry(page);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": page.data.title }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Content", Content, {})} ` })}`;
}, "/home/kamil/projects/thermo-vitae-astro/src/pages/[...slug].astro", void 0);

const $$file = "/home/kamil/projects/thermo-vitae-astro/src/pages/[...slug].astro";
const $$url = "/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$,
	file: $$file,
	getStaticPaths,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
