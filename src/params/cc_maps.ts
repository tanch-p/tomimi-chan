import type { ParamMatcher } from '@sveltejs/kit';
import { findCCStage } from '$lib/functions/findStage';

export const match = ((param) => {
	return !!findCCStage(param);
}) satisfies ParamMatcher;
