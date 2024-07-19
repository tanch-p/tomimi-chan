import type { MapConfig, Enemy } from '$lib/types';
import enemyDatabase from '$lib/data/enemy/enemy_database.json';
import findStage from '$lib/functions/findStage';
import { sortEnemies } from './lib';
import { overwriteBlackboard } from './skillHelpers';

export const stageLoad = async (stageName: string, rogueTopic: string | null) => {
	const mapConfig: MapConfig = findStage(stageName, rogueTopic);
	const enemies = mapConfig.enemies.map(({ id, prefabKey, level, overwrittenData }) => {
		const enemy: Enemy = JSON.parse(JSON.stringify(enemyDatabase[prefabKey]));
		enemy.stageId = id;
		enemy.stats = { ...enemyDatabase[prefabKey].stats[level] };
		if (overwrittenData) {
			enemy.overwritten = true;
			for (const key in overwrittenData) {
				if (key === 'talentBlackboard') {
					if (enemy?.forms) {
						overwrittenData[key].forEach((ele, index) => {
							enemy.forms[index].special = overwriteBlackboard(enemy.forms[index].special, ele);
						});
					} else {
						enemy.special = overwriteBlackboard(enemy.special, overwrittenData[key]);
					}
				} else {
					enemy.stats[key] = overwrittenData[key];
				}
			}
		}
		return enemy;
	});
	if (!mapConfig.id.includes('duel')) {
		enemies.sort(sortEnemies);
	}
	const data = await Promise.all(
		enemies.map((enemy) => import(`../images/enemy_icons/icon_${enemy.key}.webp`))
	);
	enemies.forEach((enemy, index) => (enemy.img = data[index].default));

	return { mapConfig, enemies };
};

const STAGES_WITH_ELITE_IMG = ['ro3_e_3_2', 'ro3_e_4_2', 'ro3_e_5_2'];
export const getStageImg = (id, eliteMods) => {
	if (
		!(eliteMods && STAGES_WITH_ELITE_IMG.includes(id)) &&
		!id.includes('ev') &&
		!id.includes('duel')
	) {
		id = id.replace('e', 'n');
	}
	return id;
};
