import type { LayoutLoad } from './$types';
import { browser } from '$app/environment';

export const load = (async (url,params) => {
	if (browser) {
		console.log(window.navigator.language);
	}
	return {
		url
	}
}) satisfies LayoutLoad;

export const prerender = true