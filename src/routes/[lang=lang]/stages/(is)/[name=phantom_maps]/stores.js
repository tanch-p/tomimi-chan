import { writable, derived } from 'svelte/store';
import updateMods from '$lib/functions/compileMods';

export const selectedRelics = writable([]);
export const eliteMods = writable(null);
export const selectedUniqueRelic = writable(null);

export const activeFloorEffects = writable([]);

const compiledMods = derived(
	[selectedRelics, selectedUniqueRelic, eliteMods, activeFloorEffects],
	([$selectedRelics, $selectedUniqueRelic, $eliteMods, $activeFloorEffects]) =>
		updateMods(
			$selectedRelics.map((relic) => relic.effects),
			$selectedUniqueRelic ? [$selectedUniqueRelic.effects] : [$selectedUniqueRelic],
			[$eliteMods],
			$activeFloorEffects.map((ele) => ele.effects)
		)
);

export const statMods = derived(compiledMods, ($compiledMods) => $compiledMods.statMods);
export const specialMods = derived(compiledMods, ($compiledMods) => $compiledMods.specialMods);
