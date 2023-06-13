import type { MapConfig, Enemy } from '$lib/types';
import enemyDatabase from '$lib/data/enemy/enemy_database.json';
import findStage from '$lib/functions/findStage';

export const stageLoad = async (stageName: string, rogueTopic: string) => {
	const mapConfig: MapConfig = findStage(stageName, rogueTopic);
	const enemies = mapConfig.enemies.map(({ id, level, overwrittenData }) => {
		const enemy: Enemy = { ...enemyDatabase[id] };
		enemy.stats = { ...enemyDatabase[id].stats[level] };
		if (overwrittenData) {
			for (const statKey in overwrittenData) {
				enemy.stats[statKey] = overwrittenData[statKey];
			}
		}
		return enemy;
	});
	const data = await Promise.all(enemies.map(enemy => import(`../images/enemy_icons/enemy${enemy.key.replace('enemy', '')}.webp`)))
	enemies.forEach((enemy,index) => enemy.img = data[index].default)

	return { mapConfig, enemies };
};
