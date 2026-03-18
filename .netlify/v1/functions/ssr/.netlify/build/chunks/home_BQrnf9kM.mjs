import { c as createContentComponent, a as createGetHeadings, m as markdocConfig, b as assetsConfig, $ as $$Renderer } from './runtime-assets-config_BuI2t9-9.mjs';
import { c as createComponent, m as maybeRenderHead, b as addAttribute, a as renderTemplate, r as renderComponent, d as createAstro } from './astro/server_BJWMEMYF.mjs';
import 'piccolore';
import { $ as $$Image } from './_astro_assets_CrOe6wqg.mjs';
import { r as resolveImage, b as $$Icon, g as getCollection } from './BaseLayout_BfZ6Bsvd.mjs';

const $$Astro$3 = createAstro();
const $$Hero = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Hero;
  const block = Astro2.props;
  const subtitle = (block.subtitle || "").trim();
  const title = (block.title || "").trim();
  const description = (block.description || "").trim();
  const trust = (block.trustIndicators ?? []).slice(0, 3);
  const hasText = Boolean(subtitle) || Boolean(title) || Boolean(description) || trust.length > 0;
  const imageMeta = await resolveImage(block?.image);
  const hasImage = Boolean(imageMeta);
  const imageAlt = (block.imageAlt || "Hero image").trim();
  const imageSide = block.imageSide ?? "right";
  const isTwoCol = hasText && hasImage;
  const imageFirst = isTwoCol && imageSide === "left";
  const badgeEnabled = block.badgeEnabled !== false;
  const hasBadge = hasImage && badgeEnabled && (block.badgeTitle?.trim() || block.badgeSubtitle?.trim());
  const badgePosition = block.badgePosition ?? "bottom-left";
  const badgePositionClass = {
    "top-left": "top-6 left-6",
    "top-right": "top-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "bottom-right": "bottom-6 right-6"
  };
  return renderTemplate`${maybeRenderHead()}<section class="bg-background"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24"> <div${addAttribute([
    "grid gap-12 items-center",
    isTwoCol ? "lg:grid-cols-2" : "grid-cols-1"
  ], "class:list")}> ${hasText && renderTemplate`<div${addAttribute([imageFirst ? "lg:order-2" : "lg:order-1", "space-y-8"], "class:list")}> <div class="space-y-4"> ${subtitle && renderTemplate`<p class="uppercase tracking-wider text-sm text-text-inactive"> ${subtitle} </p>`} ${title && renderTemplate`<h1 class="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-text-primary"> ${title} </h1>`} ${description && renderTemplate`<p class="text-lg text-text-body leading-relaxed">${description}</p>`} </div> ${trust.length > 0 && renderTemplate`<div class="flex flex-wrap gap-8 pt-4"> ${trust.map((item) => {
    const v = (item.value || "").trim();
    const l = (item.label || "").trim();
    if (!v && !l) return null;
    return renderTemplate`<div> ${v && renderTemplate`<p class="text-3xl font-bold text-brand-forest-green"> ${v} </p>`} ${l && renderTemplate`<p class="text-sm text-text-inactive">${l}</p>`} </div>`;
  })} </div>`} </div>`} ${hasImage && imageMeta && renderTemplate`<div${addAttribute([imageFirst ? "lg:order-1" : "lg:order-2", "relative"], "class:list")}> <div class="rounded-2xl overflow-hidden shadow-2xl"> ${renderComponent($$result, "Image", $$Image, { "src": imageMeta, "alt": imageAlt, "class": "w-full h-[500px] object-cover", "widths": [640, 960, 1080, 1400], "sizes": isTwoCol ? "(min-width: 1024px) 50vw, 100vw" : "100vw", "loading": "lazy" })} </div> ${hasBadge && renderTemplate`<div${addAttribute([
    "absolute bg-card rounded-xl shadow-xl p-6 hidden lg:block",
    badgePositionClass[badgePosition]
  ], "class:list")}> <div class="flex items-center gap-3"> <div class="w-12 h-12 rounded-full flex items-center justify-center bg-brand-natural-green"> <span class="text-white text-xl font-bold">✓</span> </div> <div> ${block.badgeTitle?.trim() && renderTemplate`<p class="font-semibold text-text-primary"> ${block.badgeTitle.trim()} </p>`} ${block.badgeSubtitle?.trim() && renderTemplate`<p class="text-sm text-text-inactive"> ${block.badgeSubtitle.trim()} </p>`} </div> </div> </div>`} </div>`} </div> </div> </section>`;
}, "/home/kamil/projects/thermo-vitae-astro/src/components/Hero.astro", void 0);

const $$Astro$2 = createAstro();
const $$Features = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Features;
  const block = Astro2.props;
  const subtitle = (block.subtitle || "").trim();
  const title = (block.title || "").trim();
  const description = (block.description || "").trim();
  const features = (block.features ?? []).slice(0, 4);
  const featuresLink = block.featuresLink ?? "none";
  const hasText = Boolean(subtitle || title || description);
  const hasFeatures = features.length > 0;
  return renderTemplate`${maybeRenderHead()}<section class="py-16"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> ${hasText && renderTemplate`<div class="text-center mb-16"> ${subtitle && renderTemplate`<p class="uppercase tracking-wider text-sm text-text-inactive mb-4"> ${subtitle} </p>`} ${title && renderTemplate`<h2 class="text-3xl lg:text-4xl font-bold mb-4 text-text-primary"> ${title} </h2>`} ${description && renderTemplate`<p class="text-lg text-text-body max-w-2xl mx-auto"> ${description} </p>`} </div>`} ${hasFeatures && renderTemplate`<div class="relative"> ${featuresLink === "line" && renderTemplate`<div class="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-accent" style="margin-left:5%; margin-right:5%"></div>`} <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative"> ${features.map((feature) => {
    const number = (feature.number || "").trim();
    const icon = (feature.icon || "").trim();
    const iconBackground = (feature.iconBackground || "").trim() || "bg-brand-natural-green";
    const iconColor = (feature.iconColor || "").trim() || "text-white";
    const itemTitle = (feature.title || "").trim();
    const itemDescription = (feature.description || "").trim();
    return renderTemplate`<div class="relative"> <div class="bg-card rounded-2xl p-8 border-2 border-border hover:border-brand-natural-green transition-colors h-full"> <div class="flex flex-col items-center lg:items-start text-center lg:text-left h-full"> ${(number || icon) && renderTemplate`<div class="flex items-center justify-center lg:justify-start gap-4 mb-6"> ${number && renderTemplate`<div class="w-16 h-16 rounded-full flex items-center justify-center bg-brand-forest-green"> <span class="text-white text-2xl font-bold">${number}</span> </div>`} ${icon && renderTemplate`<div${addAttribute([
      "w-14 h-14 rounded-xl flex items-center justify-center",
      iconBackground
    ], "class:list")}> ${renderComponent($$result, "Icon", $$Icon, { "name": icon, "width": "28", "height": "28", "class:list": ["text-white", iconColor], "aria-hidden": "true" })} </div>`} </div>`} ${itemTitle && renderTemplate`<h3 class="text-xl font-bold mb-3 text-text-primary"> ${itemTitle} </h3>`} ${itemDescription && renderTemplate`<p class="text-text-body leading-relaxed"> ${itemDescription} </p>`} </div> </div> </div>`;
  })} </div> </div>`} </div> </section>`;
}, "/home/kamil/projects/thermo-vitae-astro/src/components/Features.astro", void 0);

const $$Astro$1 = createAstro();
const $$Partners = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Partners;
  const block = Astro2.props;
  const subtitle = (block.subtitle || "ZAUFALI NAM").trim();
  const title = (block.title || "Wspolpracujemy z wiodacymi producentami").trim();
  const partnersInput = Array.isArray(block.partners) ? block.partners.slice(0, 8) : [];
  const partners = await Promise.all(
    partnersInput.map(async (item) => {
      const name = (item?.name || "").trim();
      const imagePath = typeof item?.image === "string" ? item.image : null;
      const imageMeta = await resolveImage(imagePath);
      if (!name && !imageMeta) return null;
      return { name, imageMeta };
    })
  );
  const partnerItems = partners.filter(Boolean);
  return renderTemplate`${maybeRenderHead()}<section class="bg-background py-16" id="partnerzy"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-12"> ${subtitle && renderTemplate`<p class="uppercase tracking-wider text-sm text-text-inactive mb-4"> ${subtitle} </p>`} ${title && renderTemplate`<h3 class="text-2xl font-bold text-text-primary"> ${title} </h3>`} </div> <div class="grid grid-cols-2 md:grid-cols-4 gap-8 items-center"> ${partnerItems.map((partner) => renderTemplate`<div class="flex items-center justify-center p-6 bg-background-gray rounded-xl hover:bg-accent transition-colors min-h-24"> ${partner?.imageMeta ? renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": partner.imageMeta, "alt": `${partner.name || "Partner"} logo`, "class": "max-h-10 w-auto object-contain", "widths": [160, 240, 320], "sizes": "(min-width: 768px) 18vw, 35vw", "loading": "lazy" })}` : renderTemplate`<span class="text-xl font-bold text-text-inactive"> ${partner?.name} </span>`} </div>`)} </div> </div> </section>`;
}, "/home/kamil/projects/thermo-vitae-astro/src/components/Partners.astro", void 0);

const $$Astro = createAstro();
const $$Badge = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Badge;
  const block = Astro2.props;
  const number = (block.number || "").trim();
  const icon = (block.icon || "").trim();
  const title = (block.title || "").trim();
  const description = (block.description || "").trim();
  const hasBadge = Boolean(number || icon || title || description);
  return renderTemplate`${hasBadge && renderTemplate`${maybeRenderHead()}<section class="flex justify-center"><div class="inline-flex items-center gap-6 bg-gradient-to-r from-background-gray to-background px-12 py-6 rounded-2xl border-2 border-brand-natural-green"><div class="w-20 h-20 rounded-full flex items-center justify-center bg-brand-forest-green"><div class="flex items-center gap-3">${number && renderTemplate`<span class="text-white text-3xl font-bold">${number}</span>`}${icon && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": icon, "width": "24", "height": "24", "class": "text-white", "aria-hidden": "true" })}`}</div></div><div class="text-left">${title && renderTemplate`<p class="text-2xl font-bold text-text-primary">${title}</p>`}${description && renderTemplate`<p class="text-text-body">${description}</p>`}</div></div></section>`}`;
}, "/home/kamil/projects/thermo-vitae-astro/src/components/Badge.astro", void 0);

const $$Portfolio = createComponent(async ($$result, $$props, $$slots) => {
  const realizacje = await getCollection("realizacje");
  const projects = await Promise.all(
    [...realizacje].sort(() => Math.random() - 0.5).slice(0, 4).map(async (item) => ({
      slug: item.data.slug,
      title: item.data.title,
      location: item.data.location,
      shortDescription: item.data.short_description,
      imagePath: item.data.image,
      imageMeta: await resolveImage(item.data.image),
      status: item.data.status
    }))
  );
  return renderTemplate`${maybeRenderHead()}<section class="py-16 lg:py-24" id="realizacje"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <!-- Section header --> <div class="text-center mb-16"> <p class="uppercase tracking-wider text-sm text-text-inactive mb-4">
NASZE REALIZACJE
</p> <h2 class="text-3xl lg:text-4xl font-bold mb-4 text-text-primary">
Portfolio projektów
</h2> <p class="text-lg text-text-body max-w-2xl mx-auto">
Zobacz przykłady naszych realizacji i przekonaj się o jakości wykonania
</p> </div> <!-- Projects grid --> <div class="grid md:grid-cols-2 gap-6"> ${projects.map((project) => renderTemplate`<a${addAttribute(`/realizacje/${project.slug}`, "href")} class="group relative bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer"> <!-- Image --> <div class="relative h-80 overflow-hidden"> ${project.imageMeta ? renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": project.imageMeta, "alt": project.title, "class": "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500", "widths": [640, 960, 1080], "sizes": "(min-width: 768px) 50vw, 100vw", "loading": "lazy" })}` : renderTemplate`<img${addAttribute(project.imagePath, "src")}${addAttribute(project.title, "alt")} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" fetchpriority="low">`} <!-- Overlay on hover --> <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> </div> <!-- Content --> <div class="p-6"> <h3 class="text-xl font-bold mb-2 text-text-primary"> ${project.title} </h3> <p class="text-text-inactive text-sm mb-2">${project.location}</p> <p class="text-text-body">${project.shortDescription}</p> </div> <!-- Badge --> <div class="absolute top-4 right-4 bg-card px-3 py-1 rounded-full shadow-lg"> <span class="text-xs font-semibold text-brand-forest-green"> ${project.status} </span> </div> </a>`)} </div> <!-- CTA --> <div class="text-center mt-12"> <a href="/realizacje" class="inline-block px-8 py-4 rounded-lg font-semibold text-white bg-brand-forest-green transition-all hover:shadow-lg">
Zobacz wszystkie realizacje
</a> </div> </div> </section>`;
}, "/home/kamil/projects/thermo-vitae-astro/src/components/Portfolio.astro", void 0);

markdocConfig.nodes = { ...assetsConfig.nodes, ...markdocConfig.nodes };


const experimentalHeadingIdCompat = false;

const tagComponentMap = {"Hero": $$Hero,
"Features": $$Features,
"Partners": $$Partners,
"Badge": $$Badge,
"Portfolio": $$Portfolio,
};
const nodeComponentMap = {};

const options = undefined;

const stringifiedAst = "{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[],\"inline\":false,\"attributes\":{},\"children\":[{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[3,16],\"inline\":false,\"attributes\":{\"subtitle\":\"Odnawialne źródła energii\",\"title\":\"Profesjonalne systemy grzewcze dla Twojego domu\",\"description\":\"Specjalizujemy się w projektowaniu i instalacji nowoczesnych pomp ciepła.\\n            15 lat doświadczenia, setki zadowolonych klientów i gwarancja najwyższej jakości.\",\"ctas\":[{\"label\":\"Darmowa wycena\",\"href\":\"/kontakt\",\"variant\":\"primary\"},{\"label\":\"Zobacz realizacje\",\"href\":\"/realizacje\",\"variant\":\"secondary\"}],\"trustIndicators\":[{\"value\":\"15+\",\"label\":\"Lat doświadczenia\"},{\"value\":\"500+\",\"label\":\"Instalacji\"},{\"value\":\"98%\",\"label\":\"Zadowolonych klientów\"}],\"image\":\"/src/assets/pages/home/photo-1606983773367-8f93e7bbad8d.jpeg\",\"imageAlt\":\"Współczesne systemy grzewcze\",\"imageSide\":\"right\",\"badgeEnabled\":true,\"badgeTitle\":\"Certyfikowane\",\"badgeSubtitle\":\"Instalacje\",\"badgePosition\":\"bottom-left\"},\"children\":[],\"type\":\"tag\",\"tag\":\"Hero\",\"annotations\":[{\"type\":\"attribute\",\"name\":\"subtitle\",\"value\":\"Odnawialne źródła energii\"},{\"type\":\"attribute\",\"name\":\"title\",\"value\":\"Profesjonalne systemy grzewcze dla Twojego domu\"},{\"type\":\"attribute\",\"name\":\"description\",\"value\":\"Specjalizujemy się w projektowaniu i instalacji nowoczesnych pomp ciepła.\\n            15 lat doświadczenia, setki zadowolonych klientów i gwarancja najwyższej jakości.\"},{\"type\":\"attribute\",\"name\":\"ctas\",\"value\":[{\"label\":\"Darmowa wycena\",\"href\":\"/kontakt\",\"variant\":\"primary\"},{\"label\":\"Zobacz realizacje\",\"href\":\"/realizacje\",\"variant\":\"secondary\"}]},{\"type\":\"attribute\",\"name\":\"trustIndicators\",\"value\":[{\"value\":\"15+\",\"label\":\"Lat doświadczenia\"},{\"value\":\"500+\",\"label\":\"Instalacji\"},{\"value\":\"98%\",\"label\":\"Zadowolonych klientów\"}]},{\"type\":\"attribute\",\"name\":\"image\",\"value\":\"/src/assets/pages/home/photo-1606983773367-8f93e7bbad8d.jpeg\"},{\"type\":\"attribute\",\"name\":\"imageAlt\",\"value\":\"Współczesne systemy grzewcze\"},{\"type\":\"attribute\",\"name\":\"imageSide\",\"value\":\"right\"},{\"type\":\"attribute\",\"name\":\"badgeEnabled\",\"value\":true},{\"type\":\"attribute\",\"name\":\"badgeTitle\",\"value\":\"Certyfikowane\"},{\"type\":\"attribute\",\"name\":\"badgeSubtitle\",\"value\":\"Instalacje\"},{\"type\":\"attribute\",\"name\":\"badgePosition\",\"value\":\"bottom-left\"}],\"slots\":{},\"location\":{\"start\":{\"line\":3},\"end\":{\"line\":16}}},{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[17,23],\"inline\":false,\"attributes\":{\"subtitle\":\"NASZE USŁUGI\",\"title\":\"Dlaczego pompy ciepła?\",\"description\":\"Nowoczesne rozwiązania grzewcze, które łączą efektywność, ekologię i oszczędności\",\"featuresLink\":\"none\",\"features\":[{\"icon\":\"lucide:leaf\",\"iconBackground\":\"bg-brand-natural-green\",\"title\":\"Ekologia\",\"description\":\"Odnawialne źródło energii. Pompy ciepła wykorzystują energię z powietrza, ziemi lub wody, minimalizując wpływ na środowisko.\"},{\"icon\":\"lucide:coins\",\"iconBackground\":\"bg-brand-natural-green\",\"title\":\"Oszczędność\",\"description\":\"Nawet 75% niższe koszty ogrzewania w porównaniu do tradycyjnych systemów. Szybki zwrot z inwestycji.\"},{\"icon\":\"lucide:settings\",\"iconBackground\":\"bg-brand-natural-green\",\"title\":\"Bezobsługowość\",\"description\":\"Nowoczesne pompy ciepła są w pełni zautomatyzowane i nie wymagają ciągłej obsługi czy uzupełniania paliwa.\"},{\"icon\":\"lucide:award\",\"iconBackground\":\"bg-brand-natural-green\",\"title\":\"Niezawodność\",\"description\":\"Współpracujemy tylko z najlepszymi producentami. Gwarantujemy długowieczność i stabilną pracę instalacji.\"}]},\"children\":[],\"type\":\"tag\",\"tag\":\"Features\",\"annotations\":[{\"type\":\"attribute\",\"name\":\"subtitle\",\"value\":\"NASZE USŁUGI\"},{\"type\":\"attribute\",\"name\":\"title\",\"value\":\"Dlaczego pompy ciepła?\"},{\"type\":\"attribute\",\"name\":\"description\",\"value\":\"Nowoczesne rozwiązania grzewcze, które łączą efektywność, ekologię i oszczędności\"},{\"type\":\"attribute\",\"name\":\"featuresLink\",\"value\":\"none\"},{\"type\":\"attribute\",\"name\":\"features\",\"value\":[{\"icon\":\"lucide:leaf\",\"iconBackground\":\"bg-brand-natural-green\",\"title\":\"Ekologia\",\"description\":\"Odnawialne źródło energii. Pompy ciepła wykorzystują energię z powietrza, ziemi lub wody, minimalizując wpływ na środowisko.\"},{\"icon\":\"lucide:coins\",\"iconBackground\":\"bg-brand-natural-green\",\"title\":\"Oszczędność\",\"description\":\"Nawet 75% niższe koszty ogrzewania w porównaniu do tradycyjnych systemów. Szybki zwrot z inwestycji.\"},{\"icon\":\"lucide:settings\",\"iconBackground\":\"bg-brand-natural-green\",\"title\":\"Bezobsługowość\",\"description\":\"Nowoczesne pompy ciepła są w pełni zautomatyzowane i nie wymagają ciągłej obsługi czy uzupełniania paliwa.\"},{\"icon\":\"lucide:award\",\"iconBackground\":\"bg-brand-natural-green\",\"title\":\"Niezawodność\",\"description\":\"Współpracujemy tylko z najlepszymi producentami. Gwarantujemy długowieczność i stabilną pracę instalacji.\"}]}],\"slots\":{},\"location\":{\"start\":{\"line\":17},\"end\":{\"line\":23}}},{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[24,30],\"inline\":false,\"attributes\":{\"subtitle\":\"JAK DZIAŁAMY\",\"title\":\"Proces realizacji\",\"description\":\"Od pierwszego kontaktu po kompleksową obsługę posprzedażową\",\"featuresLink\":\"line\",\"features\":[{\"number\":\"01\",\"icon\":\"lucide:message-circle\",\"iconBackground\":\"white\",\"iconColor\":\"text-brand-natural-green\",\"title\":\"Doradztwo\",\"description\":\"Bezpłatna konsultacja i analiza potrzeb. Dobieramy optymalne rozwiązanie dla Twojego domu.\"},{\"number\":\"02\",\"icon\":\"lucide:ruler\",\"iconBackground\":\"white\",\"iconColor\":\"text-brand-natural-green\",\"title\":\"Projekt\",\"description\":\"Kompleksowy projekt instalacji. Uwzględniamy wszystkie parametry techniczne i preferencje klienta.\"},{\"number\":\"03\",\"icon\":\"lucide:wrench\",\"iconBackground\":\"white\",\"iconColor\":\"text-brand-natural-green\",\"title\":\"Montaż\",\"description\":\"Profesjonalna instalacja przez doświadczonych techników. Krótkі terminy realizacji.\"},{\"number\":\"04\",\"icon\":\"lucide:headphones\",\"iconBackground\":\"white\",\"iconColor\":\"text-brand-natural-green\",\"title\":\"Serwis\",\"description\":\"Pełne wsparcie po instalacji. Przeglądy, konserwacja i pomoc techniczna przez cały okres użytkowania.\"}]},\"children\":[],\"type\":\"tag\",\"tag\":\"Features\",\"annotations\":[{\"type\":\"attribute\",\"name\":\"subtitle\",\"value\":\"JAK DZIAŁAMY\"},{\"type\":\"attribute\",\"name\":\"title\",\"value\":\"Proces realizacji\"},{\"type\":\"attribute\",\"name\":\"description\",\"value\":\"Od pierwszego kontaktu po kompleksową obsługę posprzedażową\"},{\"type\":\"attribute\",\"name\":\"featuresLink\",\"value\":\"line\"},{\"type\":\"attribute\",\"name\":\"features\",\"value\":[{\"number\":\"01\",\"icon\":\"lucide:message-circle\",\"iconBackground\":\"white\",\"iconColor\":\"text-brand-natural-green\",\"title\":\"Doradztwo\",\"description\":\"Bezpłatna konsultacja i analiza potrzeb. Dobieramy optymalne rozwiązanie dla Twojego domu.\"},{\"number\":\"02\",\"icon\":\"lucide:ruler\",\"iconBackground\":\"white\",\"iconColor\":\"text-brand-natural-green\",\"title\":\"Projekt\",\"description\":\"Kompleksowy projekt instalacji. Uwzględniamy wszystkie parametry techniczne i preferencje klienta.\"},{\"number\":\"03\",\"icon\":\"lucide:wrench\",\"iconBackground\":\"white\",\"iconColor\":\"text-brand-natural-green\",\"title\":\"Montaż\",\"description\":\"Profesjonalna instalacja przez doświadczonych techników. Krótkі terminy realizacji.\"},{\"number\":\"04\",\"icon\":\"lucide:headphones\",\"iconBackground\":\"white\",\"iconColor\":\"text-brand-natural-green\",\"title\":\"Serwis\",\"description\":\"Pełne wsparcie po instalacji. Przeglądy, konserwacja i pomoc techniczna przez cały okres użytkowania.\"}]}],\"slots\":{},\"location\":{\"start\":{\"line\":24},\"end\":{\"line\":30}}},{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[31,35],\"inline\":false,\"attributes\":{\"subtitle\":\"ZAUFALI NAM\",\"title\":\"Wspolpracujemy z wiodacymi producentami\",\"partners\":[{\"name\":\"NIBE\",\"image\":\"/src/assets/partners/nibe.svg\"},{\"name\":\"Mitsubishi\",\"image\":\"/src/assets/partners/mitsubishi.svg\"},{\"name\":\"Daikin\",\"image\":\"/src/assets/partners/daikin.svg\"},{\"name\":\"Viessmann\",\"image\":\"/src/assets/partners/viessmann.svg\"}]},\"children\":[],\"type\":\"tag\",\"tag\":\"Partners\",\"annotations\":[{\"type\":\"attribute\",\"name\":\"subtitle\",\"value\":\"ZAUFALI NAM\"},{\"type\":\"attribute\",\"name\":\"title\",\"value\":\"Wspolpracujemy z wiodacymi producentami\"},{\"type\":\"attribute\",\"name\":\"partners\",\"value\":[{\"name\":\"NIBE\",\"image\":\"/src/assets/partners/nibe.svg\"},{\"name\":\"Mitsubishi\",\"image\":\"/src/assets/partners/mitsubishi.svg\"},{\"name\":\"Daikin\",\"image\":\"/src/assets/partners/daikin.svg\"},{\"name\":\"Viessmann\",\"image\":\"/src/assets/partners/viessmann.svg\"}]}],\"slots\":{},\"location\":{\"start\":{\"line\":31},\"end\":{\"line\":35}}},{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[36,40],\"inline\":false,\"attributes\":{\"number\":\"15\",\"title\":\"Lat doświadczenia\",\"description\":\"w branży odnawialnych źródeł energii\"},\"children\":[],\"type\":\"tag\",\"tag\":\"Badge\",\"annotations\":[{\"type\":\"attribute\",\"name\":\"number\",\"value\":\"15\"},{\"type\":\"attribute\",\"name\":\"title\",\"value\":\"Lat doświadczenia\"},{\"type\":\"attribute\",\"name\":\"description\",\"value\":\"w branży odnawialnych źródeł energii\"}],\"slots\":{},\"location\":{\"start\":{\"line\":36},\"end\":{\"line\":40}}},{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[41,42],\"inline\":false,\"attributes\":{},\"children\":[],\"type\":\"tag\",\"tag\":\"Portfolio\",\"annotations\":[],\"slots\":{},\"location\":{\"start\":{\"line\":41},\"end\":{\"line\":42}}}],\"type\":\"document\",\"annotations\":[],\"slots\":{}}";

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
