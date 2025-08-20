import type { PageLoad } from './$types';
import type { Language, RogueTopic } from '$lib/types';
import { stageLoad } from '$lib/functions/stageLoad';
import { mapConfig } from '$lib/global_stores';
export const load = (async ({ params }) => {
	const language: Language = params.lang;
	const { config, enemies, traps } = await stageLoad(params.name, language);
	mapConfig.set(config);
	const rogueTopic: RogueTopic = 'rogue_mizuki';
	return {
		enemies,
		language,
		traps,
		rogueTopic
	};
}) satisfies PageLoad;
