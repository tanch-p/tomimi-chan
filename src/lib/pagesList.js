import ISStagesList from './data/stages/is_stages_list.json' assert { type: 'json' };

const LANGUAGES = ['en', 'ja', 'zh'];
const PAGES = ['about', 'credits', 'mizuki', 'laoli'];

export const pagesToRender = LANGUAGES.reduce((acc, language) => {
	for (const page of PAGES) {
		acc.push(`/${language}/${page}`);
	}
	for (const stage of ISStagesList) {
		let stageName = stage.code + '_' + (stage[`name_${language}`] || stage['name_zh']);
		if (stage['name_zh'] === '「」') {
			stageName = 'ro4_b_9';
		}
		acc.push(`/${language}/stages/${stageName}`);
	}
	return acc;
}, []);
