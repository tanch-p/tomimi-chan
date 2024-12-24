import { writable, derived } from 'svelte/store';
import difficultyModsList from '$lib/data/is/mizuki/difficulty_mods_mizuki.json';
import { browser } from '$app/environment';
import { cookiesEnabled } from '../../../../stores';
import { compileSpecialMods } from '$lib/functions/statHelpers';
import { consolidateOtherMods } from '$lib/functions/lib';

let storedDifficulty = 0;
if (browser && cookiesEnabled) {
	storedDifficulty = parseInt(localStorage.getItem('difficulty') ?? '0');
}
export const selectedRelics = writable([]);
export const difficulty = writable(storedDifficulty);
const difficultyMods = derived([difficulty], ([$difficulty]) =>
	difficultyModsList
		.map((ele) => {
			if (ele.difficulty <= $difficulty && ele.effects.length > 0) {
				return ele.effects;
			}
		})
		.filter(Boolean)
);
export const selectedFloor = writable(1);
const floorDifficultyMods = derived(
	[selectedFloor, difficulty],
	([$selectedFloor, $difficulty]) => [
		{
			targets: ['ALL'],
			mods: {
				hp: (1 + 0.01 * $difficulty) ** $selectedFloor,
				atk: (1 + 0.01 * $difficulty) ** $selectedFloor
			}
		}
	]
);
export const eliteMode = writable(false);
export const normalMods = writable(null);
export const eliteMods = writable(null);
export const activeFloorEffects = writable([]);
export const missionMods = writable(null);
export const otherBuffsList = writable([]);
const otherMods = derived([otherBuffsList], ([$otherBuffsList]) =>
	consolidateOtherMods($otherBuffsList)
);

export const statMods = derived(
	[
		selectedRelics,
		floorDifficultyMods,
		normalMods,
		eliteMods,
		activeFloorEffects,
		missionMods,
		difficultyMods,
		otherMods
	],
	([
		$selectedRelics,
		$floorDifficultyMods,
		$normalMods,
		$eliteMods,
		$activeFloorEffects,
		$missionMods,
		$difficultyMods,
		$otherMods
	]) => {
		return {
			initial: [
				{ key: 'combat_ops', mods: [$normalMods], operation: 'times' },
				{ key: 'elite_ops', mods: [$eliteMods], operation: 'times' },
				...$otherMods
			],
			final: [
				{ key: 'floor_diff', mods: [$floorDifficultyMods], operation: 'times' },
				{ key: 'difficulty', mods: $difficultyMods, operation: 'times' },
				{ key: 'relic', mods: $selectedRelics.map((relic) => relic.effects), operation: 'times' },
				{
					key: 'mizuki_seaborn_call',
					mods: $activeFloorEffects.map((ele) => ele.effects),
					operation: 'times'
				},
				{ key: 'mizuki_mission', mods: [$missionMods], operation: 'times' },
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
