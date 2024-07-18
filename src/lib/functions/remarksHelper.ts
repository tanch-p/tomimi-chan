import type { Enemy, Skill, SpecialMods } from '$lib/types';
import enemySkills from '$lib/data/enemy/enemy_skills.json';
import { checkIsTarget } from '$lib/functions/statHelpers';

export const getEnemySkills = (
	enemy: Enemy,
	skillRefs: Skill[],
	specialMods: SpecialMods
): Skill[] => {
	let currentSkills = skillRefs;
	let extraSkills = [];
	currentSkills = skillRefs.map((skillRef) => {
		if (specialMods[enemy.key] && Object.keys(specialMods[enemy.key]).includes(skillRef.key)) {
			skillRef.overwritten = true;
			return { ...enemySkills[skillRef.key], ...skillRef, ...specialMods[enemy.key][skillRef.key] };
		} else {
			skillRef.overwritten=false;
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
					} else if (!skillRefs.find((ref) => ref.key === key)) {
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
