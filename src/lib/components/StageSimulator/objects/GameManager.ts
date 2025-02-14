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
import SpawnManager from './SpawnManager';
import { TileManager } from './TileManager';

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
		this.scene = scene;
		this.camera = camera;
		this.objects = objects;
		const mazeLayout = generateMaze(config.mapData.map, config.mapData.tiles);
		this.mazeLayout = mazeLayout;
		this.pathFinder = new SPFA(mazeLayout);
		this.tileManager = new TileManager(config.levelId);
	}

	getVectorCoordinates = (pos, reachOffset) => {
		let offSetX = 0,
			offSetY = 0;
		if (reachOffset) {
			offSetX = reachOffset.x;
			offSetY = reachOffset.y;
		}
		const { row, col } = pos;
		const x = this.getCoordinate(col + offSetX, 'x');
		const y = -this.getCoordinate(row - offSetY, 'y');
		return { x, y };
	};

	getCoordinate = (coordinate, type = 'x') => {
		const center = type === 'x' ? this.mazeLayout[0].length / 2 : this.mazeLayout.length / 2;
		return (coordinate - center) * GameConfig.gridSize + GameConfig.gridSize / 2;
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
		// update enemy pathfinding
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

	initTraps(traps) {
		const trapsToInit = traps.filter((ele) => !ele.hidden);
		for (const trapData of trapsToInit) {
			this.addTrap(trapData);
		}
	}

	addTrap(data, actionKey) {
		if (!data) {
			data = this.config.traps.find((ele) => ele.alias === actionKey || ele.key === actionKey);
		}
		console.log(data, actionKey);
		const trap = new Trap(data);
		if (trap.isRoadblock) {
			this.updateMazeLayout(this.gameToWorldPos(data.pos), 1000);
		}
		const worldPos = this.gameToWorldPos(data.pos);
		const { x, y } = this.getVectorCoordinates(worldPos, null);
		const tile = this.tiles.get(`${worldPos.row},${worldPos.col}`);
		let z = 0;
		if (trap.hideTile) {
			tile.mesh.visible = false;
			tile.group.add(this.tileManager.basicTile.clone());
		}
		if (tile.heightType === 1) {
			z = 40;
		}
		this.traps.set(`${worldPos.row},${worldPos.col}`, trap);

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
	}

	update(delta: number) {
		// console.log(GameConfig.scaledElapsedTime.toFixed(3),delta.toFixed(3))
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
