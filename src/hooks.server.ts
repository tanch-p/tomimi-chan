import type { HandleServerError } from '@sveltejs/kit';
import { building, dev } from '$app/environment';
import { ERROR_SERVER } from '$env/static/private';

export const handleError: HandleServerError = async ({ error, event }) => {
	console.error('Server error:', error);
	if(dev || building) return;
	const errorData = {
		message: error.message || 'Unknown error',
		stack: error.stack,
		url: event.url.pathname,
		side:"SERVER",
    	userAgent:navigator.userAgent,
		href: window?.location?.href || ""
	};
	if(error?.status == 404){
		return;
	}
	const res = await fetch(ERROR_SERVER, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(
			errorData
		)
	});
};
