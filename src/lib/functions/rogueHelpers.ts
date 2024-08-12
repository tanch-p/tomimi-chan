import type { Language } from '$lib/types';

export function getSkzdwzDesc(descList: [string], difficulty: number, language: Language) {
	let desc = descList[0];
	desc = desc.replace('<value>', difficulty >= 9 ? '$130$' : '100');
	desc = desc.replace(
		'<N14>',
		difficulty >= 14
			? language === 'zh'
				? '$N14$: 处于年代印痕中的敌人受到的物理与法术伤害降低50%'
				: language === 'ja'
				? '$14難$: <年代印痕>にいる敵が受ける物理と術ダメージが50%減少'
				: '$D14$: Enemies in <年代印痕> take 50% reduced Phys/Arts damage'
			: ''
	);

	return [desc];
}
