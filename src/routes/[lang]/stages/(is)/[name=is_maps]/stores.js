import { writable, derived } from 'svelte/store';
import updateStatMods from '$lib/functions/compileMultipliers';
import { browser } from '$app/environment';

export let cookiesEnabled = true;
if (browser) {
	try {
		localStorage.getItem('language');
	} catch {
		cookiesEnabled = false;
	}
}

let storedDifficulty = 0;
if (browser && cookiesEnabled) {
	storedDifficulty = parseInt(localStorage.getItem('difficulty') ?? '0');
}
export const relics = writable([]);
export const difficulty = writable(storedDifficulty);
export const floor = writable(1);
export const hardMods = writable(null);
export const floorEffects = writable([]);

export const statMods = derived(
	[relics, difficulty, floor, hardMods],
	([$relics, $difficulty, $floor, $hardMods]) =>
		updateStatMods($relics, $difficulty, $floor, $hardMods)
);
