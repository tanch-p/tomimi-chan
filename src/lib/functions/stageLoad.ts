import type { MapConfig, Enemy } from '$lib/types';
import enemyDatabase from '$lib/data/enemy/enemy_database.json';
import findStage from '$lib/functions/findStage';

const SPECIAL_CASES = {
	'level_rogue3_3-7': ['enemy_1352_eslime']
};

export const stageLoad = async (stageName: string, rogueTopic: string | null) => {
	const mapConfig: MapConfig = findStage(stageName, rogueTopic);
	const enemies = mapConfig.enemies.map(({ id, level, overwrittenData }) => {
		const enemy: Enemy = JSON.parse(JSON.stringify(enemyDatabase[id]));
		enemy.stats = { ...enemyDatabase[id].stats[level] };
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
		//handling of special cases where stats not added
		for (const key in SPECIAL_CASES) {
			if (mapConfig['levelId'] === key && SPECIAL_CASES[mapConfig['levelId']].includes(enemy.key)) {
				enemy.ignore_diff = true;
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
