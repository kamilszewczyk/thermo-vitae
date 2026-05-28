import type { MiddlewareHandler } from 'astro';

function normalizeBranchName(value: string | undefined) {
  if (!value) return '';
  return value.replace(/^refs\/heads\//, '').trim();
}

const protectedBranch = normalizeBranchName(process.env.KEYSTATIC_PROTECTED_BRANCH ?? 'master');
const currentBranch = normalizeBranchName(
  process.env.KEYSTATIC_CURRENT_BRANCH
    ?? process.env.VERCEL_GIT_COMMIT_REF
    ?? process.env.GITHUB_REF_NAME
    ?? process.env.GIT_BRANCH
);
const warningEnabled = (process.env.KEYSTATIC_MASTER_WARNING ?? 'true').toLowerCase() !== 'false';
const shouldWarnOnSave = warningEnabled && protectedBranch.length > 0 && currentBranch === protectedBranch;

const warningBannerText = 'Uwaga: edytujesz galaz master. Zapis zmian wplynie bezposrednio na strone.';
const warningDialogText = 'Uwaga! Zapisujesz zmiany na galezi master. To wplynie bezposrednio na strone. Czy na pewno chcesz kontynuowac?';

const warningInjection = `
<script id="keystatic-master-branch-warning" data-protected-branch="${protectedBranch}" data-current-branch="${currentBranch}">
(() => {
  if (window.__keystaticMasterWarningInit) return;
  window.__keystaticMasterWarningInit = true;

  const banner = document.createElement('div');
  banner.id = 'keystatic-master-warning-banner';
  banner.textContent = ${JSON.stringify(warningBannerText)};
  banner.style.position = 'fixed';
  banner.style.top = '0';
  banner.style.left = '0';
  banner.style.right = '0';
  banner.style.zIndex = '999999';
  banner.style.background = '#b91c1c';
  banner.style.color = '#ffffff';
  banner.style.fontFamily = 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif';
  banner.style.fontSize = '14px';
  banner.style.fontWeight = '600';
  banner.style.padding = '10px 14px';
  banner.style.textAlign = 'center';
  document.body.appendChild(banner);

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
  if (!shouldWarnOnSave || !pathname.startsWith('/keystatic')) {
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
    ? html.replace('</body>', `${warningInjection}</body>`)
    : `${html}${warningInjection}`;

  const headers = new Headers(response.headers);
  headers.delete('content-length');

  return new Response(patchedHtml, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};
