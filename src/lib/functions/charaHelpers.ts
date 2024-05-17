import type { Language } from '$lib/types';

//goes through talent and skills blackboard and gets maximum value of key
export const getMaxValue = (chara, key) =>
	Math.max(
		chara.skills.reduce((acc, curr) => {
			const value = curr.blackboard.find((ele) => ele.key === key)?.value ?? 0;
			return (acc = Math.max(acc, value));
		}, 0),
		chara.talents.reduce((acc, curr) => {
			const value = curr.blackboard.find((ele) => ele.key === key)?.value ?? 0;
			return (acc = Math.max(acc, value));
		}, 0),
		chara.uniequip
			.filter((equip) => equip.combatData)
			.reduce((acc, curr) => {
				const value = curr.combatData.blackboard.find((ele) => ele.key === key)?.value ?? 0;
				return (acc = Math.max(acc, value));
			}, 0)
	);

export const updateSortPriority = (sortOptions, index) => {
	const valueToRemove = sortOptions[index].priority;

	return sortOptions.map((ele, i) => {
		if (i === index) {
			ele.priority = null;
		}
		if (ele.priority && ele.priority > valueToRemove) {
			ele.priority -= 1;
		}
		return ele;
	});
};

export const getCharaImages = (chara_list) =>
	chara_list.map((chara) => import(`../images/chara_icons/icon_${chara.id}.webp`));

export const getModuleUpdatedTrait = (trait, module, stage: number, language: Language) => {
	if (!module?.combatData) return trait;
	for (const part of module.combatData.phases[stage].parts) {
		if ((!part.isToken && part.target.includes('TRAIT')) || part.target === 'DISPLAY') {
			if (part.addDesc_zh) return trait + '\n' + (part[`addDesc_${language}`] || part.addDesc_zh);
			if (part.overrideDesc_zh) return part[`overrideDesc_${language}`] || part[`overrideDesc_zh`];
		}
	}
	return trait;
};
export const getModuleUpdatedTalent = (idx, module, stage: number, language: Language) => {
	if (!module?.combatData) return;
	for (const part of module.combatData.phases[stage].parts) {
		if (
			!part.isToken &&
			part.target.includes('TALENT') &&
			part.talentIndex === idx &&
			part.upgradeDesc_zh
		)
			return part[`upgradeDesc_${language}`] || part[`upgradeDesc_zh`];
	}
};
export const getModuleUpdatedRange = (rangeId, module) => {
	if (!module?.combatData) return rangeId;
	for (const part of module.combatData.phases[0].parts) {
		if (!part.isToken && part.target.includes('TALENT') && part.talentIndex === -1 && part.rangeId)
			return part.rangeId;
	}
	return rangeId;
};
