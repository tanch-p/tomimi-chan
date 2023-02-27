import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { building } from '$app/environment';

export const load = (async ({ request }) => {
	let language = 'en';
	if (!building) {
		const acceptLanguage = request.headers.get('accept-language')?.split(',')[0];
		if (acceptLanguage.match(/jp|ja/i)) {
			language = 'jp';
		} else if (acceptLanguage.includes('zh')) {
			language = 'zh';
		}
	}
	throw redirect(307, `/${language}`);
}) satisfies PageServerLoad;
