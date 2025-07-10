import type { PageLoad } from './$types';
import type { Language } from '$lib/types';

export const load = (async ({ params }) => {
	const language: Language = params.lang;

	return {
		language
	};
}) satisfies PageLoad;
