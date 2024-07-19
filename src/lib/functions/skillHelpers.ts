import type { Enemy, Skill, SpecialMods } from '$lib/types';
import enemySkills from '$lib/data/enemy/enemy_skills.json';
import enemyDb from '$lib/data/enemy/enemy_database.json';
import { checkIsTarget } from '$lib/functions/statHelpers';
import { isEquals } from './lib';

export const overwriteBlackboard = (specialList, blackboard) => {
	for (const skillRef of blackboard) {
		const index = specialList.findIndex((ele) => ele.key === skillRef.key);
		if (index === -1) {
			specialList.push(skillRef);
		} else {
			specialList.splice(index, 1, skillRef);
		}
	}
	return specialList;
};

export const getOverwrittenKeys = (originalSkillRef: Skill, skillRef: Skill, skill: Skill) => {
	const list = [];
	for (const key of Object.keys(skillRef)) {
		if (originalSkillRef?.[key]) {
			if (!isEquals(skillRef[key], originalSkillRef[key])) {
				list.push(key);
			}
		} else if (skill?.[key] && !isEquals(skillRef[key], skill[key])) {
			list.push(key);
		}
	}
	return list;
};

export const getStatSkills = (
	enemy: Enemy,
	skillRefs: Skill[],
	specialMods: SpecialMods
): Skill[] => {
	let currentSkills = skillRefs;
	currentSkills = skillRefs.map((skillRef) => {
		if (specialMods[enemy.key] && Object.keys(specialMods[enemy.key]).includes(skillRef.key)) {
			return { ...enemySkills[skillRef.key], ...skillRef, ...specialMods[enemy.key][skillRef.key] };
		} else {
			return { ...enemySkills[skillRef.key], ...skillRef };
		}
	});
	return currentSkills;
};

export const getEnemySkills = (enemy: Enemy, row: number, specialMods: SpecialMods): Skill[] => {
	let currentSkills = enemy?.forms ? enemy.forms[row].special : enemy.special;
	let extraSkills = [];
	currentSkills = currentSkills.map((skillRef) => {
		const baseEnemy = enemyDb[enemy.key];
		const originalSkillRef = baseEnemy?.forms
			? baseEnemy.forms[row].special.find((ele) => ele.key === skillRef.key)
			: baseEnemy.special.find((ele) => ele.key === skillRef.key);
		if (specialMods[enemy.key] && Object.keys(specialMods[enemy.key]).includes(skillRef.key)) {
			skillRef.overwrittenKeys = getOverwrittenKeys(
				originalSkillRef,
				{ ...skillRef, ...specialMods[enemy.key][skillRef.key] },
				enemySkills[skillRef.key]
			);
			return { ...enemySkills[skillRef.key], ...skillRef, ...specialMods[enemy.key][skillRef.key] };
		} else {
			skillRef.overwrittenKeys = getOverwrittenKeys(
				originalSkillRef,
				skillRef,
				enemySkills[skillRef.key]
			);
			return { ...enemySkills[skillRef.key], ...skillRef };
		}
	});

	for (const target in specialMods) {
		if (checkIsTarget(enemy, target)) {
			extraSkills = Object.keys(specialMods[target])
				.map((key) => {
					if (key === 'status_immune' || key.includes('mods_')) {
						return;
					}
					if (enemy.forms) {
						for (const form of enemy.forms) {
							if (form.special.find((ref) => ref.key === key)) {
								return;
							}
						}
						return specialMods[target][key];
					} else if (!currentSkills.find((ref) => ref.key === key)) {
						return specialMods[target][key];
					}
				})
				.filter(Boolean);
		}
	}

	return [...extraSkills, ...currentSkills];
};

export const getStatusImmune = (enemy: Enemy, statusImmuneList, mods: SpecialMods) => {
	if (mods?.[enemy.id]?.status_immune) {
		statusImmuneList = [...statusImmuneList, ...mods[enemy.id].status_immune];
	}
	return statusImmuneList;
};
