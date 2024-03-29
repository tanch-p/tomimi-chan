import { writable, derived } from 'svelte/store';
import updateMods from '$lib/functions/compileMods';
import difficultyModsList from '$lib/data/difficulty_mods_mizuki.json';
import { browser } from '$app/environment';
import { cookiesEnabled } from '../../../../stores';

let storedDifficulty = 0;
if (browser && cookiesEnabled) {
	storedDifficulty = parseInt(localStorage.getItem('difficulty') ?? '0');
}
export const selectedRelics = writable([]);
export const difficulty = writable(storedDifficulty);
const difficultyMods = derived(difficulty, ($difficulty) =>
	difficultyModsList.filter((ele) => ele.difficulty <= $difficulty)
);
export const selectedFloor = writable(1);
const floorDifficultyMods = derived(
	[selectedFloor, difficulty],
	([$selectedFloor, $difficulty]) => [
		{
			targets: ['ALL'],
			mods: {
				hp: (1 + 0.01 * $difficulty) ** $selectedFloor,
				atk: (1 + 0.01 * $difficulty) ** $selectedFloor
			}
		}
	]
);

export const eliteMods = writable(null);
export const activeFloorEffects = writable([]);
export const missionMods = writable(null);

const compiledMods = derived(
	[selectedRelics, difficultyMods, floorDifficultyMods, eliteMods, missionMods, activeFloorEffects],
	([
		$selectedRelics,
		$difficultyMods,
		$floorDifficultyMods,
		$eliteMods,
		$missionMods,
		$activeFloorEffects
	]) =>
		updateMods(
			$selectedRelics.map((relic) => relic.effects),
			$difficultyMods.map((ele) => ele.effects),
			[$floorDifficultyMods],
			[$eliteMods],
			[$missionMods],
			$activeFloorEffects.map((ele) => ele.effects)
		)
);

export const statMods = derived(compiledMods, ($compiledMods) => $compiledMods.statMods);
export const specialMods = derived(compiledMods, ($compiledMods) => $compiledMods.specialMods);
