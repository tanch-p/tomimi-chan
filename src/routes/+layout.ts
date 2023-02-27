import type { LayoutLoad } from './$types';

export const load = (async ({ url, params }) => {
	return {
		url,
		params
	};
}) satisfies LayoutLoad;

export const prerender = true;
