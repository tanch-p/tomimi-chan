import { init } from '@jill64/sentry-sveltekit-cloudflare/server';

const { onHandle, onError } = init(import.meta.env.SENTRY_DSN);

export const handle = onHandle();
export const handleError = onError((_, sentryEventId) => {
	return {
		message: 'This error was successfully sent to Sentry',
		sentryEventId
	};
});
