import { writable, derived } from 'svelte/store';
import updateStatMods from '$lib/functions/compileMultipliers';
import { browser } from '$app/environment';
import { cookiesEnabled } from '../../../../stores.js';

let storedDifficulty = 0;
if (browser && cookiesEnabled) {
	storedDifficulty = parseInt(localStorage.getItem('difficulty') ?? '0');
}
export const selectedRelics = writable([]);
export const difficulty = writable(storedDifficulty);
export const selectedFloor = writable(1);
export const eliteMods = writable(null);
export const activeFloorEffects = writable([]);

export const statMods = derived(
	[selectedRelics, difficulty, selectedFloor, eliteMods, activeFloorEffects],
	([$selectedRelics, $difficulty, $selectedFloor, $eliteMods, $activeFloorEffects]) =>
		updateStatMods($selectedRelics, $difficulty, $selectedFloor, $eliteMods, $activeFloorEffects)
);
