import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

const config: UserConfig = {
	plugins: [
		sveltekit(),
		visualizer({
			emitFile: true,
			filename: 'stats.html'
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
