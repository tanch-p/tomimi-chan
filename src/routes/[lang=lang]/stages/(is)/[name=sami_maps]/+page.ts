import type { PageLoad } from './$types';
import { stageLoad } from '$lib/functions/stageLoad';
export const load = (async ({ params }) => {
	const language = params.lang;
	const { mapConfig, enemies } = await stageLoad(params.name, 'rogue_sami');
	return {
		mapConfig,
		enemies,
		language
	};
}) satisfies PageLoad;
