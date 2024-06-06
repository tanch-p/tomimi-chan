import type { Language } from '$lib/types';
import translations from '$lib/translations.json';

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
export function parseConditions(key, language: Language) {
	if (key.includes('gt') || key.includes('lt')) {
		const splitStr = key.split('_');
		return splitStr
			.map((ele, i) => {
				let buffer = '';
				if (ele.includes('gt')) {
					return '↑';
				}
				if (ele.includes('lt')) {
					return '↓';
				}
				if (i === splitStr.length - 1) {
					return ele + "%";
				}
				if (language === 'en' && i < splitStr.length - 2) {
					buffer = ' ';
				}
				return (
					(translations[language].table_headers[ele] ??
						translations[language][ele] ??
						translations[language].types[ele]) + buffer
				);
			})
			.join('');
	}
	return (
		translations[language].table_headers[key] ??
		translations[language][key] ??
		translations[language].types[key]
	);
}
