import { init } from '@jill64/sentry-sveltekit-cloudflare/client';

const onError = init('https://ce38246326c82fe9215cd687cbdc71f2@o4508801302003712.ingest.us.sentry.io/4508801303511040');

export const handleError = onError((e, sentryEventId) => {
	// Your Error Handler
	return;
});
