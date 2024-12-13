import translations from '$lib/translations.json';
import type { Enemy, Language, MapConfig, RogueTopic } from '$lib/types';
import rogue_4_fragment_F_25 from '$lib/images/is/sarkaz/rogue_4_fragment_F_25.webp';
import tileImg from '$lib/images/tiles/tile_infection.webp';
import { checkIsTarget } from './statHelpers';
import enemySkills from '$lib/data/enemy/enemy_skills.json';

export const BONUS_ENEMY_KEYS = [
	'enemy_2001_duckmi',
	'enemy_2002_bearmi',
	'enemy_2034_sythef',
	'enemy_2059_smbox',
	'enemy_2085_skzjxd',
	'enemy_2069_skzbox',
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

export const setOtherBuffsList = (
	store,
	rogueTopic: RogueTopic,
	enemies: Enemy[],
	mapConfig: MapConfig,
	language: Language
) => {
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
	const tileInfection = mapConfig.sp_terrain?.find((item) => item.tileKey === 'tile_infection');
	if (tileInfection) {
		buffsList.push({
			key: 'tile_infection',
			img: tileImg,
			name: translations[language].tile_infection,
			targets: ['not_flying&not_trap'],
			activeTargets: [],
			mods: {
				atk: 1 + tileInfection.blackboard['atk'],
				fixed_aspd: tileInfection.blackboard['attack_speed']
			},
			maxCount: 1
		});
	}
	for (const enemy of enemies) {
		const enemyCount = mapConfig.enemies.find((ele) => ele.id === enemy.stageId);
		const maxCount = Math.max(enemyCount.max_count, enemyCount.elite_max_count);
		const list = [
			...enemy.traits,
			...enemy.stats.special.reduce((acc, curr) => {
				acc = [...acc, ...curr];
				return acc;
			}, [])
		];
		for (const skillRef of list) {
			const skill = enemySkills[skillRef.key];
			if (!skill) {
				// case for new skills added from specialMods
				continue;
			}
			if (skill.type === 'buff') {
				buffsList.push({
					key: enemy[`name_${language}`],
					img: enemy.img,
					name: enemy[`name_${language}`],
					targets: skill.effects.targets,
					activeTargets: skill.effects.activeTargets,
					mods: skill.effects.mods,
					stackType: skill.effects.stackType,
					maxCount: maxCount
				});
			}
		}
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

export const consolidateOtherMods = (otherBuffsList) => {
	const modsList = [];
	otherBuffsList.forEach((buff) => {
		buff.activeTargets.forEach((ele) => {
			if (ele.count > 0) {
				modsList.push({
					key: buff.key,
					mods: [
						[
							{
								targets: [ele.key],
								mods: Object.fromEntries(
									Object.entries(buff.mods).map(([key, value]) => {
										const stackType = buff.stackType || 'add';
										if (stackType === 'add') {
											if (key.includes('fixed')) {
												return [key, value * ele.count];
											}
											return [key, value > 1 ? 1 + (value - 1) * ele.count : value * ele.count];
										} else {
											return [key, value ** ele.count];
										}
									})
								)
							}
						]
					],
					operation: 'times'
				});
			}
		});
	});
	return modsList;
};

export function getApplicableBuffsList(otherBuffsList, entity) {
	if (!otherBuffsList) {
		return [];
	}
	return otherBuffsList.filter((buff) =>
		buff.targets.some((target) => checkIsTarget(entity, target))
	);
}

export const getEliteColors = (rogueTopic: string) => {
	switch (rogueTopic) {
		case 'rogue_sami':
			return ['bg-[#544a8a]', 'bg-[#8f3033]'];
		case 'rogue_mizuki':
			return ['bg-[#5645a4]', 'bg-[#92344e]'];
		case 'rogue_phantom':
			return ['bg-[#dea41b]', 'bg-[#cb710c]'];
		case 'rogue_skz':
			return ['bg-[#5a4b90]', 'bg-[#cb3220]'];
	}
	return [];
};

const STAGES_WITH_ELITE_IMG = [
	'ro3_e_3_2',
	'ro3_e_4_2',
	'ro3_e_5_2',
	'ro4_e_2_2',
	'ro4_e_3_2',
	'ro4_e_3_5',
	'ro4_e_5_8'
];
export const getStageImg = (id, eliteMods) => {
	if (
		!(eliteMods && STAGES_WITH_ELITE_IMG.includes(id)) &&
		!id.includes('ev') &&
		!id.includes('duel')
	) {
		id = id.replace('e', 'n');
	}
	return id;
};
