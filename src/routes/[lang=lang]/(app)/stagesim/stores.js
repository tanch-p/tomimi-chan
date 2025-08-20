import { writable, derived } from 'svelte/store';
import { compileSpecialMods } from '$lib/functions/statHelpers';
import { consolidateOtherMods } from '$lib/functions/lib';
import { runes, eliteMode, otherBuffsList } from '$lib/global_stores';

export const activityIdStore = writable('');
export const stageIdStore = writable('');

const otherMods = derived([otherBuffsList], ([$otherBuffs]) =>
	consolidateOtherMods($otherBuffs)
);

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
