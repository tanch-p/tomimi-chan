import ISStagesList from './data/stages/is_stages_list.json' assert { type: 'json' };

const LANGUAGES = ['en', 'jp'];
const PAGES = ['about', 'credits', 'mizuki', 'phantom'];

export const pagesToRender = LANGUAGES.reduce(
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
);