/* takes in a list of enemies and statMods and returns enemy with modifiers applied */
import type { Enemy, StatMods, ModGroup, Effects } from '$lib/types';
import enemySkills from '$lib/data/enemy/enemy_skills.json';

const STATS = [
	'hp',
	'atk',
	'aspd',
	'range',
	'def',
	'res',
	'weight',
	'ms',
	'lifepoint',
	'dmg_reduction'
];

const PHCS_BOSSES = ['ICR', 'ICM', 'MSC', 'FSK', 'JTM', 'WDG', 'PTM', 'DOL', 'HST', 'WRT'];
const MZK_BOSSES = [
	'enemy_2026_syudg',
	'enemy_2027_syudg2',
	'enemy_2028_syevil',
	'enemy_2029_symon',
	'enemy_2030_symon2',
	'enemy_2031_syboy',
	'enemy_2032_syboy2',
	'enemy_2036_syshop',
	'enemy_2037_sygirl',
	'enemy_2038_sydonq',
	'enemy_2039_syskad',
	'enemy_2006_flsnip',
	'enemy_2007_flwitch',
	'enemy_2008_flking'
];
const SAMI_BOSSES = [
	'enemy_2048_smgrd',
	'enemy_2049_smgrd2',
	'enemy_2050_smsha',
	'enemy_2051_smsha2',
	'enemy_2052_smgia',
	'enemy_2053_smgia2',
	'enemy_2054_smdeer',
	'enemy_2055_smlead',
	'enemy_2056_smedzi',
	'enemy_2036_syshop',
	'enemy_2057_smkght',
	'enemy_2058_smlion'
];
const SARKAZ_BOSSES = [
	'enemy_2074_skzgly',
	'enemy_2075_skgly2',
	'enemy_2076_skzklz',
	'enemy_2077_skklz2',
	'enemy_2078_skzmst',
	'enemy_2079_skmst2',
	'enemy_2080_skzlwy',
	'enemy_2081_skztxs',
	'enemy_2082_skzdd',
	'enemy_2084_skzcan',
	'enemy_2071_skzdny',
	'enemy_2072_skdny2'
];

const NOT_AFFECTED_BY_DIFFICULTY_KEYS = [
	'enemy_1352_eslime',
	'enemy_3001_upeopl',
	'enemy_1196_msfyin_2',
	'enemy_1200_msfjin_2',
	'enemy_1202_msfzhi_2',
	'enemy_1208_msfji_2',
	'enemy_1210_msfden_2'
];

export const getMaxRowSpan = (enemy: Enemy) => {
	if (enemy?.forms) {
		return enemy.forms.length;
	}
	return 1;
};

// enemy stats type is being changed from {} to [{}] here
export function applyMods(enemies: Enemy[], stageId: string, statMods: StatMods, specialMods) {
	return enemies.map((enemy) => {
		const maxRowSpan = getMaxRowSpan(enemy);
		const moddedStats = [];
		for (let i = 0; i < maxRowSpan; i++) {
			moddedStats.push(parseStats(enemy, stageId, statMods, i, specialMods));
		}
		return {
			...enemy,
			stats: moddedStats
		};
	});
}

//returns enemy 'stats' object with modded stats
export function parseStats(
	enemy: Enemy,
	stageId: string,
	statMods: StatMods,
	row: number,
	specialMods
) {
	let modsList = [];
	for (const mod of statMods.initial) {
		modsList.push(distillMods(enemy, stageId, mod, row));
	}
	if (enemy?.forms) {
		if (specialMods?.[enemy.key]?.[`mods_${row}`]) {
			modsList.push(specialMods?.[enemy.key]?.[`mods_${row}`]);
		} else {
			modsList.push(enemy.forms[row].mods);
		}
	}
	const initialMods = modsList.reduce((acc, curr) => {
		for (const statKey in curr) {
			if (statKey.includes('fixed') || statKey === 'dmg_reduction' || statKey === 'atk_interval') {
				acc[statKey] += curr[statKey];
			} else {
				acc[statKey] *= curr[statKey];
			}
		}
		return acc;
	});
	modsList = [];
	for (const mod of statMods.final) {
		modsList.push(distillMods(enemy, stageId, mod, row));
	}
	const finalMods = modsList.reduce((acc, curr) => {
		for (const statKey in curr) {
			if (statKey.includes('fixed') || statKey === 'dmg_reduction' || statKey === 'atk_interval') {
				acc[statKey] += curr[statKey];
			} else {
				acc[statKey] *= curr[statKey];
			}
		}
		return acc;
	});
	const enemy_stats = {};
	for (const stat of STATS) {
		let statToUse = enemy.stats[stat];
		if (enemy?.forms?.[row]?.mods?.[`set_${stat}`]) {
			statToUse = enemy?.forms?.[row]?.mods?.[`set_${stat}`];
		}
		enemy_stats[stat] = calculateModdedStat(
			statToUse,
			stat,
			initialMods?.[`fixed_${stat}`] ?? 0,
			initialMods[stat],
			finalMods?.[`fixed_${stat}`] ?? 0,
			finalMods[stat],
			stat === 'aspd' ? (initialMods?.atk_interval ?? 0) + (finalMods?.atk_interval ?? 0) : 0
		);
	}
	return enemy_stats;
}

//return mods: {atk:...}
export const distillMods = (enemy: Enemy, stageId: string, mod: ModGroup, row: number) => {
	const { key, mods: effectsList, operation } = mod;
	const mods = {
		hp: 1,
		atk: 1,
		def: 1,
		res: 1,
		aspd: 1,
		ms: 1,
		range: 1,
		weight: 1,
		lifepoint: 1,
		atk_interval: 0,
		fixed_hp: 0,
		fixed_atk: 0,
		fixed_def: 0,
		fixed_res: 0,
		fixed_aspd: 0,
		fixed_ms: 0,
		fixed_range: 0,
		fixed_weight: 0,
		dmg_reduction: 0
	};
	effectsList.filter(Boolean).forEach((effects) => {
		for (const effect of effects) {
			if (effect.targets.some((target) => checkIsTarget(enemy, target))) {
				for (const statKey in effect.mods) {
					if (!mods[statKey]) {
						mods[statKey] = effect.mods[statKey];
					} else if (
						statKey.includes('fixed') ||
						statKey === 'dmg_reduction' ||
						statKey === 'atk_interval'
					) {
						mods[statKey] += effect.mods[statKey];
					} else if (
						(['enemy_1126_spslme', 'enemy_1126_spslme_2'].includes(enemy.key) &&
							['floor_diff', 'relic'].includes(key) &&
							statKey === 'atk') ||
						(NOT_AFFECTED_BY_DIFFICULTY_KEYS.includes(enemy.key) &&
							(key === 'floor_diff' || key === 'difficulty')) ||
						([
							'enemy_1288_duskls',
							'enemy_1288_duskls_2',
							'enemy_1292_duskld',
							'enemy_1292_duskld_2'
						].includes(enemy.key) &&
							key === 'elite_ops' &&
							row === 1)
					) {
						continue;
					} else {
						switch (operation) {
							case 'add':
								mods[statKey] += effect.mods[statKey] - 1;
								break;
							case 'times':
								mods[statKey] *= effect.mods[statKey];
								break;
						}
					}
				}
			}
		}
	});
	return mods;
};

const calculateModdedStat = (
	base_stat: number,
	stat: string,
	initial_fixed_value: number,
	initial_multiplier: number,
	final_fixed_value: number,
	final_multiplier: number,
	atk_interval: number
) => {
	const aspd = 100;
	if (stat !== 'aspd') {
		base_stat += initial_fixed_value;
	}
	switch (stat) {
		//temp fix for dmg_reduction, to move to its own calculation if dmg reduction appears not just in difficulty mods
		case 'dmg_reduction':
			return initial_multiplier + final_multiplier;
		case 'aspd':
			return (
				Math.round(
					((base_stat + atk_interval) /
						(((aspd + initial_fixed_value + final_fixed_value) *
							final_multiplier *
							initial_multiplier) /
							100)) *
						100
				) / 100
			);
		case 'range':
		case 'ms':
			return (
				Math.round((base_stat * initial_multiplier + final_fixed_value) * final_multiplier * 100) /
				100
			);
		case 'weight':
		case 'res':
			return Math.min(
				Math.max((base_stat * initial_multiplier + final_fixed_value) * final_multiplier, 0),
				100
			);
		default:
			return Math.round((base_stat * initial_multiplier + final_fixed_value) * final_multiplier);
	}
};

export const checkIsTarget = (enemy: Enemy, target: string) => {
	const { id, key, type } = enemy;
	switch (target) {
		case 'ALL':
			return true;
		case 'ranged':
		case 'melee':
		case 'ELITE':
		case 'BOSS':
		case 'collapsal':
		case 'sarkaz':
			return type.includes(target);
		case 'PHCS_BOSS':
			return PHCS_BOSSES.includes(id);
		case 'NOT_PHCS_BOSS':
			return !PHCS_BOSSES.includes(id);
		case 'MZK_BOSS':
			return MZK_BOSSES.includes(key);
		case 'NOT_MZK_BOSS':
			return !MZK_BOSSES.includes(key);
		case 'SAMI_BOSS':
			return SAMI_BOSSES.includes(key);
		case 'NOT_SAMI_BOSS':
			return !SAMI_BOSSES.includes(key);
		case 'SARKAZ_BOSS':
			return SARKAZ_BOSSES.includes(key);
		case 'NOT_SARKAZ_BOSS':
			return !SARKAZ_BOSSES.includes(key);
		default:
			return target === id || target === key;
	}
};

//return list of enemies { }
export const compileStatModsForChecking = (
	enemies: Enemy[],
	stageId: string,
	statMods: StatMods
) => {
	const returnList = [];
	for (const enemy of enemies) {
		if (enemy.forms) {
			enemy.forms.forEach((form, i) => {
				const modsList = [];
				modsList.push({ type: 'initial', key: 'multiform_suffix', mods: form.mods });
				for (const mod of statMods.initial) {
					modsList.push({ type: 'initial', ...compileMods(enemy, stageId, mod, i) });
				}
				for (const mod of statMods.final) {
					modsList.push({ type: 'final', ...compileMods(enemy, stageId, mod, i) });
				}
				returnList.push({
					key: enemy.key,
					name_zh: enemy.name_zh,
					name_ja: enemy.name_ja,
					name_en: enemy.name_en,
					img: enemy.img,
					type: enemy.type,
					form: form,
					formIndex: i,
					modsList: modsList.filter((ele) => {
						for (const stat of STATS.filter(
							(ele) => !['lifepoint', 'dmg_reduction'].includes(ele)
						)) {
							if ((ele.mods[stat] ?? 1) !== 1 || (ele.mods[`fixed_${stat}`] ?? 0) !== 0) {
								return true;
							}
						}
						return false;
					})
				});
			});
		} else {
			const modsList = [];
			for (const mod of statMods.initial) {
				modsList.push({ type: 'initial', ...compileMods(enemy, stageId, mod, 0) });
			}
			for (const mod of statMods.final) {
				modsList.push({ type: 'final', ...compileMods(enemy, stageId, mod, 0) });
			}
			returnList.push({
				key: enemy.key,
				name_zh: enemy.name_zh,
				name_ja: enemy.name_ja,
				name_en: enemy.name_en,
				img: enemy.img,
				type: enemy.type,
				form: null,
				formIndex: null,
				modsList: modsList.filter((ele) => {
					for (const stat of STATS.filter((ele) => !['lifepoint', 'dmg_reduction'].includes(ele))) {
						if ((ele.mods[stat] ?? 1) !== 1 || (ele.mods[`fixed_${stat}`] ?? 0) !== 0) {
							return true;
						}
					}
					return false;
				})
			});
		}
	}
	return returnList;
};

const compileMods = (enemy: Enemy, stageId: string, mod: ModGroup, row: number) => {
	const { key, mods: effectsList, operation } = mod;
	const mods = {
		hp: 1,
		atk: 1,
		def: 1,
		res: 1,
		aspd: 1,
		ms: 1,
		range: 1,
		weight: 1,
		lifepoint: 1,
		fixed_hp: 0,
		fixed_atk: 0,
		fixed_def: 0,
		fixed_res: 0,
		fixed_aspd: 0,
		fixed_ms: 0,
		fixed_range: 0,
		fixed_weight: 0,
		dmg_reduction: 0
	};
	effectsList.filter(Boolean).forEach((effects) => {
		for (const effect of effects) {
			if (effect.targets.some((target) => checkIsTarget(enemy, target))) {
				for (const statKey in effect.mods) {
					if (!mods[statKey]) {
						mods[statKey] = effect.mods[statKey];
					} else if (statKey.includes('fixed') || statKey === 'dmg_reduction') {
						mods[statKey] += effect.mods[statKey];
					} else if (
						(['enemy_1126_spslme', 'enemy_1126_spslme_2'].includes(enemy.key) &&
							['floor_diff', 'relic'].includes(key) &&
							statKey === 'atk') ||
						(NOT_AFFECTED_BY_DIFFICULTY_KEYS.includes(enemy.key) &&
							(key === 'floor_diff' || key === 'difficulty')) ||
						([
							'enemy_1288_duskls',
							'enemy_1288_duskls_2',
							'enemy_1292_duskld',
							'enemy_1292_duskld_2'
						].includes(enemy.key) &&
							key === 'elite_ops' &&
							row === 1)
					) {
						continue;
					} else {
						switch (operation) {
							case 'add':
								mods[statKey] += effect.mods[statKey] - 1;
								break;
							case 'times':
								mods[statKey] *= effect.mods[statKey];
								break;
						}
					}
				}
			}
		}
	});
	return { key, mods };
};

export const compileSpecialMods = (...modsList: [[Effects]]) => {
	const specialMods = {};
	for (const effectsList of modsList) {
		for (const effects of effectsList)
			if (effects !== null && effects.length > 0) {
				effects.forEach((effect) => {
					for (const target of effect.targets) {
						for (const key in effect.mods) {
							if (key === 'special') {
								if (!specialMods[target]) {
									specialMods[target] = {};
								}
								for (const key of Object.keys(effect.mods.special)) {
									specialMods[target][key] = effect.mods.special[key];
								}
							}
						}
					}
				});
			}
	}
	return specialMods;
};

export const updateBuffs = (otherBuffs, enemies, language) => {
	const buffs = [];
	for (const enemy of enemies) {
		if (enemy.special) {
			for (const skillRef of enemy.special) {
				const skill = enemySkills[skillRef.key];
				if (skill?.type === 'buff') {
					buffs.push({
						key: enemy[`name_${language}`],
						mods: [skill.effects],
						operation: 'times'
					});
				}
			}
		}
	}
	otherBuffs.set(buffs);
};
