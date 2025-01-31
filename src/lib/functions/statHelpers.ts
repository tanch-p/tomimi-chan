/* takes in a list of enemies and statMods and returns enemy with modifiers applied */
import type { Enemy, StatMods, ModGroup, Effects } from '$lib/types';

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

//after applying mods, move stats under forms
export function applyMods(
	enemies: Enemy[],
	stageId: string,
	statMods: StatMods,
	specialMods
): Enemy[] {
	return enemies.map((enemy) => {
		const holder = { ...enemy };
		for (let i = 0; i < holder.forms.length; i++) {
			holder.forms[i].special = holder.stats.special?.[i] || [];
			holder.forms[i].stats = parseStats(holder, stageId, statMods, i, specialMods);
		}
		delete holder.stats;
		return {
			...holder
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

	//modsToAdd deals with initial mods that add up together - originium floor, buffs, form mods
	const modsToAdd = statMods.initial
		.map((mod) => {
			if (!['combat_ops', 'elite_ops'].includes(mod.key)) {
				const { key, mods } = distillMods(enemy, stageId, mod, row);
				return mods;
			}
		})
		.filter(Boolean);
	if (enemy.stats?.form_mods) {
		if (specialMods?.[enemy.key]?.[`mods_${row}`]) {
			modsToAdd.push(specialMods?.[enemy.key]?.[`mods_${row}`]);
		} else {
			modsToAdd.push(enemy.stats.form_mods[row]);
		}
	}
	const consolidatedModsToAdd =
		modsToAdd.length > 0
			? modsToAdd.reduce((acc, curr) => {
					for (const statKey in curr) {
						if (
							statKey.includes('fixed') ||
							statKey === 'dmg_reduction' ||
							statKey === 'atk_interval'
						) {
							acc[statKey] += curr[statKey];
						} else {
							acc[statKey] += curr[statKey] - 1;
						}
					}
					return acc;
			  })
			: {};
	for (const mod of statMods.initial.filter((mod) =>
		['combat_ops', 'elite_ops'].includes(mod.key)
	)) {
		const { key, mods } = distillMods(enemy, stageId, mod, row);
		modsList.push(mods);
	}
	modsList.push(consolidatedModsToAdd);
	const initialMods = modsList.reduce((acc, curr) => {
		for (const statKey in curr) {
			if (statKey.includes('fixed') || statKey === 'atk_interval') {
				acc[statKey] += curr[statKey];
			} else if (statKey === 'dmg_reduction') {
				if (acc[statKey] === 0) {
					acc[statKey] += curr[statKey];
				} else {
					acc[statKey] = Math.round(
						(1 - ((100 - acc[statKey]) / 100) * ((100 - curr[statKey]) / 100)) * 100
					);
				}
			} else {
				acc[statKey] *= curr[statKey];
			}
		}
		return acc;
	});
	modsList = [];
	for (const mod of statMods.final) {
		const { key, mods } = distillMods(enemy, stageId, mod, row);
		modsList.push(mods);
	}
	const finalMods = modsList.reduce((acc, curr) => {
		for (const statKey in curr) {
			if (statKey.includes('fixed') || statKey === 'atk_interval') {
				acc[statKey] += curr[statKey];
			} else if (statKey === 'dmg_reduction') {
				if (acc[statKey] === 0) {
					acc[statKey] += curr[statKey];
				} else {
					acc[statKey] = Math.round(
						(1 - ((100 - acc[statKey]) / 100) * ((100 - curr[statKey]) / 100)) * 100
					);
				}
			} else {
				acc[statKey] *= curr[statKey];
			}
		}
		return acc;
	});
	const enemy_stats = {};
	for (const stat of STATS) {
		let statToUse = enemy.stats[stat];
		if (enemy.stats?.form_mods?.[row]?.[`set_${stat}`]) {
			statToUse = enemy.stats?.form_mods?.[row]?.[`set_${stat}`];
		}
		enemy_stats[stat] = calculateModdedStat(
			statToUse,
			stat,
			initialMods?.[`fixed_${stat}`] ?? 0,
			initialMods[stat] ?? 1,
			finalMods?.[`fixed_${stat}`] ?? 0,
			finalMods[stat] ?? 1,
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
					} else if (statKey.includes('fixed') || statKey === 'atk_interval') {
						mods[statKey] += effect.mods[statKey];
					} else if (statKey === 'dmg_reduction') {
						if (mods[statKey] === 0 || operation === 'add') {
							mods[statKey] += effect.mods[statKey];
						} else {
							mods[statKey] = Math.round(
								(1 - ((100 - mods[statKey]) / 100) * ((100 - effect.mods[statKey]) / 100)) * 100
							);
						}
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

export const calculateModdedStat = (
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
	if (target.includes('&')) {
		const targets = target.split('&');
		return targets.reduce((acc, curr) => {
			acc = acc && checkIsTarget(enemy, curr);
			return acc;
		}, true);
	}
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
			return type?.includes(target);
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
		case 'not_flying':
			return !type?.includes(target.replace('not_', ''));
		case 'not_trap':
			return !key.includes('trap');
		default:
			return target === id || target === key;
	}
};

//return list of enemies { }
export const compileStatModsForChecking = (
	enemies: Enemy[],
	stageId: string,
	statMods: StatMods,
	specialMods
) => {
	const returnList = [];
	for (const enemy of enemies) {
		if (enemy.stats?.form_mods) {
			enemy.stats?.form_mods.forEach((formMods, i) => {
				const modsList = [];
				const modsToAdd = statMods.initial
					.map((mod) => {
						if (!['combat_ops', 'elite_ops'].includes(mod.key)) {
							const { key, mods } = distillMods(enemy, stageId, mod, 0);
							for (const stat of STATS.filter(
								(stat) => !['lifepoint', 'dmg_reduction'].includes(stat)
							)) {
								if ((mods[stat] ?? 1) !== 1 || (mods[`fixed_${stat}`] ?? 0) !== 0) {
									return { key, mods };
								}
							}
						}
					})
					.filter(Boolean);
				if (specialMods?.[enemy.key]?.[`mods_${i}`]) {
					modsToAdd.push({
						key: 'multiform_suffix',
						mods: specialMods?.[enemy.key]?.[`mods_${i}`]
					});
				} else {
					modsToAdd.push({ key: 'multiform_suffix', mods: formMods });
				}
				for (const mod of statMods.initial.filter((mod) =>
					['combat_ops', 'elite_ops'].includes(mod.key)
				)) {
					modsList.push({ type: 'initial', ...distillMods(enemy, stageId, mod, i) });
				}
				modsList.push({
					type: 'initial',
					key: modsToAdd.reduce((acc, curr) => {
						acc.push(curr.key);
						return acc;
					}, []),
					mods: modsToAdd
						.reduce((acc, curr) => {
							acc.push(curr.mods);
							return acc;
						}, [])
						.reduce((acc, curr) => {
							for (const statKey in curr) {
								if (
									statKey.includes('fixed') ||
									statKey === 'dmg_reduction' ||
									statKey === 'atk_interval'
								) {
									acc[statKey] += curr[statKey];
								} else {
									acc[statKey] += curr[statKey] - 1;
								}
							}
							return acc;
						})
				});
				for (const mod of statMods.final) {
					modsList.push({ type: 'final', ...distillMods(enemy, stageId, mod, i) });
				}
				returnList.push({
					key: enemy.key,
					name_zh: enemy.name_zh,
					name_ja: enemy.name_ja,
					name_en: enemy.name_en,
					type: enemy.type,
					form: enemy.forms[i].title,
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
			const modsToAdd = statMods.initial
				.map((mod) => {
					if (!['combat_ops', 'elite_ops'].includes(mod.key)) {
						const { key, mods } = distillMods(enemy, stageId, mod, 0);
						for (const stat of STATS.filter(
							(stat) => !['lifepoint', 'dmg_reduction'].includes(stat)
						)) {
							if ((mods[stat] ?? 1) !== 1 || (mods[`fixed_${stat}`] ?? 0) !== 0) {
								return { key, mods };
							}
						}
					}
				})
				.filter(Boolean);
			for (const mod of statMods.initial.filter((mod) =>
				['combat_ops', 'elite_ops'].includes(mod.key)
			)) {
				modsList.push({ type: 'initial', ...distillMods(enemy, stageId, mod, 0) });
			}
			if (modsToAdd.length > 0) {
				modsList.push({
					type: 'initial',
					key: modsToAdd.reduce((acc, curr) => {
						acc.push(curr.key);
						return acc;
					}, []),
					mods: modsToAdd
						.reduce((acc, curr) => {
							acc.push(curr.mods);
							return acc;
						}, [])
						.reduce((acc, curr) => {
							for (const statKey in curr) {
								if (
									statKey.includes('fixed') ||
									statKey === 'dmg_reduction' ||
									statKey === 'atk_interval'
								) {
									acc[statKey] += curr[statKey];
								} else {
									acc[statKey] += curr[statKey] - 1;
								}
							}
							return acc;
						})
				});
			}
			for (const mod of statMods.final) {
				modsList.push({ type: 'final', ...distillMods(enemy, stageId, mod, 0) });
			}
			returnList.push({
				key: enemy.key,
				name_zh: enemy.name_zh,
				name_ja: enemy.name_ja,
				name_en: enemy.name_en,
				type: enemy.type,
				form: null,
				formIndex: null,
				modsList: modsList.filter((mod) => {
					for (const stat of STATS.filter(
						(stat) => !['lifepoint', 'dmg_reduction'].includes(stat)
					)) {
						if ((mod.mods[stat] ?? 1) !== 1 || (mod.mods[`fixed_${stat}`] ?? 0) !== 0) {
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
