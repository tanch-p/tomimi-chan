import type { Skill } from '$lib/types';
import * as spine from '$lib/spine';
import * as THREE from 'three';
import { Enemy } from './Enemy';
import { AssetManager } from './AssetManager';
import { ActiveSkill } from './ActiveSkill';
import { getDefaultAnimName } from '$lib/functions/spineHelpers';

export class SkillManager {
	assetManager: AssetManager;
	enemy: Enemy;
	activeSkills: ActiveSkill[] = [];
	branches = null;
	currentBranchIndex = 0;
	branchIntervalElapsedTime = 0;
	branchElapsedTime = 0;
	transformModel;
	isUsingSkill = false;
	accelerationIntervalTimer = 0;
	accelerationPreDelayTimer = 0;
	accelerateParams = null;
	accelerationStacks = 0;

	constructor(enemy: Enemy, skills: Skill[]) {
		this.assetManager = AssetManager.getInstance();
		this.enemy = enemy;
		for (const skill of skills) {
			if (skill.branches) {
				this.branches = skill.branches;
			}
			if (skill.key === 'transform') {
				const key = skill.value;
				this.addTransformModel(key);
			}
			if (skill.accelerate) {
				this.accelerateParams = skill.accelerate;
			}
			if (skill.key === 'parasitic') {
				this.addParasiticSprite();
			}
		}

		if (this.enemy.key === 'enemy_2042_syboss') {
			this.activeSkills = skills
				.filter(
					(ele) =>
						ele.type === 'skill' && (ele.initCooldown || ele.skillType === 'INCREASE_WITH_TIME')
				)
				.map((skill) => new ActiveSkill(enemy, skill));
			this.activeSkills.forEach((skill, i) => {
				skill.skillBar.position.y = (i + 1) * -20;
				enemy.meshGroup.add(skill.skillBar);
			});
		}
	}
	addParasiticSprite() {
		const material = new THREE.SpriteMaterial({
			color: 0xff0000,
			opacity: 0.8,
			transparent: true,
			depthTest: false
		});
		const sprite = new THREE.Sprite(material);
		sprite.scale.set(100, 100, 100);
		sprite.position.y = this.enemy.height + 20;
		sprite.position.z = 40;
		this.enemy.meshGroup.add(sprite);
	}

	addTransformModel(key) {
		let skeletonData = this.assetManager.spineMap.get(key);
		if (!skeletonData) {
			const prefabKey = this.enemy.gameManager.config.enemies.find(
				(enemy) => enemy.id === key
			)?.prefabKey;
			if (!prefabKey) {
				return;
			}
			skeletonData = this.assetManager.spineMap.get(prefabKey);
		}
		const skeletonMesh = new spine.SkeletonMesh(skeletonData, (parameters) => {
			parameters.depthTest = false;
			parameters.alphaTest = 0.001;
			parameters.uniforms = {
				map: { type: 't', value: null }
			};
		});
		skeletonMesh.skeleton.color.a = 0.6;
		// console.log(key, skeletonData);
		const defaultAnim = getDefaultAnimName(key, skeletonMesh);
		skeletonMesh.state.setAnimation(0, defaultAnim, false);
		this.transformModel = skeletonMesh;
		this.enemy.meshGroup.add(skeletonMesh);
	}

	setSkills(skills: Skill[]) {
		this.reset();
		const branchSummon = skills.find((skill) => skill.branches);
		if (branchSummon) {
			this.branches = branchSummon.branches;
		}
		for (const skill of this.activeSkills) {
			this.enemy.meshGroup.remove(skill.skillBar);
			skill.dispose();
		}
		if (this.enemy.key === 'enemy_2042_syboss') {
			this.activeSkills = skills
				.filter(
					(ele) =>
						ele.type === 'skill' && (ele.initCooldown || ele.skillType === 'INCREASE_WITH_TIME')
				)
				.map((skill) => new ActiveSkill(this.enemy, skill));
			this.activeSkills.forEach((skill, i) => {
				skill.skillBar.position.y = (i + 1) * -20;
				this.enemy.meshGroup.add(skill.skillBar);
			});
		}
	}

	update(delta: number) {
		if (this.accelerateParams) {
			const { i, m, preDelay, limit } = this.accelerateParams;
			this.accelerationPreDelayTimer += delta;
			if (this.accelerationPreDelayTimer > preDelay) {
				this.accelerationIntervalTimer += delta;
				this.accelerationStacks = Math.min(limit, Math.floor(this.accelerationIntervalTimer / i));
				this.enemy.moddedSpeed = this.enemy.baseSpeed * (1 + this.accelerationStacks * m);
			}
		}
		this.handleBranchUpdate(delta);
		if (this.transformModel) {
			this.transformModel.update(delta);
		}
		for (const skill of this.activeSkills) {
			skill.update(delta);
		}
	}

	handleBranchUpdate(delta: number) {
		if (!this.branches) {
			return;
		}
		const [key, interval, duration] = this.branches[this.currentBranchIndex];
		this.branchIntervalElapsedTime += delta;
		this.branchElapsedTime += delta;
		if (this.branchElapsedTime > duration) {
			this.currentBranchIndex++;
			this.branchIntervalElapsedTime = 0;
			return;
		}
		if (this.branchIntervalElapsedTime > interval) {
			this.enemy.gameManager.spawnManager.addBranch(key);
			this.branchIntervalElapsedTime = 0;
		}
	}

	reset() {
		this.branches = null;
	}
}
