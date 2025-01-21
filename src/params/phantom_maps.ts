import type { ParamMatcher } from '@sveltejs/kit';
import validateStage from '$lib/functions/validateStage';

export const match = ((param) => {
	return !!validateStage(param, 'rogue_phantom');
}) satisfies ParamMatcher;
