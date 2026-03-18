import { c as createContentComponent, a as createGetHeadings, m as markdocConfig, b as assetsConfig, $ as $$Renderer } from './runtime-assets-config_BuI2t9-9.mjs';
import { c as createComponent, m as maybeRenderHead, b as addAttribute, a as renderTemplate, d as createAstro } from './astro/server_BJWMEMYF.mjs';
import 'piccolore';
import 'clsx';

const $$Astro = createAstro();
const $$Callout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Callout;
  const { title = "", description = "", color = "red" } = Astro2.props;
  const variants = {
    red: {
      bar: "bg-brand-thermo-red",
      title: "text-brand-thermo-red"
    },
    "dark-green": {
      bar: "bg-brand-forest-green",
      title: "text-brand-forest-green"
    },
    "light-green": {
      bar: "bg-brand-natural-green",
      title: "text-brand-natural-green"
    }
  };
  const variant = variants[color] ?? variants.red;
  return renderTemplate`${maybeRenderHead()}<div class="flex gap-4 p-5 rounded-xl bg-background-gray border border-gray-100 my-4"> <div${addAttribute(["w-1 rounded-full flex-shrink-0", variant.bar], "class:list")}></div> <div> ${title && renderTemplate`<p${addAttribute(["text-sm font-semibold mb-1", variant.title], "class:list")}>${title}</p>`} ${description && renderTemplate`<p class="text-text-body leading-relaxed text-sm">${description}</p>`} </div> </div>`;
}, "/home/kamil/projects/thermo-vitae-astro/src/components/Callout.astro", void 0);

markdocConfig.nodes = { ...assetsConfig.nodes, ...markdocConfig.nodes };


const experimentalHeadingIdCompat = false;

const tagComponentMap = {"Callout": $$Callout,
};
const nodeComponentMap = {};

const options = undefined;

const stringifiedAst = "{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[],\"inline\":false,\"attributes\":{},\"children\":[{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[11,12],\"inline\":false,\"attributes\":{},\"children\":[{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[11,12],\"inline\":false,\"attributes\":{},\"children\":[{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[11,12],\"inline\":true,\"attributes\":{\"content\":\"Kompleksowa realizacja obejmowala dobor urzadzenia, projekt instalacji oraz pelny montaz z uruchomieniem systemu.\"},\"children\":[],\"type\":\"text\",\"annotations\":[],\"slots\":{},\"location\":{\"start\":{\"line\":11},\"end\":{\"line\":12}}}],\"type\":\"inline\",\"annotations\":[],\"slots\":{},\"location\":{\"start\":{\"line\":11},\"end\":{\"line\":12}}}],\"type\":\"paragraph\",\"annotations\":[],\"slots\":{},\"location\":{\"start\":{\"line\":11},\"end\":{\"line\":12}}},{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[13,14],\"inline\":false,\"attributes\":{},\"children\":[{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[13,14],\"inline\":false,\"attributes\":{},\"children\":[{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[13,14],\"inline\":true,\"attributes\":{\"content\":\"Inwestycja zostala zakonczona zgodnie z harmonogramem.\"},\"children\":[],\"type\":\"text\",\"annotations\":[],\"slots\":{},\"location\":{\"start\":{\"line\":13},\"end\":{\"line\":14}}}],\"type\":\"inline\",\"annotations\":[],\"slots\":{},\"location\":{\"start\":{\"line\":13},\"end\":{\"line\":14}}}],\"type\":\"paragraph\",\"annotations\":[],\"slots\":{},\"location\":{\"start\":{\"line\":13},\"end\":{\"line\":14}}},{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[15,19],\"inline\":false,\"attributes\":{\"title\":\"Wyzwanie\",\"description\":\"Ograniczona przestrzen techniczna i wymog zachowania wysokiej efektywnosci przy duzych przeszkleniach budynku.\",\"color\":\"red\"},\"children\":[],\"type\":\"tag\",\"tag\":\"Callout\",\"annotations\":[{\"type\":\"attribute\",\"name\":\"title\",\"value\":\"Wyzwanie\"},{\"type\":\"attribute\",\"name\":\"description\",\"value\":\"Ograniczona przestrzen techniczna i wymog zachowania wysokiej efektywnosci przy duzych przeszkleniach budynku.\"},{\"type\":\"attribute\",\"name\":\"color\",\"value\":\"red\"}],\"slots\":{},\"location\":{\"start\":{\"line\":15},\"end\":{\"line\":19}}},{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[20,24],\"inline\":false,\"attributes\":{\"title\":\"Rozwiazanie\",\"description\":\"Zastosowalismy kompaktowa pompe ciepla powietrze-woda wraz z buforem i inteligentnym sterowaniem strefowym.\",\"color\":\"dark-green\"},\"children\":[],\"type\":\"tag\",\"tag\":\"Callout\",\"annotations\":[{\"type\":\"attribute\",\"name\":\"title\",\"value\":\"Rozwiazanie\"},{\"type\":\"attribute\",\"name\":\"description\",\"value\":\"Zastosowalismy kompaktowa pompe ciepla powietrze-woda wraz z buforem i inteligentnym sterowaniem strefowym.\"},{\"type\":\"attribute\",\"name\":\"color\",\"value\":\"dark-green\"}],\"slots\":{},\"location\":{\"start\":{\"line\":20},\"end\":{\"line\":24}}},{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[25,29],\"inline\":false,\"attributes\":{\"title\":\"Rezultat\",\"description\":\"Niskie koszty eksploatacji, stabilna temperatura w calym budynku i bezproblemowa praca instalacji przez caly sezon.\",\"color\":\"light-green\"},\"children\":[],\"type\":\"tag\",\"tag\":\"Callout\",\"annotations\":[{\"type\":\"attribute\",\"name\":\"title\",\"value\":\"Rezultat\"},{\"type\":\"attribute\",\"name\":\"description\",\"value\":\"Niskie koszty eksploatacji, stabilna temperatura w calym budynku i bezproblemowa praca instalacji przez caly sezon.\"},{\"type\":\"attribute\",\"name\":\"color\",\"value\":\"light-green\"}],\"slots\":{},\"location\":{\"start\":{\"line\":25},\"end\":{\"line\":29}}}],\"type\":\"document\",\"annotations\":[],\"slots\":{}}";

const getHeadings = createGetHeadings(stringifiedAst, markdocConfig, options, experimentalHeadingIdCompat);
const Content = createContentComponent(
	$$Renderer,
	stringifiedAst,
	markdocConfig,
  options,
	tagComponentMap,
	nodeComponentMap,
	experimentalHeadingIdCompat,
);

export { Content, getHeadings };
