import { consolidateOtherMods } from '$lib/functions/lib';
import { compileSpecialMods } from '$lib/functions/statHelpers';
import { writable, derived } from 'svelte/store';

export const selectedRelics = writable([]);
export const eliteMode = writable(false);
export const runes = writable(null);
export const selectedUniqueRelic = writable(null);
export const selectedFloor = writable(1);
export const activeFloorEffects = writable([]);
export const otherBuffsList = writable([]);
const otherMods = derived([otherBuffsList], ([$otherBuffsList]) =>
	consolidateOtherMods($otherBuffsList)
);

export const statMods = derived(
	[selectedRelics, selectedUniqueRelic, eliteMode, runes, activeFloorEffects, otherMods],
	([
		$selectedRelics,
		$selectedUniqueRelic,
		$eliteMode,
		$runes,
		$activeFloorEffects,
		$otherMods
	]) => {
		const relicMods = [
			...$selectedRelics.map((relic) => {
				return {
					key: relic.id,
					mods: [relic.effects]
				};
			}),
			{ key: $selectedUniqueRelic.id, mods: [$selectedUniqueRelic.effects] }
		];
		return {
			runes: { key: $eliteMode ? 'elite_ops' : 'combat_ops', mods: [$runes] },
			others: [
				{
					key: 'phantom_variation_title',
					mods: $activeFloorEffects.map((ele) => ele.effects),
					operation: 'times'
				},
				...relicMods,
				...$otherMods
			]
		};
	}
);

export const specialMods = derived(
	[selectedRelics, runes, normalMods, activeFloorEffects],
	([$selectedRelics, $eliteMods, $normalMods, $activeFloorEffects]) =>
		compileSpecialMods(
			$selectedRelics.map((relic) => relic.effects),
			[$eliteMods],
			[$normalMods],
			$activeFloorEffects.map((ele) => ele.effects)
		)
);
