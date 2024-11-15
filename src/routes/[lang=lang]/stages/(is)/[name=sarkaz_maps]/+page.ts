import type { PageLoad } from './$types';
import type { Language } from '$lib/types';
import { stageLoad } from '$lib/functions/stageLoad';
export const load = (async ({ params }) => {
	const language: Language = params.lang;
	const { mapConfig, enemies, traps } = await stageLoad(params.name, 'rogue_skz',language);
	return {
		mapConfig,
		enemies,
		language,
		traps
	};
}) satisfies PageLoad;
