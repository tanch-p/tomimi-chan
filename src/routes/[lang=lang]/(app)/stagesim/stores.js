import { writable, derived } from 'svelte/store';
import { compileSpecialMods } from '$lib/functions/statHelpers';
import { compileSystemRunes, consolidateOtherMods } from '$lib/functions/lib';
import { consolidateMods } from '$lib/functions/recalRune';

export const activityIdStore = writable('');
export const stageIdStore = writable('');

export const allMods = writable(null);
export const eliteMode = writable(false);
export const runes = writable(null);
export const otherBuffsList = writable([]);
const otherMods = derived([otherBuffsList], ([$otherBuffsList]) =>
	consolidateOtherMods($otherBuffsList)
);

// recalrune
export const contracts = writable(null);

const contractMods = derived([contracts], ([$contracts]) => consolidateMods($contracts));

export const statMods = derived(
	[eliteMode, runes, allMods, contractMods, otherMods],
	([$eliteMode, $runes, $allMods, $contractMods, $otherMods]) => {
		return {
			runes: {
				key: $eliteMode ? 'elite_ops' : 'combat_ops',
<<<<<<< HEAD
				mods: [$runes,$allMods]
			},
			others: [...$otherMods, { key: 'contracts', mods: $contractMods }]
=======
				mods: [$runes, $allMods]
			},
			others: [...$otherMods],
>>>>>>> 9e2e0f0b2570631eaaf4a4be02eb3805ca7a9eee
		};
	}
);

export const specialMods = derived([runes, contractMods], ([$runes, $contractMods]) =>
<<<<<<< HEAD
	compileSpecialMods([$runes], $contractMods)
);

export const systemRunes = derived([runes, allMods, contractMods], ([$runes, $allMods, $contractMods]) =>
	compileSystemRunes([$runes,$allMods], $contractMods)
);
=======
	compileSpecialMods(
		[$runes],
		$contractMods.map((ele) => ele.mods)
	)
);

export const systemRunes = derived(
	[runes, allMods, contractMods],
	([$runes, $allMods, $contractMods]) =>
		compileSystemRunes(
			[$runes, $allMods],
			$contractMods.map((ele) => ele.mods)
		)
);
>>>>>>> 9e2e0f0b2570631eaaf4a4be02eb3805ca7a9eee
