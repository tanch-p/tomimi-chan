import type { Language } from '$lib/types';
import type { PageLoad } from './$types';
import { stageLoad } from '$lib/functions/stageLoad';
export const load = (async ({ params }) => {
	const language: Language = params.lang;
	const { mapConfig, enemies, traps } = await stageLoad(params.name, 'rogue_sami',language);
	return {
		mapConfig,
		enemies,
		language,
		traps
	};
}) satisfies PageLoad;
