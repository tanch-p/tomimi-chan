import { writable, derived } from 'svelte/store';
import difficultyModsList from '$lib/data/is/sui/difficulty_mods_sui.json';
import { browser } from '$app/environment';
import { cookiesEnabled } from '../../../../stores';
import { compileSpecialMods } from '$lib/functions/statHelpers';
import { consolidateOtherMods } from '$lib/functions/lib';

let storedDifficulty = 0;
if (browser && cookiesEnabled) {
	storedDifficulty = parseInt(localStorage.getItem('sui_difficulty') ?? '0');
}
export const selectedRelics = writable([]);
export const difficulty = writable(storedDifficulty);

export const selectedFloor = writable(1);
const floorDifficultyMods = derived(
	[selectedFloor, difficulty],
	([$selectedFloor, $difficulty]) => {
		const floorBuff = difficultyModsList[$difficulty].floorBuff;
		return [
			{
				targets: ['ALL'],
				mods: [
					{
						key: 'hp',
						value: floorBuff.hp ** $selectedFloor,
						mode: 'mul'
					},
					{
						key: 'atk',
						value: floorBuff.atk ** $selectedFloor,
						mode: 'mul'
					}
				]
			}
		];
	}
);
export const eliteMode = writable(false);
export const runes = writable(null);
export const activeFloorEffects = writable([]);
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
				mods: [
					{
						key: 'hp',
						value: lowDiffHP[$difficulty],
						mode: 'mul'
					}
				]
			}
		];
	}
	return null;
});

export const statMods = derived(
	[
		selectedRelics,
		floorDifficultyMods,
		eliteMode,
		runes,
		activeFloorEffects,
		difficultyMods,
		otherMods,
		noobHelp
	],
	([
		$selectedRelics,
		$floorDifficultyMods,
		$eliteMode,
		$runes,
		$activeFloorEffects,
		$difficultyMods,
		$otherMods,
		$noobHelp
	]) => {
		const relicMods = $selectedRelics.map((relic) => {
			return {
				key: relic.id,
				mods: [relic.effects]
			};
		});
		return {
			runes: { key: $eliteMode ? 'elite_ops' : 'combat_ops', mods: [$runes] },
			diff: { key: 'difficulty', mods: $difficultyMods, stackType: 'mul' },
			others: [
				{ key: 'floor_diff', mods: [$floorDifficultyMods] },
				{ key: 'low_diff', mods: [$noobHelp] },
				{
					key: 'sui_time',
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
	[selectedRelics, runes, difficultyMods],
	([$selectedRelics, $runes, $difficultyMods]) =>
		compileSpecialMods(
			$selectedRelics.map((relic) => relic.effects),
			[$runes],
			$difficultyMods
		)
);
