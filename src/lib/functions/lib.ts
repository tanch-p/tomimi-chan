import type { Language, RogueTopic } from '$lib/types';
import translations from '$lib/translations.json';

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

export const arrayCompare = (a, b) => {
	if (!b) return false;
	// if the argument is the same array, we can be sure the contents are same as well
	if (b === a) return true;
	if (a.length != b.length) return false;

	for (let i = 0, l = a.length; i < l; i++) {
		if (a[i] instanceof Array && b[i] instanceof Array) {
			if (!a[i].equals(b[i])) return false;
		} else if (a[i] != b[i]) {
			return false;
		}
	}
	return true;
};

export const getRogueTopicFolder = (rogueTopic: RogueTopic) => {
	switch (rogueTopic) {
		case 'rogue_phantom':
			return 'ro1';
		case 'rogue_mizuki':
			return 'ro2';
		case 'rogue_sami':
			return 'ro3';

		default:
			return;
	}
};

export const getTimelineFile = async (rogueTopic: RogueTopic, levelId) => {
	const folder = getRogueTopicFolder(rogueTopic);

	let timeline;
	try {
		const data = (
			await import(`../data/stages/${folder}/level_${levelId.replace('level_', '')}.json`)
		).default;
		if (data) timeline = data;
	} catch {
		console.log('failed!');
		return timeline;
	}
	return timeline;
};
