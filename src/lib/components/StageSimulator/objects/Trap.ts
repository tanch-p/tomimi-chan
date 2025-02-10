import * as THREE from 'three';
import * as spine from '$lib/spine';
import { GameManager } from './GameManager';
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
	meshGroup = new THREE.Group();
	gameManager: GameManager;
	constructor(key, gameManager: GameManager) {
		this.assetManager = AssetManager.getInstance();
		const trap = trapLookup[key];
		this.data = trap;
		this.key = key;
		console.log(key);
		this.type = trap.modelType;
		this.initModel(trap.modelType);
		this.gameManager = gameManager;
		this.meshGroup.renderOrder = 1;
		this.isRoadblock =
			trap.special.some((skillRef) => ['roadblock'].includes(skillRef)) ||
			trap.skills.some((skillRef) => ['sktok_crate', 'sktok_stone'].includes(skillRef));
		this.gameManager.traps.push(this);
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
					console.log(skeletonData);
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
				return;
			case 'model':
				const model = this.assetManager.models.get(this.key).clone();
				model.scale.set(-100, 100, 100);
				this.meshGroup.add(model);
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
