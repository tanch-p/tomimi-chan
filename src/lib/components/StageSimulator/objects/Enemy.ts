import * as THREE from 'three';
import * as spine from '$lib/spine';
import { GameConfig } from './GameConfig';
import { GameManager } from './GameManager';
import { AssetManager } from './AssetManager';
import type { Enemy as EnemyType } from '$lib/types';
import { SPFA } from './SPFA';

export class Enemy {
	assetManager: AssetManager;
	data;
	key: string;
	actions;
	hp: number;
	speed: number;
	route;
	currentActionIndex = 0;
	state: string;
	alive = true;
	direction = 1;
	motionMode: 'WALK' | 'FLY';
	currentPos: THREE.Vector3;
	isMoving = false;
	waitElapsedTime = 0;
	entry = true;
	entryElapsedTime = 0;
	exit = false;
	exitElapsedTime = 0;
	isEnding = false;
	gameManager: GameManager;
	pathGroup;
	skel: spine.SkeletonMesh;
	glowSpine: spine.SkeletonMesh;
	sprite: THREE.Sprite;
	height: number;
	width: number;
	meshGroup: THREE.Group;
	hitbox;
	formIndex = 0;
	waitTimer: THREE.Group;
	pathFinder: SPFA;

	constructor(enemyData: EnemyType, route, gameManager) {
		gameManager.enemiesOnMap.push(this);
		this.pathFinder = new SPFA(gameManager.mazeLayout);
		this.data = enemyData;
		this.key = enemyData.key;
		this.gameManager = gameManager;
		this.assetManager = AssetManager.getInstance();
		this.route = route;
		this.motionMode = route.motionMode;
		this.state = 'Idle';
		this.actions = this.getActions(route);
		this.hp = enemyData.forms[0].stats.hp;
		this.speed = enemyData.forms[0].stats.ms;
		this.meshGroup = new THREE.Group();
		this.initModel();
		this.pathGroup = this.visualisePath(
			this.actions,
			this.currentActionIndex,
			this.route.startPosition
		);
		this.waitTimer = this.createCountdownSprite();
		const { x, y } = this.gameManager.getVectorCoordinates(route.startPosition);
		this.meshGroup.position.set(x, y, GameConfig.baseZIndex);
		this.currentPos = new THREE.Vector3(x, y, GameConfig.baseZIndex);
	}

	initModel() {
		const hitBoxGeo = new THREE.CircleGeometry(GameConfig.gridSize * 0.1, 32);
		const shadowGeometry = new THREE.PlaneGeometry(
			GameConfig.gridSize * 0.8,
			GameConfig.gridSize * 0.4
		);
		const hitBoxMaterial = new THREE.MeshBasicMaterial({
			color: 0xc51009,
			depthTest: false,
			// transparent:true,
			opacity: 0
		});
		const shadowMaterial = new THREE.MeshBasicMaterial({
			map: this.assetManager.textures.get('sprite_shadow').texture,
			depthTest: false,
			opacity: 0.85,
			transparent: true
		});
		const hitBoxMesh = new THREE.Mesh(hitBoxGeo, hitBoxMaterial);
		const shadowMesh = new THREE.Mesh(shadowGeometry, shadowMaterial);
		hitBoxMesh.position.set(0.5, 0.5, 0.5);
		shadowMesh.renderOrder = -1;
		shadowMesh.userData.name = 'shadow';
		hitBoxMesh.userData.name = 'hitbox';
		this.meshGroup.add(shadowMesh, hitBoxMesh);
		this.hitbox = hitBoxMesh;

		const skeletonData = this.assetManager.spineMap.get(this.key);
		// console.log(skeletonData);
		const skeletonMesh = new spine.SkeletonMesh(skeletonData, (parameters) => {
			parameters.depthTest = false;
			parameters.alphaTest = 0.001;
		});
		this.meshGroup.add(skeletonMesh);
		this.meshGroup.renderOrder = 1;
		this.width = Math.min(100, skeletonMesh.skeleton.data.width * 0.3);
		this.height = Math.min(110, skeletonMesh.skeleton.data.height * 0.3);
		const size = new spine.Vector2(Math.max(50, this.width), Math.max(75, this.height));
		const spriteMaterial = new THREE.SpriteMaterial({
			transparent: true,
			depthTest: false,
			opacity: 0,
			color: 0x000021
		});
		const sprite = new THREE.Sprite(spriteMaterial);
		sprite.scale.set(size.x, size.y, 1);
		sprite.position.z = GameConfig.gridSize;
		sprite.position.y = skeletonMesh.skeleton.data.height < 300 ? -GameConfig.gridSize * 0.15 : 0;
		this.meshGroup.add(sprite);
		this.sprite = sprite;
		this.skel = skeletonMesh;
		sprite.userData.enemy = this;
		this.gameManager.objects.push(sprite);
		this.gameManager.scene.add(this.meshGroup);

		const glowSpine = new spine.SkeletonMesh(skeletonData, (parameters) => {
			parameters.depthTest = false;
		});
		glowSpine.scale.set(1.25, 1.1, 1.1);
		glowSpine.skeleton.color.r = 0;
		glowSpine.skeleton.color.g = 0;
		glowSpine.skeleton.color.b = 0;
		glowSpine.position.y = GameConfig.gridSize * 0.1;
		this.glowSpine = glowSpine;

		this.handleIdle();
		this.skel.skeleton.color.r = 0.2;
		this.skel.skeleton.color.g = 0.2;
		this.skel.skeleton.color.b = 0.2;
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
						const paths = this.pathFinder.findPath(currentPosition, position);
						const relevantPaths = paths?.slice(1);
						if (relevantPaths) {
							relevantPaths.forEach(([col, row]) => {
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
		this.glowSpine.update(delta);
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
				let direction = new THREE.Vector3()
					.subVectors(this.targetPos, this.meshGroup.position)
					.normalize();
				if (direction.x === 0) {
					let nextCheckPoint;
					for (let i = this.currentActionIndex; i < this.actions.length; i++) {
						if (this.actions[i].pathType === 'cp') {
							nextCheckPoint = this.actions[i].position;
						}
					}
					if (!nextCheckPoint) {
						nextCheckPoint = this.actions[this.actions.length - 1];
					}
					const { x, y } = this.gameManager.getVectorCoordinates(nextCheckPoint, reachOffset);
					direction = new THREE.Vector3()
						.subVectors(new THREE.Vector3(x, y, GameConfig.baseZIndex), this.meshGroup.position)
						.normalize();
				}
				this.direction = direction.x;
				this.skel.scale.x = direction.x < 0 ? -1 : 1;
				this.glowSpine.scale.x =
					direction.x < 0
						? -1 * Math.abs(this.glowSpine.scale.x)
						: Math.abs(this.glowSpine.scale.x);

				const distance = this.meshGroup.position.distanceTo(this.targetPos);
				const adjustedSpeed = this.speed * delta * GameConfig.gridSize;
				if (distance > adjustedSpeed) {
					// speed = 1 means 1 tile/s
					const dx = this.targetPos.x - this.meshGroup.position.x;
					const dy = this.targetPos.y - this.meshGroup.position.y;
					this.meshGroup.position.x += (dx / distance) * adjustedSpeed;
					this.meshGroup.position.y += (dy / distance) * adjustedSpeed;
				} else {
					// Movement complete
					this.meshGroup.position.copy(this.targetPos);
					this.isMoving = false;
					this.currentActionIndex++;
				}

				break;
			case 'WAIT_CURRENT_FRAGMENT_TIME':
			case 'WAIT_CURRENT_WAVE_TIME':
				if (this.waitElapsedTime === 0) {
					this.meshGroup.add(this.waitTimer);
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
					this.meshGroup.remove(this.waitTimer);
					this.waitElapsedTime = 0;
					this.currentActionIndex++;
				}
				break;
			case 'WAIT_FOR_SECONDS':
				if (this.waitElapsedTime === 0) {
					this.meshGroup.add(this.waitTimer);
					this.handleIdle();
					this.waitElapsedTime += delta;
				} else {
					this.updateCountdownSprite(this.waitTimer, time - this.waitElapsedTime);
					this.waitElapsedTime += delta;
				}

				if (this.waitElapsedTime >= time) {
					this.meshGroup.remove(this.waitTimer);
					this.waitElapsedTime = 0;
					this.currentActionIndex++;
				}
				break;

			case 'DISAPPEAR':
				this.meshGroup.visible = false;
				this.currentActionIndex++;
				break;

			case 'APPEAR_AT_POS':
				this.meshGroup.visible = true;
				const { x, y } = this.gameManager.getVectorCoordinates(position, reachOffset);
				this.meshGroup.position.set(x, y, GameConfig.baseZIndex);
				this.currentPos = new THREE.Vector3(x, y, GameConfig.baseZIndex);
				this.currentActionIndex++;
				break;
			default:
				console.log(type, ' action is undefined');
		}
	}

	takeDamage(damage: number): void {
		this.hp -= damage;
		if (this.hp <= 0) {
			this.onDeath();
		}
	}
	onEnd(): void {
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
		this.gameManager.scene.remove(this.meshGroup);
	}

	showPath() {
		this.meshGroup.add(this.glowSpine);
		this.gameManager.scene.add(this.pathGroup);
		this.pathFinder.grid.nodes.forEach((value, key) => {
			const [x, y] = key.split(',');
			const pos = this.gameManager.getVectorCoordinates(
				{ row: parseInt(y), col: parseInt(x) },
				null
			);
			const sprite = this.gameManager.getTextSprite(value.nextNode?.join(',') || '');
			const group = new THREE.Group();
			group.position.set(pos.x, pos.y, 10);
			group.add(sprite);
			this.gameManager.scene.add(group);
		});
	}
	hidePath() {
		this.meshGroup.remove(this.glowSpine);
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
	createCountdownSprite = (text = ''): THREE.Group => {
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
		this.meshGroup.remove(mesh);
		const newMesh = this.createCountdownSprite(timer.toFixed());
		this.meshGroup.add(newMesh);
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
				case 'enemy_2013_csbot':
					animName = 'Idle_1';
					break;
				case 'enemy_1158_divman':
				case 'enemy_1158_divman_2':
				case 'enemy_1171_durokt':
				case 'enemy_1171_durokt_2':
				case 'enemy_2014_csicer':
					animName = 'Idle01';
					break;
				case 'enemy_2070_skzfbx':
					animName = 'Idle1';
					break;
				case 'enemy_2025_syufo':
					animName = 'Idle_01';
					break;
				case 'enemy_1143_merrpg':
				case 'enemy_1143_merrpg_2':
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
				case 'enemy_2092_skzamy':
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
				case 'enemy_1516_jakill':
				case 'enemy_2037_sygirl':
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
		this.changeAnimation(animName);
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
				case 'enemy_1000_gopro_3':
				case 'enemy_1064_snsbr':
				case 'enemy_1077_sotihd':
				case 'enemy_1077_sotihd_2':
				case 'enemy_1087_ltwolf':
				case 'enemy_1087_ltwolf_2':
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
				case 'enemy_1158_divman':
				case 'enemy_1158_divman_2':
				case 'enemy_1171_durokt':
				case 'enemy_1171_durokt_2':
				case 'enemy_2014_csicer':
					animName = 'Move01';
					break;
				case 'enemy_2004_balloon':
				case 'enemy_2025_syufo':
					animName = 'Move_01';
					break;
				case 'enemy_2070_skzfbx':
				case 'enemy_2084_skzcan':
					animName = 'Move1';
					break;

				case 'enemy_1388_wingnt':
				case 'enemy_2092_skzamy':
					animName = 'A_Move';
					break;
				case 'enemy_1418_mmkonm':
					animName = 'Move_b';
					break;
				case 'enemy_1143_merrpg':
				case 'enemy_1143_merrpg_2':
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
				case 'enemy_1516_jakill':
				case 'enemy_2037_sygirl':
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
		this.changeAnimation(animName);
	}
	changeAnimation(animationName) {
		if (!this.skel.state.hasAnimation(animationName)) {
			console.log(this.key);
			return;
		}
		if (animationName === this.skel.state.currentAnimation) {
			return;
		}
		this.skel.state.setAnimation(0, animationName, true);
		this.glowSpine.state.setAnimation(0, animationName, true);
	}
	handleDeath() {}
	handleSkill() {}
}
