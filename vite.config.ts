import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import legacy from '@vitejs/plugin-legacy';

const config: UserConfig = {
	plugins: [
		legacy({
			targets: ['defaults', 'not IE 11'],
			modernPolyfills: true,
            renderLegacyChunks: false
		}),
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
