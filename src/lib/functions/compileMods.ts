/* eslint-disable no-prototype-builtins */
import type { StatMods, Effects } from '$lib/types';

//values without fixed = multipliers
export default function updateMods(...modsList: [[Effects]]) {
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
	const specialMods = {};

	for (const effectsList of modsList) {
		for (const effects of effectsList)
			if (effects !== null && effects.length > 0) {
				compileMods(statMods, specialMods, effects);
			}
	}
	return { statMods, specialMods };
}

const compileMods = (statMods: StatMods, specialMods, effects: Effects) => {
	effects.forEach((effect) => {
		for (const target of effect.targets) {
			if (!statMods[target]) {
				statMods[target] = {
					hp: 1,
					atk: 1,
					def: 1,
					res: 1,
					aspd: 1,
					ms: 1,
					range: 1,
					weight: 1
				};
			}
			for (const key in effect.mods) {
				if (key === 'special') {
					if (!specialMods[target]) {
						specialMods[target] = {};
					}
					for (const key of Object.keys(effect.mods.special)) {
						specialMods[target][key] = effect.mods.special[key];
					}
				} else {
					if (!statMods[target].hasOwnProperty(key)) {
						statMods[target][key] = effect.mods[key];
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

export const compileMods2 = () => {
	
}