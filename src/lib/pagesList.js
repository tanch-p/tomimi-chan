import ISStagesList from './data/stages/is_stages_list.json' assert { type: 'json' };

const cc11stages = [
	'冻原矿场_11-1',
	'冻原矿场_11-1',
	'沙海遗迹_11-1',
	'大骑士领酒吧街_11-1',
	'盐风溶洞_11-1',
	'尚蜀山道_11-1',
	'伦蒂尼姆边缘区块_11-1',
	'小丘郡物流站_11-1',
	'大骑士领酒吧街_11-2',
	'盐风溶洞_11-2',
	'尚蜀山道_11-2',
	'伦蒂尼姆边缘区块_11-2',
	'小丘郡物流站_11-2',
	'冻原矿场_11-2',
	'在建沙滩'
];

const LANGUAGES = ['en', 'ja', 'zh'];
const PAGES = ['about', 'credits', 'mizuki', 'phantom'];

export const pagesToRender = LANGUAGES.reduce((acc, language) => {
	for (const page of PAGES) {
		acc.push(`/${language}/${page}`);
	}
	for (const stage of ISStagesList) {
		const stageName = stage.code + '_' + (stage[`name_${language}`] || stage['name_zh']);
		acc.push(`/${language}/stages/${stageName}`);
	}
	for (const stage of cc11stages) {
		acc.push(`/${language}/stages/${stage}`);
	}
	return acc;
}, []);
