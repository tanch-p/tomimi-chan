import * as THREE from 'three';
import * as spine from '$lib/spine';
import trapLookup from '$lib/data/trap/traps.json';
import { AssetManager } from './AssetManager';
import { GameConfig } from './GameConfig';
import { getIdleAnimName } from '$lib/functions/spineHelpers';
import { clearObjects } from '$lib/functions/threejsHelpers';

export class Trap {
	assetManager: AssetManager;
	isRoadblock: 0 | 1;
	data;
	key;
	type;
	skel;
	direction;
	position;
	hideTile: boolean;
	meshGroup = new THREE.Group();
	isSimulation;
	constructor(data, pos, isSimulation: boolean, blackboard) {
		this.assetManager = AssetManager.getInstance();
		const trap = trapLookup[data.key];
		this.data = trap;
		this.key = data.key;
		this.hideTile = trap.hideTile;
		this.direction = data.direction;
		this.position = pos;
		this.type = trap.modelType;
		this.isSimulation = isSimulation;
		!isSimulation && this.initModel(trap.modelType);
		this.isRoadblock =
			trap.special.some((skillRef) => ['roadblock'].includes(skillRef)) ||
			trap.skills.some((skillRef) => ['sktok_crate', 'sktok_stone'].includes(skillRef));
	}

	getMesh() {
		return this.meshGroup;
	}

	initModel(type) {
		switch (type) {
			case 'spine':
				{
					const skeletonData = this.assetManager.spineMap.get(this.key);
					if (!skeletonData) {
						return;
					}
					// console.log(skeletonData);
					const skeletonMesh = new spine.SkeletonMesh(skeletonData, (parameters) => {
						parameters.depthTest = false;
					});
					this.skel = skeletonMesh;
					skeletonMesh.position.set(0, -GameConfig.gridSize * 0.2, 0);
					skeletonMesh.state;
					const animName = getIdleAnimName(this.key, skeletonData);
					this.skel.state.setAnimation(0, animName, true);
					skeletonMesh.renderOrder = -1;
					this.meshGroup.add(skeletonMesh);
				}
				switch (this.direction) {
					case 'LEFT':
						this.meshGroup.scale.x *= -1;
						break;
					case 'UP':
						break;
					case 'DOWN':
						break;
					default:
						break;
				}
				return;
			case 'model':
				{
					const model = this.assetManager.models.get(this.key)?.clone();
					if (!model) {
						return;
					}
					let scale = 100;
					switch (this.key) {
						case 'trap_107_smpow':
							model.position.z = 40;
							break;
						case 'trap_001_crate':
						case 'trap_480_roadblockxb':
							scale = 110;
							break;
						case 'trap_097_hstone':
							scale = 123;
							model.position.x = -20;
							break;
						case 'trap_057_wpnsts':
							model.position.z = 30;
							scale = 110;
							break;
					}

					model.scale.set(scale, scale, scale);
					this.meshGroup.add(model);
					switch (this.key) {
						case 'trap_106_smtree':
						case 'trap_111_wdfarm':
							switch (this.direction) {
								case 'LEFT':
									this.meshGroup.rotation.z = Math.PI;
									break;
								case 'UP':
									this.meshGroup.rotation.z = -Math.PI / 2;
									break;
								case 'DOWN':
									this.meshGroup.rotation.z = Math.PI / 2;
									break;
								default:
									break;
							}
							return;
					}
					switch (this.direction) {
						case 'LEFT':
							this.meshGroup.rotation.z = Math.PI;
							break;
						case 'UP':
							this.meshGroup.rotation.z = Math.PI / 2;
							break;
						case 'DOWN':
							this.meshGroup.rotation.z = -Math.PI / 2;
							break;
						default:
							break;
					}
				}
				return;
			case 'texture':
			default:
				{
					const texture = this.assetManager.textures.get(this.key)?.texture;
					if (!texture) break;
					const geometry = new THREE.PlaneGeometry(GameConfig.gridSize, GameConfig.gridSize);
					const material = new THREE.MeshStandardMaterial({
						map: texture,
						transparent: true
					});
					const frontPlane = new THREE.Mesh(geometry, material);
					frontPlane.renderOrder = -1;
					frontPlane.position.z = 15;
					this.meshGroup.add(frontPlane);
				}
				break;
		}
	}

	remove() {
		clearObjects(this.meshGroup);
	}

	update(delta) {
		if (this.isSimulation) {
			return;
		}
		switch (this.type) {
			case 'spine':
				this.skel.update(delta);
				break;

			default:
				break;
		}
	}
}
