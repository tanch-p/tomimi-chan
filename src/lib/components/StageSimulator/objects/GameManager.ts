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

export class GameManager {
	assetManager: AssetManager;
	scene: THREE.Scene;
	camera: THREE.OrthographicCamera;
	objects;
	config;
	mazeLayout: number[][];
	enemies: EnemyType[];
	enemiesOnMap: Enemy[] = [];
	traps: Trap[] = [];
	pathFinder: SPFA;
	noEnemyAlive = false;
	killedCount = writable(0);
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

	reset(config, enemies, objects) {
		this.enemies = enemies;
		this.config = config;
		this.objects = objects;
		const mazeLayout = generateMaze(config.mapData.map, config.mapData.tiles);
		this.mazeLayout = mazeLayout;
		this.enemiesOnMap = [];
		this.traps = [];
		this.noEnemyAlive = false;
		this.pathFinder = new SPFA(mazeLayout);
	}

	update(deltaTime: number) {
		this.noEnemyAlive = this.enemiesOnMap.every((enemy) => !enemy.alive);
		for (const enemy of this.enemiesOnMap.filter((ele) => ele.alive)) {
			enemy.update(deltaTime);
		}
		for (const trap of this.traps) {
			trap.update(deltaTime);
		}
	}
}
