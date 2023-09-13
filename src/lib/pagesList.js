import ISStagesList from './data/stages/is_stages_list.json' assert { type: 'json' };

const cc12stages = [
	'迷雾战区_12-1',
	'尚蜀山道_12-1',
	'盐风溶洞_12-1',
	'伦蒂尼姆边缘区块_12-1',
	'小丘郡物流站_12-1',
	'在建沙滩_12-1',
	'冻原矿场_12-1',
	'盐风溶洞_12-2',
	'伦蒂尼姆边缘区块_12-2',
	'小丘郡物流站_12-2',
	'在建沙滩_12-2',
	'冻原矿场_12-2',
	'迷雾战区_12-2',
	'无名庇护所',
];

const LANGUAGES = ['en', 'ja', 'zh'];
const PAGES = ['about', 'credits', 'mizuki','cc','laoli'];

export const pagesToRender = LANGUAGES.reduce((acc, language) => {
	for (const page of PAGES) {
		acc.push(`/${language}/${page}`);
	}
	for (const stage of ISStagesList) {
		const stageName = stage.code + '_' + (stage[`name_${language}`] || stage['name_zh']);
		acc.push(`/${language}/stages/${stageName}`);
	}
	for (const stage of cc12stages) {
		acc.push(`/${language}/stages/${stage}`);
	}
	return acc;
}, []);
