import * as THREE from 'three';
import { GameMap } from './GameMap';
import SpawnManager from './SpawnManager';
import { GameConfig } from './GameConfig';
import { GameManager } from './GameManager';
import { AssetManager } from './AssetManager';

export class Game {
	assetManager: AssetManager;
	canvas: HTMLCanvasElement;
	scene: THREE.Scene;
	camera: THREE.PerspectiveCamera;
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
	isRunning = false;
	gameManager: GameManager;
	public scaledElapsedTime = 0; // Total game-time elapsed

	constructor(config, waves, canvasElement: HTMLCanvasElement) {
		this.canvas = canvasElement;
		this.config = config;
		this.waves = waves;
		this.enemies = config.enemies;
		this.objects = [];
		this.assetManager = AssetManager.getInstance();

		this.onWindowResize = this.onWindowResize.bind(this);
		this.onPointerDown = this.onPointerDown.bind(this);

		// threejs
		const frustumSize = 1000;
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
		this.camera.position.set(0, -300, 850);
		this.camera.lookAt(0, 0, 0);
		this.camera.rotation.x = 0.4; // Tilt up slightly

		this.raycaster = new THREE.Raycaster();
		this.pointer = new THREE.Vector2();
		// lights

		const ambientLight = new THREE.AmbientLight(0xcccccc, 3);
		this.scene.add(ambientLight);

		const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
		directionalLight.position.set(-1, 1, 1).normalize();
		this.scene.add(directionalLight);
		this.clock = new THREE.Clock();

		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true
		});
		this.renderer.setClearColor(0x000000, 0);
		this.renderer.setSize(rect.width, rect.height);
		window.addEventListener('resize', this.onWindowResize);
		document.addEventListener('pointerdown', this.onPointerDown);

		this.gameManager = new GameManager(config, this.scene, this.camera, this.objects);
		this.map = new GameMap(this.scene, config, this.objects, this.gameManager);
		this.spawnManager = new SpawnManager(waves, this.map);

		this.renderer.setAnimationLoop(() => this.render());
	}

	reset() {
		this.isRunning = false;
		this.clearScene(this.scene);
	}

	onWindowResize() {
		const rect = this.canvas.getBoundingClientRect();
		const aspect = rect.width / rect.height;
		this.camera.aspect = aspect;
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

		if (!this.isRunning) {
			return (this.isRunning = true);
		}

		this.raycaster.setFromCamera(this.pointer, this.camera);

		const intersects = this.raycaster.intersectObjects(this.objects, false);

		if (intersects.length > 0) {
			const intersect = intersects[0];
			if (intersect?.object?.userData?.enemy) {
				const enemy = intersect?.object?.userData?.enemy;
				if (enemy.selected) {
					enemy.hidePath();
				} else {
					enemy.showPath();
				}
				enemy.selected = !enemy.selected;
			}
		
				const enemiesObjs = this.objects.filter((ele) => ele.userData.enemy);
				enemiesObjs.forEach((ele) => {
					if(ele.uuid !== intersect.object.uuid){
						ele.userData.enemy.hidePath();
					}
			})
		}
	}
	render() {
		const deltaTime = this.clock.getDelta() * GameConfig.speedFactor;
		if (this.isRunning) {
			this.scaledElapsedTime += deltaTime;
			this.spawnManager.update(deltaTime, this.scaledElapsedTime);
			this.map.update(deltaTime);
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
