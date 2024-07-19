import translations from '$lib/translations.json';

export const BONUS_ENEMY_KEYS = [
	'enemy_2001_duckmi',
	'enemy_2002_bearmi',
	'enemy_2034_sythef',
	'enemy_2059_smbox',
	'enemy_2085_skzjxd',
	"enemy_2067_skzcy",
	"enemy_2069_skzbox"
];

export function isEquals(obj1, obj2) {
	if (obj1 === null || obj2 === null) return false;
	if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
	  return obj1 === obj2;
	}
  	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);
	if (keys1.length !== keys2.length) {
	  return false;
	}
	for (const key of keys1) {
	  if (!keys2.includes(key) || !isEquals(obj1[key], obj2[key])) {
		return false;
	  }
	}
	return true;
  }

export function convertToOrdinal(number: number) {
	const lastDigit = number % 10;
	const lastTwoDigits = number % 100;

	if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
		return number + 'th';
	}

	switch (lastDigit) {
		case 1:
			return number + 'st';
		case 2:
			return number + 'nd';
		case 3:
			return number + 'rd';
		default:
			return number + 'th';
	}
}

export function getFormTitle(title: string | undefined | null, row: number, language: Language) {
	if (!title) {
		return null;
	}
	if (title.includes('form')) {
		const splitString = title.split('.');
		const formTitle = splitString?.[1];
		if (formTitle) {
			return translations[language][formTitle];
		}
		if (language === 'en') {
			return (
				translations[language].multiform_prefix +
				convertToOrdinal(row + 1) +
				' ' +
				translations[language].multiform_suffix
			);
		}
		return (
			translations[language].multiform_prefix + (row + 1) + translations[language].multiform_suffix
		);
	}

	return translations[language][title];
}

const getEnemyWeight = (key, type) => {
	if (BONUS_ENEMY_KEYS.includes(key)) {
		return 99;
	}
	return type.includes('BOSS') ? 0 : type.includes('ELITE') ? 1 : 2;
};

export const sortEnemies = (a, b) => {
	return getEnemyWeight(a.key, a.type) - getEnemyWeight(b.key, b.type);
};
