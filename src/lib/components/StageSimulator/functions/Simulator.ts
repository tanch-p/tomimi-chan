import type { MapConfig, Enemy as EnemyType } from '$lib/types';
import { GameConfig } from '../objects/GameConfig';
import { GameManager } from '../objects/GameManager';
import { GameMap } from '../objects/GameMap';
import { SpawnManager } from '../objects/SpawnManager';
import * as THREE from 'three';

export function getSimulatedData(config: MapConfig, waveData, enemies: EnemyType[]) {
	const objects = [];
	const scene = new THREE.Scene(); //add objects here to make garbage collection easier

	const gameManager = new GameManager(config, scene, null, objects, enemies, true);
	const map = new GameMap(gameManager);
	const spawnManager = new SpawnManager(waveData, map, gameManager);

	let isEnded = false;
	let i = 1;
	let count = 0;
	let data = {};
	setData(count, data, spawnManager, gameManager);

	// Simulate at 60fps, 1x speed
	while (!isEnded) {
		const deltaTime = 1 / 60;
		spawnManager.update(deltaTime);
		gameManager.update(deltaTime);

		if (i === 60) {
			i = 1;
			count++;
			setData(count, data, spawnManager, gameManager);
			if (Object.keys(data).length > 1000) {
				break;
			}
		} else {
			i++;
		}
		if (spawnManager.isFinished && gameManager.noEnemyAlive) {
			isEnded = true;
		}
	}
	GameConfig.setValue('scaledElapsedTime', 0);
	GameConfig.setValue('waveElapsedTime', 0);
	GameConfig.setValue('currentWaveIndex', 0);
	GameConfig.waveElapsedTime = 0;

	console.log(data);
	cleanup(scene);
}

function setData(count, data, spawnManager: SpawnManager, gameManager: GameManager) {
	data[count] = {
		waveElapsedTime: GameConfig.waveElapsedTime.toFixed(2),
		currentWaveIndex: spawnManager.currentWaveIndex,
		currentFragmentIndex: spawnManager.currentFragmentIndex,
		activeActions: structuredClone(spawnManager.activeActions),
		completedActions: structuredClone(spawnManager.completedActions),
		fragmentsTimeTracker: structuredClone(spawnManager.fragmentsTimeTracker),
		isProcessingFragment: spawnManager.isProcessingFragment,
		nextWaveTimer: spawnManager.nextWaveTimer,
		nextWaveType: spawnManager.nextWaveType,
		enterNextWaveFlag: spawnManager.enterNextWaveFlag,
		preDelayTimer: spawnManager.preDelayTimer,
		fragmentPreDelayTimer: spawnManager.fragmentPreDelayTimer,
		postDelayTimer: spawnManager.postDelayTimer,
		enemiesOnMap: gameManager.enemiesOnMap
	};
}

function cleanup(scene: THREE.Scene) {
	const objectsToRemove: THREE.Object3D[] = [];

	scene.traverse((obj) => {
		objectsToRemove.push(obj); // Collect objects
	});
	objectsToRemove.forEach((obj) => {
		// Dispose of geometry and material
		disposeObject(obj);
		// Remove from parent
		if (obj.parent) {
			obj.parent.remove(obj);
		}
	});
}

function disposeObject(obj: THREE.Object3D) {
	if ((obj as THREE.Mesh).geometry) {
		(obj as THREE.Mesh).geometry.dispose();
	}

	if ((obj as THREE.Mesh).material) {
		const material = (obj as THREE.Mesh).material;
		if (Array.isArray(material)) {
			material.forEach((mat) => mat.dispose());
		} else {
			material.dispose();
		}
	}
}
