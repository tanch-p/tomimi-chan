import type { PageServerLoad } from './$types';
import enemyDatabase from "$lib/data/enemy/enemy_database.json"

export const load = (async ({ params }) => {
	const mapConfig = (await import('$lib/data/stages/is/ISW-NO_征兆.json')).default;
	const enemies = mapConfig.enemies.map(({id,statsLevel}) => {
        const enemy = {...enemyDatabase[id]};
        enemy.stats = enemyDatabase[id].stats[statsLevel];
        return enemy;
    })
	return {
		mapConfig,
		enemies
	};
}) satisfies PageServerLoad;
