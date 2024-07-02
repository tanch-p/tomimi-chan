import { compileSpecialMods } from '$lib/functions/statHelpers';
import { writable, derived } from 'svelte/store';

export const selectedRelics = writable([]);
export const eliteMods = writable(null);
export const selectedUniqueRelic = writable(null);
export const selectedFloor = writable(1);
export const activeFloorEffects = writable([]);

export const statMods = derived(
	[selectedRelics, selectedUniqueRelic, eliteMods, activeFloorEffects],
	([$selectedRelics, $selectedUniqueRelic, $eliteMods, $activeFloorEffects]) => {
		return {
			initial: [{ key: 'elite_ops', mods: [$eliteMods], operation: 'times' }],
			final: [
				{ key: 'relic', mods: $selectedRelics.map((relic) => relic.effects), operation: 'times' },
				{
					key: 'phantom_variation_title',
					mods: $activeFloorEffects.map((ele) => ele.effects),
					operation: 'times'
				},
				{
					key: 'ph_hard_relic',
					mods: $selectedUniqueRelic ? [$selectedUniqueRelic.effects] : [$selectedUniqueRelic],
					operation: 'times'
				}
			]
		};
	}
);

export const specialMods = derived(
	[selectedRelics, eliteMods, activeFloorEffects],
	([$selectedRelics, $eliteMods, $activeFloorEffects]) =>
		compileSpecialMods(
			$selectedRelics.map((relic) => relic.effects),
			[$eliteMods],
			$activeFloorEffects.map((ele) => ele.effects)
		)
);
