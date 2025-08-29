import type { PageLoad } from './$types';
import type { Language } from '$lib/types';
import { activityIdStore, stageIdStore } from './stores';

export const load = (async ({ params }) => {
	const language: Language = params.lang;
	activityIdStore.set(language === 'zh' ? 'main_3' : 'act2mainss');
	stageIdStore.set(language === 'zh' ? 'main_03-01' : 'main_15-01');
	return {
		pageType: "all",
		language
	};
}) satisfies PageLoad;
