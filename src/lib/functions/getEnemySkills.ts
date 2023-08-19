import type { Enemy, Skill, SpecialMods } from '$lib/types';
import enemySkills from '$lib/data/enemy/enemy_skills.json';
import { checkIsTarget } from '$lib/functions/parseStats';

export const getEnemySkills = (
	enemy: Enemy,
	skillRefs: Skill[],
	specialMods: SpecialMods
): Skill[] => {
	let currentSkills = skillRefs;
	let extraSkills = [];
	currentSkills = skillRefs.map((skillRef) => {
		if (specialMods[enemy.id] && Object.keys(specialMods[enemy.id]).includes(skillRef.key)) {
			return specialMods[enemy.id][skillRef.key];
		} else {
			return { ...enemySkills[skillRef.key], ...skillRef };
		}
	});

	for (const target in specialMods) {
		if (checkIsTarget(enemy, target)) {
			extraSkills = Object.keys(specialMods[target])
				.map((key) => {
					if (key !== 'status_immune' && !skillRefs.find((ref) => ref.key === key)) {
						return specialMods[target][key];
					}
				})
				.filter(Boolean);
		}
	}
	return [...extraSkills, ...currentSkills];
};
