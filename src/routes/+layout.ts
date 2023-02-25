import type { LayoutLoad } from './$types';
import { browser } from '$app/environment';

export const load = (async () => {
	if (browser) {
		console.log(window.navigator.language);
	}
}) satisfies LayoutLoad;

export const prerender = true