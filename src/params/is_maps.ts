import type { ParamMatcher } from '@sveltejs/kit';
import stagesList from '$lib/data/stages/stages_list.json';

export const match = ((param) => {
	return !!stagesList.find((stage) => {
		const { code, name_cn, name_jp, name_en } = stage;
		const possibleStageNames = [code + '_' + name_cn, code + '_' + name_jp, code + '_' + name_en];
		return possibleStageNames.includes(param);
	});
}) satisfies ParamMatcher;
