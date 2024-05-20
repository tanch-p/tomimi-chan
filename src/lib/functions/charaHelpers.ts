import type { Language } from '$lib/types';

export const convertStatKeys = {
	hp: 'hp',
	maxHp: 'hp',
	max_hp: 'hp',
	magicResistance: 'res',
	attackSpeed: 'aspd',
	attack_speed: 'aspd',
	moveSpeed: 'ms',
	respawnTime: 'respawnTime',
	block_cnt: 'blockCnt',
	blockCnt: 'blockCnt',
	atk: 'atk',
	def: 'def',
	cost: 'cost'
};

const revertStatKey = (statKey) => {
	switch (statKey) {
		case 'hp':
			return 'max_hp';
		case 'aspd':
			return 'attack_speed';
		case 'blockCnt':
			return 'block_cnt';
		default:
			return statKey;
	}
};

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

export const getCharaList = async () => {
	const data = (await import('../data/chara/characters.json')).default;
	const images = await Promise.all(
		data.map((chara) => import(`../images/chara_icons/icon_${chara.id}.webp`))
	);
	data.forEach((chara, index) => (chara.icon = images[index].default));
	return data;
};

export const getModuleNewTalent = (module, stage: number, language:Language) => {
	if (!module?.combatData) return;
	for (const part of module.combatData.phases[stage].parts) {
		if (
			!part.isToken &&
			part.target.includes('TALENT') &&
			part.talentIndex === -1 &&
			part.name_zh
		) {
			return {
				name: part[`name_${language}`] || part.name_zh,
				desc: part[`upgradeDesc_${language}`] || part.upgradeDesc_zh
			};
		}
	}
};

export const getModuleTrait = (trait, module, stage: number, language: Language) => {
	if (!module?.combatData) return trait;
	for (const part of module.combatData.phases[stage].parts) {
		if ((!part.isToken && part.target.includes('TRAIT')) || part.target === 'DISPLAY') {
			if (part.addDesc_zh) return trait + '\n' + (part[`addDesc_${language}`] || part.addDesc_zh);
			if (part.overrideDesc_zh) return part[`overrideDesc_${language}`] || part[`overrideDesc_zh`];
		}
	}
	return trait;
};
export const getModuleTalentDesc = (idx, module, stage: number, language: Language) => {
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
export const getTokenModuleTalent = (idx, module, stage: number, language: Language) => {
	if (!module?.combatData) return;
	for (const part of module.combatData.phases[stage].parts) {
		if (
			part.isToken &&
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

export const getFullCharaStat = (statKey, chara, moduleStat, potStat) => {
	let stat = chara['stats'][statKey];
	if (statKey === 'aspd') {
		return (
			Math.round(
				(stat / ((100 + (chara?.favorData?.[statKey] ?? 0) + moduleStat + potStat) / 100)) * 100
			) / 100
		);
	} else {
		stat += chara?.favorData?.[statKey] ?? 0;
		stat += moduleStat;
		stat += potStat;
	}
	return stat;
};
export const getModuleStat = (statKey, attributeBlackboard) => {
	if (attributeBlackboard) {
		for (const item of attributeBlackboard) {
			const key = revertStatKey(statKey);
			if (item.key === key) {
				return item.value;
			}
		}
	}
	return 0;
};

export const getTotalPotStat = (statKey, potential) => {
	let value = 0;
	for (const pot of potential) {
		if (pot.attribute?.[statKey]) {
			value += pot.attribute[statKey];
		}
	}
	return value;
};
