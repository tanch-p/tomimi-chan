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
	console.log(statMods)
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
					} else if (key.includes('fixed') || key === 'dmg_reduction') {
						statMods[target][key] += effect.mods[key];
					} else {
						statMods[target][key] *= effect.mods[key];
					}
				}
			}
		}
	});
};

//to prepare {effects:[{...}]} for updateMods
export const compileDifficultyMods = (list, difficulty, operation = 'times') => {
	const returnArr = [];
	const modList = list
		.map((ele) => {
			if (ele.difficulty <= difficulty && ele.effects.length > 0) {
				return ele.effects;
			}
		})
		.filter(Boolean);
	modList.forEach((effects) => {
		for (const effect of effects) {
			const key = effect.targets.join('|');
			const holder = returnArr.find((ele) => ele.key === key);
			if (!holder) {
				returnArr.push({
					key,
					targets: effect.targets,
					mods: { ...effect.mods }
				});
			} else {
				for (const statKey in effect.mods) {
					if (!holder.mods[statKey]) {
						holder.mods[statKey] = effect.mods[statKey];
					} else if (statKey.includes('fixed')) {
						holder.mods[statKey] += effect.mods[statKey];
					} else {
						switch (operation) {
							case 'add':
								if (key === 'dmg_reduction') {
									holder.mods[statKey] += effect.mods[statKey];
								} else {
									holder.mods[statKey] += effect.mods[statKey] - 1;
								}
								break;
							case 'times':
								holder.mods[statKey] *= effect.mods[statKey];
								break;
							default:
								break;
						}
					}
				}
			}
		}
	});
	return returnArr;
};
