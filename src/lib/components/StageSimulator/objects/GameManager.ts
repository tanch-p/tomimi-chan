import * as THREE from 'three';
import type { Enemy as EnemyType, MapConfig } from '$lib/types';
import { GameConfig } from './GameConfig';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { AssetManager } from './AssetManager';
import { generateMaze } from '$lib/functions/mazeHelpers';
import { Enemy } from './Enemy';
import { SPFA } from './SPFA';

export class GameManager {
	assetManager: AssetManager;
	cost: number;
	scene: THREE.Scene;
	camera: THREE.OrthographicCamera;
	objects;
	config;
	mazeLayout: [number[]];
	pathFinder;
	enemies: EnemyType[];
	enemiesOnMap: Enemy[] = [];
	public scaledElapsedTime = 0; // Total game-time elapsed
	public waveElapsedTime = 0;
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
		this.cost = config.initialCost;
		this.scene = scene;
		this.camera = camera;
		this.objects = objects;
		const mazeLayout = generateMaze(config.mapData.map, config.mapData.tiles);
		this.mazeLayout = mazeLayout;
		this.pathFinder = new SPFA(mazeLayout);
	}

	getVectorCoordinates = (pos, reachOffset?: any | undefined) => {
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
		const checkpoints = [...route.checkpoints];
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

	update(deltaTime) {
		this.scaledElapsedTime += deltaTime;
		this.waveElapsedTime += deltaTime;
		for (const enemy of this.enemiesOnMap) {
			enemy.update(deltaTime);
		}
	}
}
