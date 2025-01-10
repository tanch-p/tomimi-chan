import type { MapConfig, Language, Enemy } from '$lib/types';
import enemyDatabase from '$lib/data/enemy/enemy_database.json';
import findStage from '$lib/functions/findStage';
import { sortEnemies } from './lib';
import { overwriteBlackboard } from './skillHelpers';
import { parseTraps } from './trapHelpers';

export const stageLoad = async (
	stageName: string,
	rogueTopic: string | null,
	language: Language
) => {
	const mapConfig: MapConfig = findStage(stageName, rogueTopic);
	const enemies = mapConfig.enemies.map(({ id, prefabKey, level, overwrittenData }) => {
		const enemy: Enemy = JSON.parse(JSON.stringify(enemyDatabase[prefabKey]));
		enemy.stageId = id;
		enemy.level = level;
		enemy.stats = { ...enemy.stats[level] };
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
	enemies.sort((a: Enemy, b: Enemy) => weights[a.id] - weights[b.id]);
	if (
		!mapConfig.id.includes('duel') &&
		!mapConfig.id.includes('_t_') &&
		!mapConfig.id.includes('_ev_')
	) {
		enemies.sort(sortEnemies);
	}
	const enemyPromises = await Promise.all(
		enemies.map((enemy) => import(`../images/enemy_icons/icon_${enemy.key}.webp`))
	);
	enemies.forEach((enemy, index) => (enemy.img = enemyPromises[index].default));

	const traps = parseTraps(mapConfig.traps, language);
	const trapPromises = await Promise.all(
		traps.map((trap) => import(`../images/chara_icons/icon_${trap.key}.webp`))
	);
	traps.forEach((trap, index) => (trap.img = trapPromises[index].default));
	return { mapConfig, enemies, traps };
};
