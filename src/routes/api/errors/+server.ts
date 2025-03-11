import { ERROR_SERVER } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { errorData } = await request.json();
		await fetch(ERROR_SERVER, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(
				errorData
			)
		});
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		console.error('Failed to log client error:', error);
		return new Response(JSON.stringify({ success: false, error: 'Failed to log error' }), {
			status: 500
		});
	}
};
