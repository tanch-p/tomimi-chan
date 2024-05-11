import type { PageLoad } from './$types';
import type { Language } from '$lib/types';
import characters from '$lib/data/chara/characters.json';
import { getCharaImages } from '$lib/functions/charaHelpers';

export const load = (async ({ params }) => {
	const language: Language = params.lang;
	const images = await Promise.all(getCharaImages(characters));
	characters.forEach((chara, index) => (chara.icon = images[index].default));
	return {
		language,
		characters
	};
}) satisfies PageLoad;

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;
