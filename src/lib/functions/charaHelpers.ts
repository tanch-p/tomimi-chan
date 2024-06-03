import type { Language } from '$lib/types';
import filterOptions from '$lib/data/chara/filter_options.json';

const SEARCH_IN_TAGS = [
	'weightless',
	'cancel_stealth',
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
	'execute',
	'ally_respawn_time',
	'env_dmg_reduce',
	'ally_env_dmg_reduce',
	'crit_wound',
	'squad_effect',
	'barrier',
	"ally_barrier",
	'infected',
	'starting_cost',
	'enemy_hp',
	'terrain_water',
	"true",
	"apoptosis",
	"burning",
	'apoptosis_scale',
	'change_target_priority',
	'remove_status',
	'dot',
	'force_non_special',
	"starting_cost",
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
	'three_star'
];
const SEARCH_IN_BLACKBOARD = [
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
	'damage_scale_phys',
	'damage_scale_arts',
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
	'ally_protect'
];

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

export const getSkillImgUrl = (skill) => {
	switch (skill.name_zh) {
		case '强力击·γ型':
			return 'skcom_powerstrike[3]';
		case '强力击·β型':
			return 'skcom_powerstrike[2]';
		case '强力击·α型':
			return 'skcom_powerstrike[1]';
		case '武器附魔·α型':
			return 'skill_icon_skcom_enchant[1]';
		default:
			return skill.skillId;
	}
};

export const getModuleNewTalent = (module, stage: number, language: Language) => {
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
export const getTokenModuleTalent = (module, stage: number, language: Language) => {
	if (!module?.combatData) return;
	for (const part of module.combatData.phases[stage].parts) {
		if (part.isToken && part.target.includes('TALENT') && part.upgradeDesc_zh)
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
