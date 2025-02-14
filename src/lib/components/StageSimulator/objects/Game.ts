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
	waveData;
	enemies: any[];
	state = writable('load');
	gameManager: GameManager;

	constructor(canvasElement: HTMLCanvasElement, config: MapConfig, waveData, enemies: EnemyType[]) {
		this.canvas = canvasElement;
		this.config = config;
		this.waveData = waveData;
		this.enemies = enemies;
		this.objects = [];
		this.assetManager = AssetManager.getInstance();
		GameConfig.setValue('tokenCard', null);
		if (config.token_cards?.length > 0) {
			const card = config.token_cards.find((ele) => ele.key === 'trap_001_crate');
			card && GameConfig.setValue('tokenCard', { ...card, selected: true });
		}

		this.onWindowResize = this.onWindowResize.bind(this);
		this.onPointerMove = this.onPointerMove.bind(this);
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
		document.addEventListener('pointermove', this.onPointerMove);
		document.addEventListener('pointerdown', this.onPointerDown);

		this.gameManager = new GameManager(config, this.scene, this.camera, this.objects, enemies);
		this.map = new GameMap(this.gameManager);
		this.spawnManager = new SpawnManager(waveData, this.map, this.gameManager);

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
	stop() {
		GameConfig.state = 'stop';
		this.renderer.setAnimationLoop(null);
	}

	reset(config, waveData, enemies) {
		this.config = config;
		this.waveData = waveData;
		this.enemies = enemies;
		this.softReset();
	}
	softReset() {
		this.stop();
		GameConfig.setValue('scaledElapsedTime', 0);
		GameConfig.setValue('waveElapsedTime', 0);
		GameConfig.setValue('tokenCard', null);
		if (this.config.token_cards?.length > 0) {
			const card = this.config.token_cards.find((ele) => ele.key === 'trap_001_crate');
			card && GameConfig.setValue('tokenCard', card);
		}
		this.objects = [];
		this.clearScene(this.scene);
		this.gameManager.reset(this.config, this.enemies, this.objects);
		this.map = new GameMap(this.gameManager);
		this.spawnManager = new SpawnManager(this.waveData, this.map, this.gameManager);
		this.initLights();
		GameConfig.state = 'ready';
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
	onPointerMove(event) {
		if (!event.target.isSameNode(this.canvas)) {
			return;
		}
		if (!GameConfig.tokenCard || !GameConfig.tokenCard.selected) {
			return;
		}
		const rect = this.renderer.domElement.getBoundingClientRect(); // Get canvas size and position
		this.pointer.set(
			((event.clientX - rect.left) / rect.width) * 2 - 1,
			-((event.clientY - rect.top) / rect.height) * 2 + 1
		);
		this.raycaster.setFromCamera(this.pointer, this.camera);

		const intersects = this.raycaster.intersectObjects(this.objects, false);
		if (intersects.length > 0) {
			const intersect = intersects.find((ele) => ele?.object?.userData?.name === 'plane');
			if (!intersect) {
				return;
			}
			const mesh = this.gameManager.rollOverMeshes.get(GameConfig.tokenCard.key)?.getMesh();
			mesh.position.copy(intersect.point).add(intersect.face.normal);
			mesh.position
				.divideScalar(GameConfig.gridSize)
				.floor()
				.multiplyScalar(GameConfig.gridSize)
				.addScalar(50);
			mesh.position.z = 0.01;
			const { x, y } = mesh.position;
			const gridPos = this.gameManager.vectorToGridMap.get(`${x},${y}`);
			const tile = this.gameManager.tiles.get(gridPos);
			const trap = this.gameManager.traps.get(gridPos);
			if (tile?.buildableType == 0 || tile.heightType == 1 || trap) {
				mesh.visible = false;
				return;
			}

			mesh.visible = true;
			this.render();
		}
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
		if (['reset', 'loading', 'stop'].includes(GameConfig.state)) {
			return;
		}
		if (GameConfig.state === 'ready') {
			return (GameConfig.state = 'running');
		}

		this.raycaster.setFromCamera(this.pointer, this.camera);

		const intersects = this.raycaster.intersectObjects(this.objects, false);

		if (intersects.length > 0) {
			const intersect = intersects[0];
			const plane = intersects.find((ele) => ele?.object?.userData?.name === 'plane');

			if (plane && GameConfig.tokenCard?.selected) {
				const trap = this.gameManager.rollOverMeshes.get(GameConfig.tokenCard.key);
				const mesh = trap.getMesh();
				mesh.position.copy(plane.point).add(plane.face.normal);
				mesh.position
					.divideScalar(GameConfig.gridSize)
					.floor()
					.multiplyScalar(GameConfig.gridSize)
					.addScalar(50);
				mesh.position.z = 0.01;
				const { x, y } = mesh.position;
				const gridPos = this.gameManager.vectorToGridMap.get(`${x},${y}`);
				const tile = this.gameManager.tiles.get(gridPos);
				const placedTrap = this.gameManager.traps.get(gridPos);
				const [col, row] = gridPos.split(',');
				if (tile?.buildableType == 0 || tile.heightType == 1 || placedTrap) {
					mesh.visible = false;
				} else {
					this.gameManager.addTrap(
						{
							key: trap.key,
							direction: 'UP',
							pos: { row, col }
						},
						null,
						'world'
					);
					GameConfig.setValue('tokenCard', {
						...GameConfig.tokenCard,
						count: GameConfig.tokenCard.count - 1
					});
					if (GameConfig.tokenCard.count === 0) {
						GameConfig.setValue('tokenCard', null);
					}
					return;
				}
			}
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
		const deltaTime = this.clock.getDelta() * GameConfig.speedFactor;
		if (
			((GameConfig.state === 'ready' && GameConfig.scaledElapsedTime < 0.4) ||
				GameConfig.state === 'running') &&
			!GameConfig.isPaused
		) {
			this.spawnManager.update(deltaTime);
			this.gameManager.update(deltaTime);
		}
		if (this.spawnManager.isFinished && this.gameManager.noEnemyAlive) {
			GameConfig.state = 'end';
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
		GameConfig.setValue('scaledElapsedTime', 0);
		GameConfig.setValue('waveElapsedTime', 0);

		this.scene = null;
		this.camera = null;
		this.renderer = null;
		window.removeEventListener('resize', this.onWindowResize);
		document.removeEventListener('pointerdown', this.onPointerDown);
		document.removeEventListener('pointermove', this.onPointerMove);
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
