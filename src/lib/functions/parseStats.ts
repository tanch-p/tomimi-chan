/* takes in a list of enemies and statMods and returns enemy with modifiers applied */
import type { Enemy, StatMods, Mods, Effects } from '$lib/types';

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

export const getMaxRowSpan = (enemy: Enemy) => {
	if (enemy?.forms) {
		return enemy.forms.length;
	}
	return 1;
};

// enemy stats type is being changed from {} to [{}] here
export function parseStats(
	enemies: Enemy[],
	statMods: StatMods,
	finalFixedStatMods,
	...effectsToAdd: Effects[]
) {
	return enemies.map((enemy) => {
		const maxRowSpan = getMaxRowSpan(enemy);
		const moddedStats = [];
		for (let i = 0; i < maxRowSpan; i++) {
			moddedStats.push(applyMods(enemy, statMods, i, finalFixedStatMods, effectsToAdd));
		}
		return {
			...enemy,
			stats: moddedStats
		};
	});
}

/*
ALL + others -> distill into enemy ID
*/

//returns enemy 'stats' object with modded stats
export const applyMods = (
	enemy: Enemy,
	statMods: StatMods,
	row: number,
	finalFixedStatMods,
	effectsToAdd: Effects[]
) => {
	const mods = getEnemyStatMods(enemy, statMods, row, effectsToAdd);
	const enemy_stats = {};
	for (const stat of STATS) {
		enemy_stats[stat] = calculateModdedStat(
			enemy.stats[stat],
			stat,
			mods[stat],
			mods?.[`fixed_${stat}`] ?? 0
		);
		//hotfix for sami_portal
		if (finalFixedStatMods) {
			if(stat === "dmg_reduction"){
				continue;
			}
			for (const { targets, mods } of finalFixedStatMods) {
				if (targets.some((target) => checkIsTarget(enemy, target))) {
					enemy_stats[stat] = calculateModdedStat(
						enemy_stats[stat],
						stat,
						mods[stat] ?? 1,
						mods?.[`fixed_${stat}`] ?? 0
					);
				}
			}
		}
	}
	return enemy_stats;
};

//returns object with statMods to be used for calculateModdedStat
const getEnemyStatMods = (
	enemy: Enemy,
	statMods: StatMods,
	row: number,
	effectsToAdd: Effects[]
) => {
	const enemyStatMod = { ...statMods.ALL };
	for (const target of Object.keys(statMods)) {
		if (target !== 'ALL') {
			if (checkIsTarget(enemy, target)) {
				distillMods(enemyStatMod, statMods[target]);
			}
		}
	}

	const addedMods = addMods(enemy, effectsToAdd);
	distillMods(enemyStatMod, addedMods);

	if (enemy?.forms) {
		distillMods(enemyStatMod, enemy.forms[row].mods);
	}
	return enemyStatMod;
};

const calculateModdedStat = (
	base_stat: number,
	stat: string,
	multiplier: number,
	fixed_value: number
) => {
	let aspd = 100;
	if (stat !== 'aspd') {
		base_stat += fixed_value;
	}
	switch (stat) {
		//temp fix for dmg_reduction, to move to its own calculation if dmg reduction appears not just in difficulty mods
		case 'dmg_reduction':
			return multiplier ?? 0;
		case 'aspd':
			aspd += fixed_value;
			return Math.round((base_stat / ((aspd * multiplier) / 100)) * 100) / 100;
		case 'range':
		case 'ms':
			return Math.round(base_stat * multiplier * 100) / 100;
		case 'weight':
		case 'res':
			return Math.min(Math.max((base_stat *= multiplier), 0), 100);
		default:
			return Math.round(base_stat * multiplier);
	}
};

const distillMods = (enemyStatMod: Mods, mods: Mods) => {
	for (const stat in mods) {
		const value = mods[stat];
		if (!enemyStatMod.hasOwnProperty(stat)) {
			enemyStatMod[stat] = value;
		} else if (stat.includes('fixed')) {
			enemyStatMod[stat] += value;
		} else {
			enemyStatMod[stat] *= value;
		}
	}
	return enemyStatMod;
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
		default:
			return target === id || target === key;
	}
};

//fix added for rogue_sami
function addMods(enemy: Enemy, effectsToAdd: Effects[] = []) {
	const mods = {};
	for (const effects of effectsToAdd) {
		for (const effect of effects) {
			const isTarget = effect.targets.find((target) => checkIsTarget(enemy, target));
			if (isTarget) {
				for (const key in effect.mods) {
					if (!mods[key]) {
						mods[key] = effect.mods[key];
					} else if (key.includes('fixed')) {
						mods[key] += effect.mods[key];
					} else if (key === 'dmg_reduction') {
						//to remove when dmg_reduction calc is moved
						mods[key] += effect.mods[key];
					} else {
						mods[key] += effect.mods[key] - 1;
					}
				}
			}
		}
	}
	return mods;
}
