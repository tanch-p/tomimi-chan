import { redirect, type ParamMatcher } from '@sveltejs/kit';

const languages = ['en', 'ja', 'zh'];

export const match = ((param) => {
	return languages.includes(param);
}) satisfies ParamMatcher;
