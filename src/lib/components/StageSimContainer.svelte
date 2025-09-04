<script lang="ts">
	import type { Language, RogueTopic } from '$lib/types';
	import { page } from '$app/stores';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
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
		difficulty: number;

	let pageType = 'roguelike';
	$: pageType = $page.data.pageType || 'roguelike';

	let version = 'v0.3';

	const hiddenGroups = writable([]);
	const permutation = writable(null);
	const bonusKey = writable('');

	setContext('hiddenGroups', hiddenGroups);
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
		<RoguelikeSpawnOptions {mapConfig} {enemies} {language} {eliteMode} {rogueTopic} {difficulty}>
			<slot name="eliteMods" />
		</RoguelikeSpawnOptions>
		{#await import('./StageSimulator/index.svelte').then(({ default: C }) => C) then StageSimulator}
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
		{/await}
	{:else}
		<NormalWaveOptions {mapConfig} {enemies} {language} {eliteMode}>
			<slot name="eliteMods" />
		</NormalWaveOptions>
		{#await import('./StageSimulator/index.svelte').then(({ default: C }) => C) then StageSimulator}
			<StageSimulator
				{mapConfig}
				{enemies}
				{language}
				waveData={parseWaves(mapConfig, 'random', [], eliteMode, $randomSeeds, null)}
				timeline={generateWaveTimeline(mapConfig, [], 'random', eliteMode, $randomSeeds, null)}
			/>
		{/await}
	{/if}
</TogglePanel>
