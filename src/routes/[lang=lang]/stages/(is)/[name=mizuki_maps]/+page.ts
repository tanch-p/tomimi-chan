import type { PageLoad } from './$types';
import type { Language, RogueTopic } from '$lib/types';
import { stageLoad } from '$lib/functions/stageLoad';
export const load = (async ({ params }) => {
	const language: Language = params.lang;
	const { mapConfig, enemies, traps } = await stageLoad(params.name, 'rogue_mizuki', language);
	const rogueTopic: RogueTopic = 'rogue_mizuki';
	return {
		mapConfig,
		enemies,
		language,
		traps,
		rogueTopic
	};
}) satisfies PageLoad;
