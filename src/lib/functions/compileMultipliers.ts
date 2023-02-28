const DIFFICULTY_MODS = [
	{
		difficulty: 1,
		effects: []
	},
	{
		difficulty: 3,
		effects: [
			{
				targets: ['ALL'],
				mods: {
					fixed_res: 10
				}
			}
		]
	},
	{
		difficulty: 5,
		effects: [
			{
				targets: ['BOSS'],
				mods: {
					atk: 1.15,
					def: 1.15
				}
			}
		]
	},
	{
		difficulty: 7,
		effects: [
			{
				targets: ['ALL'],
				mods: {
					ms: 1.15
				}
			}
		]
	},
	{
		difficulty: 8,
		effects: []
	},
	{
		difficulty: 9,
		effects: [
			{
				targets: ['ALL'],
				mods: {
					aspd: 1.15
				}
			}
		]
	},
	{
		difficulty: 11,
		effects: [
			{
				targets: ['ELITE', 'BOSS'],
				mods: {
					hp: 1.2
				}
			}
		]
	},
	{
		difficulty: 12,
		effects: [
			{
				targets: ['ALL'],
				mods: {
					fixed_res: 10
				}
			}
		]
	},
	{
		difficulty: 13,
		effects: []
	},
	{
		difficulty: 15,
		effects: [
			{
				targets: ['ELITE', 'BOSS'],
				mods: {
					hp: 1.2,
					atk: 1.2,
					def: 1.2
				}
			}
		]
	}
];

import type { StatMods } from '../../routes/[lang]/stages/(is)/[name=is_maps]/types';

export default function updateStatMods(relics, difficulty: number, floor: number, hardMods) {
	const statMods: StatMods = {
		ALL: {
			hp: 1,
			atk: 1,
			def: 1,
			res: 1,
			aspd: 1,
			ms: 1,
			range: 1,
			weight: 1,
			lifepoint: 1
		}
	};
	const floorMultiplier = (1 + 0.01 * difficulty) ** floor;
	statMods.ALL.hp *= floorMultiplier;
	statMods.ALL.atk *= floorMultiplier;

	for (const relic of relics) {
		compileStatMods(statMods, relic.effects);
	}
	for (const mod of DIFFICULTY_MODS) {
		if (difficulty >= mod.difficulty) {
			compileStatMods(statMods, mod.effects);
		}
	}
	if (hardMods) {
		compileStatMods(statMods, hardMods);
	}
	return statMods;
}

const compileStatMods = (statMods: StatMods, effects) => {
	effects.forEach((effect) => {
		for (const target of effect.targets) {
			if (!statMods[target]) {
				statMods[target] = {
					hp: 1,
					atk: 1,
					def: 1,
					res: 0,
					aspd: 1,
					ms: 1,
					range: 1,
					weight: 0
				};
			}
			for (const key in effect.mods) {
				if (key !== 'special') {
					if (!statMods[target].hasOwnProperty(key)) {
						statMods[target][key] = effect.mods[key];
					} else if (key === 'res' || key === 'weight') {
						statMods[target][key] += effect.mods[key];
					} else if (key.includes('fixed')) {
						statMods[target][key] += effect.mods[key];
					} else {
						statMods[target][key] *= effect.mods[key];
					}
				}
			}
		}
	});
};
