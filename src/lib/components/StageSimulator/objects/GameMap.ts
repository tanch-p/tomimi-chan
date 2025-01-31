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
	spineAssetManager: spine.AssetManager;
	textureLoader: THREE.TextureLoader;
	maxWaitTime = 0;
	assetManager: AssetManager;
	gameManager: GameManager;

	constructor(scene: THREE.Scene, config, objects, gameManager) {
		this.assetManager = AssetManager.getInstance();
		this.gameManager = gameManager;
		this.config = config;
		this.scene = scene;
		this.objects = objects;
		this.textureLoader = new THREE.TextureLoader();
		this.tileManager = new TileManager();
		this.maxWaitTime = this.getMaxWaitTime(config.routes);

		this.setTiles(config.mapData);

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

	addEnemy(action: any): void {
		const prefabKey = this.config.enemies.find((enemy) => enemy.id === action.key)?.prefabKey;
		if (!prefabKey) {
			console.log(action.key, ' prefabKey not found');
			return;
		}
		const originalRoute = this.config.routes[action['routeIndex']];
		const route = this.gameManager.convertMovementConfig(structuredClone(originalRoute));
		console.log(route);

		// Create two geometries with different sizes
		const hitBoxGeo = new THREE.CircleGeometry(GameConfig.gridSize * 0.1, 32);
		const shadowGeometry = new THREE.PlaneGeometry(
			GameConfig.gridSize * 0.8,
			GameConfig.gridSize * 0.4
		);

		// Apply different materials
		const hitBoxMaterial = new THREE.MeshBasicMaterial({
			color: 0xc51009,
			depthTest: false
			// transparent:true
		});
		const shadowMaterial = new THREE.MeshBasicMaterial({
			map: this.assetManager.textures.get('sprite_shadow').texture,
			depthTest: false,
			opacity: 0.85,
			transparent: true // Enable alpha transparency if the image has it
		});

		// Create two meshes
		const hitBoxMesh = new THREE.Mesh(hitBoxGeo, hitBoxMaterial);
		const shadowMesh = new THREE.Mesh(shadowGeometry, shadowMaterial);
		// Offset the small mesh so they don't overlap perfectly
		hitBoxMesh.position.set(0.5, 0.5, 0.5);
		shadowMesh.renderOrder = -1;
		// Group both meshes
		const group = new THREE.Group();
		group.add(shadowMesh);
		shadowMesh.userData.name = 'shadow';
		hitBoxMesh.userData.name = 'hitbox';
		group.add(hitBoxMesh);

		const enemyData = {
			key: action['key'],
			stats: {
				hp: 1,
				speed: 1
			}
		};

		const skeletonData = this.assetManager.spineMap.get(prefabKey);
		console.log(skeletonData);
		const skeletonMesh = new spine.SkeletonMesh(skeletonData, (parameters) => {
			parameters.depthTest = false;
			parameters.alphaTest = 0.001;
		});
		// console.log(
		// 	'height:',
		// 	skeletonMesh.skeleton.data.height,
		// 	'width:',
		// 	skeletonMesh.skeleton.data.width
		// );
		group.add(skeletonMesh);
		const size = new spine.Vector2(50, 100);
		const spriteMaterial = new THREE.SpriteMaterial({
			transparent: false,
			depthTest: false,
			opacity: 0,
			color: 0x000021
		});
		const sprite = new THREE.Sprite(spriteMaterial);
		sprite.scale.set(size.x, size.y, 1);
		sprite.position.z = GameConfig.gridSize;
		skeletonMesh.add(sprite);
		const enemy = new Enemy(enemyData, route, group, skeletonMesh, sprite, this.gameManager);
		sprite.userData.enemy = enemy;
		this.objects.push(sprite);
		this.enemies.push(enemy);
		this.scene.add(group);
	}

	update(deltaTime: number): void {
		for (const enemy of this.enemies.filter((e) => e.alive)) {
			enemy.update(deltaTime);
		}
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
