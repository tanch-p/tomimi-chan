import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { building } from '$app/environment';

export const load = (async ({ request }) => {
	let language = 'en';
	if (building) {
		return;
	}
	const userAgent = request.headers.get('user-agent');

	if (!userAgent) {
		throw redirect(308, `/en`);
	} else if (userAgent.toLowerCase().includes('baidu')) {
		throw redirect(308, `/zh`);
	} else if (userAgent.toLowerCase().includes('bot')) {
		throw redirect(308, '/en');
	}

	const acceptLanguage = request.headers.get('accept-language')?.split(',')[0];

	if (!acceptLanguage) {
		throw redirect(307, `/en`);
	}

	if (acceptLanguage.match(/ja|ja/i)) {
		language = 'ja';
	} else if (acceptLanguage.includes('zh')) {
		language = 'zh';
	}

	throw redirect(307, `/${language}`);
}) satisfies PageServerLoad;
