import type { Enemy } from '$lib/types';
import * as THREE from 'three';
import * as spine from '$lib/spine';
import { GameMap } from './GameMap';
import SpawnManager from './SpawnManager';
import { GameConfig } from './GameConfig';
import { generateMaze } from '$lib/functions/mazeHelpers';
import { Theta } from './Theta';
import { SpineScaleManager } from './SpineScaleManager';

export class Game {
	scene: THREE.Scene;
	camera: THREE.PerspectiveCamera;
	clock: THREE.Clock;
	renderer: THREE.WebGLRenderer;
	map: GameMap;
	spawnManager: SpawnManager;
	config;
	spineAssetManager: spine.AssetManager;
	spineScaleManager: SpineScaleManager;
	enemyRefs: Enemy[];
	gameTime: number;
	public scaledElapsedTime = 0; // Total game-time elapsed

	constructor(config, enemies: Enemy, waves, canvasElement: HTMLCanvasElement) {
		this.config = config;
		this.enemyRefs = enemies;

		const mazeLayout = generateMaze(config.mapData.map, config.mapData.tiles);
		console.log(mazeLayout);
		GameConfig.mazeLayout = mazeLayout;
		GameConfig.pathFinder = new Theta(mazeLayout);

		// threejs
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0xf0f0f0);
		this.camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		this.camera.position.set(0, -300, 850);
		this.camera.lookAt(0, 0, 0);
		this.camera.rotation.x = 0.4; // Tilt up slightly

		// lights
		const ambientLight = new THREE.AmbientLight(0xcccccc, 3);
		this.scene.add(ambientLight);

		const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
		directionalLight.position.set(-1, 1, 1).normalize();
		this.scene.add(directionalLight);
		this.clock = new THREE.Clock();

		// spine here
		this.spineAssetManager = new spine.AssetManager('/spine/');
		for (const enemy of this.enemyRefs) {
			this.spineAssetManager.loadBinary('enemy_1111_ucommd_2.skel');
			this.spineAssetManager.loadTextureAtlas('enemy_1111_ucommd_2.atlas');
		}
		this.renderer = new THREE.WebGLRenderer({
			canvas: canvasElement,
			antialias: true
		});
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		window.addEventListener('resize', this.onWindowResize);
		this.spineScaleManager = new SpineScaleManager(this.camera);
		this.map = new GameMap(this.scene, config,  this.spineAssetManager);
		this.spawnManager = new SpawnManager(waves, this.map);
		this.load();
	}

	load() {
		if (this.spineAssetManager.isLoadingComplete()) {
			this.renderer.setAnimationLoop(() => this.render());
		} else requestAnimationFrame(() => this.load());
	}

	reset() {}

	onWindowResize() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize(window.innerWidth, window.innerHeight);

		this.render();
	}
	render() {
		const deltaTime = this.clock.getDelta() * GameConfig.speedFactor;
		this.scaledElapsedTime += deltaTime;
		this.spawnManager.update(deltaTime, this.scaledElapsedTime);
		this.spineScaleManager.updateAll();
		this.map.update(deltaTime);
		this.renderer.render(this.scene, this.camera);
	}
}
