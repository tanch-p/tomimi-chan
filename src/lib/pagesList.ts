import ISStages from './data/stages/stage_name_lookup_table.json' assert { type: 'json' };

const LANGUAGES = ['en', 'ja', 'zh'];
const PAGES = ['about', 'credits', 'laoli', 'recruit', 'mizuki', 'phantom', 'sarkaz', 'sami'];

const IS_STAGES_LIST = Object.keys(ISStages).reduce((acc, { key, lang }) => {
	if (lang === 'ALL') {
		const list = LANGUAGES.map((language) => `/${language}/stages/${key}`);
		acc = acc.concat(list);
	} else {
		acc.push(`/${lang}/stages/${key}`);
	}
	return acc;
}, []);

export const pagesToRender = LANGUAGES.reduce((acc, language) => {
	for (const page of PAGES) {
		acc.push(`/${language}/${page}`);
	}
	return acc;
}, []).concat(IS_STAGES_LIST);
