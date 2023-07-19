import { writable, derived } from 'svelte/store';
import updateMods from '$lib/functions/compileMods';
import difficultyModsList from '$lib/data/difficulty_mods_sami.json';
import { browser } from '$app/environment';
import { cookiesEnabled } from '../../../../stores';

let storedDifficulty = 0;
if (browser && cookiesEnabled) {
	storedDifficulty = parseInt(localStorage.getItem('sami_difficulty') ?? '0');
}
export const selectedRelics = writable([]);
export const difficulty = writable(storedDifficulty);
export const difficultyMods = derived(difficulty, ($difficulty) =>
	difficultyModsList
		.map((ele) => {
			if (ele.difficulty <= $difficulty && ele.effects.length > 0) {
				return ele.effects;
			}
		})
		.filter(Boolean)
);
export const selectedFloor = writable(1);
const floorDifficultyMods = derived(
	[selectedFloor, difficulty],
	([$selectedFloor, $difficulty]) => [
		{
			targets: ['ALL'],
			mods: {
				hp: (1 + difficultyModsList[$difficulty].floorBuff) ** $selectedFloor,
				atk: (1 + difficultyModsList[$difficulty].floorBuff) ** $selectedFloor
			}
		}
	]
);

export const eliteMods = writable(null);
export const activeFloorEffects = writable([]);

const compiledMods = derived(
	[selectedRelics, floorDifficultyMods, eliteMods, activeFloorEffects],
	([$selectedRelics, $floorDifficultyMods, $eliteMods, $activeFloorEffects]) =>
		updateMods(
			$selectedRelics.map((relic) => relic.effects),
			[$floorDifficultyMods],
			[$eliteMods],
			$activeFloorEffects.map((ele) => ele.effects)
		)
);

export const statMods = derived(compiledMods, ($compiledMods) => $compiledMods.statMods);
export const specialMods = derived(compiledMods, ($compiledMods) => $compiledMods.specialMods);
