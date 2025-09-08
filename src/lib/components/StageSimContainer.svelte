<script lang="ts">
	import type { Language, RogueTopic } from '$lib/types';
	import { page } from '$app/stores';
	import { setContext } from 'svelte';
	import { derived, writable } from 'svelte/store';
	import translations from '$lib/translations.json';
	import TogglePanel from './TogglePanel.svelte';
	import RoguelikeSpawnOptions from './RoguelikeWaveOptions.svelte';
	import NormalWaveOptions from './NormalWaveOptions.svelte';
	import { defaultOpenStageSim } from '../../routes/stores';
	import { randomSeeds } from './StageSimulator/stores';
	import { generateWaveTimeline, parseWaves } from '$lib/functions/waveHelpers';

	export let mapConfig,
		enemies,
		rogueTopic: RogueTopic,
		language: Language,
		eliteMode: Boolean,
		difficulty: number,
		systemRunes;

	let pageType = 'roguelike';
	$: pageType = $page.data.pageType || 'roguelike';

	let version = 'v0.3';

	const otherHiddenGroups = writable([]);
	const permutation = writable(null);
	const bonusKey = writable('');
	const hiddenGroups = derived(
		[systemRunes, otherHiddenGroups],
		([$systemRunes, $otherHiddenGroups]) => {
			const disabledGroups = $systemRunes
				.map(({ key, valueStr }) => {
					if (key === 'level_hidden_group_disable') return valueStr;
				})
				.filter(Boolean);
			const enabledGroups = $systemRunes
				.map(({ key, valueStr }) => {
					if (key === 'level_hidden_group_enable') return valueStr;
				})
				.filter(Boolean)
				.filter((str) => !disabledGroups.includes(str))
				.concat($otherHiddenGroups);

			return enabledGroups;
		}
	);
	hiddenGroups.subscribe(v => console.log(v))

	setContext('hiddenGroups', otherHiddenGroups);
	setContext('permutation', permutation);
	setContext('bonusKey', bonusKey);
</script>

<TogglePanel
	key={'stageSim'}
	title={translations[language].enemy_routes + ' ' + version}
	size="subheading"
	isOpen={defaultOpenStageSim}
>
	{#if pageType === 'roguelike'}
		<RoguelikeSpawnOptions
			{mapConfig}
			{enemies}
			{language}
			{eliteMode}
			{rogueTopic}
			{difficulty}
			{systemRunes}
		>
			<slot name="eliteMods" />
		</RoguelikeSpawnOptions>
	{:else}
		<NormalWaveOptions {mapConfig} {enemies} {language} {eliteMode}>
			<slot name="eliteMods" />
		</NormalWaveOptions>
	{/if}
	{#await import('./StageSimulator/index.svelte').then(({ default: C }) => C) then StageSimulator}
		{#if pageType === 'roguelike'}
			<StageSimulator
				{mapConfig}
				{enemies}
				{language}
				waveData={parseWaves(
					mapConfig,
					$permutation,
					$hiddenGroups,
					eliteMode,
					$randomSeeds,
					$bonusKey
				)}
				timeline={generateWaveTimeline(
					mapConfig,
					$hiddenGroups,
					$permutation,
					eliteMode,
					$randomSeeds,
					$bonusKey
				)}
			/>
		{:else}
			<StageSimulator
				{mapConfig}
				{enemies}
				{language}
				waveData={parseWaves(mapConfig, 'random', $hiddenGroups, eliteMode, $randomSeeds, null)}
				timeline={generateWaveTimeline(mapConfig, $hiddenGroups, 'random', eliteMode, $randomSeeds, null)}
			/>
		{/if}
	{/await}
</TogglePanel>
