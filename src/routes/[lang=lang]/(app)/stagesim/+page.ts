import type { PageLoad } from './$types';
import type { Language } from '$lib/types';
import { activityIdStore, stageIdStore } from './stores';

export const load = (async ({ params }) => {
	const language: Language = params.lang;
<<<<<<< HEAD
	activityIdStore.set(language === 'zh' ? 'crisis' : 'act2mainss');
	stageIdStore.set(language === 'zh' ? 'level_recalrune_01-01' : 'main_15-01');
	return {
		pageType: "all",
=======
	activityIdStore.set(language === 'zh' ? 'act45side' : 'act2mainss');
	stageIdStore.set(language === 'zh' ? 'act45side_ex08' : 'main_15-01');
	return {
		pageType: 'all',
>>>>>>> 9e2e0f0b2570631eaaf4a4be02eb3805ca7a9eee
		language
	};
}) satisfies PageLoad;
