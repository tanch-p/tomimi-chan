import { init } from '@jill64/sentry-sveltekit-cloudflare/server';
const { onHandle, onError } = init('https://ce38246326c82fe9215cd687cbdc71f2@o4508801302003712.ingest.us.sentry.io/4508801303511040');

export const handle = onHandle();
export const handleError = onError((_, sentryEventId) => {
	return {
		message: 'This error was successfully sent to Sentry',
		sentryEventId
	};
});
