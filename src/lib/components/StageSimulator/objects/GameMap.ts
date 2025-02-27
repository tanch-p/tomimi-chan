import * as THREE from 'three';
import type { MapConfig } from '$lib/types';
import { Enemy } from './Enemy';
import { GameConfig } from './GameConfig';
import { StickBox } from './StickBox';
import { AssetManager } from './AssetManager';
import { GameManager } from './GameManager';

export class GameMap {
	config: MapConfig;
	scene: THREE.Scene;
	enemies: Enemy[] = [];
	objects: THREE.Mesh[];
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

		this.setup(this.config.mapData);

		const geometry = new THREE.PlaneGeometry(
			this.gameManager.mazeLayout[0].length * GameConfig.gridSize,
			this.gameManager.mazeLayout.length * GameConfig.gridSize
		);
		const plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: false }));
		plane.userData.name = 'plane';
		this.scene.add(plane);
		this.objects.push(plane);
		this.gameManager.initTraps(this.gameManager.config.traps);
	}

	setup(mapData) {
		const forbiddenTiles =
			(GameConfig.eliteMode && this.config.elite_runes?.forbid_locations) || [];
		const { map, tiles } = mapData;
		map.forEach((row, rowIdx) =>
			row.forEach((tileIndex, colIdx) => {
				const group = new THREE.Group();
				const [tileName, heightType, mask, blackboard, buildableType] = tiles[tileIndex];
				const tileToSet = structuredClone(tiles[tileIndex]);
				const key = `${colIdx},${rowIdx}`;
				if (forbiddenTiles.includes(key)) {
					switch (heightType) {
						case 0:
							tileToSet[0] = 'tile_floor';
							break;
						default:
							tileToSet[0] = 'tile_forbidden';
							break;
					}
				}
				const tileGroup = this.gameManager.tileManager.get(tileToSet);
				const { x, y } = this.gameManager.getVectorCoordinates(
					{
						row: rowIdx,
						col: colIdx
					},
					null
				);
				let z = 0;
				switch (tileName) {
					case 'tile_end':
						tileGroup.add(new StickBox(100, 100, 100, 'blue').getMesh());
						break;
					case 'tile_start':
						tileGroup.add(new StickBox(100, 100, 100, 'red').getMesh());
						break;
					case 'tile_telin':
					case 'tile_telout':
					case 'tile_hole':
					case 'tile_deepsea':
						z = -50;
						break;
					case 'tile_forbidden':
						z = 20;
						break;
					case 'tile_flystart':
						break;
					default:
						if (heightType === 1) {
							z = 20;
						}
						break;
				}
				this.gameManager.tiles.set(`${colIdx},${rowIdx}`, {
					tileName,
					heightType,
					mask,
					buildableType,
					blackboard,
					mesh: tileGroup,
					group: group
				});
				group.add(tileGroup);
				group.position.set(x, y, z);
				this.scene.add(group);
			})
		);
	}
}
