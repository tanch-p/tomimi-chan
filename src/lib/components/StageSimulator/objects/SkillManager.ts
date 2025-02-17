import type { Skill } from '$lib/types';
import * as spine from '$lib/spine';
import { Enemy } from './Enemy';
import { AssetManager } from './AssetManager';
import { GameConfig } from './GameConfig';
import { ActiveSkill } from './ActiveSkill';
import { getDefaultAnimName } from '$lib/functions/spineHelpers';

export class SkillManager {
	assetManager: AssetManager;
	enemy: Enemy;
	activeSkills: ActiveSkill[];
	branches = null;
	currentBranchIndex = 0;
	branchIntervalElapsedTime = 0;
	branchElapsedTime = 0;
	transformModel;
	isUsingSkill = false;

	constructor(enemy: Enemy, skills: Skill[]) {
		this.assetManager = AssetManager.getInstance();
		this.enemy = enemy;
		const branchSummon = skills.find((skill) => skill.branches);
		if (branchSummon) {
			this.branches = branchSummon.branches;
		}
		const transform = skills.find((skill) => skill.key === 'transform');
		if (transform) {
			const key = transform.value;
			this.addTransformModel(key);
		}
		this.activeSkills = skills
			.filter(
				(ele) =>
					ele.type === 'skill' && (ele.initCooldown || ele.skillType === 'INCREASE_WITH_TIME')
			)
			.map((skill) => new ActiveSkill(enemy, skill));
		for (const skill of this.activeSkills) {
			enemy.meshGroup.add(skill.skillBar);
		}
	}

	addTransformModel(key) {
		const skeletonData = this.assetManager.spineMap.get(key);
		if (!skeletonData) {
			return;
		}
		const skeletonMesh = new spine.SkeletonMesh(skeletonData, (parameters) => {
			parameters.depthTest = false;
			parameters.alphaTest = 0.001;
			parameters.uniforms = {
				map: { type: 't', value: null }
			};
		});
		skeletonMesh.skeleton.color.a = 0.45;
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
	}

	update(delta: number) {
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
			console.log(GameConfig.scaledElapsedTime);
			this.branchIntervalElapsedTime = 0;
		}
	}

	reset() {
		this.branches = null;
	}
}
