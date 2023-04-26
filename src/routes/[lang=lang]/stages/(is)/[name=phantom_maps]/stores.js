import { writable, derived } from 'svelte/store';
import updateMods from '$lib/functions/compileMods';
import { browser } from '$app/environment';
import { cookiesEnabled } from '../../../../stores';

let storedDifficulty = 0;
if (browser && cookiesEnabled) {
	storedDifficulty = parseInt(localStorage.getItem('difficulty') ?? '0');
}
export const selectedRelics = writable([]);
export const eliteMods = writable(null);
export const activeFloorEffects = writable([]);

const compiledMods = derived(
	[selectedRelics, eliteMods, activeFloorEffects],
	([$selectedRelics, $eliteMods, $activeFloorEffects]) =>
		updateMods(
			$selectedRelics.map((relic) => relic.effects),
			[$eliteMods],
			$activeFloorEffects.map((ele) => ele.effects)
		)
);

export const statMods = derived(compiledMods, ($compiledMods) => $compiledMods.statMods);
export const specialMods = derived(compiledMods, ($compiledMods) => $compiledMods.specialMods);
