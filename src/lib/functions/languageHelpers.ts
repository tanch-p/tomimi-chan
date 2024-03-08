import type { Language } from '$lib/types';

export function floorPrefixSuffix(floor: number, language: Language) {
	switch (language) {
		case 'zh':
			return floor + '层';
		case 'ja':
			return '第' + floor + '層';
		case 'en':
		default:
			return floor + 'F';
	}
}
