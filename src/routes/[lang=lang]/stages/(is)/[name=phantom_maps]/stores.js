import { consolidateOtherMods } from '$lib/functions/lib';
import { compileSpecialMods } from '$lib/functions/statHelpers';
import { writable, derived } from 'svelte/store';

export const selectedRelics = writable([]);
export const eliteMode = writable(false);
export const normalMods = writable(null);
export const eliteMods = writable(null);
export const selectedUniqueRelic = writable(null);
export const selectedFloor = writable(1);
export const activeFloorEffects = writable([]);
export const otherBuffsList = writable([]);
const otherMods = derived([otherBuffsList], ([$otherBuffsList]) =>
	consolidateOtherMods($otherBuffsList)
);

export const statMods = derived(
	[selectedRelics, selectedUniqueRelic, normalMods, eliteMods, activeFloorEffects,otherMods],
	([$selectedRelics, $selectedUniqueRelic, $normalMods, $eliteMods, $activeFloorEffects, $otherMods]) => {
		return {
			initial: [
				{ key: 'elite_ops', mods: [$eliteMods], operation: 'times' },
				{ key: 'combat_ops', mods: [$normalMods], operation: 'times' },
				...$otherMods
			],
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
	[selectedRelics, eliteMods, normalMods, activeFloorEffects],
	([$selectedRelics, $eliteMods, $normalMods, $activeFloorEffects]) =>
		compileSpecialMods(
			$selectedRelics.map((relic) => relic.effects),
			[$eliteMods],
			[$normalMods],
			$activeFloorEffects.map((ele) => ele.effects)
		)
);
