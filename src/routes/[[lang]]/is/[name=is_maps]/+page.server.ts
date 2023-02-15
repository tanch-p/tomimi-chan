import type { PageServerLoad } from './$types';
import type { ISMapConfig, Enemy } from './types';
import enemyDatabase from '$lib/data/enemy/enemy_database.json';
import findStage from '$lib/functions/findStage';

export const load = (async ({ params }) => {
	const language = params.lang || "en";
	const mapConfig: ISMapConfig = findStage(params.name);
	const enemies = mapConfig.enemies.map(({ id, level, overwrittenData }) => {
		const enemy: Enemy = { ...enemyDatabase[id] };
		enemy.stats = enemyDatabase[id].stats[level];
		if (overwrittenData) {
			for (const statKey in overwrittenData) {
				enemy.stats[statKey] = overwrittenData[statKey];
			}
		}
		return enemy;
	});
	return {
		mapConfig,
		enemies,
		language
	};
}) satisfies PageServerLoad;
