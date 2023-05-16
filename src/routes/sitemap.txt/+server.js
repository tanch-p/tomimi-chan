import { pagesToRender } from '$lib/pagesList';

export async function GET() {
	return new Response(pagesToRender.filter((url) => !url.includes('credit')).join('\n'), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
}
