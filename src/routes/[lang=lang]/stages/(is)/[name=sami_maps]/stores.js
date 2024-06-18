import { writable, derived } from 'svelte/store';
import updateMods, { compileDifficultyMods } from '$lib/functions/compileMods';
import difficultyModsList from '$lib/data/difficulty_mods_sami.json';
import { browser } from '$app/environment';
import { cookiesEnabled } from '../../../../stores';

let storedDifficulty = 0;
if (browser && cookiesEnabled) {
	storedDifficulty = parseInt(localStorage.getItem('sami_difficulty') ?? '0');
}
export const selectedRelics = writable([]);
export const difficulty = writable(storedDifficulty);

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
export const activeChaosEffects = writable([]);
export const portalMods = writable(null);
const difficultyMods = derived([difficulty], ([$difficulty]) =>
	compileDifficultyMods(difficultyModsList, $difficulty, 'add')
);

const compiledMods = derived(
	[selectedRelics, floorDifficultyMods, eliteMods, activeChaosEffects, portalMods, difficultyMods],
	([
		$selectedRelics,
		$floorDifficultyMods,
		$eliteMods,
		$activeChaosEffects,
		$portalMods,
		$difficultyMods
	]) =>
		updateMods(
			$selectedRelics.map((relic) => relic.effects),
			[$floorDifficultyMods],
			[$eliteMods],
			$activeChaosEffects.map((ele) => ele.effects),
			[$portalMods],
			[$difficultyMods]
		)
);

export const statMods = derived(compiledMods, ($compiledMods) => $compiledMods.statMods);
export const specialMods = derived(compiledMods, ($compiledMods) => $compiledMods.specialMods);
