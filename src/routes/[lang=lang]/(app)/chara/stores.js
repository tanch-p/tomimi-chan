import { writable, derived } from 'svelte/store';
import charaConst from '$lib/data/chara/chara_const.json';
let filtersList = [
	{
		key: 'rarity',
		options: [
			{ value: 'TIER_1', selected: false },
			{ value: 'TIER_2', selected: false },
			{ value: 'TIER_3', selected: false },
			{ value: 'TIER_4', selected: false },
			{ value: 'TIER_5', selected: false },
			{ value: 'TIER_6', selected: false }
		]
	},
	{
		key: 'profession',
		options: [
			{ value: 'PIONEER', selected: false },
			{ value: 'WARRIOR', selected: false },
			{ value: 'SNIPER', selected: false },
			{ value: 'TANK', selected: false },
			{ value: 'MEDIC', selected: false },
			{ value: 'SUPPORT', selected: false },
			{ value: 'CASTER', selected: false },
			{ value: 'SPECIAL', selected: false }
		]
	},
	{
		key: 'subProfessionId',
		options: Object.keys(charaConst.subProfessionId).reduce((acc, curr) => {
			acc = [
				...acc,
				...charaConst.subProfessionId[curr].map((ele) => {
					return { value: ele, selected: false };
				})
			];
			return acc;
		}, [])
	},
	{
		key: 'nationId',
		options: [
			{ value: 'rhodes', selected: false },
			{ value: 'kazimierz', selected: false },
			{ value: 'columbia', selected: false },
			{ value: null, selected: false },
			{ value: 'laterano', selected: false },
			{ value: 'victoria', selected: false },
			{ value: 'sami', selected: false },
			{ value: 'bolivar', selected: false },
			{ value: 'iberia', selected: false },
			{ value: 'siracusa', selected: false },
			{ value: 'higashi', selected: false },
			{ value: 'sargon', selected: false },
			{ value: 'kjerag', selected: false },
			{ value: 'minos', selected: false },
			{ value: 'yan', selected: false },
			{ value: 'lungmen', selected: false },
			{ value: 'ursus', selected: false },
			{ value: 'egir', selected: false },
			{ value: 'leithanien', selected: false },
			{ value: 'rim', selected: false }
		]
	},
	{
		key: 'groupId',
		options: [
			{ value: null, selected: false },
			{ value: 'pinus', selected: false },
			{ value: 'blacksteel', selected: false },
			{ value: 'karlan', selected: false },
			{ value: 'sweep', selected: false },
			{ value: 'rhine', selected: false },
			{ value: 'penguin', selected: false },
			{ value: 'lgd', selected: false },
			{ value: 'glasgow', selected: false },
			{ value: 'abyssal', selected: false },
			{ value: 'dublinn', selected: false },
			{ value: 'siesta', selected: false },
			{ value: 'babel', selected: false },
			{ value: 'elite', selected: false },
			{ value: 'sui', selected: false }
		]
	},
	{
		key: 'status_ailment',
		options: [
			{ value: 'stun', selected: false },
			{ value: 'sluggish', selected: false },
			{ value: 'sleep', selected: false },
			{ value: 'silence', selected: false },
			{ value: 'cold', selected: false },
			{ value: 'levitate', selected: false },
			{ value: 'root', selected: false },
			{ value: 'tremble', selected: false }
		]
	}
];
//filters to add: enemy type bonuses,

export const filterOptions = writable(filtersList);

//condition for true/false
export const filters = derived(filterOptions, ($filterOptions) => {
	const filterFunctions = $filterOptions.reduce((acc, curr) => {
		const selectedOptions = curr.options
			.map((option) => option.selected && option.value)
			.filter((ele) => ele !== false); //changed from Boolean because of nationId/groupId null values
		if (selectedOptions.length === 0) {
			return acc;
		}
		switch (curr.key) {
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
				acc.push((ele) => selectedOptions.includes(ele[curr.key]));
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
	filtersList.reduce(
		(acc, curr) => {
			if (['status_ailment'].includes(curr.key)) {
				acc = [
					...acc,
					...curr.options.map((ele) => {
						return { key: ele.value, order: 0, visible: false, priority: null };
					})
				];
			}
			return acc;
		},
		[defaultSortOption]
	);
export const sortOptions = writable(generateSortOptions());
filterOptions.subscribe((list) => {
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
