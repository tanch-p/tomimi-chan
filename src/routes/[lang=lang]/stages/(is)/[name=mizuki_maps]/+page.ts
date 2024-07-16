import type { PageLoad } from './$types';
import type { Language } from '$lib/types';
import { stageLoad } from '$lib/functions/stageLoad';
export const load = (async ({ params }) => {
	const language:Language = params.lang;
	const { mapConfig, enemies } = await stageLoad(params.name, 'rogue_mizuki');
	return {
		mapConfig,
		enemies,
		language
	};
}) satisfies PageLoad;
