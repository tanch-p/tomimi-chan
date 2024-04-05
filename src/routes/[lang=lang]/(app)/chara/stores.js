import { writable, derived } from 'svelte/store';

export const filterOptions = writable([
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
	// {
	// 	key: 'nationId',
	// 	options: [
	// 		{ value: 'rhodes', selected: false },
	// 		{ value: 'kazimierz', selected: false },
	// 		{ value: 'columbia', selected: false },
	// 		{ value: null, selected: false },
	// 		{ value: 'laterano', selected: false },
	// 		{ value: 'victoria', selected: false },
	// 		{ value: 'sami', selected: false },
	// 		{ value: 'bolivar', selected: false },
	// 		{ value: 'iberia', selected: false },
	// 		{ value: 'siracusa', selected: false },
	// 		{ value: 'higashi', selected: false },
	// 		{ value: 'sargon', selected: false },
	// 		{ value: 'kjerag', selected: false },
	// 		{ value: 'minos', selected: false },
	// 		{ value: 'yan', selected: false },
	// 		{ value: 'lungmen', selected: false },
	// 		{ value: 'ursus', selected: false },
	// 		{ value: 'egir', selected: false },
	// 		{ value: 'leithanien', selected: false },
	// 		{ value: 'rim', selected: false }
	// 	]
	// },
	// {
	// 	key: 'groupId',
	// 	options: [
	// 		{ value: null, selected: false },
	// 		{ value: 'pinus', selected: false },
	// 		{ value: 'blacksteel', selected: false },
	// 		{ value: 'karlan', selected: false },
	// 		{ value: 'sweep', selected: false },
	// 		{ value: 'rhine', selected: false },
	// 		{ value: 'penguin', selected: false },
	// 		{ value: 'lgd', selected: false },
	// 		{ value: 'glasgow', selected: false },
	// 		{ value: 'abyssal', selected: false },
	// 		{ value: 'dublinn', selected: false },
	// 		{ value: 'siesta', selected: false },
	// 		{ value: 'babel', selected: false },
	// 		{ value: 'elite', selected: false },
	// 		{ value: 'sui', selected: false }
	// 	]
	// },
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
]);

//condition for true/false
export const filters = derived([filterOptions], ([$filterOptions]) =>
	$filterOptions.reduce((acc, curr) => {
		const selectedOptions = curr.options
			.map((option) => option.selected && option.value)
			.filter(Boolean);
		if (selectedOptions.length === 0) {
			acc[curr.key] = (ele) => true;
			return acc;
		}
		switch (curr.key) {
			case 'status_ailment':
				acc[curr.key] = (ele) =>
					ele.skills.some((skill) =>
						skill.blackboard.find((item) => selectedOptions.includes(item.key))
					) ||
					ele.talents.some((talent) =>
						talent.blackboard.find((item) => selectedOptions.includes(item.key))
					);
				break;
			default:
				acc[curr.key] = (ele) => selectedOptions.includes(ele[curr.key]);
		}

		return acc;
	}, {})
);

export const sortOptions = writable([{ key: 'rarity', order: -1, visible: true, priority: 1 }]);
filterOptions.subscribe((list) => {
	const activeAilmentFilters = list.reduce((acc, curr) => {
		if (['status_ailment'].includes(curr.key)) {
			acc = [...acc, ...curr.options.filter((ele) => ele.selected).map((ele) => ele.value)];
		}
		return acc;
	}, []);
});

//TODO
// sorting, grouping, AA, condition
// SKILLS - if multiple selected, should be able to sort by individual skills
