import { writable, derived } from 'svelte/store';
import difficultyModsList from '$lib/data/difficulty_mods_sami.json';
import { browser } from '$app/environment';
import { cookiesEnabled } from '../../../../stores';
import { compileSpecialMods } from '$lib/functions/statHelpers';

let storedDifficulty = 0;
if (browser && cookiesEnabled) {
	storedDifficulty = parseInt(localStorage.getItem('sami_difficulty') ?? '0');
}
export const selectedRelics = writable([]);
export const difficulty = writable(storedDifficulty);

export const selectedFloor = writable(1);
const floorDifficultyMods = derived(
	[selectedFloor, difficulty],
	([$selectedFloor, $difficulty]) => [
		{
			targets: ['ALL'],
			mods: {
				hp: (1 + difficultyModsList[$difficulty].floorBuff) ** $selectedFloor,
				atk: (1 + difficultyModsList[$difficulty].floorBuff) ** $selectedFloor
			}
		}
	]
);

export const eliteMods = writable(null);
export const activeChaosEffects = writable([]);
export const portalMods = writable(null);
const difficultyMods = derived([difficulty], ([$difficulty]) =>
	difficultyModsList
		.map((ele) => {
			if (ele.difficulty <= $difficulty && ele.effects.length > 0) {
				return ele.effects;
			}
		})
		.filter(Boolean)
);

export const statMods = derived(
	[selectedRelics, floorDifficultyMods, eliteMods, activeChaosEffects, portalMods, difficultyMods],
	([
		$selectedRelics,
		$floorDifficultyMods,
		$eliteMods,
		$activeChaosEffects,
		$portalMods,
		$difficultyMods
	]) => {
		return {
			initial: [
				{ key: 'elite_ops', mods: [$eliteMods], operation: 'times' },
				{ key: 'floor_diff', mods: [$floorDifficultyMods], operation: 'times' }
			],
			final: [
				{ key: 'relic', mods: $selectedRelics.map((relic) => relic.effects), operation: 'times' },
				{ key: 'sami_chaos', mods: $activeChaosEffects.map((ele) => ele.effects), operation: 'times' },
				{ key: 'sami_portal', mods: [$portalMods], operation: 'times' },
				{ key: 'difficulty', mods: $difficultyMods, operation: 'add' }
			]
		};
	}
);

export const specialMods = derived([selectedRelics, eliteMods], ([$selectedRelics, $eliteMods]) =>
	compileSpecialMods(
		$selectedRelics.map((relic) => relic.effects),
		[$eliteMods]
	)
);
