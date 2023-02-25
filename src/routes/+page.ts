import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (() => {
	throw redirect(307, '/en/');
}) satisfies PageLoad;
