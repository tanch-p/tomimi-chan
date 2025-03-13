import type { Language, MapConfig, RogueTopic } from '$lib/types';
import fragments from '$lib/data/is/sarkaz/fragments.json';
import f27 from '$lib/images/is/sarkaz/rogue_4_fragment_F_27.webp';
import f28 from '$lib/images/is/sarkaz/rogue_4_fragment_F_28.webp';
import translations from '$lib/translations.json';
import calamity from '$lib/images/is/sarkaz/rogue_4_disaster_1_toast.webp';
import disasters from '$lib/data/is/sarkaz/disasters.json';

const ALWAYS_KILLED_KEYS = [
	'enemy_2073_skzrck',
	'enemy_2094_skzamb',
	'enemy_2094_skzamb_2',
	'enemy_1106_byokai_b'
];

const KEYS_TO_IGNORE = ['enemy_2086_skzdwx'];

const CHESTS = ['trap_051_vultres', 'trap_068_badbox', 'trap_110_smbbox', 'trap_758_skzmbx'];

const getFragmentName = (id, language: Language) => {
	const fragment = fragments.find((ele) => ele.id === id);
	return fragment[`name_${language}`] || fragment['name_zh'];
};

export function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]]; // Swap elements
	}
	return array;
}

export const getOptions = (mapConfig: MapConfig, rogueTopic: RogueTopic, language: Language) => {
	const options = [];
	const list = [];
	for (const wave of mapConfig.waves) {
		for (const fragment of wave.fragments) {
			for (const action of fragment.actions) {
				if (action.actionType === 'ACTIVATE_PREDEFINED') {
					list.push(action.key.split('#')[0]);
				}
			}
		}
	}
	const predefines = [...new Set(list)];
	switch (rogueTopic) {
		case 'rogue_phantom':
			if (predefines.includes('trap_051_vultres')) {
				options.push({
					key: 'trap_051_vultres',
					src: '/images/chara_icons/trap_051_vultres.webp',
					name: translations[language].treasure
				});
			}
			break;
		case 'rogue_mizuki':
			for (const key of predefines) {
				if (key === 'trap_068_badbox') {
					options.push({
						key: 'trap_068_badbox',
						src: '/images/chara_icons/trap_068_badbox.webp',
						name: translations[language].treasure
					});
					continue;
				}
				if (key === 'trap_079_allydonq') {
					options.push({
						key: 'allydonq',
						src: '/images/enemy_icons/enemy_2038_sydonq.webp',
						name: { zh: '猎潮的骑士', ja: '猟潮の騎士', en: 'Tide-Hunt Knight' }[language]
					});
					continue;
				}
			}
			break;
		case 'rogue_sami':
			for (const key of predefines) {
				if (key === 'trap_110_smbbox') {
					options.push({
						key: 'trap_110_smbbox',
						src: '/images/chara_icons/trap_110_smbbox.webp',
						name: translations[language].treasure
					});
					continue;
				}
			}
			options.push(
				...[
					{
						key: 'totem2',
						src: '/images/chara_icons/trap_024_npcsld.webp',
						name: { zh: '盾卫', ja: '盾兵', en: 'Shieldguard' }[language]
					},
					{
						key: 'totem1',
						src: '/images/enemy_icons/enemy_1106_byokai.webp',
						name: { zh: '斗志昂扬无人机', ja: '闘志高揚ドローン', en: 'Cheering Sponsor Drone' }[
							language
						]
					},
					{
						key: 'bossrelic',
						src: '/images/relics/relic_routeweave_net.webp',
						name: { zh: '路网', ja: '導きの網織', en: 'Routeweave Net' }[language]
					}
				]
			);
			break;
		case 'rogue_skz':
			for (const key of predefines) {
				if (key === 'trap_758_skzmbx') {
					options.push({
						key: 'trap_758_skzmbx',
						src: '/images/chara_icons/trap_758_skzmbx.webp',
						name: translations[language].treasure
					});
					continue;
				}
				if (key === 'trap_764_skzshp') {
					options.push({
						key: 'trap_764_skzshp',
						src: '/images/chara_icons/trap_764_skzshp.webp',
						name: { zh: '驮兽旅行家', ja: '旅する駄獣', en: 'Burdenbeast Traveler' }[language]
					});
					continue;
				}
			}
			options.push(
				...[
					{
						key: 'calamity',
						src: calamity,
						name: { zh: '天灾年代', ja: '天災の時代', en: 'Catastrophes' }[language]
					},
					{
						key: 'hidden_door',
						src: '/images/enemy_icons/enemy_2067_skzcy.webp',
						name: getFragmentName('rogue_4_fragment_F_08', language)
					},
					{
						key: 'hidden_window',
						src: '/images/enemy_icons/enemy_2091_skzgds.webp',
						name: getFragmentName('rogue_4_fragment_F_29', language)
					},
					{
						key: 'box_1',
						src: f27,
						name: getFragmentName('rogue_4_fragment_F_27', language)
					},
					{
						key: 'box_3',
						src: f28,
						name: getFragmentName('rogue_4_fragment_F_28', language)
					},
					{
						key: 'shadow',
						src: '/images/enemy_icons/enemy_2093_skzams.webp',
						name: { zh: '终曲合声', ja: '终曲合声', en: '终曲合声' }[language]
					}
				]
			);
			break;
	}
	return options;
};

export const handleOptionsUpdate = (hiddenGroups, key, rogueTopic: RogueTopic, otherStores) => {
	const fragmentKeys = ['hidden_door', 'hidden_window', 'box_1', 'box_3'];
	if (key === 'calamity') {
		let level = 1;
		otherStores.difficulty.subscribe((n) => {
			level = n < 5 ? 1 : n < 11 ? 2 : 3;
		});
		const effect = disasters.find(
			(ele) => ele.iconId === 'rogue_4_disaster_1' && ele.level === level
		);
		otherStores.disaster.update((list) => {
			if (list.find((ele) => ele.id === effect.id)) {
				list = [];
			} else {
				list = [effect];
			}
			return list;
		});
	}
	switch (rogueTopic) {
		case 'rogue_skz':
			if (hiddenGroups.includes(key)) {
				hiddenGroups = hiddenGroups.filter((ele) => ele !== key);
			} else if (fragmentKeys.includes(key)) {
				hiddenGroups = hiddenGroups.filter((ele) => !fragmentKeys.includes(ele));
				hiddenGroups.push(key);
				break;
			} else {
				hiddenGroups.push(key);
			}

			break;
		default:
			if (hiddenGroups.includes(key)) {
				hiddenGroups = hiddenGroups.filter((ele) => ele !== key);
			} else {
				hiddenGroups.push(key);
			}
			break;
	}
	return hiddenGroups;
};

export const getBaseCount = (mapConfig, eliteMode) => {
	let totalCount = 0;
	mapConfig.waves.forEach((wave, waveIdx) => {
		wave['fragments'].forEach((fragment, fragIndex) => {
			for (const action of fragment['actions']) {
				if (action['actionType'] !== 'SPAWN') {
					continue;
				}
				if (action['randomSpawnGroupKey'] || action['randomSpawnGroupPackKey']) {
					continue;
				}
				if (action['hiddenGroup']) {
					continue;
				}
				if (
					[
						'level_rogue4_b-4',
						'level_rogue4_b-4-b',
						'level_rogue4_b-5',
						'level_rogue4_b-5-b'
					].includes(mapConfig.levelId) &&
					action.key === 'enemy_2090_skzjbc' &&
					!eliteMode
				) {
					continue;
				}
				if (isCountableAction(action.key, mapConfig.levelId)) {
					totalCount += action['count'];
				}
			}
		});
	});
	return totalCount;
};

const isCountableAction = (key, levelId) => {
	if (key.includes('trap')) return false;
	if (key === '') return false;
	if (ALWAYS_KILLED_KEYS.includes(key)) return false;
	switch (levelId) {
		case 'level_rogue4_t-4':
			return key !== 'enemy_1263_durbus';
	}
	return true;
};

export const getEnemyCountPermutations = (
	mapConfig,
	hiddenGroups,
	eliteMode,
	hasBonus,
	baseCount
) => {
	const key = eliteMode ? 'ELITE' : 'NORMAL';
	const permutations = mapConfig[key].permutations;
	const bonus = mapConfig.bonus;
	const countToAdd = mapConfig.waves.reduce((acc, wave, waveIdx) => {
		if (bonus?.type === 'wave' && waveIdx === bonus.wave_index) return acc;
		wave.fragments.forEach((fragment, i) => {
			if (bonus?.type === 'fragment' && waveIdx === bonus.wave_index && i === bonus.frag_index)
				return;
			fragment.actions.forEach((action) => {
				if (
					hiddenGroups.includes(action['hiddenGroup']) &&
					!action['randomSpawnPackKey'] &&
					!action['randomSpawnGroupPackKey'] &&
					isCountableAction(action.key, mapConfig.levelId)
				) {
					acc += action['count'];
				}
			});
		});
		return acc;
	}, 0);
	const list = permutations.map((permutation) => {
		let permutationCount = 0;
		mapConfig.waves.forEach((wave, waveIdx) => {
			wave['fragments'].forEach((fragment, fragIndex) => {
				const packedGroups = getRandomGroups(fragment, hiddenGroups);
				const key = `w${waveIdx}f${fragIndex}`;
				let groupActions = [];
				for (const [groupKey, list] of Object.entries(packedGroups)) {
					let choice = permutation?.[key]?.[groupKey];
					if (list?.[choice]) {
						groupActions = groupActions.concat(list[choice]);
					}
				}
				for (const action of groupActions) {
					if (isCountableAction(action.key, mapConfig.levelId)) {
						permutationCount += action['count'];
					}
				}
			});
		});
		return {
			count: baseCount + countToAdd + permutationCount + (bonus && hasBonus ? 1 : 0),
			permutation
		};
	});
	return list.sort((a, b) => a.count - b.count);
};

function addPackToGroup(action, groups) {
	for (const groupKey in groups) {
		for (const item of groups[groupKey]) {
			if (action.randomSpawnGroupPackKey === item.randomSpawnGroupPackKey) {
				groups[groupKey].push(action);
				return;
			}
		}
	}
}

function groupResolver(actions) {
	const groups = {};
	const leftovers = [];
	const notRandomGroups = [];

	// First pass: handle random spawn groups
	for (const action of actions) {
		const group = action.randomSpawnGroupKey;
		if (group !== null && group !== undefined) {
			if (!groups[group]) {
				groups[group] = [];
			}
			groups[group].push(action);
		} else {
			leftovers.push(action);
		}
	}

	// Second pass: handle pack keys
	for (const action of leftovers) {
		const packKey = action.randomSpawnGroupPackKey;
		if (packKey !== null && packKey !== undefined) {
			addPackToGroup(action, groups);
		} else {
			notRandomGroups.push(action);
		}
	}

	// Third pass: handle hidden groups
	// const extraGroups = {};
	// for (const action of notRandomGroups) {
	// 	const hiddenGroup = action.hiddenGroup;
	// 	if (!extraGroups[hiddenGroup]) {
	// 		extraGroups[hiddenGroup] = [];
	// 	}
	// 	extraGroups[hiddenGroup].push(action);
	// }

	return groups;
}

function randomGroupResolver(randomGroups) {
	const groupCollector = {};

	for (const groupKey in randomGroups) {
		const packDict = {};

		// Group actions by pack key
		for (const action of randomGroups[groupKey]) {
			const packKey = action.randomSpawnGroupPackKey;
			if (!packDict[packKey]) {
				packDict[packKey] = [];
			}
			packDict[packKey].push(action);
		}

		// Handle cases with no pack key (single pack)
		if (Object.keys(packDict).length === 1) {
			for (const pack in packDict) {
				groupCollector[groupKey] = packDict[pack];
			}
		} else {
			// Multiple packs - collect all pack groups
			const packGroups = [];
			for (const pack in packDict) {
				packGroups.push(packDict[pack]);
			}
			groupCollector[groupKey] = packGroups;
		}
	}

	return groupCollector;
}

export const generateWaveTimeline = (
	mapConfig,
	hiddenGroups,
	permutation,
	eliteMode,
	randomSeeds,
	bonusKey
) => {
	if (!permutation) return;
	let randomSeedIndex = 0;
	const enemyReplace = eliteMode ? mapConfig.elite_runes?.enemy_replace || {} : {};
	let totalCount = 0;
	const waveTimelines = [];
	const { waves } = mapConfig;
	waves.forEach((wave, waveIdx) => {
		let prevPhaseTime = 0;
		let spawns = {};
		let waveBlockingSpawns = {};
		wave['fragments'].forEach((fragment, fragIndex) => {
			prevPhaseTime += fragment['preDelay'];

			const packedGroups = getRandomGroups(fragment, hiddenGroups);
			const key = `w${waveIdx}f${fragIndex}`;
			let groupActions = [];
			for (const [groupKey, list] of Object.entries(packedGroups)) {
				let choice = permutation?.[key]?.[groupKey];
				if (choice == undefined) {
					choice = getPredefinedChoiceIndex(list, hiddenGroups, bonusKey);
					if (choice == undefined) {
						choice = Math.floor(randomSeeds[randomSeedIndex] * list.length);
						randomSeedIndex += 1;
					}
				}
				if (list?.[choice]) {
					groupActions = groupActions.concat(list[choice]);
				}
			}
			for (const action of groupActions) {
				handleAction(action, spawns, waveBlockingSpawns, prevPhaseTime, enemyReplace);
				if (isCountableAction(action.key, mapConfig.levelId)) {
					totalCount += action['count'];
				}
			}

			for (const action of fragment['actions']) {
				if (action['actionType'] !== 'SPAWN') {
					continue;
				}
				if (action['randomSpawnGroupKey'] || action['randomSpawnGroupPackKey']) {
					continue;
				}
				if (action['hiddenGroup'] && !hiddenGroups.includes(action['hiddenGroup'])) {
					continue;
				}
				if (
					[
						'level_rogue4_b-4',
						'level_rogue4_b-4-b',
						'level_rogue4_b-5',
						'level_rogue4_b-5-b'
					].includes(mapConfig.levelId) &&
					action.key === 'enemy_2090_skzjbc' &&
					!eliteMode
				) {
					continue;
				}
				if (KEYS_TO_IGNORE.includes(action.key)) {
					continue;
				}
				handleAction(action, spawns, waveBlockingSpawns, prevPhaseTime, enemyReplace);
				if (isCountableAction(action.key, mapConfig.levelId)) {
					totalCount += action['count'];
				}
			}
			if (Object.keys(waveBlockingSpawns).length > 0) {
				prevPhaseTime = Math.max(...Object.keys(waveBlockingSpawns).map(Number));
			}
		});
		const myKeys = Object.keys(spawns).map(Number);
		if (!(mapConfig.levelId === 'level_rogue4_b-8' && myKeys.length === 0)) {
			myKeys.sort((a, b) => a - b);
			const spawnList = myKeys.map((key) => ({ t: key, actions: spawns[key] }));
			waveTimelines.push({
				preDelay: wave['preDelay'],
				postDelay: wave['postDelay'],
				maxTimeWaitingForNextWave: wave['maxTimeWaitingForNextWave'],
				timeline: spawnList
			});
		}
	});
	return { waves: waveTimelines, count: totalCount };
};

const handleAction = (action, spawns, waveBlockingSpawns, prevPhaseTime, enemyReplace = {}) => {
	if (action.key.includes('trap') || action.key === '') {
		return;
	}
	let enemyKey = action.key;
	if (enemyReplace[action.key]) {
		enemyKey = enemyReplace[action.key];
	}
	if (action['count'] > 1) {
		// interval
		for (let i = 0; i < action['count']; i++) {
			const spawnTime = prevPhaseTime + action['preDelay'] + i * action['interval'];
			if (!spawns?.[spawnTime]) {
				spawns[spawnTime] = [];
			}
			spawns[spawnTime].push({
				key: enemyKey
			});

			if (!['enemy_1106_byokai_b'].includes(action.key)) {
				if (!waveBlockingSpawns[spawnTime]) {
					waveBlockingSpawns[spawnTime] = [];
					waveBlockingSpawns[spawnTime].push({ key: action['key'] });
				}
			}
		}
	} else {
		const spawnTime = prevPhaseTime + action['preDelay'];
		if (!spawns?.[spawnTime]) {
			spawns[spawnTime] = [];
		}
		spawns[spawnTime].push({
			key: enemyKey
		});

		if (!['enemy_1106_byokai_b'].includes(action.key)) {
			if (!waveBlockingSpawns[spawnTime]) {
				waveBlockingSpawns[spawnTime] = [];
				waveBlockingSpawns[spawnTime].push({ key: action['key'] });
			}
		}
	}
};

export const parseWaves = (mapConfig, permutation, hiddenGroups, eliteMode, randomSeeds, bonus) => {
	let randomSeedIndex = 0;
	const waves = structuredClone(mapConfig.waves);
	waves.forEach((wave, waveIdx) => {
		const fragments = [];
		wave['fragments'].forEach((fragment, fragIndex) => {
			const copy = structuredClone(fragment);
			const key = `w${waveIdx}f${fragIndex}`;
			const actions = [];

			let groupActions = [];
			const packedGroups = getRandomGroups(fragment, hiddenGroups);
			for (const [groupKey, list] of Object.entries(packedGroups)) {
				let choice = permutation?.[key]?.[groupKey];
				if (choice == undefined) {
					choice = getPredefinedChoiceIndex(list, hiddenGroups, bonus);
					if (choice == undefined) {
						choice = Math.floor(randomSeeds[randomSeedIndex] * list.length);
						randomSeedIndex += 1;
					}
				}
				if (list?.[choice]) {
					groupActions = groupActions.concat(list[choice]);
				}
			}
			for (const action of groupActions) {
				actions.push(action);
			}
			for (const action of fragment['actions']) {
				if (!['SPAWN', 'ACTIVATE_PREDEFINED'].includes(action['actionType'])) {
					continue;
				}
				if (
					[
						'level_rogue4_b-4',
						'level_rogue4_b-4-b',
						'level_rogue4_b-5',
						'level_rogue4_b-5-b'
					].includes(mapConfig.levelId) &&
					action.key === 'enemy_2090_skzjbc' &&
					!eliteMode
				) {
					continue;
				}
				if (action['randomSpawnGroupKey'] || action['randomSpawnGroupPackKey']) {
					continue;
				}
				if (action['hiddenGroup'] && !hiddenGroups.includes(action['hiddenGroup'])) {
					continue;
				}
				actions.push(action);
			}
			copy.actions = actions;
			fragments.push(copy);
		});
		wave.fragments = fragments;
	});

	return waves;
};

export const getPredefinedChoiceIndex = (list, hiddenGroups, bonusKey) => {
	if (!Array.isArray(list[0])) {
		const badBoxIdx = list.findIndex((action) => CHESTS.includes(action.key.split('#')[0]));
		if (badBoxIdx !== -1 && hiddenGroups.some((ele) => CHESTS.includes(ele))) {
			return badBoxIdx;
		}
		const bonusIdx = bonusKey != null && list.findIndex((action) => action.key === bonusKey);
		if (bonusIdx !== -1) {
			return bonusIdx;
		}
	}
};

export const getRandomGroups = (fragment, hiddenGroups) => {
	const groups = [];
	for (const action of fragment['actions']) {
		const { actionType, randomSpawnGroupKey, randomSpawnGroupPackKey, hiddenGroup } = action;
		if (!['SPAWN', 'ACTIVATE_PREDEFINED'].includes(actionType)) {
			continue;
		}
		if (hiddenGroup && !hiddenGroups.includes(hiddenGroup)) {
			continue;
		}
		if (randomSpawnGroupKey || randomSpawnGroupPackKey) {
			groups.push(action);
		}
	}
	const random_groups = groupResolver(groups);
	const packedGroups = randomGroupResolver(random_groups);
	return packedGroups;
};

export const compileHiddenGroups = (hiddenGroups, eliteMode, mapConfig) => {
	const modeKey = eliteMode ? mapConfig['ELITE'].groupKey : mapConfig['NORMAL'].groupKey;
	let groups = structuredClone(hiddenGroups);
	if (modeKey) {
		groups = [...groups, modeKey];
	}
	return groups;
};

export const initialisePermGroupsChoices = (mapConfig, eliteMode) => {
	const modeKey = eliteMode ? mapConfig['ELITE'].groupKey : mapConfig['NORMAL'].groupKey;
	const hiddenGroups = [];
	if (modeKey) {
		hiddenGroups.push(modeKey);
	}
	const permutation = {};
	mapConfig.waves.forEach((wave, waveIdx) => {
		wave.fragments.forEach((fragment, fragIdx) => {
			const key = `w${waveIdx}f${fragIdx}`;
			const groups = {};
			for (const action of fragment.actions) {
				const { hiddenGroup, randomSpawnGroupKey } = action;
				if (hiddenGroup && !hiddenGroups.includes(hiddenGroup)) {
					continue;
				}
				if (randomSpawnGroupKey && !groups[randomSpawnGroupKey]) {
					groups[randomSpawnGroupKey] = 0;
				}
			}
			if (Object.keys(groups).length > 0) {
				permutation[key] = {};
				for (const [groupKey, val] of Object.entries(groups)) {
					permutation[key][groupKey] = val;
				}
			}
		});
	});
	return structuredClone(permutation);
};

export const getRandomChance = (weight, choice) => {
	if (Array.isArray(weight)) {
		const actions = weight;
		const w = actions.find((action) => action.randomSpawnGroupKey)?.weight;
		const totalWeight = choice.reduce((acc, pack) => {
			const curr = pack.find((action) => action.randomSpawnGroupKey)?.weight;
			acc += curr;
			return acc;
		}, 0);
		return Math.round((w / totalWeight) * 100);
	}
	const totalWeight = choice.reduce((acc, curr) => {
		acc += curr.weight;
		return acc;
	}, 0);
	return Math.round((weight / totalWeight) * 1000) / 10;
};

export const compileSpawnTimeActions = (actions) => {
	const holder = [];
	for (const action of actions) {
		const item = holder.find((ele) => ele.key === action.key);
		if (item) {
			item.count += 1;
		} else {
			holder.push({ key: action.key, count: 1 });
		}
	}
	return holder;
};

export const getBonusEnemies = (rogueTopic: RogueTopic) => {
	switch (rogueTopic) {
		case 'rogue_phantom':
			return ['', 'enemy_2001_duckmi', 'enemy_2002_bearmi'];
		case 'rogue_sami':
			return ['', 'enemy_2001_duckmi', 'enemy_2002_bearmi', 'enemy_2034_sythef'];
		default:
			return [
				'',
				'enemy_2001_duckmi',
				'enemy_2002_bearmi',
				'enemy_2034_sythef',
				'enemy_2085_skzjxd'
			];
	}
};

export const getImageForWaves = (key, mapConfig) => {
	if (key.includes('skzamj') || key.includes('skzamf')) {
		const enemy = mapConfig.enemies.find((enemy) => enemy.id === key);
		const transformKey = enemy.overwrittenData.talentBlackboard
			.find((ele) => ele.key === 'transform')
			?.value?.replace('skzams_1', 'skzams')
			.replace('upeopl_1', 'upeopl');
		return transformKey;
	}

	return mapConfig.enemies.find((enemy) => enemy.id === key)?.prefabKey;
};
