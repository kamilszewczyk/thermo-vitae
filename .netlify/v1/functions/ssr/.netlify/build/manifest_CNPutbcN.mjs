import 'piccolore';
import { x as NOOP_MIDDLEWARE_HEADER, y as decodeKey } from './chunks/astro/server_BJWMEMYF.mjs';
import 'clsx';
import './chunks/shared_B6bdXPNh.mjs';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/kamil/projects/thermo-vitae-astro/","cacheDir":"file:///home/kamil/projects/thermo-vitae-astro/node_modules/.astro/","outDir":"file:///home/kamil/projects/thermo-vitae-astro/dist/","srcDir":"file:///home/kamil/projects/thermo-vitae-astro/src/","publicDir":"file:///home/kamil/projects/thermo-vitae-astro/public/","buildClientDir":"file:///home/kamil/projects/thermo-vitae-astro/dist/","buildServerDir":"file:///home/kamil/projects/thermo-vitae-astro/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/editor-env-check.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/editor-env-check\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"editor-env-check.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/editor-env-check.json.ts","pathname":"/api/editor-env-check.json","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/api/keystatic/[...params]","pattern":"^\\/api\\/keystatic(?:\\/(.*?))?\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"keystatic","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/@keystatic/astro/internal/keystatic-api.js","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","isIndex":false,"route":"/keystatic/[...params]","pattern":"^\\/keystatic(?:\\/(.*?))?\\/?$","segments":[[{"content":"keystatic","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/@keystatic/astro/internal/keystatic-astro-page.astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.B7Qt9oJD.css"}],"routeData":{"route":"/realizacje","isIndex":false,"type":"page","pattern":"^\\/realizacje\\/?$","segments":[[{"content":"realizacje","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/realizacje.astro","pathname":"/realizacje","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.B7Qt9oJD.css"}],"routeData":{"route":"/realizacje/[...slug]","isIndex":false,"type":"page","pattern":"^\\/realizacje(?:\\/(.*?))?\\/?$","segments":[[{"content":"realizacje","dynamic":false,"spread":false}],[{"content":"...slug","dynamic":true,"spread":true}]],"params":["...slug"],"component":"src/pages/realizacje/[...slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.B7Qt9oJD.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.B7Qt9oJD.css"}],"routeData":{"route":"/[...slug]","isIndex":false,"type":"page","pattern":"^(?:\\/(.*?))?\\/?$","segments":[[{"content":"...slug","dynamic":true,"spread":true}]],"params":["...slug"],"component":"src/pages/[...slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/home/kamil/projects/thermo-vitae-astro/src/components/Portfolio.astro",{"propagation":"in-tree","containsHead":false}],["/home/kamil/projects/thermo-vitae-astro/src/content/pages/home.mdoc",{"propagation":"in-tree","containsHead":false}],["/home/kamil/projects/thermo-vitae-astro/src/content/pages/home.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/home/kamil/projects/thermo-vitae-astro/.astro/content-modules.mjs",{"propagation":"in-tree","containsHead":false}],["/home/kamil/projects/thermo-vitae-astro/node_modules/astro/dist/content/runtime.js",{"propagation":"in-tree","containsHead":false}],["/home/kamil/projects/thermo-vitae-astro/src/pages/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/home/kamil/projects/thermo-vitae-astro/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/kamil/projects/thermo-vitae-astro/src/pages/realizacje.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/realizacje@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/kamil/projects/thermo-vitae-astro/src/pages/realizacje/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/realizacje/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/kamil/projects/thermo-vitae-astro/node_modules/@astrojs/markdoc/components/Renderer.astro",{"propagation":"in-tree","containsHead":false}],["/home/kamil/projects/thermo-vitae-astro/node_modules/@astrojs/markdoc/components/index.ts",{"propagation":"in-tree","containsHead":false}],["/home/kamil/projects/thermo-vitae-astro/src/content/realizacje/pompa-ciepla-warszawa.mdoc",{"propagation":"in-tree","containsHead":false}],["/home/kamil/projects/thermo-vitae-astro/src/content/realizacje/pompa-ciepla-warszawa.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/api/editor-env-check.json@_@ts":"pages/api/editor-env-check.json.astro.mjs","\u0000@astro-page:node_modules/@keystatic/astro/internal/keystatic-api@_@js":"pages/api/keystatic/_---params_.astro.mjs","\u0000@astro-page:node_modules/@keystatic/astro/internal/keystatic-astro-page@_@astro":"pages/keystatic/_---params_.astro.mjs","\u0000@astro-page:src/pages/realizacje@_@astro":"pages/realizacje.astro.mjs","\u0000@astro-page:src/pages/realizacje/[...slug]@_@astro":"pages/realizacje/_---slug_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/[...slug]@_@astro":"pages/_---slug_.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CNPutbcN.mjs","/home/kamil/projects/thermo-vitae-astro/node_modules/unstorage/drivers/netlify-blobs.mjs":"chunks/netlify-blobs_DM36vZAS.mjs","/home/kamil/projects/thermo-vitae-astro/src/assets/logo.png":"chunks/logo_DlJPGF7S.mjs","/home/kamil/projects/thermo-vitae-astro/src/assets/pages/home/photo-1606983773367-8f93e7bbad8d.jpeg":"chunks/photo-1606983773367-8f93e7bbad8d_B-sJsix3.mjs","/home/kamil/projects/thermo-vitae-astro/src/assets/partners/daikin.svg":"chunks/daikin_CFvIk85G.mjs","/home/kamil/projects/thermo-vitae-astro/src/assets/partners/mitsubishi.svg":"chunks/mitsubishi_20L-X4jD.mjs","/home/kamil/projects/thermo-vitae-astro/src/assets/partners/nibe.svg":"chunks/nibe_T5J9TNI6.mjs","/home/kamil/projects/thermo-vitae-astro/src/assets/partners/viessmann.svg":"chunks/viessmann_8SbzLcL5.mjs","/home/kamil/projects/thermo-vitae-astro/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/home/kamil/projects/thermo-vitae-astro/.astro/content-modules.mjs":"chunks/content-modules_BD9Dohr_.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_BHuo51Qf.mjs","/home/kamil/projects/thermo-vitae-astro/src/content/pages/home.mdoc?astroPropagatedAssets":"chunks/home_BekzqFIG.mjs","/home/kamil/projects/thermo-vitae-astro/src/content/realizacje/pompa-ciepla-warszawa.mdoc?astroPropagatedAssets":"chunks/pompa-ciepla-warszawa_BeJ8bDuF.mjs","/home/kamil/projects/thermo-vitae-astro/src/content/pages/home.mdoc":"chunks/home_BQrnf9kM.mjs","/home/kamil/projects/thermo-vitae-astro/src/content/realizacje/pompa-ciepla-warszawa.mdoc":"chunks/pompa-ciepla-warszawa_DuEqrd2g.mjs","/home/kamil/projects/thermo-vitae-astro/node_modules/@keystatic/astro/internal/keystatic-page.js":"_astro/keystatic-page.XrEMRrie.js","@astrojs/react/client.js":"_astro/client.BJGBxOWp.js","/home/kamil/projects/thermo-vitae-astro/src/components/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.mYoJMPRo.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/home/kamil/projects/thermo-vitae-astro/src/components/Header.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"mobile-menu-button\"),n=document.getElementById(\"mobile-menu\");if(e&&n){const a=()=>{const t=!(e.getAttribute(\"aria-expanded\")===\"true\");e.setAttribute(\"aria-expanded\",String(t)),n.classList.toggle(\"hidden\",!t)};e.addEventListener(\"click\",a),document.addEventListener(\"keydown\",d=>{d.key===\"Escape\"&&e.getAttribute(\"aria-expanded\")===\"true\"&&(e.setAttribute(\"aria-expanded\",\"false\"),n.classList.add(\"hidden\"),e.focus())}),n.addEventListener(\"click\",d=>{const t=d.target;t instanceof HTMLElement&&t.closest(\"a\")&&(e.setAttribute(\"aria-expanded\",\"false\"),n.classList.add(\"hidden\"))})}"]],"assets":["/_astro/logo.CU0ifLbf.png","/_astro/photo-1606983773367-8f93e7bbad8d.D0UUJp_G.jpeg","/_astro/daikin.DowYwAGV.svg","/_astro/mitsubishi.BQHqFR29.svg","/_astro/nibe.DFBhTyQj.svg","/_astro/viessmann.Cu_Fv0vT.svg","/_astro/_slug_.B7Qt9oJD.css","/favicon.ico","/favicon.svg","/hero-placeholder.svg","/_astro/client.BJGBxOWp.js","/_astro/index.BbrLBU_f.js","/_astro/keystatic-page.XrEMRrie.js"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"ti73B1QZ+NVhu4ii1vVkJ0W0+JvMW15J4SWyYMG0FLs=","sessionConfig":{"driver":"netlify-blobs","options":{"name":"astro-sessions","consistency":"strong"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/netlify-blobs_DM36vZAS.mjs');

export { manifest };
