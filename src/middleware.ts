import type { MiddlewareHandler } from 'astro';

const warningEnabled = (process.env.KEYSTATIC_MASTER_WARNING ?? 'true').toLowerCase() !== 'false';

function getKeystaticBranchFromPath(pathname: string) {
  const match = pathname.match(/^\/keystatic\/branch\/([^/]+)/);
  return match ? decodeURIComponent(match[1]).trim() : '';
}

const warningBannerText = 'Uwaga: edytujesz galaz master. Zapis zmian wplynie bezposrednio na strone.';
const warningDialogText = 'Uwaga! Zapisujesz zmiany na galezi master. To wplynie bezposrednio na strone. Czy na pewno chcesz kontynuowac?';

const getWarningInjection = (currentBranch: string) => `
<script id="keystatic-master-branch-warning" data-current-branch="${currentBranch}">
(() => {
  if (window.__keystaticMasterWarningInit) return;
  window.__keystaticMasterWarningInit = true;

  const renderSidebarBanner = () => {
    const sidebar = document.querySelector(
      '[data-split-pane="primary"], div[id^="primary-pane-"], aside, nav[aria-label*="collection" i], [data-sidebar], [class*="sidebar" i]'
    );
    if (!sidebar) return false;

    if (sidebar.querySelector('#keystatic-master-warning-banner')) return true;

    const banner = document.createElement('div');
    banner.id = 'keystatic-master-warning-banner';
    banner.textContent = ${JSON.stringify(warningBannerText)};
    banner.style.background = '#b91c1c';
    banner.style.color = '#ffffff';
    banner.style.fontFamily = 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif';
    banner.style.fontSize = '13px';
    banner.style.fontWeight = '600';
    banner.style.padding = '10px 12px';
    banner.style.margin = '8px';
    banner.style.borderRadius = '8px';
    banner.style.lineHeight = '1.3';

    sidebar.prepend(banner);
    return true;
  };

  if (!renderSidebarBanner()) {
    const observer = new MutationObserver(() => {
      if (renderSidebarBanner()) {
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 60000);
  }

  const keywords = ['save', 'publish', 'zapisz', 'opublikuj'];
  const isSaveAction = (element) => {
    const label = String(element?.getAttribute?.('aria-label') || element?.textContent || '').toLowerCase();
    return keywords.some((keyword) => label.includes(keyword));
  };

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const button = target.closest('button, [role="button"]');
    if (!button || !isSaveAction(button)) return;

    const confirmUntil = Number(window.__keystaticMasterWarningConfirmUntil || 0);
    if (Date.now() < confirmUntil) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const accepted = window.confirm(${JSON.stringify(warningDialogText)});
    if (!accepted) return;

    window.__keystaticMasterWarningConfirmUntil = Date.now() + 4000;
    button.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  }, true);
})();
</script>
`;

export const onRequest: MiddlewareHandler = async (context, next) => {
  const pathname = context.url.pathname;
  if (!warningEnabled || !pathname.startsWith('/keystatic')) {
    return next();
  }

  const currentBranch = getKeystaticBranchFromPath(pathname);
  const shouldWarnOnSave = currentBranch === 'master';
  if (!shouldWarnOnSave) {
    return next();
  }

  const response = await next();
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('text/html')) {
    return response;
  }

  const html = await response.text();
  if (html.includes('keystatic-master-branch-warning')) {
    return response;
  }

  const patchedHtml = html.includes('</body>')
    ? html.replace('</body>', `${getWarningInjection(currentBranch)}</body>`)
    : `${html}${getWarningInjection(currentBranch)}`;

  const headers = new Headers(response.headers);
  headers.delete('content-length');

  return new Response(patchedHtml, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};
