import * as THREE from 'three';
import * as spine from '$lib/spine';
import { GameConfig } from './GameConfig';
import { GameManager } from './GameManager';
import { AssetManager } from './AssetManager';

export class Enemy {
	assetManager: AssetManager;
	private countdownTexture: THREE.CanvasTexture;
	private countdownCanvas: HTMLCanvasElement;
	key: string;
	actions: any[];
	hp: number;
	speed: number;
	route;
	currentActionIndex: number = 0;
	mesh: THREE.Mesh;
	state: string;
	skel: spine.SkeletonMesh;
	alive: boolean = true;
	direction = 1;
	motionMode: 'WALK' | 'FLY';
	currentPos: THREE.Vector3;
	targetPos: THREE.Vector3;
	isMoving = false;
	waitElapsedTime: number = 0;
	entry: boolean = true;
	entryElapsedTime: number = 0;
	exit: boolean = false;
	exitElapsedTime: number = 0;
	isEnding = false;
	gameManager: GameManager;
	pathGroup;
	sprite: THREE.Sprite;

	constructor(data, route, mesh, skeletonMesh, sprite, gameManager) {
		this.key = data.key;
		this.gameManager = gameManager;
		this.assetManager = AssetManager.getInstance();
		this.timerText = null;
		this.route = route;
		this.sprite = sprite;
		this.motionMode = route.motionMode;
		this.actions = this.getActions(route);
		this.mesh = mesh;
		this.skel = skeletonMesh;
		this.hp = data.stats.hp;
		this.speed = data.stats.speed;
		this.handleIdle();
		this.skel.skeleton.color.r = 0.2;
		this.skel.skeleton.color.g = 0.2;
		this.skel.skeleton.color.b = 0.2;
		this.pathGroup = this.visualisePath(
			this.actions,
			this.currentActionIndex,
			this.route.startPosition
		);
		this.waitTimer = this.createCountdownSprite();
		const { x, y } = this.gameManager.getVectorCoordinates(route.startPosition);
		this.mesh.position.set(x, y, GameConfig.baseZIndex);
		this.currentPos = new THREE.Vector3(x, y, GameConfig.baseZIndex);
	}

	getActions(route) {
		const actions = [
			...route.checkpoints.map((cp) => {
				return { ...cp, pathType: 'cp' };
			}),
			{
				type: 'MOVE',
				time: 0.0,
				position: route.endPosition,
				reachOffset: {
					x: 0.0,
					y: 0.0
				},
				randomizeReachOffset: false,
				reachDistance: 0.0,
				pathType: 'end'
			}
		];
		if (this.motionMode === 'FLY') {
			return actions;
		}

		// WALK
		let currentPosition = this.route.startPosition;
		const routedActions = actions.reduce((acc, action) => {
			const { type, pathType, position, reachOffset } = action;
			switch (type) {
				case 'MOVE':
					{
						const paths = this.gameManager.pathFinder.findPath(currentPosition, position);
						const relevantPaths = paths?.slice(1);
						if (relevantPaths) {
							relevantPaths.forEach(({ row, col }) => {
								const isCheckPoint =
									pathType === 'cp' && row === position.row && col === position.col;
								acc.push({
									type: 'MOVE',
									time: 0.0,
									position: { row, col },
									reachOffset: isCheckPoint
										? reachOffset
										: {
												x: 0.0,
												y: 0.0
										  },
									reachDistance: 0.0,
									pathType: isCheckPoint ? 'cp' : 'intermediate'
								});
							});
						}
						currentPosition = position;
					}
					break;
				case 'APPEAR_AT_POS':
					currentPosition = position;
					acc.push(action);
					break;
				default:
					acc.push(action);
					break;
			}

			return acc;
		}, []);
		return routedActions;
	}

	entryColorChange(delta) {
		if (this.entryElapsedTime > 0.5) {
			this.entry = false;
			this.skel.skeleton.color.r = 1;
			this.skel.skeleton.color.g = 1;
			this.skel.skeleton.color.b = 1;
			return;
		}
		this.entryElapsedTime += delta * 2;
		this.skel.skeleton.color.r += delta * 2;
		this.skel.skeleton.color.g += delta * 2;
		this.skel.skeleton.color.b += delta * 2;
	}

	exitColorChange(delta) {
		if (this.exitElapsedTime > 0.5) {
			this.alive = false;
			this.remove();
			return;
		}
		this.exitElapsedTime += delta * 2;
		this.skel.skeleton.color.r -= delta * 2;
		this.skel.skeleton.color.g -= delta * 2;
		this.skel.skeleton.color.b -= delta * 2;
		this.skel.skeleton.color.a -= delta * 2;
	}

	update(delta: number) {
		this.skel.update(delta);
		if (this.entry) {
			this.entryColorChange(delta);
		}
		if (this.exit) {
			this.exitColorChange(delta);
		}
		if (this.currentActionIndex >= this.actions.length) {
			this.onEnd();
			return;
		}
		const { type, position, pathType, time, reachOffset } = this.actions[this.currentActionIndex];

		if (this.selected) {
			if (!this.pathOn) {
				this.visualisePath(this.actions, this.currentActionIndex, this.route.startPosition);
				this.pathOn = true;
			}
		}

		switch (type) {
			case 'MOVE':
				if (!this.isMoving) {
					// Start new movement
					const { x, y } = this.gameManager.getVectorCoordinates(position, reachOffset);
					this.targetPos = new THREE.Vector3(x, y, GameConfig.baseZIndex);
					this.isMoving = true;
					this.handleMove();
				}
				const direction = new THREE.Vector3()
					.subVectors(this.targetPos, this.mesh.position)
					.normalize();
				if (direction.x !== 0) {
					this.direction = direction.x;
					this.skel.scale.x = direction.x < 0 ? -1 : 1;
				}
				const distance = this.mesh.position.distanceTo(this.targetPos);
				const adjustedSpeed = this.speed * delta * GameConfig.gridSize;
				if (distance > adjustedSpeed) {
					// speed = 1 means 1 tile/s
					const dx = this.targetPos.x - this.mesh.position.x;
					const dy = this.targetPos.y - this.mesh.position.y;
					this.mesh.position.x += (dx / distance) * adjustedSpeed;
					this.mesh.position.y += (dy / distance) * adjustedSpeed;
				} else {
					// Movement complete
					this.mesh.position.copy(this.targetPos);
					this.isMoving = false;
					this.currentActionIndex++;
				}

				break;
			case 'WAIT_CURRENT_FRAGMENT_TIME':
			case 'WAIT_CURRENT_WAVE_TIME':
				if (this.waitElapsedTime === 0) {
					this.mesh.add(this.waitTimer);
					this.handleIdle();
					this.waitElapsedTime += delta;
				} else {
					this.updateCountdownSprite(
						this.waitTimer,
						time - this.gameManager.waveElapsedTime - this.waitElapsedTime
					);
					this.waitElapsedTime += delta;
				}

				if (this.waitElapsedTime >= time - this.gameManager.waveElapsedTime) {
					this.mesh.remove(this.waitTimer);
					this.waitElapsedTime = 0;
					this.currentActionIndex++;
				}
				break;
			case 'WAIT_FOR_SECONDS':
				if (this.waitElapsedTime === 0) {
					this.mesh.add(this.waitTimer);
					this.handleIdle();
					this.waitElapsedTime += delta;
				} else {
					this.updateCountdownSprite(this.waitTimer, time - this.waitElapsedTime);
					this.waitElapsedTime += delta;
				}

				if (this.waitElapsedTime >= time) {
					this.mesh.remove(this.waitTimer);
					this.waitElapsedTime = 0;
					this.currentActionIndex++;
				}
				break;

			case 'DISAPPEAR':
				this.mesh.visible = false;
				this.currentActionIndex++;
				break;

			case 'APPEAR_AT_POS':
				this.mesh.visible = true;
				const { x, y } = this.gameManager.getVectorCoordinates(position, reachOffset);
				this.mesh.position.set(x, y, GameConfig.baseZIndex);
				this.currentPos = new THREE.Vector3(x, y, GameConfig.baseZIndex);
				this.currentActionIndex++;
				break;
			default:
				console.log(type);
		}
	}

	takeDamage(damage: number): void {
		this.hp -= damage;
		if (this.hp <= 0) {
			this.onDeath();
		}
	}
	onEnd(): void {
		this.handleDefault();
		this.exit = true;
	}

	onDeath(): void {
		this.skel.state.setAnimation(0, 'Die', false);
		this.exit = true;
	}

	remove() {
		const index = this.gameManager.objects.findIndex((ele) => ele.uuid === this.sprite.uuid);
		if (index !== -1) {
			this.gameManager.objects.splice(index, 1);
		}
		this.hidePath();
		this.gameManager.scene.remove(this.mesh);
	}

	showPath() {
		this.gameManager.scene.add(this.pathGroup);
	}
	hidePath() {
		this.gameManager.scene.remove(this.pathGroup);
	}

	visualisePath(paths, currentActionIndex, startPos) {
		const remainingPaths = paths.filter((ele, i) => i >= currentActionIndex);
		const returnGroup = new THREE.Group();
		returnGroup.renderOrder = 50;
		const lineGroup = new THREE.Group();
		const movePaths = paths.filter((ele) => ele.type === 'MOVE' || ele.type === 'APPEAR_AT_POS');
		for (let i = 0; i < movePaths.length; i++) {
			const startCoordinates = movePaths?.[i - 1]?.position || startPos;
			const startOffSet = i - 1 === -1 ? null : movePaths?.[i - 1].reachOffset;
			const endCoordinates = movePaths[i].position;
			const endOffset = movePaths?.[i].reachOffset;

			const startPoint = this.gameManager.getVectorCoordinates(startCoordinates, startOffSet);
			const start = new THREE.Vector3(startPoint.x, startPoint.y, 0);
			// Define start and end points
			const endPoint = this.gameManager.getVectorCoordinates(endCoordinates, endOffset);
			const end = new THREE.Vector3(endPoint.x, endPoint.y, 0);

			// Create a geometry and add the points
			const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);

			// Create a material for the line
			const material = new THREE.LineBasicMaterial({
				color: 0xff0000,
				transparent: true,
				depthTest: false
			}); // Red line

			// Create the line
			const line = new THREE.Line(geometry, material);
			line.position.z = 10;
			lineGroup.add(line);
		}
		for (let i = 0; i < paths.length; i++) {
			const { type, pathType, time, position, reachOffset } = paths[i];
			const group = new THREE.Group();

			switch (type) {
				case 'MOVE':
					if (pathType === 'cp') {
						const texture = this.assetManager.textures.get('flag').texture;
						const spriteMaterial = new THREE.SpriteMaterial({
							map: texture,
							transparent: true,
							depthTest: false
						});
						const sprite = new THREE.Sprite(spriteMaterial);
						sprite.scale.set(GameConfig.gridSize * 0.6, GameConfig.gridSize * 0.6, 1);
						const { x, y } = this.gameManager.getVectorCoordinates(position, reachOffset);
						sprite.position.set(x + 2, y + GameConfig.gridSize * 0.3, GameConfig.baseZIndex + 10);
						group.renderOrder = 50;
						sprite.renderOrder = 50;
						group.add(sprite);
					}
					break;
				case 'WAIT_FOR_SECONDS':
					{
						const geometry = new THREE.CircleGeometry(GameConfig.gridSize / 4, 32);
						const material = new THREE.MeshBasicMaterial({
							color: 0xb1b1b1,
							transparent: true,
							depthTest: false
						});
						const circle = new THREE.Mesh(geometry, material);
						const ringGeometry = new THREE.RingGeometry(
							GameConfig.gridSize / 4 - 2,
							GameConfig.gridSize / 4,
							32
						);
						const ringMaterial = new THREE.MeshBasicMaterial({
							color: 0xdc143c,
							transparent: true,
							depthTest: false
						});
						const ring = new THREE.Mesh(ringGeometry, ringMaterial);
						ring.position.z = 2;
						const waitPosition = i === 0 ? startPos : paths[i - 1].position;
						const { x, y } = this.gameManager.getVectorCoordinates(waitPosition, reachOffset);
						const textMesh = this.gameManager.getTextSprite(time.toFixed() + 's', 16);
						textMesh.position.z = 5;
						group.add(textMesh, ring, circle);
						group.position.set(x, y, GameConfig.baseZIndex + 15);
						group.renderOrder = 50;
						circle.renderOrder = 50;
						textMesh.renderOrder = 50;
						ring.renderOrder = 50;
					}
					break;
				default:
					break;
			}
			returnGroup.add(group);
		}
		returnGroup.add(lineGroup);
		return returnGroup;
	}
	createCountdownSprite = (text: string = ''): THREE.Sprite => {
		const group = new THREE.Group();
		const circleGeometry = new THREE.CircleGeometry(GameConfig.gridSize / 4, 32);
		const color = parseInt(text) <= 5 ? 0xdc143c : 0xf08080;
		const circleMaterial = new THREE.MeshBasicMaterial({
			color: color,
			transparent: true,
			depthTest: false
		});
		const circle = new THREE.Mesh(circleGeometry, circleMaterial);
		const ringGeometry = new THREE.RingGeometry(
			GameConfig.gridSize / 4 - 1,
			GameConfig.gridSize / 4,
			32
		);
		const ringMaterial = new THREE.MeshBasicMaterial({
			color: 0x666666,
			transparent: true,
			depthTest: false
		});
		const ring = new THREE.Mesh(ringGeometry, ringMaterial);
		ring.position.z = 2;
		const textMesh = this.gameManager.getTextSprite(text, 16);
		group.position.set(0, this.skel.skeleton.data.height * 0.4 + GameConfig.gridSize / 5, 0);
		group.add(ring, circle, textMesh);
		group.renderOrder = 10;
		return group;
	};

	updateCountdownSprite(mesh, timer: number) {
		this.mesh.remove(mesh);
		const newMesh = this.createCountdownSprite(timer.toFixed());
		this.mesh.add(newMesh);
		this.waitTimer = newMesh;
	}

	handleIdle() {
		let animName = 'Idle';
		if (!this.skel.state.hasAnimation('Idle')) {
			switch (this.key) {
				case 'enemy_1118_lidbox':
					animName = 'Idle_grey';
					break;
				case 'enemy_1024_mortar':
				case 'enemy_1024_mortar_2':
				case 'enemy_1082_soticn':
				case 'enemy_1082_soticn_2':
				case 'enemy_1327_cbrokt':
				case 'enemy_1327_cbrokt_2':
				case 'enemy_1412_mmjump':
				case 'enemy_1412_mmjump_2':
				case 'enemy_1425_lrcmra':
				case 'enemy_1425_lrcmra_2':
				case 'enemy_1506_patrt':
					animName = 'Idle_1';
					break;
				case 'enemy_1171_durokt':
				case 'enemy_1171_durokt_2':
				case 'enemy_2014_csicer':
					animName = 'Idle01';
					break;
				case 'enemy_2070_skzfbx':
					animName = 'Idle1';
					break;
				case 'enemy_1271_nhkodo':
				case 'enemy_1271_nhkodo_2':
				case 'enemy_1311_mhkryk':
				case 'enemy_1311_mhkryk_2':
				case 'enemy_1314_wdnjd':
				case 'enemy_1315_wdyjd':
				case 'enemy_1316_wdpjd':
					animName = 'Idle_A';
					break;
				case 'enemy_1388_wingnt':
					animName = 'A_Idle';
					break;
				case 'enemy_1418_mmkonm':
					animName = 'Idle_b';
					break;
				case 'enemy_1135_redman':
				case 'enemy_1135_redman_2':
				case 'enemy_2089_skzjkl':
					animName = 'C_Idle';
					break;
				case 'enemy_2081_skztxs':
				case 'enemy_2082_skzdd':
					animName = 'C1_Idle';
					break;
				case 'enemy_1384_winfrz':
					animName = 'C1_Idle';
					break;
				case 'enemy_1267_nhpbr':
				case 'enemy_1267_nhpbr_2':
					animName = 'F_Idle';
					break;
				default:
					animName = 'Idile';
			}
		}
		this.state = 'idle';
		if (!this.skel.state.hasAnimation(animName)) {
			console.log(this.key);
			return;
		}
		this.skel.state.setAnimation(0, animName, true);
	}

	handleMove() {
		let animName = 'Move';
		if (!this.skel.state.hasAnimation('Move')) {
			switch (this.key) {
				case 'enemy_1118_lidbox':
					animName = 'Move_grey';
					break;
				case 'enemy_1002_nsabr':
				case 'enemy_1000_gopro':
				case 'enemy_1000_gopro_2':
				case 'enemy_1064_snsbr':
				case 'enemy_1077_sotihd':
				case 'enemy_1077_sotihd_2':
				case 'enemy_1165_duhond':
				case 'enemy_1165_duhond_2':
					animName = 'Run_Loop';
					break;

				case 'enemy_1327_cbrokt':
				case 'enemy_1327_cbrokt_2':
				case 'enemy_1412_mmjump':
				case 'enemy_1412_mmjump_2':
				case 'enemy_1425_lrcmra':
				case 'enemy_1425_lrcmra_2':
				case 'enemy_1506_patrt':
					animName = 'Move_1';
					break;
				case 'enemy_1171_durokt':
				case 'enemy_1171_durokt_2':
				case 'enemy_2014_csicer':
					animName = 'Move01';
					break;
				case 'enemy_2004_balloon':
					animName = 'Move_01';
					break;
				case 'enemy_2070_skzfbx':
				case 'enemy_2084_skzcan':
					animName = 'Move1';
					break;

				case 'enemy_1388_wingnt':
					animName = 'A_Move';
					break;
				case 'enemy_1418_mmkonm':
					animName = 'Move_b';
					break;
				case 'enemy_1271_nhkodo':
				case 'enemy_1271_nhkodo_2':
				case 'enemy_1311_mhkryk':
				case 'enemy_1311_mhkryk_2':
				case 'enemy_1314_wdnjd':
				case 'enemy_1316_wdpjd':
				case 'enemy_1315_wdyjd':
				case 'enemy_2055_smlead':
					animName = 'Move_B';
					break;
				case 'enemy_1135_redman':
				case 'enemy_1135_redman_2':
				case 'enemy_2089_skzjkl':
					animName = 'C_Move';
					break;
				case 'enemy_2081_skztxs':
				case 'enemy_2082_skzdd':
					animName = 'C1_Move';
					break;
				case 'enemy_1384_winfrz':
					animName = 'C2_Move';
					break;
				case 'enemy_1267_nhpbr':
				case 'enemy_1267_nhpbr_2':
					animName = 'F_Move';
					break;
				default:
					animName = 'Move_Loop';
					break;
			}
		}
		this.state = 'move';
		if (!this.skel.state.hasAnimation(animName)) {
			console.log(this.key);
			return;
		}
		this.skel.state.setAnimation(0, animName, true);
	}
	handleDeath() {}
	handleDefault() {
		let animName = 'Default';
		if (!this.skel.state.hasAnimation('Default')) {
			switch (this.key) {
				case 'enemy_1118_lidbox':
					animName = 'Default_grey';
					break;

				case 'enemy_1327_cbrokt':
				case 'enemy_1327_cbrokt_2':
				case 'enemy_1412_mmjump':
				case 'enemy_1412_mmjump_2':
				case 'enemy_1425_lrcmra':
				case 'enemy_1425_lrcmra_2':
					animName = 'Default_1';
					break;
				case 'enemy_1171_durokt':
				case 'enemy_1171_durokt_2':
				case 'enemy_2014_csicer':
					animName = 'Default01';
					break;
				case 'enemy_1216_cansld':
				case 'enemy_1216_cansld_2':
				case 'enemy_1311_mhkryk':
				case 'enemy_1311_mhkryk_2':
					animName = 'Default_A';
					break;
				case 'enemy_1388_wingnt':
					animName = 'A_Default';
					break;
				case 'enemy_1418_mmkonm':
					animName = 'Default_b';
					break;
				case 'enemy_1135_redman':
				case 'enemy_1135_redman_2':
					animName = 'C_Default';
					break;
				case 'enemy_2081_skztxs':
				case 'enemy_2082_skzdd':
					animName = 'C1_Default';
					break;
				case 'enemy_1384_winfrz':
					animName = 'C2_Default';
					break;
				case 'enemy_1267_nhpbr':
				case 'enemy_1267_nhpbr_2':
					animName = 'F_Default';
					break;
				default:
					break;
			}
			if (!this.skel.state.hasAnimation(animName)) {
				console.log(this.key);
				return;
			}
			this.skel.state.setAnimation(0, animName, false);
		}
	}
	handleSkill() {}
}
