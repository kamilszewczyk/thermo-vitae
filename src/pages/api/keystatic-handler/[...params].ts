import type { APIRoute } from 'astro';
import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import keystaticConfig from '../../../../keystatic.config';

export const prerender = false;

const keystaticHandler = makeGenericAPIRouteHandler({
    config: keystaticConfig,
});

const handler: APIRoute = async ({ request }) => {
    const response = await keystaticHandler(request);

    const body =
        response.body == null || typeof response.body === 'string'
            ? response.body
            : new Uint8Array(response.body).buffer;

    return new Response(body as BodyInit | null | undefined, {
        status: response.status,
        headers: response.headers,
    });
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const HEAD = handler;
export const OPTIONS = handler;