import { writable } from 'svelte/store';
import { derived } from 'svelte/store';
import updateStatMods from '$lib/functions/compileMultipliers';

export const relics = writable([]);
export const difficulty = writable(0);
export const floor = writable(1);

export const statMods = derived([relics, difficulty, floor], ([$relics, $difficulty, $floor]) =>
	updateStatMods($relics, $difficulty, $floor)
);
