/* takes in a list of enemies and statMods and returns enemy with modifiers applied */
import type { Enemy, StatMods, ModGroup, Effects, EnemyDBEntry, Mod } from '$lib/types';
/*
PLEASE READ https://prts.wiki/w/游戏数据基础#属性的定义


DMG_REDUCTION - values 5% DR = 0.05
VALUE = 1 - (1 - v1) * (1 - v2) * ...

ASPD
VALUE = Math.round((BASE STAT + ATK_INTERVAL_FIXED_VALUE) / (ASPD + ASPD_FIXED_VALUE) * ASPD_MULTIPLIER)


OTHER STATS - ATK/DEF...
VALUE = Math.round((((BASE STAT* ELITE_MODS + INITIAL_FIXED_VALUE) * INITIAL_MULTIPLIER) + FINAL_FIXED_VALUE) * FINAL_MULTIPLIER)

*/

const STATS = ['hp', 'atk', 'aspd', 'range', 'def', 'res', 'weight', 'ms', 'lifepoint'];

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
	'enemy_3001_upeopl',
	'enemy_1196_msfyin_2',
	'enemy_1200_msfjin_2',
	'enemy_1202_msfzhi_2',
	'enemy_1208_msfji_2',
	'enemy_1210_msfden_2'
];

//after applying mods, move stats under forms
export function applyMods(enemies: EnemyDBEntry[], statMods: StatMods, specialMods): Enemy[] {
	return enemies.map((enemy) => {
		const holder = structuredClone(enemy);
		holder.modsList = [];
		for (let i = 0; i < holder.forms.length; i++) {
			holder.forms[i].special = holder.stats.special?.[i] || [];
			holder.forms[i].stats = parseStats(holder, statMods, i, specialMods);
		}
		return holder;
	});
}

//returns enemy 'stats' object with modded stats
export function parseStats(enemy: EnemyDBEntry, statMods: StatMods, row: number, specialMods) {
	let diffMods;
	if (statMods.diff) {
		diffMods = compileMods(enemy, statMods.diff);
	}

	const formMods = { key: 'form_mods', mods: enemy.stats?.form_mods?.[row] ?? [] };
	if (specialMods?.[enemy.key]?.[`mods_${row}`]) {
		formMods.mods = specialMods?.[enemy.key]?.[`mods_${row}`];
	}
	const runeMods = compileMods(enemy, statMods.runes);
	const otherMods = statMods.others.map((mods) => compileMods(enemy, mods));
	const secondaryMods = [formMods, diffMods, ...otherMods].filter(Boolean);
	const statsHolder = { dmgRes: 0 };
	for (const statKey of STATS) {
		let initialValue = enemy.stats[statKey];
		if (formMods.mods) {
			const item = formMods.mods.find((ele) => ele.key === statKey && ele.mode === 'set');
			if (item) initialValue = item.value;
		}
		const baseValue = getModdedStat(initialValue, statKey, runeMods);
		statsHolder[statKey] = getModdedStat(baseValue, statKey, ...secondaryMods);
	}
	statsHolder['dmgRes'] = getDmgReductionVal(runeMods, ...secondaryMods);
	enemy?.modsList?.push(
		[runeMods, diffMods, ...otherMods].filter(Boolean).filter((ele) => ele.mods?.length > 0)
	);
	return statsHolder;
}

//return list of enemies { }
export const compileStatModsForChecking = (
	enemies: EnemyDBEntry[],
	statMods: StatMods,
	specialMods
) => {
	const returnList = [];
	for (const enemy of enemies) {
		let diffMods;
		if (statMods.diff) {
			diffMods = compileMods(enemy, statMods.diff);
		}
		const runeMods = compileMods(enemy, statMods.runes);
		const otherMods = statMods.others.map((mods) => compileMods(enemy, mods));
		const forms = [];
		if (enemy.stats?.form_mods) {
			enemy.stats?.form_mods.forEach((formMods, i) => {
				if (specialMods?.[enemy.key]?.[`mods_${i}`]) {
					forms.push({
						key: 'multiform_suffix',
						mods: specialMods?.[enemy.key]?.[`mods_${i}`]
					});
					return;
				}
				if (formMods?.length > 0) {
					forms.push({ key: 'multiform_suffix', mods: formMods });
				}
			});
		}
		if (forms.length > 0) {
			forms.forEach((form, i) => {
				returnList.push({
					key: enemy.key,
					name_zh: enemy.name_zh,
					name_ja: enemy.name_ja,
					name_en: enemy.name_en,
					type: enemy.type,
					form: enemy.forms[i].title,
					formIndex: i,
					modsList: [form, runeMods, diffMods, ...otherMods]
						.filter(Boolean)
						.filter((ele) => ele.mods?.length > 0)
				});
			});
		} else {
			returnList.push({
				key: enemy.key,
				name_zh: enemy.name_zh,
				name_ja: enemy.name_ja,
				name_en: enemy.name_en,
				type: enemy.type,
				form: null,
				formIndex: null,
				modsList: [runeMods, diffMods, ...otherMods]
					.filter(Boolean)
					.filter((ele) => ele.mods?.length > 0)
			});
		}
	}
	return returnList;
};

const getModdedStat = (baseValue: number, statKey: string, ...modsList) => {
	let initialAdd = 0,
		initialMul = 1,
		finalAdd = 0,
		finalMul = 1,
		atkIntervalAdd = 0,
		atkIntervalMul = 1;
	for (const { mods } of modsList) {
		for (const mod of mods) {
			const { key, value, mode } = mod;
			if (key === 'atkInterval') {
				switch (mode) {
					case 'mul':
						atkIntervalMul *= value;
						break;
					case 'add':
						atkIntervalAdd += value;
						break;
				}
				continue;
			}
			if (key === statKey) {
				const order = mod.order || 'final';
				switch (mode) {
					case 'mul':
						if (order === 'initial') {
							initialMul += value - 1;
						} else {
							finalMul *= value;
						}
						break;
					case 'add':
						if (order === 'initial') {
							initialAdd += value;
						} else {
							finalAdd += value;
						}
						break;
					default:
						console.warn('Unknown mod mode', mode);
				}
			}
		}
	}
	return calculateModdedStat(
		baseValue,
		statKey,
		initialAdd,
		initialMul,
		finalAdd,
		finalMul,
		atkIntervalAdd,
		atkIntervalMul
	);
};

export const calculateModdedStat = (
	baseValue: number,
	statKey: string,
	initialAdd: number,
	initialMul: number,
	finalAdd: number,
	finalMul: number,
	atkIntervalAdd: number,
	atkIntervalMul: number
) => {
	const aspd = 100;
	if (statKey !== 'aspd') {
		baseValue += initialAdd;
	}
	switch (statKey) {
		case 'aspd':
			return (
				Math.round(
					(((baseValue + atkIntervalAdd) * atkIntervalMul) /
						(Math.max(10, Math.min(((aspd + initialAdd) * initialMul + finalAdd) * finalMul, 600)) /
							100)) *
						100
				) / 100
			);
		case 'range':
		case 'ms':
			return Math.round((baseValue * initialMul + finalAdd) * finalMul * 100) / 100;
		case 'weight':
		case 'res':
			return Math.round(Math.min(Math.max((baseValue * initialMul + finalAdd) * finalMul, 0), 100));
		default:
			return Math.round((baseValue * initialMul + finalAdd) * finalMul);
	}
};

const getDmgReductionVal = (...modsList) => {
	const namedValues = [];
	const otherValues = [];
	// get highest value from all named values
	for (const { mods } of modsList) {
		for (const mod of mods) {
			const { key, value, name } = mod;
			if (key !== 'dmg_res') continue;
			if (name) {
				const index = namedValues.findIndex((ele) => ele.name === name);
				if (index === -1) {
					namedValues.push({ name, value });
				} else {
					if (value > namedValues[index].value) {
						namedValues[index].value = value;
					}
				}
				continue;
			}
			otherValues.push(value);
		}
	}
	const namedValuesToValue = namedValues.map((ele) => ele.value);
	return (
		Math.round(
			[...namedValuesToValue, ...otherValues].reduce((acc, curr) => {
				if (acc === 0) {
					acc = curr;
				} else {
					acc = 1 - (1 - acc) * (1 - curr);
				}
				return acc;
			}, 0) * 100
		) / 100
	);
};

//for compilation of difficulty mods
export function compileMods(enemy: EnemyDBEntry, mod: ModGroup) {
	const modsHolder = [];
	const { key, mods, stackType = 'mul' } = mod;
	// console.log(mod);
	for (const effects of mods.filter(Boolean)) {
		for (const effect of effects) {
			if (effect.targets.some((target) => checkIsTarget(enemy, target))) {
				for (const mod of effect.mods) {
					const { key, value, mode, order = 'final', name = '' } = mod;
					const item = modsHolder.find(
						(ele) => ele.key === key && ele.order === order && ele.mode === mode
					);
					if (!item) {
						modsHolder.push({ key: key, order: order, mode: mode, value: value, name });
						continue;
					}
					if (key === 'dmg_res') {
						item.value += value;
						continue;
					}
					switch (mode) {
						case 'mul':
							if (stackType === 'mul') {
								item.value *= value;
							} else {
								item.value += value - 1;
							}
							break;
						case 'add':
							item.value += value;
							break;
						default:
							console.warn('Unknown mod mode', mode);
					}
				}
			}
		}
	}
	return { key: key, mods: modsHolder };
}

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

export const checkIsTarget = (enemy: Enemy, target: string): boolean => {
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
