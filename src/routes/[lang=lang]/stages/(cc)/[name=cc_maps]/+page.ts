import type { PageLoad } from './$types';
import { stageLoad } from '$lib/functions/stageLoad';
export const load = (async ({ params }) => {
	const language = params.lang;
	const { mapConfig, enemies } = await stageLoad(params.name, null);
	const contracts = mapConfig.contracts.find(ele => ele.type==="daily");
	return {
		mapConfig,
		enemies,
		language,
		contracts
	};
}) satisfies PageLoad;
