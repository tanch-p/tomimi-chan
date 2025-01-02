import { writable, derived } from 'svelte/store';
import difficultyModsList from '$lib/data/is/sarkaz/difficulty_mods_sarkaz.json';
import { browser } from '$app/environment';
import { cookiesEnabled } from '../../../../stores';
import { compileSpecialMods } from '$lib/functions/statHelpers';
import { consolidateOtherMods } from '$lib/functions/lib';

let storedDifficulty = 0;
if (browser && cookiesEnabled) {
	storedDifficulty = parseInt(localStorage.getItem('skz_difficulty') ?? '0');
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
				hp: (1 + difficultyModsList[$difficulty]?.floorBuff) ** $selectedFloor,
				atk: (1 + difficultyModsList[$difficulty]?.floorBuff) ** $selectedFloor
			}
		}
	]
);
export const eliteMode = writable(false);
export const normalMods = writable(null);
export const eliteMods = writable(null);
export const disasterEffects = writable([]);
export const otherBuffsList = writable([]);
const otherMods = derived([otherBuffsList], ([$otherBuffsList]) =>
	consolidateOtherMods($otherBuffsList)
);
const difficultyMods = derived([difficulty], ([$difficulty]) =>
	difficultyModsList
		.map((ele) => {
			if (ele.difficulty <= $difficulty && ele.effects.length > 0) {
				return ele.effects;
			}
		})
		.filter(Boolean)
);
export const noobHelp = derived([difficulty], ([$difficulty]) => {
	const lowDiffHP = [0.8, 0.85, 0.9];
	if ($difficulty <= 2) {
		return [
			{
				targets: ['ALL'],
				mods: {
					hp: lowDiffHP[$difficulty]
				}
			}
		];
	}
	return null;
});

export const statMods = derived(
	[
		selectedRelics,
		floorDifficultyMods,
		normalMods,
		eliteMods,
		disasterEffects,
		difficultyMods,
		otherMods,
		noobHelp
	],
	([
		$selectedRelics,
		$floorDifficultyMods,
		$normalMods,
		$eliteMods,
		$disasterEffects,
		$difficultyMods,
		$otherMods,
		$noobHelp
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
				{ key: 'low_diff', mods: [$noobHelp], operation: 'times' },
				{ key: 'relic', mods: $selectedRelics.map((relic) => relic.effects), operation: 'times' },
				{
					key: 'sarkaz_disaster',
					mods: $disasterEffects.map((ele) => ele.effects),
					operation: 'times'
				}
			]
		};
	}
);

export const specialMods = derived(
	[selectedRelics, normalMods, eliteMods, difficultyMods],
	([$selectedRelics, $normalMods, $eliteMods, $difficultyMods]) =>
		compileSpecialMods(
			$selectedRelics.map((relic) => relic.effects),
			[$normalMods],
			[$eliteMods],
			$difficultyMods
		)
);
