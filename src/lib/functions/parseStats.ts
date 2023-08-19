/* takes in a list of enemies and statMods and returns enemy with modifiers applied */
import type { Enemy, StatMods, Mods, Effects } from '$lib/types';

const STATS = ['hp', 'atk', 'aspd', 'range', 'def', 'res', 'weight', 'ms', 'lifepoint'];

const PHCS_BOSSES = ['ICR', 'ICM', 'MSC', 'FSK', 'JTM', 'WDG', 'PTM', 'DOL', 'HST', 'WRT'];
const MZK_BOSSES = [''];
const SAMI_BOSSES = [''];

export const getMaxRowSpan = (enemy: Enemy) => {
	if(enemy?.forms){
		return enemy.forms.length
	}
	return 1
};

// enemy stats type is being changed from {} to [{}] here
export function parseStats(enemies: Enemy[], statMods: StatMods, ...effectsToAdd: Effects[]) {
	return enemies.map((enemy) => {
		const maxRowSpan = getMaxRowSpan(enemy);
		const moddedStats = [];
		for (let i = 0; i < maxRowSpan; i++) {
			moddedStats.push(applyMods(enemy, statMods, i, effectsToAdd));
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
			return MZK_BOSSES.includes(id);
		case 'NOT_MZK_BOSS':
			return !MZK_BOSSES.includes(id);
		case 'SAMI_BOSS':
			return SAMI_BOSSES.includes(id);
		case 'NOT_SAMI_BOSS':
			return !SAMI_BOSSES.includes(id);
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
					} else {
						mods[key] += effect.mods[key] - 1;
					}
				}
			}
		}
	}
	return mods;
}
