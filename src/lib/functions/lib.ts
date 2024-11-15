import translations from '$lib/translations.json';
import type { Enemy, RogueTopic } from '$lib/types';
import rogue_4_fragment_F_25 from '$lib/images/is/sarkaz/rogue_4_fragment_F_25.webp';


export const BONUS_ENEMY_KEYS = [
	'enemy_2001_duckmi',
	'enemy_2002_bearmi',
	'enemy_2034_sythef',
	'enemy_2059_smbox',
	'enemy_2085_skzjxd',
	'enemy_2069_skzbox',
	'enemy_2070_skzfbx',
	'enemy_2091_skzgds',
	'enemy_2067_skzcy',
	'enemy_2065_skzjs'
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

export const getTrapFormIndex = (list, index) => {
	const holder = {};
	let counter = 0;
	list.forEach((item, i) => {
		if (typeof item !== 'string') {
			holder[i] = counter;
			counter += 1;
		}
	});
	return holder[index];
};

const getEnemyWeight = (key, type) => {
	if (BONUS_ENEMY_KEYS.includes(key)) {
		return 99;
	}
	return type.includes('BOSS') ? 0 : 1;
};

export const sortEnemies = (a: Enemy, b: Enemy) => {
	return getEnemyWeight(a.key, a.type) - getEnemyWeight(b.key, b.type);
};

export const getTooltipEndIndex = (text: string) => {
	if (text[text.length - 1] === '}') {
		for (let i = text.length - 1; i > 0; i--) {
			if (text[i] === '{' && text?.[i - 1] !== '}') {
				return i;
			}
		}
	}
	return text.length;
};

export const setOtherBuffsList = (store, rogueTopic: RogueTopic, enemies: Enemy[]) => {
	const buffsList = [];
	if (rogueTopic === 'rogue_skz') {
		buffsList.push({
			key: 'fragment_boom',
			img: rogue_4_fragment_F_25,
			name: '爆破',
			targets: ['trap_760_skztzs'],
			activeTargets: [],
			mods: {
				hp: 0.5
			},
			maxCount: 1
		});
	}
	store.set(buffsList);
};

export const getOtherBuffsCount = (list, buffKey, key) => {
	const buff = list.find((item) => item.key === buffKey);
	const targetIndex = buff.activeTargets.findIndex((ele) => ele.key === key);
	if (targetIndex === -1) {
		return 0;
	}
	return buff.activeTargets[targetIndex].count;
};

export const updateOtherBuffsList = (store, buffKey, key) => {
	store.update((list) => {
		const buff = list.find((item) => item.key === buffKey);
		const targetIndex = buff.activeTargets.findIndex((ele) => ele.key === key);
		if (targetIndex === -1) {
			buff.activeTargets.push({ key, count: 1 });
		} else {
			const currentCount = buff.activeTargets[targetIndex].count;
			if (currentCount < buff.maxCount) {
				buff.activeTargets[targetIndex].count += 1;
			} else if (currentCount === buff.maxCount) {
				buff.activeTargets[targetIndex].count = 0;
			}
		}
		return list;
	});
};
