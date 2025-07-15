import type { PageLoad } from './$types';
import type { Language } from '$lib/types';
import { activityIdStore, stageIdStore } from './stores';

export const load = (async ({ params }) => {
	const language: Language = params.lang;
	activityIdStore.set(language === 'zh' ? 'act40side' : 'act2mainss');
	stageIdStore.set(language === 'zh' ? 'act40side_01' : 'main_15-01');
	return {
		language
	};
}) satisfies PageLoad;
