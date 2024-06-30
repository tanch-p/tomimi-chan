import type { Language } from '$lib/types';
import translations from '$lib/translations.json';
import relics from '$lib/data/chara/relics_chara.json';
import { formatArray } from './languageHelpers';
import { getDisplayKey } from './charaHelpers';

const DAMAGE_TYPE_KEYS = ['phys', 'arts', 'true', 'ele_dmg'];
const BUFF_TAGS = [
	'inspire',
	'berserk',
	'protect',
	'fragile',
	'magicfragile',
	'elementfragile',
	'vigor',
	'weaken',
	"barrier"
];
const STAT_DEBUFFS = ['atk_down', 'def_down', 'res_down', 'aspd_down', 'ms_down', 'hitrate_down'];
const DEBUFFS = [
	'stun',
	'sluggish',
	'sleep',
	'silence',
	'cold',
	'levitate',
	'root',
	'tremble',
	'damage_scale',
	'weightless',
	'cancel_stealth',
	'crit_wound'
];
const ALLY_STAT_BUFFS = [
	'ally_max_hp',
	'ally_atk',
	'ally_def',
	'ally_res',
	'ally_aspd',
	'ally_sp_regen',
	'ally_sp_stock'
];
const ALLY_NORMAL = [
	'ally_block_down',
	'ally_block_up',
	'change_target_priority',
	'ally_damage_scale',
	'ally_apoptosis',
	'ally_heal_scale',
	'ally_sp_gain',
	'ally_spareshot',
	'ally_lower_target_priority'
];
const ALLY_STAT_MINUS = ['ally_respawn_time', 'ally_cost_down'];
const ALLY_BUFFS = [
	'ally_evasion',
	'ally_shield',
	'ally_reflect_dmg',
	'ally_resist',
	'ally_block_dmg',
	'ally_dmg_res',
	'ally_undying',
	'ally_env_dmg_reduce',
	'ally_stealth',
	'ally_camouflage',
	'ally_taunt'
];
const SELF_CAN_TAGS = [
	'remove_status',
	'add_sp_gain_option',
	'heal_ally',
	'heal_unhealable',
	'ignore_evasion',
	'ignore_stealth',
	'def_penetrate',
	'res_penetrate',
	'reflect_dmg',
	'heal_self',
	'sp_gain',
	'spareshot',
	'force',
	'block_no_attack',
	'revive',
	'teleport_enemy',
	'execute',
	'slow_projectile',
	'erase_projectile',
	'reallocate_hp',
];
const SELF_BUFF_TAGS = [
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
	'status_immune'
];
const SELF_STAT_BUFFS = ['sp_regen', 'sp_stock'];
const HAVE_TAGS = [
	'global_heal',
	'squad_effect',
	'min_damage',
	'dot',
	'aspd_unrelated',
	'starting_cost',
	'global_range'
];
const SKILL_HAVE_TAGS = [
	'unlimited_duration',
	'skill_invincible',
	'charged',
	'overdrive',
	'trigger_time'
];
const PRIORITY_TAGS = [
	'priority_flying',
	'priority_drone',
	'priority_ranged',
	'priority_stun',
	'priority_sleep',
	'priority_highest_weight',
	'priority_def_high',
	'priority_def_low'
];
const SQUAD_TAGS = [
	'abyssal',
	'three_star',
	'robot',
	'student',
	'kazimierz',
	'rhine',
	'karlan',
	'minos',
	'position_ranged',
	'PIONEER',
	'WARRIOR',
	'SNIPER',
	'TANK',
	'MEDIC',
	'SUPPORT',
	'CASTER',
	'SPECIAL',
	'cost_under_10'
];
const TYPE_TAGS = [
	'flying',
	'drone',
	'infection',
	'sarkaz',
	'wildanimal',
	'seamonster',
	'type_stun',
	'type_sluggish',
	'type_sleep',
	'type_freeze',
	'type_root',
	'type_tremble',
	'blocked_enemy',
	'no_block_enemy',
	'self_no_block_enemy'
];

const getFilterDescCategory = (key) => {
	const categories = [
		{ category: 'damage_type', keyList: DAMAGE_TYPE_KEYS },
		{ category: 'enemy_stat_debuff', keyList: STAT_DEBUFFS },
		{ category: 'enemy_debuff', keyList: DEBUFFS },
		{ category: 'ally_stat_buff', keyList: ALLY_STAT_BUFFS },
		{ category: 'ally_normal', keyList: ALLY_NORMAL },
		{ category: 'ally_stat_minus', keyList: ALLY_STAT_MINUS },
		{ category: 'ally_buff', keyList: ALLY_BUFFS },
		{ category: 'have_tags', keyList: HAVE_TAGS },
		{ category: 'buff_tags', keyList: BUFF_TAGS },
		{ category: 'self_stat_buff', keyList: SELF_STAT_BUFFS },
		{ category: 'self_can', keyList: SELF_CAN_TAGS },
		{ category: 'self_buff', keyList: SELF_BUFF_TAGS },
		{ category: 'skill_have', keyList: SKILL_HAVE_TAGS },
		{ category: 'priority', keyList: PRIORITY_TAGS },
		{ category: 'squad', keyList: SQUAD_TAGS },
		{ category: 'type', keyList: TYPE_TAGS },
		{ category: 'blockCnt', keyList: [0, 1, 2, 3, 4, 5] }
	];
	for (const { category, keyList } of categories) {
		if (keyList.includes(key)) {
			return category;
		}
	}
	return 'others';
};
export const generateSkillDesc = (
	activeOptions,
	list,
	language: Language,
	filterMode,
	relicActiveOptions,
	rogueTopic
) => {
	//1. split array into indiv categories
	const allyGroups = {};
	const enemyGroups = {};
	const selfGroups = {};
	const otherGroups = {};
	const relicGroups = {};
	for (const relicId of relicActiveOptions) {
		if (!relicGroups['relic']) relicGroups['relic'] = [];
		relicGroups['relic'].push(relicId);
	}
	for (const key of list) {
		const category = getFilterDescCategory(key);
		let holder;
		if (category.includes('ally')) {
			holder = allyGroups;
		} else if (category.includes('enemy')) {
			holder = enemyGroups;
		} else if (category.includes('self')) {
			holder = selfGroups;
		} else {
			holder = otherGroups;
		}
		if (!holder[category]) {
			holder[category] = [];
		}
		holder[category].push(key);
	}
	let text = '';
	let connectorNeeded = false;
	[
		{ key: 'relic', holder: relicGroups },
		{ key: 'ally', holder: allyGroups },
		{ key: 'enemy', holder: enemyGroups },
		{ key: 'self', holder: selfGroups },
		{ key: 'others', holder: otherGroups }
	].forEach(({ key, holder }, i) => {
		if (i > 0 && Object.keys(holder).length > 0 && connectorNeeded) {
			text +=
				filterMode === 'OR'
					? translations[language].chara_filter.connector_or
					: translations[language].chara_filter.connector_and;
		}
		if (key !== 'others' && Object.keys(holder).length > 0) {
			text += translations[language].chara_filter[`${key}_start`] ?? '';
		}
		Object.entries(holder).forEach(([category, options], i) => {
			connectorNeeded = true;
			if (i > 0) {
				text += ',';
			}
			const translatedStrings = options.map((key) => {
				const displayKey = getDisplayKey(key);
				let relic;
				if (category === 'relic') {
					relic = relics[rogueTopic].find((item) => item.id === key);
				}
				return (
					'<@bluehl>' +
					(category === 'blockCnt'
						? key
						: category === 'relic'
						? relic[`name_${language}`] || relic['name_zh']
						: translations[language].table_headers[displayKey] ??
						  translations[language][displayKey] ??
						  translations[language].types[displayKey]) +
					'</>'
				);
			});
			const joinedString =
				filterMode === 'OR' || category === 'blockCnt'
					? translatedStrings.join('/')
					: formatArray(
							translatedStrings,
							',',
							translations[language].chara_filter.connector_and_inner
					  );
			text +=
				(translations[language]['chara_filter']?.[`${category}_pre`] ?? '') +
				joinedString +
				(translations[language]['chara_filter']?.[`${category}_post`] ?? '');
		});
	});
	return text;
};
