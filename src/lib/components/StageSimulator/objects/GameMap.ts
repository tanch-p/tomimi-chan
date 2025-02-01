import * as THREE from 'three';
import * as spine from '$lib/spine';
import type { MapConfig } from '$lib/types';
import { Enemy } from './Enemy';
import { GameConfig } from './GameConfig';
import { StickBox } from './StickBox';
import { TileManager } from './TileManager';
import { AssetManager } from './AssetManager';
import { GameManager } from './GameManager';

export class GameMap {
	config: MapConfig;
	scene: THREE.Scene;
	enemies: Enemy[] = [];
	cubeGeo: THREE.BoxGeometry;
	cubeMaterial: THREE.MeshLambertMaterial;
	objects: THREE.Mesh[];
	raycaster: THREE.Raycaster;
	pointer: THREE.Vector2;
	gameTime: number;
	cost: number;
	tileManager: TileManager;
	textureLoader: THREE.TextureLoader;
	maxWaitTime = 0;
	assetManager: AssetManager;
	gameManager: GameManager;

	constructor(gameManager) {
		this.assetManager = AssetManager.getInstance();
		this.gameManager = gameManager;
		this.config = gameManager.config;
		this.scene = gameManager.scene;
		this.objects = gameManager.objects;
		this.textureLoader = new THREE.TextureLoader();
		this.tileManager = new TileManager();

		this.setTiles(this.config.mapData);

		const geometry = new THREE.PlaneGeometry(
			this.gameManager.mazeLayout[0].length * GameConfig.gridSize,
			this.gameManager.mazeLayout.length * GameConfig.gridSize
		);
		const plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: false }));
		plane.userData.name = 'plane';
		this.scene.add(plane);
		this.objects.push(plane);
		this.raycaster = new THREE.Raycaster();
		this.pointer = new THREE.Vector2();
	}

	setTiles(mapData) {
		const { map, tiles } = mapData;
		map.forEach((row, rowIdx) =>
			row.forEach((tileIndex, colIdx) => {
				const [tileName, heightType, mask] = tiles[tileIndex];
				const group = this.tileManager.get(tiles[tileIndex]);
				const { x, y } = this.gameManager.getVectorCoordinates({
					row: rowIdx,
					col: colIdx
				});
				let z = 0; //elevation for everything if not -z things will get truncated
				switch (tileName) {
					case 'tile_end':
						group.add(new StickBox(100, 100, 100, 'blue').getMesh());
						break;
					case 'tile_start':
						group.add(new StickBox(100, 100, 100, 'red').getMesh());
						break;
					case 'tile_telin':
					case 'tile_telout':
					case 'tile_hole':
						z = -50;
						break;
					case 'tile_forbidden':
					case 'tile_wall':
						z = 20;
						break;
					default:
						break;
				}
				group.position.set(x, y, z);
				this.scene.add(group);
			})
		);
	}

	getMaxWaitTime(routes) {
		let maxTime = 0;
		for (const route of routes) {
			if (route.checkpoints) {
				for (const cp of route.checkpoints) {
					const { type, time } = cp;
					if (type === 'WAIT_FOR_SECONDS' && time > maxTime) {
						maxTime = time;
					}
				}
			}
		}
		return maxTime;
	}
}
