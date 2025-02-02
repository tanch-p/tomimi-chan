import type { Language, RogueTopic } from '$lib/types';
import fragments from '$lib/data/is/sarkaz/fragments.json';
import f27 from '$lib/images/is/sarkaz/rogue_4_fragment_F_27.webp';
import f28 from '$lib/images/is/sarkaz/rogue_4_fragment_F_28.webp';

const ALWAYS_KILLED_KEYS = [
	'enemy_2073_skzrck',
	'enemy_2094_skzamb',
	'enemy_2094_skzamb_2',
	'enemy_2096_skzamj',
	'enemy_1106_byokai_b'
];

const getFragmentName = (id, language: Language) => {
	const fragment = fragments.find((ele) => ele.id === id);
	return fragment[`name_${language}`] || fragment['name_zh'];
};

export const getOptions = (rogueTopic: RogueTopic, language: Language) => {
	switch (rogueTopic) {
		case 'rogue_sami':
			return [
				{ key: 'totem1', src: '/images/enemy_icons/enemy_1106_byokai.webp', name: '' },
				{ key: 'bossrelic', src: '/images/relics/relic_routeweave_net.webp', name: '' }
			];
		case 'rogue_skz':
			return [
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
				{ key: 'shadow', src: '/images/enemy_icons/enemy_2093_skzams.webp', name: '' }
			];
		default:
			return;
	}
};

export const handleOptionsUpdate = (hiddenGroups, key, rogueTopic: RogueTopic) => {
	const fragmentKeys = ['hidden_door', 'hidden_window', 'box_1', 'box_3'];
	switch (rogueTopic) {
		case 'rogue_sami':
			if (hiddenGroups.includes(key)) {
				hiddenGroups = hiddenGroups.filter((ele) => ele !== key);
			} else {
				hiddenGroups.push(key);
			}
			break;
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
			break;
	}
	return hiddenGroups;
};

export const getEnemyCountPermutations = (mapConfig, hiddenGroups, eliteMode) => {
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
					!ALWAYS_KILLED_KEYS.includes(action['key'])
				) {
					acc += action['count'];
				}
			});
		});
		return acc;
	}, 0);
	const list = permutations.map(({ count, permutation }) => {
		return { count: count + countToAdd, permutation };
	});
	return list.reduce((acc, { count, permutation }) => {
		acc.push({ count: count, permutation });
		if (bonus) {
			acc.push({ count: count + 1, permutation, bonus: true });
		}
		return acc;
	}, []).sort((a,b) => a.count - b.count);
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

export const generateWaveTimeline = (mapConfig, hiddenGroups, eliteMode, permutation, levelId) => {
	console.log(permutation);
	if (!permutation) return;

	let totalCount = 0;
	const modeKey = eliteMode ? mapConfig['ELITE'].groupKey : mapConfig['NORMAL'].groupKey;
	if (modeKey) {
		hiddenGroups = [...hiddenGroups, modeKey];
	}
	const waveTimelines = [];
	const { waves, bonus } = mapConfig;
	waves.forEach((wave, waveIdx) => {
		if (bonus?.type === 'wave' && waveIdx === bonus.wave_index) return;

		let prevPhaseTime = 0;
		let spawns = {};
		let waveBlockingSpawns = {};
		wave['fragments'].forEach((fragment, fragIndex) => {
			if (
				bonus?.type === 'fragment' &&
				waveIdx === bonus.wave_index &&
				fragIndex === bonus.frag_index
			) {
				return;
			}

			prevPhaseTime += fragment['preDelay'];

			const groups = [];
			for (const action of fragment['actions']) {
				const { actionType, randomSpawnGroupKey, randomSpawnGroupPackKey, hiddenGroup } = action;
				if (actionType !== 'SPAWN') {
					if (!(levelId == 'level_rogue4_4-10' && action['key'] == 'trap_760_skztzs#0')) {
						continue;
					}
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
			const key = `w${waveIdx}f${fragIndex}`;
			let groupActions = [];
			for (const [groupKey, list] of Object.entries(packedGroups)) {
				const choice = permutation.permutation?.[key]?.[groupKey];
				if (list?.[choice]) {
					groupActions = groupActions.concat(list[choice]);
				}
			}
			for (const action of groupActions) {
				handleAction(action, spawns, waveBlockingSpawns, prevPhaseTime);
				if (
					!(
						action['key'].includes('trap') ||
						action['key'] === '' ||
						ALWAYS_KILLED_KEYS.includes(action['key'])
					)
				) {
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
				handleAction(action, spawns, waveBlockingSpawns, prevPhaseTime);
				if (
					!(
						action['key'].includes('trap') ||
						action['key'] === '' ||
						ALWAYS_KILLED_KEYS.includes(action['key'])
					)
				) {
					totalCount += action['count'];
				}
			}
			prevPhaseTime =
				Object.keys(waveBlockingSpawns).length > 0
					? Math.max(...Object.keys(waveBlockingSpawns).map(Number))
					: 0;
		});
		const myKeys = Object.keys(spawns).map(Number);
		myKeys.sort((a, b) => a - b);
		const spawnList = myKeys.map((key) => ({ t: key, actions: spawns[key] }));

		waveTimelines.push({
			preDelay: wave['preDelay'],
			postDelay: wave['postDelay'],
			maxTimeWaitingForNextWave: wave['maxTimeWaitingForNextWave'],
			timeline: spawnList
		});
	});
	console.log(totalCount);
	console.log(waveTimelines);
	return { waves: waveTimelines, count: totalCount };
};

const handleAction = (action, spawns, waveBlockingSpawns, prevPhaseTime) => {
	if (action['count'] > 1) {
		// interval
		for (let i = 0; i < action['count']; i++) {
			const spawnTime = prevPhaseTime + action['preDelay'] + i * action['interval'];
			if (!spawns?.[spawnTime]) {
				spawns[spawnTime] = [];
			}
			spawns[spawnTime].push({
				key: action['key'],
				enemy: [action['key']],
				//  "count": `${count+1}/${action['count']}`,
				//  "interval": action['interval'],
				routeIndex: action['routeIndex'],
				hiddenGroup: action['hiddenGroup'],
				randomSpawnGroupKey: action['randomSpawnGroupKey'],
				randomSpawnGroupPackKey: action['randomSpawnGroupPackKey'],
				weight: action['weight']
			});

			if (!action['dontBlockWave']) {
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
			key: action['key'],
			enemy: [action['key']],
			//  "count": 1,
			routeIndex: action['routeIndex'],
			hiddenGroup: action['hiddenGroup'],
			randomSpawnGroupKey: action['randomSpawnGroupKey'],
			randomSpawnGroupPackKey: action['randomSpawnGroupPackKey'],
			weight: action['weight']
		});

		if (!action['dontBlockWave']) {
			if (!waveBlockingSpawns[spawnTime]) {
				waveBlockingSpawns[spawnTime] = [];
				waveBlockingSpawns[spawnTime].push({ key: action['key'] });
			}
		}
	}
};
