/* takes in a list of enemies and statMods and returns enemy with modifiers applied */

const STATS = ['hp', 'atk', 'aspd', 'range', 'def', 'res', 'weight', 'ms', 'lifepoint'];

export default function parseStats(enemies, statMods) {
	return enemies.map((enemy) => {
		return { ...enemy, stats: applyMods(enemy, statMods) };
	});
}

/*
ALL + others -> distill into enemy ID
*/

//returns enemy 'stats' object with modded stats
const applyMods = (enemy, statMods, row = 0) => {
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
const getEnemyStatMods = (enemy, statMods, row) => {
	const { format } = enemy;
	const statMod = { ...statMods.ALL };
	for (const target of Object.keys(statMods)) {
		if (target !== 'ALL') {
			if (isTarget(enemy, target)) {
				distillMods(statMod, statMods[target]);
			}
		}
	}

	if (format !== 'normal') {
		switch (format) {
			case 'prisoner':
				if (row === 0) {
					//imprisoned debuffs
					distillMods(statMod, enemy.imprisoned.mods);
				} else {
					//released buffs
					distillMods(statMod, enemy.released.mods);
				}
				break;

			case 'powerup':
				if (row === 1) {
					distillMods(statMod, enemy.powerup.mods);
				}
				break;
			case 'multiform':
				distillMods(statMod, enemy.stats.forms[row].mods);
				break;
		}
	}
	// console.log(enemy.id, statMod);
	return statMod;
};

const calculateModdedStat = (base_stat, stat, multiplier, fixed_value) => {
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

const distillMods = (statMods, mods) => {
	for (const stat in mods) {
		const value = mods[stat];
		if (!statMods.hasOwnProperty(stat)) {
			statMods[stat] = value;
		} else if (stat.includes('fixed')) {
			statMods[stat] += value;
		} else {
			switch (stat) {
				case 'res':
				case 'weight':
					statMods[stat] += value;
					break;
				default:
					statMods[stat] *= value;
					break;
			}
		}
	}
	return statMods;
};

const isTarget = (enemy, target) => {
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
