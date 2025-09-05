import { writable, derived } from 'svelte/store';
import { compileSpecialMods } from '$lib/functions/statHelpers';
import { consolidateOtherMods } from '$lib/functions/lib';

export const activityIdStore = writable('');
export const stageIdStore = writable('');

export const eliteMode = writable(false);
export const runes = writable(null);
export const otherBuffsList = writable([]);
const otherMods = derived([otherBuffsList], ([$otherBuffsList]) =>
	consolidateOtherMods($otherBuffsList)
);

// recalrune
export const contracts = writable(null);

export const statMods = derived(
	[eliteMode, runes, otherMods],
	([$eliteMode, $runes, $otherMods]) => {
		return {
			runes: { key: $eliteMode ? 'elite_ops' : 'combat_ops', mods: [$runes] },
			others: [...$otherMods]
		};
	}
);

export const specialMods = derived([runes], ([$runes]) => compileSpecialMods([$runes]));
