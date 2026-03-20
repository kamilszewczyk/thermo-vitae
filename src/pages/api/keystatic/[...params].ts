import type { APIRoute } from 'astro';
import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import keystaticConfig from '../../../../keystatic.config';

export const prerender = false;

const keystaticHandler = makeGenericAPIRouteHandler({
    config: keystaticConfig,
});

export const ALL: APIRoute = async ({ request }) => {
    const response = await keystaticHandler(request);

    let body: BodyInit | null | undefined;

    if (response.body == null || typeof response.body === 'string') {
        body = response.body;
    } else {
        const bytes = new Uint8Array(response.body);
        body = bytes.buffer;
    }

    return new Response(body, {
        status: response.status,
        headers: response.headers,
    });
};