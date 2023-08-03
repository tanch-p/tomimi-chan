import type { MapConfig, Enemy } from '$lib/types';
import enemyDatabase from '$lib/data/enemy/enemy_database.json';
import findStage, { findCCStage } from '$lib/functions/findStage';

export const stageLoad = async (stageName: string, rogueTopic: string | null) => {
	const mapConfig: MapConfig = rogueTopic
		? findStage(stageName, rogueTopic)
		: findCCStage(stageName);
	const enemies = mapConfig.enemies.map(({ id, level, overwrittenData }) => {
		const enemy: Enemy = { ...enemyDatabase[id] };
		enemy.stats = { ...enemyDatabase[id].stats[level] };
		if (overwrittenData) {
			enemy.overwritten = true;
			for (const key in overwrittenData) {
				if (key === 'talentBlackboard') {
					if (enemy.format === 'multiform') {
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
	const data = await Promise.all(
		enemies.map(
			(enemy) => import(`../images/enemy_icons/enemy${enemy.key.replace('enemy', '')}.webp`)
		)
	);
	enemies.forEach((enemy, index) => (enemy.img = data[index].default));

	return { mapConfig, enemies };
};

const overwriteBlackboard = (specialList, blackboard) => {
	for (const skillRef of blackboard) {
		skillRef.overwritten = true;
		const index = specialList.findIndex((ele) => ele.key === skillRef.key);
		specialList.splice(index, 1, skillRef);
	}
	return specialList;
};
