import * as THREE from 'three';
import type { MapConfig } from '$lib/types';
import { Enemy } from './Enemy';
import { GameConfig } from './GameConfig';
import { StickBox } from './StickBox';
import { TileManager } from './TileManager';
import { AssetManager } from './AssetManager';
import { GameManager } from './GameManager';
import { Trap } from './Trap';

export class GameMap {
	config: MapConfig;
	scene: THREE.Scene;
	enemies: Enemy[] = [];
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
		this.tileManager = new TileManager(gameManager);

		this.setup(this.config.mapData, this.config.trap_pos);

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

	setup(mapData, trapPos) {
		const { map, tiles } = mapData;
		map.forEach((row, rowIdx) =>
			row.forEach((tileIndex, colIdx) => {
				const [tileName, heightType, mask] = tiles[tileIndex];
				const group = this.tileManager.get(tiles[tileIndex]);
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
						group.add(new StickBox(100, 100, 100, 'blue').getMesh());
						break;
					case 'tile_start':
						group.add(new StickBox(100, 100, 100, 'red').getMesh());
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
				group.position.set(x, y, z);

				const trapData = trapPos.find((ele) => {
					const pos = this.gameManager.gameToWorldPos(ele.pos);
					return pos.row == rowIdx && pos.col == colIdx && !ele.hidden;
				});
				if (trapData) {
					const trap = new Trap(trapData.key, this.gameManager);
					if (trap.isRoadblock) {
						this.gameManager.updateMazeLayout(this.gameManager.gameToWorldPos(trapData.pos), 1000);
					}
					group.add(trap.getMesh());
				}

				this.scene.add(group);
			})
		);
	}

	getTile(row, col) {
		// return this.tiles.get(`${x},${y}`);
	}
}
