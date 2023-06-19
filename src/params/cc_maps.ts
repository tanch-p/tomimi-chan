import type { ParamMatcher } from '@sveltejs/kit';

export const cc11stages = [
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
	'沙海遗迹_11-2',
	'在建沙滩'
];
export const match = ((param) => {
	return cc11stages.includes(param);
}) satisfies ParamMatcher;
