import * as THREE from 'three';
import * as spine from '$lib/spine';
import trapLookup from '$lib/data/trap/traps.json';
import { AssetManager } from './AssetManager';
import { GameConfig } from './GameConfig';
import { getIdleAnimName } from '$lib/functions/spineHelpers';

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
	constructor(data) {
		this.assetManager = AssetManager.getInstance();
		const trap = trapLookup[data.key];
		this.data = trap;
		this.key = data.key;
		this.hideTile = trap.hideTile;
		this.direction = data.direction;
		this.position = data.position;
		this.type = trap.modelType;
		this.initModel(trap.modelType);
		this.meshGroup.renderOrder = 1;
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
					const animName = getIdleAnimName(this.key, skeletonMesh);
					this.skel.state.setAnimation(0, animName, true);
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
				const model = this.assetManager.models.get(this.key)?.clone();
				if (!model) {
					return;
				}
				model.scale.set(100, 100, 100);
				this.meshGroup.add(model);
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
			default:
				break;
		}
		const geometry = new THREE.BoxGeometry(GameConfig.gridSize, GameConfig.gridSize, 50);
		const material = new THREE.MeshStandardMaterial({
			color: 0x000000,
			side: THREE.DoubleSide
		});
		const box = new THREE.Mesh(geometry, material);
		this.meshGroup.add(box);
	}
	update(delta) {
		switch (this.type) {
			case 'spine':
				this.skel.update(delta);
				break;

			default:
				break;
		}
	}
}
