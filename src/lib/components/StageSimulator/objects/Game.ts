import * as THREE from 'three';
import type { Enemy as EnemyType, MapConfig } from '$lib/types';
import { GameMap } from './GameMap';
import SpawnManager from './SpawnManager';
import { GameConfig } from './GameConfig';
import { GameManager } from './GameManager';
import { AssetManager } from './AssetManager';
import { writable } from 'svelte/store';

export class Game {
	assetManager: AssetManager;
	canvas: HTMLCanvasElement;
	scene: THREE.Scene;
	camera: THREE.OrthographicCamera;
	pointer: THREE.Vector2;
	objects;
	raycaster: THREE.Raycaster;
	clock: THREE.Clock;
	renderer: THREE.WebGLRenderer;
	map: GameMap;
	spawnManager: SpawnManager;
	config;
	waves;
	enemies: any[];
	state = writable('load');
	gameManager: GameManager;

	constructor(canvasElement: HTMLCanvasElement, config: MapConfig, waves, enemies: EnemyType[]) {
		this.canvas = canvasElement;
		this.config = config;
		this.waves = waves;
		this.enemies = enemies;
		this.objects = [];
		this.assetManager = AssetManager.getInstance();

		this.onWindowResize = this.onWindowResize.bind(this);
		this.onPointerDown = this.onPointerDown.bind(this);

		// threejs
		const frustumSize = GameConfig.FrustumSize;
		const rect = this.canvas.getBoundingClientRect();
		const aspect = rect.width / rect.height;
		this.camera = new THREE.OrthographicCamera(
			(frustumSize * aspect) / -2, // left
			(frustumSize * aspect) / 2, // right
			frustumSize / 2, // top
			frustumSize / -2, // bottom
			1, // near
			1500 // far
		);
		this.scene = new THREE.Scene();
		// this.scene.background = new THREE.Color(0xf0f0f0);
		this.camera.position.set(0, -300, 800);
		this.camera.lookAt(0, 0, 0);
		this.camera.rotation.x = 0.4; // Tilt up slightly

		this.raycaster = new THREE.Raycaster();
		this.pointer = new THREE.Vector2();

		this.initLights();
		this.clock = new THREE.Clock();

		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true
		});
		this.renderer.setClearColor(0x000000, 0);
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(rect.width, rect.height);
		window.addEventListener('resize', this.onWindowResize);
		document.addEventListener('pointerdown', this.onPointerDown);

		this.gameManager = new GameManager(config, this.scene, this.camera, this.objects, enemies);
		this.map = new GameMap(this.gameManager);
		this.spawnManager = new SpawnManager(waves, this.map, this.gameManager);

		this.renderer.setAnimationLoop(() => this.render());
	}
	initLights() {
		// lights
		const ambientLight = new THREE.AmbientLight(0xcccccc, 3);
		this.scene.add(ambientLight);

		const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
		directionalLight.position.set(-1, 1, 1).normalize();
		this.scene.add(directionalLight);
	}

	reset(config, waves, enemies) {
		this.config = config;
		this.waves = waves;
		this.objects = [];
		this.state.set('reset');
		this.renderer.setAnimationLoop(null);
		this.clearScene(this.scene);
		this.gameManager.reset(config, enemies,this.objects);
		this.map = new GameMap(this.gameManager);
		this.spawnManager = new SpawnManager(waves, this.map, this.gameManager);
		this.initLights();
		this.state.set('ready');
		this.renderer.setAnimationLoop(() => this.render());
	}

	onWindowResize() {
		const rect = this.canvas.parentElement.getBoundingClientRect();
		const aspect = rect.width / rect.height;
		const frustumSize = GameConfig.FrustumSize;
		this.camera.left = (frustumSize * aspect) / -2;
		this.camera.right = (frustumSize * aspect) / 2;
		this.camera.top = frustumSize / 2;
		this.camera.bottom = frustumSize / -2;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(rect.width, rect.height);
		this.render();
	}
	onPointerDown(event) {
		if (!event.target.isSameNode(this.canvas)) {
			return;
		}
		const rect = this.renderer.domElement.getBoundingClientRect(); // Get canvas size and position
		this.pointer.set(
			((event.clientX - rect.left) / rect.width) * 2 - 1,
			-((event.clientY - rect.top) / rect.height) * 2 + 1
		);
		let state;
		this.state.subscribe((v) => (state = v));
		if (['reset', 'loading'].includes(state)) {
			return;
		}
		console.log();
		if (state === 'ready') {
			return this.state.set('running');
		}

		this.raycaster.setFromCamera(this.pointer, this.camera);

		const intersects = this.raycaster.intersectObjects(this.objects, false);

		if (intersects.length > 0) {
			const intersect = intersects[0];
			if (intersect?.object?.userData?.enemy) {
				const enemy = intersect?.object?.userData?.enemy;
				if (enemy.selected) {
					enemy.onDeselect();
				} else {
					enemy.onSelect();
				}
			}

			const enemiesObjs = this.objects.filter((ele) => ele.userData.enemy);
			enemiesObjs.forEach((ele) => {
				if (ele.uuid !== intersect.object.uuid) {
					ele.userData.enemy.onDeselect();
				}
			});
		}
	}
	render() {
		let state;
		this.state.subscribe((v) => (state = v));
		const deltaTime = this.clock.getDelta() * GameConfig.speedFactor;
		if (state === 'running' && !GameConfig.isPaused) {
			this.spawnManager.update();
			this.gameManager.update(deltaTime);
		}
		if (this.spawnManager.isFinished && this.gameManager.noEnemyAlive) {
			this.state.set('end');
		}
		this.renderer.render(this.scene, this.camera);
	}

	cleanup() {
		if (this.renderer) {
			this.renderer.setAnimationLoop(null);
		}
		this.renderer.dispose();

		if (this.scene) {
			this.clearScene(this.scene);
		}

		this.scene = null;
		this.camera = null;
		this.renderer = null;
		window.removeEventListener('resize', this.onWindowResize);
		document.removeEventListener('pointerdown', this.onPointerDown);
	}
	clearScene(scene: THREE.Scene) {
		const objectsToRemove: THREE.Object3D[] = [];
		scene.traverse((obj) => {
			objectsToRemove.push(obj); // Collect objects
		});
		objectsToRemove.forEach((obj) => {
			// Dispose of geometry and material
			this.disposeObject(obj);
			// Remove from parent
			if (obj.parent) {
				obj.parent.remove(obj);
			}
		});
	}
	disposeObject(obj: THREE.Object3D) {
		if ((obj as THREE.Mesh).geometry) {
			(obj as THREE.Mesh).geometry.dispose();
		}

		if ((obj as THREE.Mesh).material) {
			const material = (obj as THREE.Mesh).material;
			if (Array.isArray(material)) {
				material.forEach((mat) => mat.dispose());
			} else {
				material.dispose();
			}
		}
	}
}
