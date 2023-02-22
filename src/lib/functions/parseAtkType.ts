import type { Enemy } from '../../routes/(is)/[name=is_maps]/types';
import translations from '$lib/translations.json';

export const getAtkType = (enemy: Enemy, row: number) => {
	switch (enemy.format) {
		case 'prisoner':
			return row === 0 ? enemy.normal_attack : enemy.released.normal_attack;
		case 'multiform':
			return enemy.forms[row].normal_attack;
		default:
			return enemy.normal_attack;
	}
};

export const parseAtkType = (normal_attack, language: string) => {
	const { atk_type, hits } = normal_attack;
	if (atk_type[0] === 'raw') {
		return '';
	}
	const numHits = hits === 1 ? '' : ` x ${hits}`;
	const atkType = '('.concat(
		atk_type
			.map((ele, index) => {
				const separator = language === 'en' ? '/' : '・';
				return (index !== 0 ? separator : '') + translations[language][ele];
			})
			.join(''),
		')'
	);
	return numHits.concat(' ', atkType);
};
