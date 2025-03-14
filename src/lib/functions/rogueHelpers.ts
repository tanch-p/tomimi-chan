import type { Language } from '$lib/types';

export function getSkzdwzDesc(descList: [string], difficulty: number, language: Language) {
	const tooltip = {
		zh: '\n$N14$: 处于年代印痕中的敌人受到的{phys}与{arts}伤害降低50%',
		ja: '\n$14難$: <時代の爪痕>にいる敵が受ける{phys}と{arts}ダメージが50%減少',
		en: '\n$D14$: Enemies in Mark of Ages take 50% reduced {phys}/{arts} damage'
	};
	let desc = descList[0];
	desc = desc.replace('<value>', difficulty >= 9 ? '$130$' : '100');
	desc = desc.replace('<N14>', difficulty >= 14 ? tooltip[language] : '');

	return [desc];
}
