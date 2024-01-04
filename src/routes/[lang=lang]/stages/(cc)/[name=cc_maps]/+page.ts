import type { PageLoad } from './$types';
import { stageLoad } from '$lib/functions/stageLoad';
export const load = (async ({ params }) => {
	const language = params.lang;
	const [stageName, configId] = params.name.split('_');

	const { mapConfig, enemies } = await stageLoad(stageName, null);
	const contracts = configId
		? mapConfig.contracts.find((ele) => ele.id === configId)
		: mapConfig.contracts.find((ele) => ele.type === 'perma');
	return {
		mapConfig,
		enemies,
		language,
		contracts
	};
}) satisfies PageLoad;
