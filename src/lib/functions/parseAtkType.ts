import type { Enemy } from '$lib/types';

export const getNormalAtk = (enemy: Enemy, row: number) => {
	if (enemy?.forms) {
		return enemy.forms[row].normal_attack;
	}
	return enemy.normal_attack;
};

export const getDmgEleHighlight = (atkElement: string) => {
	switch (atkElement) {
		case 'phys':
			return 'text-phys-hl';
		case 'arts':
			return 'text-arts-hl';
		case 'true':
			return 'text-true-hl';
		case 'heal':
			return 'text-heal-hl';
	}
};
