import type { PageLoad } from './$types';

export const load = (({ params }) => {
	const language = params.lang;
	return {
		language
	};
}) satisfies PageLoad;

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;
