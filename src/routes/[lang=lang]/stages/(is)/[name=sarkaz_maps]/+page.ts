import type { PageLoad } from './$types';
import type { Language, RogueTopic } from '$lib/types';
import { stageLoad } from '$lib/functions/stageLoad';

export const load = (async ({ params }) => {
	const language: Language = params.lang;
	const { config, enemies, traps } = await stageLoad(params.name, language);
	const rogueTopic: RogueTopic = 'rogue_skz';
	return {
		mapConfig:config,
		enemies,
		language,
		traps,
		rogueTopic
	};
}) satisfies PageLoad;
