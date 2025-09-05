import { writable, derived } from 'svelte/store';
import { compileSpecialMods } from '$lib/functions/statHelpers';
import { consolidateOtherMods } from '$lib/functions/lib';
import { consolidateMods } from '$lib/functions/recalRune';

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
	[eliteMode, runes, contracts, otherMods],
	([$eliteMode, $runes, $contracts, $otherMods]) => {
		const contractMods = consolidateMods($contracts);
		return {
			runes: {
				key: contractMods ? 'contracts' : $eliteMode ? 'elite_ops' : 'combat_ops',
				mods: contractMods || [$runes]
			},
			others: [...$otherMods]
		};
	}
);

export const specialMods = derived([runes, contracts], ([$runes, $contracts]) =>
	compileSpecialMods([$runes],consolidateMods($contracts))
);
