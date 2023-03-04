/* takes in a list of enemies and statMods and returns enemy with modifiers applied */
import type { Enemy, StatMods, Mods } from '../../routes/[lang]/stages/(is)/[name=is_maps]/types';

const STATS = ['hp', 'atk', 'aspd', 'range', 'def', 'res', 'weight', 'ms', 'lifepoint'];

const NOT_BOSSES = ['MK', 'JAK'];

export const getMaxRowSpan = (enemy: Enemy) => {
	const { format } = enemy;
	return format === 'powerup' || format === 'prisoner'
		? 2
		: format === 'multiform'
		? enemy.forms.length
		: 1;
};

// enemy stats type is being changed from {} to [{}] here
export default function parseStats(enemies: Enemy[], statMods: StatMods) {
	return enemies.map((enemy) => {
		const maxRowSpan = getMaxRowSpan(enemy);
		const moddedStats = [];
		for (let i = 0; i < maxRowSpan; i++) {
			moddedStats.push(applyMods(enemy, statMods, i));
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
const applyMods = (enemy: Enemy, statMods: StatMods, row: number) => {
	const mods = getEnemyStatMods(enemy, statMods, row);
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
const getEnemyStatMods = (enemy: Enemy, statMods: StatMods, row: number) => {
	const { format } = enemy;
	const enemyStatMod = { ...statMods.ALL };
	for (const target of Object.keys(statMods)) {
		if (target !== 'ALL') {
			if (isTarget(enemy, target)) {
				distillMods(enemyStatMod, statMods[target]);
			}
		}
	}

	if (format !== 'normal') {
		switch (format) {
			case 'prisoner':
				if (row === 0) {
					//imprisoned debuffs
					distillMods(enemyStatMod, enemy.imprisoned.mods);
				} else {
					//released buffs
					distillMods(enemyStatMod, enemy.released.mods);
				}
				break;

			case 'powerup':
				if (row === 1) {
					distillMods(enemyStatMod, enemy.powerup.mods);
				}
				break;
			case 'multiform':
				distillMods(enemyStatMod, enemy.forms[row].mods);
				break;
		}
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

const isTarget = (enemy: Enemy, target: string) => {
	const { id, type } = enemy;
	switch (target) {
		case 'ranged':
		case 'melee':
		case 'ELITE':
		case 'BOSS':
			return type.includes(target);
		// case "phcs_boss":
		// 	return PHCS_BOSSES.includes(id);
		case 'NOT_BOSS':
			if (type.includes('BOSS')) {
				return NOT_BOSSES.includes(id);
			}
			return true;
		default:
			return target === id;
	}
};
