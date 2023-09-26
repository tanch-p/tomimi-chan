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
	{
		key: 'status_ailment',
		options: [
			{ value: 'stun', selected: false },
			{ value: 'sluggish', selected: false },
			{ value: 'sleep', selected: false },
			{ value: 'silence', selected: false },
			{ value: 'levitate', selected: false },
			{ value: 'cold', selected: false },
			{ value: 'root', selected: false }
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
					ele.skills.some((skill) => skill.bb.find((item) => selectedOptions.includes(item.key)));
				break;
			default:
				acc[curr.key] = (ele) => selectedOptions.includes(ele[curr.key]);
		}

		return acc;
	}, {})
);

// const compiledMods = derived([activeChaosEffects], ([$activeChaosEffects]) =>
// 	updateMods($activeChaosEffects.map((ele) => ele.effects))
// );
