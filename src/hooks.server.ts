import type { HandleServerError } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { ERROR_SERVER } from '$env/static/private';

export const handleError: HandleServerError = async ({ error, event }) => {
	if(dev) return;
	console.error('Server error:', error);
	const errorData = {
		message: error.message || 'Unknown error',
		stack: error.stack,
		url: event.url.pathname,
		side:"SERVER"
	};
	if(error?.message?.includes("Not found")){
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
