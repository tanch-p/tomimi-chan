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
	tiles = new Map();

	constructor(gameManager) {
		this.assetManager = AssetManager.getInstance();
		this.gameManager = gameManager;
		this.config = gameManager.config;
		this.scene = gameManager.scene;
		this.objects = gameManager.objects;
		this.textureLoader = new THREE.TextureLoader();
		this.tileManager = new TileManager(gameManager);

		this.setup(this.config.mapData, this.config.traps);

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

	setup(mapData, traps) {
		const { map, tiles } = mapData;
		map.forEach((row, rowIdx) =>
			row.forEach((tileIndex, colIdx) => {
				const group = new THREE.Group();
				const [tileName, heightType] = tiles[tileIndex];
				const tileGroup = this.tileManager.get(tiles[tileIndex]);
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
				const mapKey = `${colIdx},${rowIdx}`;
				this.tiles.set(mapKey, tiles[tileIndex]);
				group.add(tileGroup);
				group.position.set(x, y, z);

				const trapData = traps.find((ele) => {
					const pos = this.gameManager.gameToWorldPos(ele.pos);
					return pos.row == rowIdx && pos.col == colIdx && !ele.hidden;
				});
				if (trapData) {
					const trap = new Trap(trapData, this.gameManager);
					if (trap.isRoadblock) {
						this.gameManager.updateMazeLayout(this.gameManager.gameToWorldPos(trapData.pos), 1000);
					}
					if (trap.hideTile) {
						tileGroup.visible = false;
					} else {
						trap.getMesh().position.z = z + 0.05;
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
