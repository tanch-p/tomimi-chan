import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import { sentryVitePlugin } from '@sentry/vite-plugin';

const config: UserConfig = {
	plugins: [
		legacy({
			targets: ['defaults', 'not IE 11'],
			modernPolyfills: true,
			renderLegacyChunks: false
		}),
		sveltekit(),
		sentryVitePlugin({
			org: process.env.SENTRY_ORG,
			project: process.env.SENTRY_PROJECT,
			authToken: process.env.SENTRY_AUTH_TOKEN
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		port: 3000,
		strictPort: false
	}
};

export default config;
