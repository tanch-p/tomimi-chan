import type { Language } from '$lib/types';
import type { PageLoad } from './$types';
import { stageLoad } from '$lib/functions/stageLoad';
export const load = (async ({ params }) => {
	const language:Language = params.lang;
	const { mapConfig, enemies } = await stageLoad(params.name, 'rogue_sami');
	return {
		mapConfig,
		enemies,
		language
	};
}) satisfies PageLoad;
