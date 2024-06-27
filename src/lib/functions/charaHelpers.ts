import type { Language } from '$lib/types';
import filterOptions from '$lib/data/chara/filter_options.json';
import translations from '$lib/translations.json';

const SEARCH_IN_TAGS = [
	'phys',
	'arts',
	'true',
	'ele_dmg',
	'weightless',
	'ally_stealth',
	'lower_target_priority',
	'ally_lower_target_priority',
	'min_damage',
	'spareshot',
	'revive',
	'resist',
	'ally_resist',
	'first_token_free',
	'global_move_speed_down',
	'global_heal',
	'heal_unhealable',
	'heal_on_damage',
	'ignore_evasion',
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
	'apoptosis',
	'burning',
	'apoptosis_scale',
	'change_target_priority',
	'remove_status',
	'dot',
	'fast_redeploy',
	'heal_ally',
	'heal_self',
	'flying',
	'drone',
	'infection',
	'sarkaz',
	'wildanimal',
	'seamonster',
	'type_stun',
	'type_sluggish',
	'type_sleep',
	'type_silence',
	'type_freeze',
	'type_levitate',
	'type_root',
	'type_tremble',
	'blocked_enemy',
	'no_block_enemy',
	'priority_flying',
	'priority_drone',
	'priority_ranged',
	'priority_highest_weight',
	'priority_def_high',
	'priority_def_low',
	'priority_stun',
	'priority_sleep',
	'PIONEER',
	'WARRIOR',
	'SNIPER',
	'TANK',
	'MEDIC',
	'SUPPORT',
	'CASTER',
	'SPECIAL',
	'abyssal',
	'three_star',
	'robot',
	'student',
	'kazimierz',
	'rhine',
	'karlan',
	'minos',
	'position_ranged',
	'skill_invincible',
	'ally_apoptosis',
	'ignore_stealth',
	'weaken',
	'teleport_enemy',
	'add_sp_gain_option'
];
const SEARCH_IN_BLACKBOARD = [
	'stealth',
	'camouflage',
	'ally_camouflage',
	'ally_undying',
	'undying',
	'taunt',
	'ally_taunt',
	'reflect_dmg',
	'ally_reflect_dmg',
	'cancel_stealth',
	'stun',
	'sluggish',
	'sleep',
	'silence',
	'cold',
	'levitate',
	'root',
	'tremble',
	'max_hp',
	'def',
	'res',
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
	'ally_block_down',
	'ally_cost_down',
	'evasion',
	'ally_evasion',
	'ally_dmg_res',
	'dmg_res',
	'shield',
	'ally_shield',
	'block_dmg',
	'ally_block_dmg',
	'sp_gain',
	'ally_sp_regen',
	'ally_sp_gain',
	'ally_sp_stock',
	'sp_stock',
	'def_penetrate',
	'res_penetrate',
	'damage_scale',
	'ally_damage_scale',
	'sp_regen',
	'elementfragile',
	'magicfragile',
	'fragile',
	'ally_heal_scale',
	'heal_scale',
	'cost_return',
	'block',
	'hitrate_down',
	'protect',
	'ally_protect',
	'block_no_attack',
	'force',
	'trigger_time'
];

const DISPLAY_KEYS_TABLE = {
	MELEE: 'position_melee',
	RANGED: 'position_ranged',
	ALL: 'position_all',
	force: 'force_tag',
	aspd_down: 'attack_speed',
	ally_aspd: 'attack_speed',
	ally_cost_down: 'cost',
	ally_damage_scale: 'damage_scale_buff',
	ally_shield: 'buff_shield',
	shield: 'buff_shield',
	ally_block_dmg: 'block_dmg',
	ally_dmg_res: 'dmg_reduction',
	dmg_res: 'dmg_reduction',
	ally_undying: 'undying',
	ally_max_hp: 'hp',
	max_hp: 'hp',
	atk_down: 'atk',
	ally_atk: 'atk',
	def_down: 'def',
	ally_def: 'def',
	res_down: 'res',
	ally_res: 'res',
	ms_down: 'ms',
	hitrate_down: 'hitrate',
	ally_block_up: 'block_up',
	ally_block_down: 'block_down',
	ally_respawn_time: 'respawnTime',
	respawn_time: 'respawnTime',
	ally_reflect_dmg: 'reflect_dmg',
	ally_evasion: 'evasion',
	ally_env_dmg_reduce: 'env_dmg_reduce',
	ally_stealth: 'stealth',
	ally_camouflage: 'camouflage',
	ally_taunt: 'taunt',
	ally_lower_target_priority: 'lower_target_priority',
	ally_resist: 'resist',
	ally_heal_scale: 'heal_scale',
	heal_ally: 'heal_ally_others',
	ally_sp_gain: 'sp_gain',
	ally_sp_regen: 'sp_regen',
	ally_sp_stock: 'sp_stock',
	ally_apoptosis: 'apoptosis',
	status_immune: 'status_immune_text',
	heal_self: 'heal_self_others',
	bonus_flying: 'flying',
	bonus_drone: 'drone',
	bonus_infection: 'infection',
	bonus_sarkaz: 'sarkaz',
	bonus_wildanimal: 'wildanimal',
	bonus_seamonster: 'seamonster',
	bonus_blocked: 'blocked',
	bonus_no_block: 'no_block',
	bonus_stun: 'stun',
	bonus_sleep: 'sleep',
	bonus_ranged: 'enemy_ranged',
	bonus_no_attack: 'no_attack',
	type_stun: 'stun',
	type_sluggish: 'sluggish',
	type_sleep: 'sleep',
	type_silence: 'silence',
	type_freeze: 'freeze',
	type_levitate: 'levitate',
	type_root: 'root',
	type_tremble: 'tremble',
	priority_highest_weight: 'highest_weight',
	priority_flying: 'flying',
	priority_drone: 'drone',
	priority_ranged: 'enemy_ranged',
	priority_def_high: 'def_high',
	priority_def_low: 'def_low',
	priority_stun: 'stun',
	priority_sleep: 'sleep',
	dot: 'poison_damage'
};

const ENEMY_KEYS = ['atk_down', 'def_down', 'res_down', 'aspd_down', 'ms_down', 'hitrate_down'];
const ALLY_KEYS = [
	'ally_max_hp',
	'ally_atk',
	'ally_def',
	'ally_res',
	'ally_aspd',
	'ally_respawn_time',
	'ally_cost_down',
	'ally_damage_scale',
	'ally_reflect_dmg',
	'ally_block_up',
	'ally_block_down',
	'ally_evasion',
	'ally_shield',
	'ally_block_dmg',
	'ally_dmg_res',
	'ally_undying',
	'ally_env_dmg_reduce',
	'ally_stealth',
	'ally_camouflage',
	'ally_taunt',
	'ally_lower_target_priority',
	'ally_resist',
	'ally_heal_scale',
	'ally_sp_regen',
	'ally_sp_gain',
	'ally_sp_stock'
];
const SELF_KEYS = [
	'max_hp',
	'atk',
	'def',
	'res',
	'aspd',
	'respawn_time',
	'cost_down',
	'reflect_dmg',
	'block_up',
	'block_down',
	'evasion',
	'shield',
	'block_dmg',
	'dmg_res',
	'undying',
	'env_dmg_reduce',
	'stealth',
	'camouflage',
	'taunt',
	'lower_target_priority',
	'resist',
	'heal_scale',
	'sp_regen',
	'sp_gain',
	'sp_stock'
];

const KEYS_TO_CHECK_VALUE_TYPE = [
	'atk_down',
	'def_down',
	'res_down',
	'damage_scale',
	'def_penetrate',
	'ally_max_hp',
	'ally_atk',
	'ally_def',
	'max_hp',
	'def',
	'res'
];

const TARGET_AIR_KEYS = [
	'stun',
	'sluggish',
	'sleep',
	'silence',
	'cold',
	'root',
	'ms_down',
	'aspd_down',
	'res_down',
	'def_down'
];

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

const getConditionWeights = (key) => {
	switch (key) {
		case 'condition_none':
			return 0;
		case 'enemy_melee':
		case 'target_air':
		case 'flying':
		case 'others':
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
		case 'PIONEER':
		case 'WARRIOR':
		case 'SNIPER':
		case 'TANK':
		case 'MEDIC':
		case 'SUPPORT':
		case 'CASTER':
		case 'SPECIAL':
			return professionWeights[key] + 13;
		default:
			if (key.includes('hp')) {
				return 99;
			}
			return 98;
	}
};

export const getSecFilterOptions = (key, store) => {
	let storeVal;
	store.subscribe((val) => (storeVal = val));
	const optionsList = Object.entries(storeVal?.[key] ?? {}).filter(
		([_, options]) => options.length > 0
	);
	if (KEYS_TO_CHECK_VALUE_TYPE.includes(key)) {
		optionsList.push(['value_type', ['value_fixed', 'value_percent']]);
	}
	const returnArr = optionsList.map(([subKey, options]) => {
		if (subKey === 'conditions' && !options.includes('condition_none')) {
			options.push('condition_none');
		}
		if (subKey === 'targets') {
			return {
				subKey: subKey,
				displayKey: getSecFilterDisplayKey(key, subKey),
				options: ['single_target', 'few_target', 'aoe'],
				type: 'options'
			};
		}
		return {
			subKey: subKey,
			displayKey: getSecFilterDisplayKey(key, subKey),
			options: options.sort((a, b) => getConditionWeights(a) - getConditionWeights(b)),
			type: 'options'
		};
	});
	switch (key) {
		case 'force':
			returnArr.push({
				subKey: 'tags',
				displayKey: 'category',
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

export const getDisplayKey = (option) => {
	return DISPLAY_KEYS_TABLE?.[option] ?? option;
};

//used in secFilters, sortOptions
export const getOptionTranslation = (option, language: Language) => {
	let symbol = '';
	let suffix = '';

	if (ALLY_KEYS.includes(option)) {
		symbol = 'ally_abbr';
	} else if (ENEMY_KEYS.includes(option)) {
		symbol = 'enemy_abbr';
		if (option.includes('down')) {
			suffix = 'debuff';
		}
	} else if (SELF_KEYS.includes(option)) {
		symbol = 'self_abbr';
	}
	option = getDisplayKey(option);
	return (
		(translations[language].table_headers[option] ??
			translations[language][option] ??
			translations[language].types[option]) +
		(suffix ? getSpacing(language) + `${translations[language][suffix]}` : '') +
		(symbol ? getSpacing(language) + `(${translations[language][symbol]})` : '')
	);
};
export const getSpacing = (language: Language) => {
	if (language === 'en') {
		return ' ';
	}
	return '';
};

export const targetValueCheck = (targets, selectedOptions) => {
	return selectedOptions.some((val) => {
		switch (val) {
			case 'single_target':
				return targets === 1;
			case 'few_target':
				return targets > 1 && targets < 99;
			default:
				return targets >= 99;
		}
	});
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

function someCheck(itemArr, selectedOptions) {
	let noneCheck = false;
	if (selectedOptions.includes('condition_none')) {
		noneCheck = !Boolean(itemArr);
	}
	let othersCheck = false;
	if (selectedOptions.includes('others')) {
		othersCheck = !Boolean(itemArr);
	}
	selectedOptions = selectedOptions.filter((val) => !['condition_none', 'others'].includes(val));
	const list = itemArr ?? [];
	return othersCheck || noneCheck || list.some((val) => selectedOptions.includes(val));
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
export const getMaxValue = (char, key, subKey) => {
	const defaultValue = getDefaultValue(subKey);
	return Math.max(
		char.skills.reduce((acc, curr) => {
			let value = 0;
			curr.blackboard.forEach((ele) => {
				if (ele.key === key) {
					value = ele[subKey] ?? defaultValue;
				}
			});
			return (acc = Math.max(acc, value));
		}, 0),
		char.talents.reduce((acc, curr) => {
			let value = 0;
			curr.blackboard.forEach((ele) => {
				if (ele.key === key) {
					value = ele[subKey] ?? defaultValue;
				}
			});
			return (acc = Math.max(acc, value));
		}, 0),
		char.uniequip
			.filter((equip) => equip.combatData)
			.reduce((acc, curr) => {
				let value = 0;
				curr.combatData.blackboard.forEach((ele) => {
					if (ele.key === key) {
						value = ele[subKey] ?? defaultValue;
					}
				});
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
					(selectedOptions.includes(4) || selectedOptions.includes(5)) &&
					!char.tokens?.some((token) =>
						token.blackboard.some(
							(item) => item.key === 'blockCnt' && selectedOptions.includes(item.value)
						)
					)
				) {
					const noModuleSkills = [];
					const moduleSkills = [];
					char.skills.forEach((skill) =>
						skill.blackboard.forEach((item) => {
							if (item.key === 'blockCnt' && selectedOptions.includes(item.value))
								item.module ? moduleSkills.push(item) : noModuleSkills.push(item);
						})
					);
					if (noModuleSkills.length > 0) {
						return;
					}
					if (moduleSkills.length > 0) {
						return char.uniequip.find((equip) => equip.typeIcon === moduleSkills?.[0]?.module);
					}
					return char.uniequip
						.filter((equip) => equip.combatData)
						.find((equip) =>
							equip.combatData.blackboard.some(
								(item) => item.key === 'blockCnt' && selectedOptions.includes(item.value)
							)
						);
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
		.filter((value) => SEARCH_IN_BLACKBOARD.includes(value))
		.map((value) => {
			return { value, selected: false };
		});
	const tagOptions = options
		.filter((value) => SEARCH_IN_TAGS.includes(value))
		.map((value) => {
			return { value, selected: false };
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
			'cancel_stealth',
			'camouflage',
			'taunt',
			'undying'
		].includes(key):
			list.push({ key, subKey: 'value', suffix: 'duration', order: -1, priority: -1 });
			break;
		case ['damage_scale', 'ally_dmg_res', 'dmg_res'].includes(key):
			list.push({ key, subKey: 'value', suffix: null, order: -1, priority: -1 });
			list.push({ key, subKey: 'duration', suffix: 'duration', order: 0, priority: null });
			break;
		case ['evasion', 'ally_evasion'].includes(key):
			list.push({ key, subKey: 'value', suffix: 'prob', order: -1, priority: -1 });
			list.push({ key, subKey: 'duration', suffix: 'duration', order: 0, priority: null });
			break;
		case ['block_dmg', 'ally_block_dmg'].includes(key):
			list.push({ key, subKey: 'value', suffix: 'prob', order: 0, priority: null });
			list.push({ key, subKey: 'duration', suffix: 'duration', order: 0, priority: null });
			break;
		case key === 'force':
			list.push({
				key,
				subKey: 'value',
				displayKey: getDisplayKey(key),
				suffix: 'force',
				order: -1,
				priority: -1
			});
			break;
		case [
			'blockCnt',
			'ally_block_up',
			'ally_block_down',
			'ally_undying',
			'ally_taunt',
			'ally_camouflage'
		].includes(key):
			break;
		default:
			list.push({
				key,
				subKey: 'value',
				displayKey: getDisplayKey(key),
				suffix: null,
				order: -1,
				priority: -1
			});
			break;
	}

	return list;
};
export const compareValueType = (selectedOptions, value) => {
	return selectedOptions.some((val) => {
		switch (val) {
			case 'value_fixed':
				return value > 4.9;
			default:
				return value <= 4.9;
		}
	});
};
export const blockDurationCheck = (selectedOptions, char, filterOptions) => {
	const selectedFilterOptions = filterOptions
		.map((option) => option.selected && option.value)
		.filter((ele) => ele !== false);
	return selectedOptions.some((val) => {
		switch (val) {
			case 'normal_state':
				return (
					selectedFilterOptions.includes(char.stats.blockCnt) ||
					char.uniequip
						.filter((equip) => equip.combatData)
						.some((equip) =>
							equip.combatData.blackboard.some(
								(item) => item.key === 'blockCnt' && selectedFilterOptions.includes(item.value)
							)
						)
				);
			case 'skill_active':
				return char.skills.some((skill) =>
					skill.blackboard.some(
						(item) => item.key === 'blockCnt' && selectedFilterOptions.includes(item.value)
					)
				);
			case 'infinite':
				return (
					selectedFilterOptions.includes(char.stats.blockCnt) ||
					char.skills.some((skill) =>
						skill.blackboard.some((item) => item.key === 'blockCnt' && !Boolean(item.duration))
					) ||
					char.uniequip
						.filter((equip) => equip.combatData)
						.some((equip) =>
							equip.combatData.blackboard.some(
								(item) => item.key === 'blockCnt' && !Boolean(item.duration)
							)
						) ||
					char.tokens.some((token) =>
						token.blackboard.some((item) => item.key === 'blockCnt' && !Boolean(item.duration))
					)
				);
			default:
				return (
					char.skills.some((skill) =>
						skill.blackboard.some((item) => item.key === 'blockCnt' && item.duration)
					) ||
					char.uniequip
						.filter((equip) => equip.combatData)
						.some((equip) =>
							equip.combatData.blackboard.some((item) => item.key === 'blockCnt' && item.duration)
						) ||
					char.tokens.some((token) =>
						token.blackboard.some((item) => item.key === 'blockCnt' && item.duration)
					)
				);
		}
	});
};
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
				} else if (['targets', 'dep_stat', 'damage_type'].includes(key)) {
					if (!obj[item.key][key].includes(value)) {
						obj[item.key][key].push(value);
					}
				}
				if (key === 'category' && !obj[item.key][key].includes('others')) {
					obj[item.key][key].push('others');
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
	for (const key of TARGET_AIR_KEYS) {
		obj[key].target_air = ['target_air', 'not_target_air'];
	}
	obj['blockCnt'] = {
		duration: ['infinite', 'finite'],
		category: ['normal_state', 'skill_active']
	};
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

export const createSubFilterFunction = (key, list, filterOptions) => {
	const functions = [];
	for (const { subKey, type, options, sign, value } of list) {
		let fn = () => true;
		if (type === 'compare') {
			if (value <= 0) continue;
			fn = (item) => (sign === 'gte' ? item[subKey] >= value : item[subKey] <= value);
		} else {
			const selectedOptions = options
				.map((option) => option.selected && option.value)
				.filter(Boolean);
			if (selectedOptions.length === 0) {
				continue;
			}
			switch (key) {
				case 'blockCnt':
					return (char) => blockDurationCheck(selectedOptions, char, filterOptions);
				default:
					switch (subKey) {
						case 'tags':
							return (char) =>
								selectedOptions.some((tag) => char.tags.includes(tag)) ||
								char.skills.some((skill) =>
									selectedOptions.some((tag) => skill.tags.includes(tag))
								) ||
								char.talents.some((talent) =>
									selectedOptions.some((tag) => talent.tags.includes(tag))
								) ||
								char.uniequip
									.filter((equip) => equip.combatData)
									.some((equip) =>
										selectedOptions.some((tag) => equip.combatData.tags.includes(tag))
									) ||
								char.tokens.some((token) =>
									selectedOptions.some((tag) => token.tags.includes(tag))
								);
						case 'target_air':
							fn = (item) =>
								selectedOptions.some((val) =>
									val === 'target_air' ? item.target_air : !item.target_air
								);
							break;
						case 'targets':
							fn = (item) => targetValueCheck(item[subKey], selectedOptions);
							break;
						case 'category':
						case 'conditions':
							fn = (item) => someCheck(item[subKey], selectedOptions);
							break;
						case 'types':
							fn = (item) => isSubset(selectedOptions, item[subKey]);
							break;
						case 'dep_stat':
						case 'damage_type':
							fn = (item) => selectedOptions.includes(item[subKey]);
							break;
						case 'value_type':
							fn = (item) => compareValueType(selectedOptions, item['value']);
							break;
						default:
							break;
					}
					break;
			}
		}
		functions.push(fn);
	}
	if (functions.length === 0) {
		return () => true;
	}
	return (char) =>
		char.blackboard.some((item) => item.key === key && functions.every((fn) => fn(item))) ||
		char.skills.some((skill) =>
			skill.blackboard.some((item) => item.key === key && functions.every((fn) => fn(item)))
		) ||
		char.talents.some((talent) =>
			talent.blackboard.some((item) => item.key === key && functions.every((fn) => fn(item)))
		) ||
		char.tokens?.some((token) =>
			token.blackboard.some((item) => item.key === key && functions.every((fn) => fn(item)))
		) ||
		char.uniequip
			.filter((equip) => equip.combatData)
			.some((equip) =>
				equip.combatData.blackboard.some(
					(item) => item.key === key && functions.every((fn) => fn(item))
				)
			);
};
