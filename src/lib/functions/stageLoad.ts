import type { MapConfig, Language, Enemy } from '$lib/types';
import enemyDatabase from '$lib/data/enemy/enemy_database.json';
import { getStageData, sortEnemies } from './lib';
import { overwriteBlackboard } from './skillHelpers';
import { parseTraps } from './trapHelpers';

export const stageLoad = async (stageName: string, language: Language) => {
	const config: MapConfig = await getStageData(stageName);
	const enemies = config.enemies.map(({ id, prefabKey, level, overwrittenData }) => {
		const enemy: Enemy = structuredClone(enemyDatabase[prefabKey]);

		enemy.stageId = id;
		enemy.level = level;
		enemy.stats = structuredClone(enemy.stats[level]);
		if (overwrittenData) {
			enemy.overwritten = true;
			for (const key in overwrittenData) {
				if (key === 'talentBlackboard') {
					overwriteBlackboard(enemy.stats, overwrittenData[key]);
				} else if (key === 'levelType') {
					if (overwrittenData[key] === 'NORMAL') {
						enemy.type = enemy.type.filter((ele) => !['BOSS', 'ELITE'].includes(ele));
					}
				} else {
					enemy.stats[key] = overwrittenData[key];
				}
			}
		}
		enemy.traits = enemy.stats.traits;
		return enemy;
	});
	const weights = {};
	enemies.forEach((enemy, i) => {
		if (!weights[enemy.id]) {
			weights[enemy.id] = i;
		}
	});
	enemies.sort((a: Enemy, b: Enemy) => weights[a.id] - weights[b.id]); //initial sort to make group enemies together
	if (!config.id.includes('duel') && !config.id.includes('_t_') && !config.id.includes('_ev_')) {
		enemies.sort(sortEnemies);
	}

	const traps = parseTraps(config.traps, language);
	return { config, enemies, traps };
};
