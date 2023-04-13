import type { Enemy } from '$lib/types';

export const getEnemySkills = (enemy: Enemy, row: number): string[] => {
	const { format } = enemy;
	if (format === 'prisoner' && row === 0) {
		return enemy.imprisoned?.special;
	}
	if (format === 'prisoner' && row === 1) {
		return enemy.released?.special;
	}
	if (format === 'powerup' && row === 1) {
		return enemy.powerup?.special;
	}
	if (format === 'multiform') {
		return enemy.forms[row].special;
	}
	return enemy.special;
};
