import difficultyModsList from '$lib/data/is/phantom/difficulty_mods_phantom.json';
import { consolidateOtherMods } from '$lib/functions/lib';
import { compileSpecialMods } from '$lib/functions/statHelpers';
import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import { cookiesEnabled } from '../../../../stores';

let storedDifficulty = 0;
if (browser && cookiesEnabled) {
	storedDifficulty = parseInt(localStorage.getItem('phantom_difficulty') ?? '0');
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
const diff10Mods = [
	{
		targets: ['ALL'],
		mods: [
			{ key: 'hp', value: 1.15, mode: 'mul' },
			{ key: 'atk', value: 1.15, mode: 'mul' }
		]
	}
];
export const eliteMode = writable(false);
export const runes = writable(null);
export const selectedUniqueRelic = writable(null);
export const selectedFloor = writable(1);
export const activeFloorEffects = writable([]);
export const otherBuffsList = writable([]);
const otherBuffs = derived([otherBuffsList], ([$otherBuffsList]) =>
	consolidateOtherMods($otherBuffsList)
);
export const capsule = writable(null);
export const isBossStage = writable(false);
export const diff10ModifierStore = derived(
	[isBossStage, difficulty, eliteMode],
	([$isBossStage, $difficulty, $eliteMode]) =>
		$difficulty >= 10 && ($isBossStage || $eliteMode) ? diff10Mods : null
);

export const statMods = derived(
	[
		selectedRelics,
		difficultyMods,
		selectedUniqueRelic,
		diff10ModifierStore,
		eliteMode,
		runes,
		activeFloorEffects,
		otherBuffs,
		capsule
	],
	([
		$selectedRelics,
		$difficultyMods,
		$selectedUniqueRelic,
		$diff10Modifier,
		$eliteMode,
		$runes,
		$activeFloorEffects,
		$otherBuffs,
		$capsule
	]) => {
		const relicMods = [
			...$selectedRelics.map((relic) => {
				return {
					key: relic.id,
					mods: [relic.effects]
				};
			})
		];
		if ($selectedUniqueRelic) {
			relicMods.push({
				key: $selectedUniqueRelic.id,
				mods: [
					$selectedUniqueRelic.stages
						? $selectedUniqueRelic?.stages?.[$selectedUniqueRelic.count]?.effects
						: $selectedUniqueRelic.effects
				]
			});
		}
		return {
			runes: { key: $eliteMode ? 'elite_ops' : 'combat_ops', mods: [$runes] },
			diff: { key: 'difficulty', mods: $difficultyMods, stackType: 'mul' },
			others: [
				{
					key: 'N10',
					mods: [$diff10Modifier]
				},
				{
					key: 'phantom_variation_title',
					mods: $activeFloorEffects.map((ele) => ele.effects),
					operation: 'times'
				},
				{
					key: 'phantom_capsule',
					mods: [$capsule?.effects],
					operation: 'times'
				},
				...relicMods,
				...$otherBuffs
			]
		};
	}
);

export const specialMods = derived(
	[selectedRelics, runes, activeFloorEffects],
	([$selectedRelics, $runes, $activeFloorEffects]) =>
		compileSpecialMods(
			$selectedRelics.map((relic) => relic.effects),
			[$runes],
			$activeFloorEffects.map((ele) => ele.effects)
		)
);
