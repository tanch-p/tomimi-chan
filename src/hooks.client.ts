import { init } from '@jill64/sentry-sveltekit-cloudflare/client';

const onError = init(import.meta.env.SENTRY_DSN);

export const handleError = onError((e, sentryEventId) => {
	// Your Error Handler
	return;
});
