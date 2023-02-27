import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
import ISStagesList from './src/lib/data/stages/is_stages_list.json' assert { type: 'json' };

const LANGUAGES = ['en', 'jp'];
const PAGES = ['about', 'credits', 'mizuki', 'phantom'];

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		prerender: {
			entries: LANGUAGES.reduce(
				(acc, language) => {
					for (const page of PAGES) {
						acc.push(`/${language}/${page}`);
					}
					for (const stage of ISStagesList) {
						const stageName = stage.code + '_' + stage[`name_${language}`];
						acc.push(`/${language}/stages/${stageName}`);
					}
					return acc;
				},
				['/']
			)
		}
	}
};

export default config;
