import type { Enemy } from '../../routes/(is)/[name=is_maps]/types';

export const getNormalAtk = (enemy: Enemy, row: number) => {
	switch (enemy.format) {
		case 'prisoner':
			return row === 0 ? enemy.normal_attack : enemy.released.normal_attack;
		case 'multiform':
			return enemy.forms[row].normal_attack;
		default:
			return enemy.normal_attack;
	}
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
