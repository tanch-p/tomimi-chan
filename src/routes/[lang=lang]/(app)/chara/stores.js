import { writable, derived } from 'svelte/store';
import filterOptions from '$lib/data/chara/filter_options.json';

const maxTrust = writable(true);
const maxPotential = writable(true);

const generateFilterStore = (filterOptions) => {
	return Object.keys(filterOptions).reduce((acc, key) => {
		switch (key) {
			case 'subProfessionId':
				acc.push({
					key,
					options: Object.keys(filterOptions[key])
						.reduce((acc, subKey) => {
							acc.push(
								filterOptions[key][subKey].map((value) => {
									return { value, selected: false };
								})
							);
							return acc;
						}, [])
						.flat(2)
				});
				break;
			default:
				acc.push({
					key,
					options: filterOptions[key].map((value) => {
						return { value, selected: false };
					})
				});
				break;
		}
		return acc;
	}, []);
};

//filters to add: enemy type bonuses,

export const filtersStore = writable(generateFilterStore(filterOptions));

//condition for true/false
export const filters = derived(filtersStore, ($filtersStore) => {
	const filterFunctions = $filtersStore.reduce((acc, curr) => {
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
			case 'status_ailment':
				acc.push(
					(char) =>
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
							)
				);
				break;
			default:
				acc.push((char) => selectedOptions.includes(char[curr.key]));
		}
		return acc;
	}, []);
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
});
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
