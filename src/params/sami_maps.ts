import type { ParamMatcher } from '@sveltejs/kit';
import findStage from '$lib/functions/findStage';

export const match = ((param) => {
	return !!findStage(param, 'rogue_sami');
}) satisfies ParamMatcher;
