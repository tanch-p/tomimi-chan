import type { Skill } from '$lib/types';
import * as THREE from 'three';
import { getAnimDuration, getSkillAnimName } from '$lib/functions/spineHelpers';
import { Enemy } from './Enemy';
import { AssetManager } from './AssetManager';
import { GameConfig } from './GameConfig';

export class ActiveSkill {
	assetManager: AssetManager;
	enemy: Enemy;
	currSp: number;
	initSp: number;
	spCost: number;
	skillBar: THREE.Group = new THREE.Group();
	skill: Skill;
	maxUsageCount;
	currCount = 0;
	skillTimer = 0;
	duration: number;
	animName: string;
	prevAnim: string;
	isFinished = false;
	actionType;
	constructor(enemy: Enemy, skill: Skill) {
		this.assetManager = AssetManager.getInstance();
		this.enemy = enemy;
		this.skill = skill;
		if (skill.initCooldown) {
			const { initSp, spCost } = this.convertCooldownToTimeRegen(skill);
			this.initSp = initSp;
			this.spCost = spCost;
		} else {
			this.initSp = skill.initSp;
			this.spCost = skill.spCost;
		}
		this.maxUsageCount = skill.max_count || null;
		this.currSp = this.initSp;
		this.animName = getSkillAnimName(this.enemy.skel,this.enemy.key, this.skill.key);
		this.duration = getAnimDuration(this.enemy.skel, this.animName);
		this.createSkillBar();
		this.skillBar.renderOrder = 1;

		if (skill.branch_id) {
			this.actionType = 'summonBranch';
		}
	}

	convertCooldownToTimeRegen(skill) {
		const { initCooldown, cooldown } = skill;
		return { initSp: cooldown - initCooldown, spCost: cooldown };
	}

	createSkillBar() {
		const fillColorVector = new THREE.Color(0x74b72e);
		const bgColorVector = new THREE.Color(0x000000);

		// Create shader material
		const shaderMaterial = new THREE.ShaderMaterial({
			uniforms: {
				progress: { value: this.currSp / this.spCost },
				fillColor: {
					value: new THREE.Vector4(fillColorVector.r, fillColorVector.g, fillColorVector.b, 1.0) // full opacity
				},
				backgroundColor: {
					value: new THREE.Vector4(bgColorVector.r, bgColorVector.g, bgColorVector.b, 0.5) // 0.5 opacity
				}
			},
			vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
			fragmentShader: `
            uniform float progress;
            uniform vec4 fillColor;
            uniform vec4 backgroundColor;
            varying vec2 vUv;
            
            void main() {
                vec4 color = vUv.x < progress ? fillColor : backgroundColor;
                gl_FragColor = color;
            }
        `,
			transparent: true // Enable transparency
		});

		// Create plane geometry
		const geometry = new THREE.PlaneGeometry(GameConfig.gridSize * 1.1, 15);
		this.mesh = new THREE.Mesh(geometry, shaderMaterial);

		// Make it always face the camera
		this.mesh.onBeforeRender = (renderer, scene, camera) => {
			this.mesh.quaternion.copy(camera.quaternion);
		};
		this.skillBar.add(this.mesh);
	}

	update(delta) {
		if (this.isFinished) {
			return;
		}
		if (this.maxUsageCount) {
			if (this.currCount >= this.maxUsageCount) {
				if (this.skill.key === 'mzk_extra_summon') {
					this.enemy.handleFormIndexChange();
				}
				this.enemy.skillManager.isUsingSkill = false;
				this.isFinished = true;
				return;
			}
		}
		if (this.skillTimer > 0) {
			this.skillTimer += delta;
			if (this.skillTimer > this.duration) {
				this.skillTimer = 0;
				switch (this.actionType) {
					case 'summonBranch':
						this.enemy.gameManager.spawnManager.addBranch(this.skill.branch_id);
						break;
				}
				this.enemy.skel.state.setAnimation(0, this.prevAnim, true);
				this.enemy.skillManager.isUsingSkill = false;
			}
			return;
		}
		this.currSp += delta;
		if (this.currSp < this.spCost) {
			this.mesh.material.uniforms.progress.value = this.currSp / this.spCost;
		} else {
			if (!this.enemy.skillManager.isUsingSkill) {
				this.prevAnim = this.enemy.skel.state.currentAnimation;
				this.enemy.skillManager.isUsingSkill = true;
				this.currCount++;
				if (this.animName) {
					this.enemy.skel.state.setAnimation(0, this.animName, false);
					this.enemy.animState = this.animName;
				}
				this.skillTimer += delta;
				this.currSp = 0;
			}
		}
	}

	dispose() {
		// Dispose of the geometry
		if (this.mesh.geometry) {
			this.mesh.geometry.dispose();
		}

		// Dispose of the shader material
		if (this.mesh.material) {
			this.mesh.material.dispose();
		}

		// Remove from parent (skillBar in your case)
		if (this.mesh.parent) {
			this.mesh.parent.remove(this.mesh);
		}

		// Clear references
		this.skillBar = null;
		this.mesh = null;
	}
}
