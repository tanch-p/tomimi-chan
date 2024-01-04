import type { PageLoad } from './$types';

export const load = (({ params }) => {
	const language = params.lang;
	return {
		language
	};
}) satisfies PageLoad;
