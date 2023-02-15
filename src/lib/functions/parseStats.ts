/* takes in a list of enemies and statMods and returns enemy with modifiers applied */
import type { Enemy, StatMods,Mods } from '../../routes/[[lang]]/is/[name=is_maps]/types';

const STATS = ['hp', 'atk', 'aspd', 'range', 'def', 'res', 'weight', 'ms', 'lifepoint'];

export default function parseStats(enemies: Enemy[], statMods: StatMods) {
	return enemies.map((enemy) => {
		return { ...enemy, stats: applyMods(enemy, statMods) };
	});
}

/*
ALL + others -> distill into enemy ID
*/

//returns enemy 'stats' object with modded stats
const applyMods = (enemy: Enemy, statMods: StatMods, row = 0) => {
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
	// console.log(enemy.id, enemy_stats);
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
				distillMods(enemyStatMod, enemy.stats.forms[row].mods);
				break;
		}
	}
	// console.log(enemy.id, statMod);
	return enemyStatMod;
};

const calculateModdedStat = (
	base_stat: number,
	stat: string,
	multiplier: number,
	fixed_value: number
) => {
	base_stat += fixed_value;
	if (!multiplier) return base_stat;
	switch (stat) {
		case 'aspd':
			if (multiplier < 1) {
				return Math.round(base_stat * (1 + multiplier) * 100) / 100;
			}
			return Math.round((base_stat / multiplier) * 100) / 100;
		case 'range':
			return Math.round(base_stat * multiplier * 100) / 100;
		case 'res':
		case 'weight':
			return Math.min(Math.max((base_stat += multiplier), 0), 100);
		default:
			return Math.round(base_stat * multiplier);
	}
};

const distillMods = (enemyStatMod:Mods, mods:Mods) => {
	for (const stat in mods) {
		const value = mods[stat];
		if (!enemyStatMod.hasOwnProperty(stat)) {
			enemyStatMod[stat] = value;
		} else if (stat.includes('fixed')) {
			enemyStatMod[stat] += value;
		} else {
			switch (stat) {
				case 'res':
				case 'weight':
					enemyStatMod[stat] += value;
					break;
				default:
					enemyStatMod[stat] *= value;
					break;
			}
		}
	}
	return enemyStatMod;
};

const isTarget = (enemy:Enemy, target:string) => {
	const { id, type } = enemy;
	switch (target) {
		case 'ranged':
		case 'melee':
		case 'ELITE':
		case 'BOSS':
			return type.includes(target);
		// case "phcs_boss":
		// 	return PHCS_BOSSES.includes(id);
		// case "not_phcs_boss":
		// 	return !PHCS_BOSSES.includes(id);
		default:
			return target === id;
	}
};
