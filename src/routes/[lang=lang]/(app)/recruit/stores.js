import { writable, derived } from 'svelte/store';
import filterOptions from '$lib/data/chara/filter_options.json';
import relics from '$lib/data/chara/relics_chara.json';
import { addOptionsToAcc } from '$lib/functions/charaHelpers';
import { browser } from '$app/environment';
import { cookiesEnabled } from '../../../stores';

let releaseStatus = 'cn';
if (browser && cookiesEnabled) {
	releaseStatus = localStorage.getItem('releaseStatus') || 'cn';
}
export const releaseStatusStore = writable(releaseStatus);

export const globalCheck = derived(releaseStatusStore, ($releaseStatusStore) => (char) => {
	if ($releaseStatusStore === 'cn') {
		return true;
	} else {
		return Boolean(char.name_en);
	}
});

const generateFilterStore = (filterOptions) => {
	return Object.keys(filterOptions).reduce((acc, category) => {
		switch (category) {
			case 'rarity':
			case 'damage_type':
			case 'blockCnt':
			case 'profession':
			case 'group':
				acc.push({
					key: category,
					options: filterOptions[category].map((value) => {
						return { value, selected: false };
					})
				});
				break;
			case 'subProfessionId':
				acc.push({
					key: category,
					options: Object.keys(filterOptions[category])
						.reduce((acc, subKey) => {
							acc.push(
								filterOptions[category][subKey].map((value) => {
									return { value, selected: false };
								})
							);
							return acc;
						}, [])
						.flat(2)
				});
				break;
			case 'deployable_tile':
				acc.push({
					key: category,
					options: filterOptions[category].map(({ value }) => {
						return { value, selected: false };
					})
				});
				break;
			default:
				addOptionsToAcc(acc, filterOptions[category]);
				break;
		}
		return acc;
	}, []);
};

//filters to add: enemy type bonuses,
const defaultRogueTopic = 'rogue_3';
export const filtersStore = writable(generateFilterStore(filterOptions));
export const rogueTopic = writable(defaultRogueTopic);
export const relicFiltersStore = writable(
	relics[defaultRogueTopic].map((relic) => {
		return { id: relic.id, selected: false };
	})
);
rogueTopic.subscribe((topic) =>
	relicFiltersStore.set(
		relics[topic].map((relic) => {
			return { id: relic.id, selected: false };
		})
	)
);

//condition for true/false
export const filters = derived(
	[filtersStore, relicFiltersStore, rogueTopic],
	([$filtersStore, $relicFiltersStore, $rogueTopic]) => {
		const relicFilterFunctions = $relicFiltersStore
			.filter((option) => option.selected)
			.map((option) => {
				const relic = relics[$rogueTopic].find((relic) => relic.id === option.id);
				if (!relic) {
					console.log(option.id, 'not found');
				}
				switch (true) {
					case Boolean(relic.tag):
						return (char) =>
							char.skills.some((skill) => skill.tags.includes(relic.tag)) ||
							char.talents.some((talent) => talent.tags.includes(relic.tag)) ||
							char.uniequip
								.filter((equip) => equip.combatData)
								.some((equip) => equip.combatData.tags.includes(relic.tag));
					case Boolean(relic.subProfessionId):
						return (char) => relic.subProfessionId.includes(char.subProfessionId);
					default:
						return () => true;
				}
			});
		const filterFunctions = relicFilterFunctions.concat(
			$filtersStore.reduce((acc, curr) => {
				const selectedOptions = curr.options
					.map((option) => option.selected && option.value)
					.filter((ele) => ele !== false); //changed from Boolean because of nationId/groupId null values
				if (selectedOptions.length === 0) {
					return acc;
				}
				switch (curr.key) {
					case 'group':
						acc.push((char) => {
							if (selectedOptions.includes(null)) {
								const options = selectedOptions.filter(Boolean);
								return (
									options.includes(char.nationId) ||
									options.includes(char.groupId) ||
									options.includes(char.teamId) ||
									[char.nationId, char.groupId, char.teamId].every((ele) => ele === null)
								);
							}
							return (
								selectedOptions.includes(char.nationId) ||
								selectedOptions.includes(char.groupId) ||
								selectedOptions.includes(char.teamId)
							);
						});
						break;
					case 'deployable_tile':
						acc.push((char) =>
							selectedOptions.some(
								(val) =>
									char.position === val ||
									char.tags.includes('position_all') ||
									char.uniequip
										.filter((equip) => equip.combatData)
										.some((equip) => equip.combatData.tags.includes('position_all'))
							)
						);
						break;
					case 'blockCnt':
						acc.push((char) => {
							const block4Check = selectedOptions.includes(4);
							const block0Check = selectedOptions.includes(0);
							return (
								selectedOptions.includes(char.stats.blockCnt) ||
								(block4Check &&
									(char.uniequip
										.filter((equip) => equip.combatData)
										.some((equip) => equip.combatData.tags.includes('block_4')) ||
										char.tokens?.some((token) => token.tags.includes('block_4')))) ||
								(block0Check && char.tags.includes('block_0'))
							);
						});
						break;
					case 'damage_scale':
						acc.push(
							(char) =>
								char.skills.some((skill) =>
									skill.blackboard.find((item) => item.key === 'damage_scale')
								) ||
								char.talents.some((talent) =>
									talent.blackboard.find((item) => item.key === 'damage_scale')
								) ||
								char.uniequip
									.filter((equip) => equip.combatData)
									.some((equip) =>
										equip.combatData.blackboard.find((item) => item.key === 'damage_scale')
									)
						);
						break;
					case 'blackboard':
						acc.push(
							(char) =>
								char.blackboard.find((item) => selectedOptions.includes(item.key)) ||
								char.skills.some((skill) =>
									skill.blackboard.find((item) => selectedOptions.includes(item.key))
								) ||
								char.talents.some((talent) =>
									talent.blackboard.find((item) => selectedOptions.includes(item.key))
								) ||
								char.uniequip
									.filter((equip) => equip.combatData)
									.some((equip) =>
										equip.combatData.blackboard.find((item) => selectedOptions.includes(item.key))
									) ||
								char.tokens?.some((token) =>
									token.blackboard.find((item) => selectedOptions.includes(item.key))
								)
						);
						break;
					case 'tags':
						acc.push(
							(char) =>
								selectedOptions.some((tag) => char.tags.includes(tag)) ||
								char.skills.some((skill) =>
									selectedOptions.some((tag) => skill.tags.includes(tag))
								) ||
								char.talents.some((talent) =>
									selectedOptions.some((tag) => talent.tags.includes(tag))
								) ||
								char.uniequip
									.filter((equip) => equip.combatData)
									.some((equip) =>
										selectedOptions.some((tag) => equip.combatData.tags.includes(tag))
									) ||
								char.tokens.some((token) => selectedOptions.some((tag) => token.tags.includes(tag)))
						);
						break;
					default:
						acc.push((char) => selectedOptions.includes(char[curr.key]));
				}
				return acc;
			}, [])
		);
		return function (char) {
			if (filterFunctions.length === 0) {
				return true;
			}
			for (const f of filterFunctions) {
				const passFilter = f(char);
				if (!passFilter) {
					return false;
				}
			}
			return true;
		};
	}
);
const defaultSortOption = { key: 'rarity', order: -1, visible: true, priority: 1 };
export const generateSortOptions = () =>
	Object.keys(filterOptions).reduce(
		(acc, key) => {
			if (['status_ailment'].includes(key)) {
				acc = [
					...acc,
					...filterOptions[key].map((value) => {
						return { key: value, order: 0, visible: false, priority: null };
					})
				];
			}
			return acc;
		},
		[defaultSortOption]
	);
export const sortOptions = writable(generateSortOptions());
filtersStore.subscribe((list) => {
	const activeSortableFilters = list.reduce((acc, curr) => {
		if (['status_ailment'].includes(curr.key)) {
			acc = [...acc, ...curr.options.filter((ele) => ele.selected).map((ele) => ele.value)];
		}
		return acc;
	}, []);
	//for each sortOption except rarity, check if key is in activeSortableFilters, if in: set visible = true, else set visible = false
	sortOptions.update((list) =>
		list.map((option) => {
			const { key } = option;
			//case for Clear All button
			if (key === 'rarity' && activeSortableFilters.length === 0) {
				option.order = -1;
				return option;
			}
			if (key !== 'rarity') {
				if (!activeSortableFilters.includes(key)) {
					option.order = 0;
				}
				option.visible = activeSortableFilters.includes(key);
			}
			return option;
		})
	);
});

//TODO
// sorting, grouping, AA, condition
// SKILLS - if multiple selected, should be able to sort by individual skills

export const selectedChara = writable(null);
export const moduleIndex = writable(0);
