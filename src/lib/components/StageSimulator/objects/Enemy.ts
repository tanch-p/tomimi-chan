import * as THREE from 'three';
import * as spine from '$lib/spine';
import { GameConfig } from './GameConfig';
import { GameManager } from './GameManager';
import { AssetManager } from './AssetManager';
import type { Enemy as EnemyType } from '$lib/types';
import { SPFA } from './SPFA';
import { CountdownSprite } from './CountdownSprite';
import { getEnemySkills } from '$lib/functions/skillHelpers';
import { getIdleAnimName, getMoveAnimName } from '$lib/functions/spineHelpers';

const moveMultiplier = 0.5;
export class Enemy {
	raycastPos: THREE.Vector3; //光标坐标在移动逻辑中被大量使用，造成了一些反直觉的现象
	targetPos: THREE.Vector3;
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
	isMoving = false;
	moveDirection: 'H' | 'V' | 'D' = 'H';
	waitElapsedTime = 0;
	entry = true;
	entryElapsedTime = 0;
	exit = false;
	exitElapsedTime = 0;
	isEnding = false;
	selected = false;
	gameManager: GameManager;
	pathGroup;
	skel: spine.SkeletonMesh;
	sprite: THREE.Sprite;
	height: number;
	width: number;
	meshGroup: THREE.Group;
	hitbox;
	shadow;
	formIndex = 0;
	waitTimer: CountdownSprite;
	timeToWait = 0;
	standbyTime = 0;
	pathFinder: SPFA;
	atkRangeMesh: THREE.Group;
	skillRangeMeshes: THREE.Group[] = [];
	buffs = [];
	darkness = 1;
	fragmentKey: string;
	arrivalThreshold = 0;

	constructor(enemyData: EnemyType, route, gameManager: GameManager, fragmentKey) {
		gameManager.enemiesOnMap.push(this);
		// console.log(enemyData);
		// this.pathFinder = new SPFA(gameManager.mazeLayout);
		this.pathFinder = gameManager.pathFinder;
		this.data = enemyData;
		this.key = enemyData.key;
		this.gameManager = gameManager;
		this.assetManager = AssetManager.getInstance();
		this.route = route;
		this.fragmentKey = fragmentKey;
		if (!route.allowDiagonalMove) {
			console.warn('help no allowDiagonalMove');
		}
		if (!route.checkpoints?.length > 0) {
			this.arrivalThreshold = GameConfig.gridSize * 0.25;
		} else if (route.visitEveryNodeCenter) {
			this.arrivalThreshold = GameConfig.gridSize * 0.05;
		}
		this.motionMode = route.motionMode;
		this.state = 'Idle';
		this.actions = this.getActions(route);
		this.hp = enemyData.forms[0].stats.hp;
		this.speed = enemyData.forms[0].stats.ms;
		this.meshGroup = new THREE.Group();
		this.waitTimer = new CountdownSprite(this.gameManager);
		this.traits = getEnemySkills(this.data, this.data.traits, this.formIndex, {}, 'trait');
		this.initModel();
		const { x: actualX, y: actualY } = this.gameManager.getVectorCoordinates(
			route.startPosition,
			route.spawnOffset
		);
		this.meshGroup.position.set(actualX, actualY, GameConfig.baseZIndex); //实体坐标：即敌人中点实际所在位置。敌人处于什么位置，应该判定哪个地块的效果，是否处于我方部分效果的范围内，都是判断的实体坐标
		this.meshGroup.add(this.waitTimer.getMesh());
		const { x, y } = this.gameManager.getVectorCoordinates(route.startPosition, null);
		this.raycastPos = new THREE.Vector3(x, y, GameConfig.baseZIndex);
		this.pathGroup = this.visualisePath(
			this.actions,
			this.currentActionIndex,
			this.route.startPosition,
			this.route.spawnOffset
		);
		const standby = this.traits.find((skill) => ['sarkaz_standby', 'standby'].includes(skill.key));
		if (standby) {
			this.state = 'wait';
			this.standbyTime = standby.value;
		}
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
		this.shadow = shadowMesh;
		const skeletonData = this.assetManager.spineMap.get(this.key);
		if (!skeletonData) {
			return;
		}
		// console.log(skeletonData);
		const skeletonMesh = new spine.SkeletonMesh(skeletonData, (parameters) => {
			parameters.depthTest = false;
			parameters.alphaTest = 0.001;
			parameters.uniforms = {
				map: { type: 't', value: null },
				darkness: { value: this.darkness }
			};
		});
		this.meshGroup.add(skeletonMesh);
		this.meshGroup.renderOrder = 1;
		this.width = Math.min(100, skeletonMesh.skeleton.data.width * 0.3);
		this.height = Math.min(110, skeletonMesh.skeleton.data.height * 0.3);
		this.waitTimer.setPosition(Math.max(this.height, 75));
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

		this.handleIdle();
		this.skel.skeleton.color.r = 0.2;
		this.skel.skeleton.color.g = 0.2;
		this.skel.skeleton.color.b = 0.2;

		const range = this.data.forms[this.formIndex].stats.range;
		if (range > 0) {
			const group = new THREE.Group();
			const radius = range * GameConfig.gridSize;
			const circleGeometry = new THREE.CircleGeometry(radius, 32);
			const ringGeometry = new THREE.RingGeometry(radius - 2, radius, 64);
			const circleMaterial = new THREE.MeshBasicMaterial({
				color: 0xcc526e,
				transparent: true,
				opacity: 0.05,
				depthWrite: false,
				depthTest: false
			});

			const ringMaterial = new THREE.MeshBasicMaterial({
				color: 0xcc526e,
				transparent: true,
				opacity: 0.8,
				depthWrite: false,
				depthTest: false
			});
			const circle = new THREE.Mesh(circleGeometry, circleMaterial);
			const ring = new THREE.Mesh(ringGeometry, ringMaterial);
			group.add(ring, circle);
			group.visible = GameConfig.showAllRange;
			this.atkRangeMesh = group;
			this.meshGroup.add(group);
		}
		const specialList = getEnemySkills(
			this.data,
			this.data.forms[this.formIndex].special,
			this.formIndex,
			{},
			'special'
		);
		const allSkills = this.traits.concat(specialList);
		if (allSkills.some((skill) => skill.key.includes('stealth'))) {
			this.buffs.push('stealth');
			this.darkness = 0.4;
		}

		const skillsWithRange = allSkills.filter(
			(skill) => skill.skillRange && skill.skillRange !== range
		);
		for (const skill of skillsWithRange) {
			const group = new THREE.Group();
			const radius = skill.skillRange * GameConfig.gridSize;
			const circleGeometry = new THREE.CircleGeometry(radius, 32);
			const ringGeometry = new THREE.RingGeometry(radius - 2, radius, 64);
			const circleMaterial = new THREE.MeshBasicMaterial({
				color: 0x3f5ad7,
				transparent: true,
				opacity: 0.05,
				depthWrite: false,
				depthTest: false
			});

			const ringMaterial = new THREE.MeshBasicMaterial({
				color: 0x3f5ad7,
				transparent: true,
				opacity: 0.8,
				depthWrite: false,
				depthTest: false
			});
			const circle = new THREE.Mesh(circleGeometry, circleMaterial);
			const ring = new THREE.Mesh(ringGeometry, ringMaterial);
			group.add(ring, circle);
			group.visible = GameConfig.showAllRange;
			this.skillRangeMeshes.push(group);
			this.meshGroup.add(group);
		}
	}

	getFootpoint() {
		// 足坐标在计算避障力时被使用
		const { x, y, z } = this.pos;
		return new THREE.Vector3(x, y - GameConfig.gridSize * 0.2, z);
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
		let currentPosition = this.route.startPosition; //spawnOffset not applied
		const routedActions = actions.reduce((acc, action) => {
			const { type, pathType, position, reachOffset } = action;
			switch (type) {
				case 'MOVE':
					{
						// Special case where Movement in same position but with reachOffset ro2_4_5
						if (currentPosition.row === position.row && currentPosition.col === position.col) {
							acc.push({
								type: 'MOVE',
								time: 0.0,
								position: position,
								reachOffset: reachOffset,
								reachDistance: 0.0,
								pathType: 'cp'
							});
							break;
						}
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
		if (!this.skel) {
			return;
		}
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

		if (this.standbyTime > 0) {
			if (this.waitElapsedTime === 0) {
				this.waitTimer.setColor(0x5f7af7);
				this.handleIdle();
				this.waitTimer.getMesh().visible = GameConfig.showAllTimers || this.selected;
				this.waitElapsedTime += delta;
			} else {
				this.waitTimer.updateTimer(this.standbyTime - this.waitElapsedTime);
				this.waitElapsedTime += delta;
			}

			if (this.waitElapsedTime >= this.standbyTime) {
				this.standbyTime = 0;
				this.waitElapsedTime = 0;
				this.waitTimer.getMesh().visible = false;
				this.waitTimer.setColor(0xf08080);
			}
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
				let direction = new THREE.Vector3().subVectors(this.targetPos, this.raycastPos).normalize();
				if (direction.x === 0) {
					let nextCheckPoint;
					for (let i = this.currentActionIndex; i < this.actions.length; i++) {
						if (this.actions[i].pathType === 'cp') {
							nextCheckPoint = this.actions[i].position;
						}
					}
					if (!nextCheckPoint) {
						nextCheckPoint = this.actions[this.actions.length - 1]?.position;
					}
					const { x, y } = this.gameManager.getVectorCoordinates(nextCheckPoint, reachOffset);
					direction = new THREE.Vector3()
						.subVectors(new THREE.Vector3(x, y, GameConfig.baseZIndex), this.raycastPos)
						.normalize();
				}
				this.direction = direction.x;
				this.skel.scale.x = direction.x < 0 ? -1 : 1;

				const distance = this.raycastPos.distanceTo(this.targetPos);
				const adjustedSpeed = this.speed * delta * GameConfig.gridSize * moveMultiplier;
				if (distance > this.arrivalThreshold) {
					const moveDistance = Math.min(adjustedSpeed, distance);

					const dx = this.targetPos.x - this.raycastPos.x;
					const dy = this.targetPos.y - this.raycastPos.y;

					this.meshGroup.position.x += (dx / distance) * moveDistance;
					this.raycastPos.x += (dx / distance) * moveDistance;
					this.meshGroup.position.y += (dy / distance) * moveDistance;
					this.raycastPos.y += (dy / distance) * moveDistance;
				} else {
					this.isMoving = false;
					this.currentActionIndex++;
				}

				break;
			case 'WAIT_CURRENT_FRAGMENT_TIME':
			case 'WAIT_CURRENT_WAVE_TIME':
			case 'WAIT_FOR_SECONDS':
				if (this.waitElapsedTime === 0) {
					this.handleIdle();
					this.waitTimer.getMesh().visible = GameConfig.showAllTimers || this.selected;
					this.waitElapsedTime += delta;
					switch (type) {
						case 'WAIT_CURRENT_FRAGMENT_TIME':
							this.timeToWait =
								time - this.gameManager.spawnManager.fragmentsTimeTracker.get(this.fragmentKey);
							break;
						case 'WAIT_CURRENT_WAVE_TIME':
							this.timeToWait = time - GameConfig.waveElapsedTime;
							break;
						default:
							this.timeToWait = time;
							break;
					}
				} else {
					this.waitTimer.updateTimer(this.timeToWait - this.waitElapsedTime);
					this.waitElapsedTime += delta;
				}

				if (this.waitElapsedTime >= this.timeToWait) {
					this.waitElapsedTime = 0;
					this.waitTimer.getMesh().visible = false;
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
				this.raycastPos = new THREE.Vector3(x, y, GameConfig.baseZIndex);
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
		this.onDeselect();
		this.gameManager.scene.remove(this.meshGroup);
		this.gameManager.killedCount.update((v) => v + 1);
	}

	onSelect() {
		this.gameManager.scene.add(this.pathGroup);
		this.selected = true;
		if (this.atkRangeMesh) {
			this.atkRangeMesh.visible = true;
		}
		this.skillRangeMeshes.forEach((mesh) => (mesh.visible = true));
		this.waitTimer.getMesh().visible = this.waitElapsedTime > 0;
		console.log(this.route);

		// const cache = this.gameManager.pathFinder.pathCache.get(4,4)
		// cache.nodes.forEach((value, key) => {
		// 	const [x, y] = key.split(',');
		// 	const pos = this.gameManager.getVectorCoordinates(
		// 		{ row:y, col: x },
		// 		null
		// 	);
		// 	const text = value.nextNode?.join(',') || '';
		// 	const sprite = this.gameManager.getTextSprite(text);
		// 	const group = new THREE.Group();
		// 	group.position.set(pos.x, pos.y, 10);
		// 	group.add(sprite);
		// 	this.gameManager.scene.add(group);
		// });
	}
	onDeselect() {
		this.gameManager.scene.remove(this.pathGroup);
		this.selected = false;
		if (this.atkRangeMesh) {
			this.atkRangeMesh.visible = GameConfig.showAllRange;
		}
		this.skillRangeMeshes.forEach((mesh) => (mesh.visible = GameConfig.showAllRange));
		this.waitTimer.getMesh().visible = this.waitElapsedTime > 0 && GameConfig.showAllTimers;
	}

	visualisePath(paths, currentActionIndex, startPos, spawnOffset) {
		const remainingPaths = paths.filter((ele, i) => i >= currentActionIndex);
		const returnGroup = new THREE.Group();
		returnGroup.renderOrder = 50;
		const lineGroup = new THREE.Group();
		const movePaths = paths.filter((ele) => ele.type === 'MOVE' || ele.type === 'APPEAR_AT_POS');
		for (let i = 0; i < movePaths.length; i++) {
			const startCoordinates = movePaths?.[i - 1]?.position || startPos;
			const startOffSet = i - 1 === -1 ? spawnOffset : movePaths?.[i - 1].reachOffset;
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
						const offset = i === 0 ? spawnOffset : reachOffset;
						const { x, y } = this.gameManager.getVectorCoordinates(waitPosition, offset);
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

	handleIdle() {
		const animName = getIdleAnimName(this.key, this.skel);
		this.state = 'idle';
		this.changeAnimation(animName);
	}

	handleMove() {
		const animName = getMoveAnimName(this.key, this.skel);
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
	}
	handleDeath() {}
	handleSkill() {}
}
