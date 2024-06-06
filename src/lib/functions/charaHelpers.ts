import type { Language } from '$lib/types';
import filterOptions from '$lib/data/chara/filter_options.json';

const SEARCH_IN_TAGS = [
	'weightless',
	'stealth',
	'ally_stealth',
	'camouflage',
	'ally_camouflage',
	'taunt',
	'ally_taunt',
	'undying',
	'ally_undying',
	'lower_target_priority',
	'ally_lower_target_priority',
	'min_damage',
	'spareshot',
	'revive',
	'resist',
	'ally_resist',
	'reflect_dmg',
	'ally_reflect_dmg',
	'dot',
	'first_token_free',
	'global_move_speed_down',
	'global_heal',
	'ignore_evasion',
	'ally_block_up',
	'ally_block_down',
	'stop_attack',
	'limited_use',
	'unlimited_duration',
	'charged',
	'overdrive',
	'activate_skill',
	'ignore_status',
	'status_immune',
	'inspire',
	'berserk',
	'vigor',
	'skill_time_invincible',
	'enemy_priority',
	'reallocate_hp',
	'erase_projectile',
	'slow_projectile',
	'aspd_unrelated',
	'ailment_but_skill_cont',
	'execute',
	'ally_respawn_time',
	'env_dmg_reduce',
	'ally_env_dmg_reduce',
	'crit_wound',
	'squad_effect',
	'barrier',
	'ally_barrier',
	'infected',
	'starting_cost',
	'enemy_hp',
	'terrain_water',
	'true',
	'apoptosis',
	'burning',
	'apoptosis_scale',
	'change_target_priority',
	'remove_status',
	'dot',
	'starting_cost',
	'fast_redeploy',
	'heal_ally',
	'heal_self',
	'type_flying',
	'priority_ranged',
	'pioneer',
	'warrior',
	'sniper',
	'tank',
	'medic',
	'support',
	'caster',
	'special',
	'three_star',
	'skill_invincible'
];
const SEARCH_IN_BLACKBOARD = [
	'cancel_stealth',
	'stun',
	'sluggish',
	'sleep',
	'silence',
	'cold',
	'levitate',
	'root',
	'tremble',
	'max_hp_up',
	'def_up',
	'res_up',
	'attack_speed',
	'respawn_time',
	'atk_down',
	'def_down',
	'res_down',
	'ms_down',
	'aspd_down',
	'ally_max_hp',
	'ally_atk',
	'ally_def',
	'ally_res',
	'ally_aspd',
	'ally_block_up',
	'ally_cost_down',
	'phys_evasion',
	'ally_phys_evasion',
	'arts_evasion',
	'ally_arts_evasion',
	'ally_dmg_res_phys',
	'ally_dmg_res_arts',
	'dmg_res_phys',
	'dmg_res_arts',
	'shield',
	'ally_shield',
	'block_dmg',
	'ally_block_dmg',
	'sp_gain',
	'ally_sp_regen',
	'ally_sp_gain',
	'ally_sp_stock',
	'def_penetrate',
	'def_penetrate_fixed',
	'res_penetrate_fixed',
	'damage_scale',
	'ally_damage_scale',
	'sp_regen',
	'elementfragile',
	'magicfragile',
	'fragile',
	'ally_heal_scale',
	'heal_scale',
	'cost_return',
	'block_up',
	'block_down',
	'phys_hitrate_down',
	'arts_hitrate_down',
	'protect',
	'ally_protect',
	'block_no_attack',
	'force'
];

export const genSecFilterOptions = (characters: []) => {
	const obj = {};
	const findAndAddKeyEntries = (item) => {
		if (SEARCH_IN_BLACKBOARD.includes(item.key)) {
			for (const [key, value] of Object.entries(item)) {
				if (!obj[item.key]) {
					obj[item.key] = {};
				}
				if (!obj[item.key][key]) {
					obj[item.key][key] = [];
				}
				if (Array.isArray(value)) {
					value?.forEach((val) => {
						if (!obj[item.key][key].includes(val)) {
							obj[item.key][key].push(val);
						}
					});
				} else if (['category'].includes(key)) {
					if (!obj[item.key][key].includes(value)) {
						obj[item.key][key].push(value);
					}
				}
			}
		}
	};
	for (const char of characters) {
		char.blackboard.forEach((item) => findAndAddKeyEntries(item)) ||
			char.skills.forEach((skill) =>
				skill.blackboard.forEach((item) => findAndAddKeyEntries(item))
			) ||
			char.talents.forEach((talent) =>
				talent.blackboard.forEach((item) => findAndAddKeyEntries(item))
			) ||
			char.uniequip
				.filter((equip) => equip.combatData)
				.forEach((equip) =>
					equip.combatData.blackboard.forEach((item) => findAndAddKeyEntries(item))
				) ||
			char.tokens?.forEach((token) =>
				token.blackboard.forEach((item) => findAndAddKeyEntries(item))
			);
	}
	return obj;
};

const getSecFilterDisplayKey = (key, subKey) => {
	switch (subKey) {
		case 'types':
			return 'damage_type';
		case 'value':
			switch (key) {
				case 'stun':
				case 'sluggish':
				case 'sleep':
				case 'silence':
				case 'cold':
				case 'levitate':
				case 'root':
					return 'duration';
				default:
					return;
			}
		default:
			return subKey;
	}
};
const getWeights = (key) => {
	switch (key) {
		case 'condition_none':
			return 0;
		case 'enemy_melee':
		case 'flying':
			return 1;
		case 'stun':
			return 2;
		case 'sleep':
			return 3;
		case 'silence':
			return 4;
		case 'cold':
		case 'freeze':
			return 5;
		case 'levitate':
		case 'root':
		case 'sluggish':
			return 6;
		case 'phys':
			return 7;
		case 'arts':
			return 8;
		case 'true':
			return 9;
		case 'ele_dmg':
			return 10;
		case 'melee_attack':
			return 11;
		case 'ranged_attack':
			return 12;
		default:
			if (key.includes('hp')) {
				return 99;
			}
			return 98;
	}
};

const sortSecFilterOptions = (a, b) => {
	return getWeights(a) - getWeights(b);
};

export const getSecFilterOptions = (key, store) => {
	let storeVal;
	store.subscribe((val) => (storeVal = val));
	const optionsList = Object.entries(storeVal?.[key] ?? {}).filter(
		([_, options]) => options.length > 0
	);
	const returnArr = optionsList.map(([subKey, options]) => {
		if (subKey === 'conditions') {
			options.push('condition_none');
		}
		return {
			subKey: subKey,
			displayKey: getSecFilterDisplayKey(key, subKey),
			options: options.sort(sortSecFilterOptions),
			type: 'options'
		};
	});
	switch (key) {
		case 'force':
			returnArr.push({
				subKey: 'tags',
				displayKey: '',
				options: ['push', 'pull'],
				type: 'options'
			});
			break;
		case 'stun':
		case 'sluggish':
		case 'sleep':
		case 'silence':
		case 'cold':
		case 'levitate':
		case 'root':
			returnArr.push({
				subKey: 'value',
				suffix: 'duration',
				sign: 'gte',
				value: 0,
				type: 'compare'
			});
			break;
	}
	return returnArr;
};

const keyTable = {
	force: 'force_tag',
	ally_block_dmg: 'block_dmg'
};
export const getOptionTranslationKey = (option) => {
	return keyTable?.[option] ?? option;
};
export const getSortDisplayKey = (key) => {
	return key;
};

export const professionWeights = {
	PIONEER: 0,
	WARRIOR: 1,
	SNIPER: 2,
	TANK: 3,
	MEDIC: 4,
	SUPPORT: 5,
	CASTER: 6,
	SPECIAL: 7
};

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

export function isSubset(arr1, arr2) {
	const set1 = new Set(arr1);
	const set2 = new Set(arr2);

	for (const elem of set1) {
		if (!set2.has(elem)) {
			return false;
		}
	}

	return true;
}
export function someCheck(itemArr, selectedOptions) {
	let noneCheck = false;
	if (selectedOptions.includes('condition_none')) {
		noneCheck = !Boolean(itemArr);
	}
	return (itemArr ?? []).some((val) => selectedOptions.includes(val)) || noneCheck;
}

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
export const getMaxValue = (chara, key, subKey) => {
	const defaultValue = getDefaultValue(subKey);
	return Math.max(
		chara.skills.reduce((acc, curr) => {
			let value = 0;
			const item = curr.blackboard.find((ele) => ele.key === key);
			if (item) value = item[subKey] ?? defaultValue;
			return (acc = Math.max(acc, value));
		}, 0),
		chara.talents.reduce((acc, curr) => {
			let value = 0;
			const item = curr.blackboard.find((ele) => ele.key === key);
			if (item) value = item[subKey] ?? defaultValue;
			return (acc = Math.max(acc, value));
		}, 0),
		chara.uniequip
			.filter((equip) => equip.combatData)
			.reduce((acc, curr) => {
				let value = 0;
				const item = curr.combatData.blackboard.find((ele) => ele.key === key);
				if (item) value = item[subKey] ?? defaultValue;
				return (acc = Math.max(acc, value));
			}, 0)
	);
};
export const getDefaultValue = (key) => {
	switch (key) {
		case 'duration':
			return 999;
		case 'prob':
			return 1;
		default:
			return 0;
	}
};

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

export const getCharaList = async (language) => {
	const data = (await import(`../data/chara/characters_${language}.json`)).default;
	const images = await Promise.all(
		data.map((chara) => import(`../images/chara_icons/icon_${chara.id}.webp`))
	);
	data.forEach((chara, index) => (chara.icon = images[index].default));
	return data;
};

export const getSkillImgUrl = (skillId) => {
	switch (skillId) {
		case 'skchr_svrash_1':
		case 'skchr_huang_1':
		case 'skchr_lessng_1':
			return 'skcom_powerstrike[3]';
		case 'skchr_jesica_1':
		case 'skchr_caper_1':
		case 'skchr_doberm_1':
		case 'skchr_bryota_1':
		case 'skchr_savage_1':
		case 'skchr_luton_1':
			return 'skcom_powerstrike[2]';
		case 'skchr_stward_1':
			return 'skcom_powerstrike[1]';
		case 'skchr_midn_1':
			return 'skill_icon_skcom_enchant[1]';
		default:
			return skillId;
	}
};

export const getModuleNewTalent = (module, stage: number) => {
	if (!module?.combatData) return;
	for (const part of module.combatData.phases[stage].parts) {
		if (!part.isToken && part.target.includes('TALENT') && part.talentIndex === -1 && part.name) {
			return {
				name: part.name,
				desc: part.upgradeDesc
			};
		}
	}
};

export const getModuleTrait = (trait, module, stage: number) => {
	if (!module?.combatData) return trait;
	for (const part of module.combatData.phases[stage].parts) {
		if ((!part.isToken && part.target.includes('TRAIT')) || part.target === 'DISPLAY') {
			if (part.addDesc) return trait + '\n' + part.addDesc;
			if (part.overrideDesc) return part.overrideDesc;
		}
	}
	return trait;
};
export const getModuleTalentDesc = (idx, module, stage: number) => {
	if (!module?.combatData) return;
	for (const part of module.combatData.phases[stage].parts) {
		if (
			!part.isToken &&
			part.target.includes('TALENT') &&
			part.talentIndex === idx &&
			part.upgradeDesc
		)
			return part.upgradeDesc;
	}
};
export const getTokenModuleTalent = (module, stage: number) => {
	if (!module?.combatData) return;
	for (const part of module.combatData.phases[stage].parts) {
		if (part.isToken && part.target.includes('TALENT') && part.upgradeDesc) return part.upgradeDesc;
	}
};
export const getModuleUpdatedRange = (rangeId, module, stage, talentIndex = -1) => {
	if (!module?.combatData) return rangeId;
	for (const part of module.combatData.phases[stage].parts) {
		if (
			!part.isToken &&
			part.target.includes('TALENT') &&
			part.talentIndex === talentIndex &&
			part.rangeId
		)
			return part.rangeId;
	}
	return rangeId;
};
export const getSkillRangeId = (skill, char, moduleIndex, moduleStage) => {
	if (skill.levels?.[0]?.rangeId?.includes('get_talent')) {
		const splitStr = skill.levels?.[0]?.rangeId.split('_');
		const index = parseInt(splitStr[splitStr.length - 1]) - 1;
		const talentRangeId = char.talents[index].rangeId;
		return getModuleUpdatedRange(talentRangeId, char.uniequip[moduleIndex], moduleStage, index);
	}
	return null;
};
export const getAttackRangeId = (char, moduleIndex, moduleStage) => {
	let rangeId = char.stats.rangeId;
	for (const talent of char.talents) {
		if (talent.tags.includes('override_range')) {
			rangeId = talent.rangeId;
		}
	}
	return getModuleUpdatedRange(rangeId, char.uniequip[moduleIndex], moduleStage);
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

export const getTokenPosition = (token, uniequip) => {
	switch (uniequip?.typeIcon) {
		case 'trp-d':
			return 'all';
		default:
			return token.position.toLowerCase();
	}
};

export const getActiveModule = (char, filtersStore) => {
	for (const curr of filtersStore) {
		const selectedOptions = curr.options
			.map((option) => option.selected && option.value)
			.filter(Boolean);
		if (selectedOptions.length === 0) {
			continue;
		}
		switch (curr.key) {
			case 'deployable_tile':
				if (
					!selectedOptions.some(
						(val) => char.position === val || char.tags.includes('position_all')
					)
				) {
					return char.uniequip
						.filter((equip) => equip.combatData)
						.find((equip) => equip.combatData.tags.includes('position_all'));
				}
				break;
			case 'blockCnt':
				if (
					selectedOptions.includes(4) &&
					char.stats.blockCnt !== 4 &&
					!char.tokens?.some((token) => token.tags.includes('block_4'))
				) {
					return char.uniequip
						.filter((equip) => equip.combatData)
						.find((equip) => equip.combatData.tags.includes('block_4'));
				}
				break;
			case 'tags':
				if (
					!(
						selectedOptions.some((tag) => char.tags.includes(tag)) ||
						char.skills.some((skill) => selectedOptions.some((tag) => skill.tags.includes(tag))) ||
						char.talents.some((talent) =>
							selectedOptions.some((tag) => talent.tags.includes(tag))
						) ||
						char.tokens.some((token) => selectedOptions.some((tag) => token.tags.includes(tag)))
					)
				) {
					return char.uniequip
						.filter((equip) => equip.combatData)
						.find((equip) => selectedOptions.some((tag) => equip.combatData.tags.includes(tag)));
				}
				break;
			case 'blackboard':
				if (
					!(
						char.blackboard.find((item) => selectedOptions.includes(item.key)) ||
						char.skills.some((skill) =>
							skill.blackboard.find((item) => selectedOptions.includes(item.key))
						) ||
						char.talents.some((talent) =>
							talent.blackboard.find((item) => selectedOptions.includes(item.key))
						) ||
						char.tokens?.some((token) =>
							token.blackboard.find((item) => selectedOptions.includes(item.key))
						)
					)
				) {
					return char.uniequip
						.filter((equip) => equip.combatData)
						.find((equip) =>
							equip.combatData.blackboard.find((item) => selectedOptions.includes(item.key))
						);
				}
				break;
			default:
				break;
		}
	}
	return;
};

export const addOptionsToAcc = (acc, options) => {
	const blackboardIndex = acc.findIndex((ele) => ele.key === 'blackboard');
	const tagsIndex = acc.findIndex((ele) => ele.key === 'tags');
	const blackboardOptions = options
		.filter((value) => SEARCH_IN_BLACKBOARD.includes(value?.value ?? value))
		.map((value) => {
			return { value: value?.value ?? value, selected: false };
		});
	const tagOptions = options
		.filter((value) => SEARCH_IN_TAGS.includes(value?.value ?? value))
		.map((value) => {
			return { value: value?.value ?? value, selected: false };
		});
	if (blackboardIndex === -1) {
		acc.push({
			key: 'blackboard',
			options: blackboardOptions
		});
	} else {
		acc[blackboardIndex].options = [...acc[blackboardIndex].options, ...blackboardOptions];
	}
	if (tagsIndex === -1) {
		acc.push({
			key: 'tags',
			options: tagOptions
		});
	} else {
		acc[tagsIndex].options = [...acc[tagsIndex].options, ...tagOptions];
	}
};

export const getCategory = (value) => {
	return SEARCH_IN_BLACKBOARD.includes(value) ? 'blackboard' : 'tags';
};

export const getSelectedFilterOptions = (categories, filtersStore) => {
	return categories.reduce((acc, { optionKey }) => {
		for (const { key, value } of filterOptions[optionKey]) {
			const category = getCategory(value);
			const selected = filtersStore
				.find((ele) => ele.key === category)
				.options.find((ele) => ele.value === value)?.selected;
			if (selected) {
				acc.push({ key, value });
			}
		}
		return acc;
	}, []);
};

export const updateFilters = (key, value, store) => {
	store.update((list) => {
		const catIndex = list.findIndex((ele) => ele.key === key);
		const optionIndex = list[catIndex].options.findIndex((ele) => ele.value === value);
		list[catIndex].options[optionIndex].selected = !list[catIndex].options[optionIndex].selected;
		return list;
	});
};
export const adjustSortPriority = (list) => {
	const adjustedPriorities = list
		.filter((ele) => ele.priority)
		.sort((a, b) => a.priority - b.priority)
		.reduce((acc, { key }, i) => {
			acc[key] = i + 1;
			return acc;
		}, {});
	return list.map(({ key, subKey, suffix, order, priority }) => {
		return { key, subKey, suffix, order, priority: priority ? adjustedPriorities[key] : null };
	});
};

export const getSortOptions = (key) => {
	const list = [];
	switch (true) {
		case [
			'stun',
			'sluggish',
			'sleep',
			'silence',
			'cold',
			'levitate',
			'root',
			'tremble',
			'cancel_stealth'
		].includes(key):
			list.push({ key, subKey: 'value', suffix: 'duration', order: -1, priority: -1 });
			break;
		case ['damage_scale'].includes(key):
			list.push({ key, subKey: 'value', suffix: null, order: -1, priority: -1 });
			list.push({ key, subKey: 'duration', suffix: 'duration', order: 0, priority: null });
			break;
		case [
			'phys_evasion',
			'ally_phys_evasion',
			'arts_evasion',
			'ally_arts_evasion',
			'ally_dmg_res_phys',
			'ally_dmg_res_arts',
			'dmg_res_phys',
			'dmg_res_arts'
		].includes(key):
			list.push({ key, subKey: 'value', suffix: 'prob', order: -1, priority: -1 });
			list.push({ key, subKey: 'duration', suffix: 'duration', order: 0, priority: null });
			break;
		case ['block_dmg', 'ally_block_dmg'].includes(key):
			list.push({ key, subKey: 'value', suffix: 'prob', order: 0, priority: null });
			list.push({ key, subKey: 'duration', suffix: 'duration', order: 0, priority: null });
			break;
		default:
			list.push({
				key,
				subKey: 'value',
				displayKey: getSortDisplayKey(key),
				suffix: null,
				order: -1,
				priority: -1
			});
			break;
	}

	return list;
};
