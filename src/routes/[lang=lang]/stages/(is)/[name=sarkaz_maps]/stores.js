import { writable, derived } from 'svelte/store';
import difficultyModsList from '$lib/data/is/sarkaz/difficulty_mods_sarkaz.json';
import { browser } from '$app/environment';
import { cookiesEnabled } from '../../../../stores';
import { compileSpecialMods } from '$lib/functions/statHelpers';

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
				hp: (1 + difficultyModsList[$difficulty].floorBuff) ** $selectedFloor,
				atk: (1 + difficultyModsList[$difficulty].floorBuff) ** $selectedFloor
			}
		}
	]
);
export const eliteMode = writable(false);
export const normalMods = writable(null);
export const eliteMods = writable(null);
export const disasterEffects = writable([]);
export const otherBuffsList = writable([]);
const otherMods = derived([otherBuffsList], ([$otherBuffsList]) => {
	const modsList = [];
	$otherBuffsList.forEach((buff) => {
		buff.activeTargets.forEach((ele) => {
			if (ele.count > 0) {
				modsList.push({
					key: buff.key,
					mods: [
						[
							{
								targets: [ele.key],
								mods: Object.fromEntries(
									Object.entries(buff.mods).map(([key, value]) => [
										key,
										value > 1 ? 1 + (value - 1) * ele.count : value * ele.count
									])
								)
							}
						]
					],
					operation: 'times'
				});
			}
		});
	});
	return modsList;
});
const lowDiffHP = [0.8, 0.85, 0.9];
const difficultyMods = derived([difficulty], ([$difficulty]) =>
	$difficulty <= 2
		? [
				[
					{
						targets: ['ALL'],
						mods: {
							hp: lowDiffHP[$difficulty]
						}
					}
				]
		  ]
		: difficultyModsList
				.map((ele) => {
					if (ele.difficulty <= $difficulty && ele.effects.length > 0) {
						return ele.effects;
					}
				})
				.filter(Boolean)
);

export const statMods = derived(
	[
		selectedRelics,
		floorDifficultyMods,
		normalMods,
		eliteMods,
		disasterEffects,
		difficultyMods,
		otherMods
	],
	([
		$selectedRelics,
		$floorDifficultyMods,
		$normalMods,
		$eliteMods,
		$disasterEffects,
		$difficultyMods,
		$otherMods
	]) => {
		return {
			initial: [
				{ key: 'combat_ops', mods: [$normalMods], operation: 'times' },
				{ key: 'elite_ops', mods: [$eliteMods], operation: 'times' },
				{ key: 'floor_diff', mods: [$floorDifficultyMods], operation: 'times' }
			],
			final: [
				...$otherMods,
				{ key: 'relic', mods: $selectedRelics.map((relic) => relic.effects), operation: 'times' },
				{
					key: 'sarkaz_disaster',
					mods: $disasterEffects.map((ele) => ele.effects),
					operation: 'times'
				},
				{ key: 'difficulty', mods: $difficultyMods, operation: 'times' }
			]
		};
	}
);

export const specialMods = derived(
	[selectedRelics, eliteMods, difficultyMods],
	([$selectedRelics, $eliteMods, $difficultyMods]) =>
		compileSpecialMods(
			$selectedRelics.map((relic) => relic.effects),
			[$eliteMods],
			$difficultyMods
		)
);
