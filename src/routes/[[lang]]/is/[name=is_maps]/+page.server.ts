import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const mapConfig = (await import('$lib/data/stages/is/ISW-NO_征兆.json')).default;
	return {
		mapConfig
	};
}) satisfies PageServerLoad;
