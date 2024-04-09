import type { PageLoad } from './$types';
import type { Language } from '$lib/types';
import characters from '$lib/data/chara/characters.json';

export const load = (({ params }) => {
	const language: Language = params.lang;
	return {
		language,
		characters
	};
}) satisfies PageLoad;

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;
