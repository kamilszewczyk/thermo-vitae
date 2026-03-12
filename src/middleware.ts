import { defineMiddleware } from 'astro:middleware';

const editorMode = process.env.SITE_MODE === 'editor';
const authUser = process.env.EDITOR_BASIC_AUTH_USER;
const authPassword = process.env.EDITOR_BASIC_AUTH_PASSWORD;

function decodeBasicToken(token: string): string {
  try {
    if (typeof atob === 'function') {
      return atob(token);
    }
  } catch {
    // Fall through to Buffer decode.
  }

  return Buffer.from(token, 'base64').toString('utf-8');
}

export const onRequest = defineMiddleware(async ({ request }, next) => {
  if (!editorMode || !authUser || !authPassword) {
    return next();
  }

  const pathname = new URL(request.url).pathname;

  // Keystatic OAuth callback and API calls must not be blocked by Basic Auth.
  if (pathname.startsWith('/api/keystatic/')) {
    return next();
  }

  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Basic ')) {
    return new Response('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Thermo Vitae Editor"',
      },
    });
  }

  const encoded = authHeader.slice(6);
  const decoded = decodeBasicToken(encoded);
  const separatorIndex = decoded.indexOf(':');

  if (separatorIndex === -1) {
    return new Response('Unauthorized', { status: 401 });
  }

  const user = decoded.slice(0, separatorIndex);
  const password = decoded.slice(separatorIndex + 1);

  if (user !== authUser || password !== authPassword) {
    return new Response('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Thermo Vitae Editor"',
      },
    });
  }

  return next();
});
