import type { ParamMatcher } from '@sveltejs/kit';

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
export const match = ((param) => {
	return cc12stages.includes(param);
}) satisfies ParamMatcher;
