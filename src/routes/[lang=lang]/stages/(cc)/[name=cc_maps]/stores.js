import { writable, derived } from 'svelte/store';
import updateMods from '$lib/functions/compileMods';

export const selectedContracts = writable([]);

const compiledMods = derived([selectedContracts], ([$selectedContracts]) =>
	updateMods($selectedContracts.map((item) => item.effects))
);

export const statMods = derived(compiledMods, ($compiledMods) => $compiledMods.statMods);
export const specialMods = derived(compiledMods, ($compiledMods) => $compiledMods.specialMods);
