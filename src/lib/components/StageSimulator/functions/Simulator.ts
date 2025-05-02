import type { MapConfig, Enemy as EnemyType } from '$lib/types';
import { GameManager } from '../objects/GameManager';
import { GameMap } from '../objects/GameMap';
import { SpawnManager } from '../objects/SpawnManager';

function getSimulatedData(config: MapConfig, waveData, enemies: EnemyType[]) {
	const objects = [];
	const gameManager = new GameManager(config, null, null, objects, enemies, true);
	const map = new GameMap(gameManager);
	const spawnManager = new SpawnManager(waveData, map, gameManager);

	let isEnded = false;
	let i = 1;
	let data = {};
	while (!isEnded) {
		const deltaTime = i / 60;
		spawnManager.update(deltaTime);
		gameManager.update(deltaTime);

		if (i === 60) {
			i = 1;
			data[i] = { hi: 'hi' };
			if (Object.keys(data).length > 600) {
				break;
			}
		} else {
			i++;
		}
		if (spawnManager.isFinished && gameManager.noEnemyAlive) {
			isEnded = true;
		}
	}
	console.log(data);
}
