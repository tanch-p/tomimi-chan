import * as THREE from 'three';
import type { Enemy as EnemyType, MapConfig, Position } from '$lib/types';
import { GameConfig } from './GameConfig';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { AssetManager } from './AssetManager';
import { generateMaze } from '$lib/functions/mazeHelpers';
import { Enemy } from './Enemy';
import { writable } from 'svelte/store';
import { SPFA } from './SPFA';
import { Trap } from './Trap';
import { SpawnManager } from './SpawnManager';
import { TileManager } from './TileManager';
import { CountdownManager } from './ShaderCountdownManager';

export class GameManager {
	assetManager: AssetManager;
	scene: THREE.Scene;
	camera: THREE.OrthographicCamera;
	objects;
	config;
	mazeLayout: number[][];
	enemies: EnemyType[];
	enemiesOnMap: Enemy[] = [];
	traps = new Map();
	pathFinder: SPFA;
	noEnemyAlive = false;
	killedCount = writable(0);
	spawnManager: SpawnManager;
	tiles = new Map();
	tileManager: TileManager;
	rollOverMeshes = new Map();
	countdownManager: CountdownManager;

	constructor(
		config: MapConfig,
		scene: THREE.Scene,
		camera: THREE.OrthographicCamera,
		objects,
		enemies: Enemy[]
	) {
		this.enemies = enemies;
		this.config = config;
		this.assetManager = AssetManager.getInstance();
		this.countdownManager = CountdownManager.getInstance();
		this.scene = scene;
		this.camera = camera;
		this.objects = objects;
		const mazeLayout = generateMaze(config.mapData.map, config.mapData.tiles);
		this.mazeLayout = mazeLayout;
		this.pathFinder = new SPFA(mazeLayout);
		this.tileManager = new TileManager(config.levelId);
		this.initPlane();
		this.initRollOverMeshes();
	}

	getVectorCoordinates = (pos, reachOffset) => {
		let offSetX = 0,
			offSetY = 0;
		if (reachOffset) {
			offSetX = reachOffset.x;
			offSetY = reachOffset.y;
		}
		const { row, col } = pos;
		const x = this.getCoordinate(parseInt(col) + offSetX, 'x');
		const y = -this.getCoordinate(parseInt(row) - offSetY, 'y');
		return { x, y };
	};

	createCountdown(time: number, x: number, y: number, color = 0xf08080) {
		const countdown = this.countdownManager.createCountdown(time, color);
		countdown.setPosition(x, y);
		this.scene.add(countdown.getGroup());
		return countdown.id;
	}

	getCoordinate = (coordinate, type = 'x') => {
		const center = type === 'x' ? this.mazeLayout[0].length / 2 : this.mazeLayout.length / 2;
		return (coordinate - center) * GameConfig.gridSize + GameConfig.gridSize / 2;
	};

	getGridPosFromVectors(pos: THREE.Vector3) {
		const gridCols = this.mazeLayout[0].length;
		const gridRows = this.mazeLayout.length;
		const gridWorldWidth = gridCols * GameConfig.gridSize;
		const gridWorldHeight = gridRows * GameConfig.gridSize;

		const originX = -gridWorldWidth / 2;
		const originY = gridWorldHeight / 2;

		const col = Math.floor((pos.x - originX) / GameConfig.gridSize);
		const row = Math.floor((originY - pos.y) / GameConfig.gridSize);

		const boundedCol = Math.max(0, Math.min(col, gridCols - 1));
		const boundedRow = Math.max(0, Math.min(row, gridRows - 1));

		return `${boundedCol},${boundedRow}`;
	}

	getGridPosition = (vector: THREE.Vector3) => {
		// Get the column (x coordinate)
		const col = Math.floor(
			(vector.x - GameConfig.gridSize / 2) / GameConfig.gridSize + this.mazeLayout[0].length / 2
		);

		// Get the row (y coordinate)
		// Note the negative sign because y is inverted in your original function
		const row = Math.floor(
			(-vector.y - GameConfig.gridSize / 2) / GameConfig.gridSize + this.mazeLayout.length / 2
		);

		return [col, row];
	};

	calculateAvoidanceForce = (
		raycastPos: THREE.Vector3,
		footpoint: THREE.Vector3,
		direction: THREE.Vector3
	) => {
		const gridPos = this.getGridPosition(raycastPos);
		const tile = this.tiles.get(`${gridPos[0]},${gridPos[1]}`);
		// let avoidanceIntermediate;

		// if (!this.isPassable(currentTile)) {
		// 	avoidanceIntermediate = this.findNearestPassableTileVector(currentTile);
		// } else {
		// 	avoidanceIntermediate = this.calculateSurroundingAvoidance(enemy, currentTile);
		// }
	};

	convertMovementConfig = (route) => {
		const height = this.mazeLayout.length;
		const start = {
			row: height - 1 - route.startPosition.row,
			col: route.startPosition.col
		};
		const end = {
			row: height - 1 - route.endPosition.row,
			col: route.endPosition.col
		};
		const checkpoints = route.checkpoints ? [...route.checkpoints] : [];
		for (const checkpoint of checkpoints) {
			checkpoint.position.row = height - 1 - checkpoint.position.row;
		}
		return {
			...route,
			endPosition: end,
			startPosition: start,
			checkpoints: checkpoints
		};
	};

	gameToWorldPos(pos: Position) {
		const height = this.mazeLayout.length;
		return { row: height - 1 - pos.row, col: pos.col };
	}

	updateMazeLayout(pos: Position, value: number) {
		const { row, col } = pos;
		this.mazeLayout[row][col] = value;
		this.pathFinder = new SPFA(this.mazeLayout);
	}

	getTextSprite(text, size = 20, color = 0xffffff) {
		if (typeof text !== 'string') {
			text = text.toString();
		}
		const textGeometry = new TextGeometry(text, {
			font: this.assetManager.font,
			size: size,
			depth: 1,
			curveSegments: 12,
			bevelEnabled: false
		});
		textGeometry.computeBoundingBox();
		const centerOffset = -0.5 * (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x);
		const yOffset = -0.5 * (textGeometry.boundingBox.max.y - textGeometry.boundingBox.min.y);
		const textMaterial = new THREE.MeshBasicMaterial({
			color: color,
			transparent: true,
			depthTest: false
		});
		const mesh = new THREE.Mesh(textGeometry, textMaterial);
		mesh.position.x = centerOffset;
		mesh.position.y = yOffset;
		return mesh;
	}

	initPlane() {
		const geometry = new THREE.PlaneGeometry(
			this.mazeLayout[0].length * GameConfig.gridSize,
			this.mazeLayout.length * GameConfig.gridSize
		);
		// geometry.rotateX(-Math.PI / 2);
		const plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: false }));
		plane.userData.name = 'plane';
		this.scene.add(plane);
		this.objects.push(plane);
	}
	initRollOverMeshes() {
		this.rollOverMeshes.clear();
		if (GameConfig.tokenCard) {
			const key = 'trap_001_crate';
			const trap = new Trap({
				key,
				direction: 'UP',
				position: { row: 0, col: 0 }
			});
			this.rollOverMeshes.set('trap_001_crate', trap);
			const mesh = trap.getMesh();
			mesh.visible = false;
			mesh.position.set(0, 0, 0);
			this.scene.add(mesh);
		}
	}

	initTraps(traps) {
		const predefineChanges = GameConfig.eliteMode && this.config.elite_runes?.predefine_changes;
		const trapList = structuredClone(traps);
		if (predefineChanges) {
			for (const [key, value] of predefineChanges) {
				const trap = trapList.find((ele) => ele.alias === key);
				if (trap) {
					trap.hidden = Boolean(!value);
				}
			}
		}
		const trapsToInit = trapList.filter((ele) => !ele.hidden);
		for (const trapData of trapsToInit) {
			this.addTrap(trapData);
		}
	}

	addTrap(data, actionKey, posType = 'game') {
		if (!data) {
			data = this.config.traps.find((ele) => ele.alias === actionKey || ele.key === actionKey);
		}
		// console.log(data, actionKey);
		if (!data) {
			return;
		}
		const pos = posType === 'game' ? this.gameToWorldPos(data.pos) : data.pos;
		const trap = new Trap(data, pos);
		if (trap.isRoadblock) {
			this.updateMazeLayout(pos, 1000);
		}
		const { x, y } = this.getVectorCoordinates(pos, null);
		const tile = this.tiles.get(`${pos.col},${pos.row}`);
		let z = 0;
		if (trap.hideTile) {
			tile.mesh.visible = false;
			trap.getMesh().add(this.tileManager.basicTile.clone());
		} else if (tile.heightType === 1 || tile.tileName === 'tile_forbidden') {
			z = 40;
		}
		this.traps.set(`${pos.col},${pos.row}`, trap);

		trap.getMesh().position.set(x, y, z + 0.03);
		this.scene.add(trap.getMesh());
	}

	reset(config, enemies, objects) {
		this.enemies = enemies;
		this.config = config;
		this.objects = objects;
		const mazeLayout = generateMaze(config.mapData.map, config.mapData.tiles);
		this.mazeLayout = mazeLayout;
		this.enemiesOnMap = [];
		this.traps.clear();
		this.noEnemyAlive = false;
		this.pathFinder = new SPFA(mazeLayout);
		this.tiles.clear();
		this.tileManager = new TileManager(config.levelId);
		this.initPlane();
		this.initRollOverMeshes();
	}

	update(delta: number) {
		this.countdownManager.update(delta);
		GameConfig.setValue('scaledElapsedTime', GameConfig.scaledElapsedTime + delta);
		this.noEnemyAlive = this.enemiesOnMap.every((enemy) => !enemy.alive);
		for (const enemy of this.enemiesOnMap.filter((ele) => ele.alive)) {
			enemy.update(delta);
		}
		this.traps.forEach((trap, pos) => {
			trap.update(delta);
		});
	}
}
