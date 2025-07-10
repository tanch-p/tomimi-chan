<script lang="ts">
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import {
		compileHiddenGroups,
		generateWaveTimeline,
		getBaseCount,
		parseWaves
	} from '$lib/functions/waveHelpers';
	import { GameConfig } from './StageSimulator/objects/GameConfig';
	import { onDestroy, onMount } from 'svelte';

	export let mapConfig,
		enemies,
		language: Language,
		eliteMode: Boolean,
		otherStores,
		difficulty: number;

	let hiddenGroups = [],
		simMode = 'wave_normal',
		baseCount = 0;

	$: compiledHiddenGroups = compileHiddenGroups(hiddenGroups, eliteMode, mapConfig);
	$: baseCount = getBaseCount(mapConfig, eliteMode);
	$: maxPermutations = eliteMode
		? mapConfig.ELITE.max_permutations
		: mapConfig.NORMAL.max_permutations;

	$: if (mapConfig) {
		GameConfig.setValue('mode', 'wave_normal');
	}

	const unsubscribeFns = [];
	onMount(() => {
		unsubscribeFns.push(
			GameConfig.subscribe('mode', (value) => {
				simMode = value;
			})
		);
	});

	onDestroy(() => {
		GameConfig.setValue('mode', 'wave_normal');
		unsubscribeFns.forEach((fn) => fn());
	});
</script>

<div
	class="grid grid-cols-[75px_1fr] md:grid-cols-[120px_1fr] divide-y divide-neutral-700 border-y border-neutral-700 text-sm md:text-base"
>
	{#if mapConfig.branches}
		<p class="title {language}">{translations[language].sim_mode}</p>
		<div class="grid grid-cols-2">
			{#each ['wave_normal', 'wave_summons'] as key}
				<button
					class="flex justify-center items-center border-r border-neutral-700 font-semibold text-lg {simMode ===
					key
						? 'bg-gray-600'
						: 'brightness-50 sm:hover:brightness-75 sm:hover:bg-gray-500'} "
					on:click={() => GameConfig.setValue('mode', key)}
				>
					{translations[language][key]}
				</button>
			{/each}
		</div>
	{/if}
	{#if simMode === 'wave_normal'}
		{#if mapConfig.elite_mods}
			<p class="title {language}">{translations[language].operation_type}</p>
			<slot name="eliteMods" />
		{/if}
	{/if}
</div>
{#await import('./StageSimulator/index.svelte').then(({ default: C }) => C) then StageSimulator}
	<StageSimulator
		{mapConfig}
		{enemies}
		{language}
		waveData={parseWaves(mapConfig, null, compiledHiddenGroups, eliteMode)}
		timeline={generateWaveTimeline(mapConfig, compiledHiddenGroups, null, eliteMode)}
	/>
{/await}

<style>
	.title {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		min-height: 58px;
		padding: 0 6px;
		background-color: rgb(23, 23, 23);
	}
	.title.en {
		font-size: 0.875rem;
		text-transform: capitalize;
	}
	@media only screen and (max-width: 640px) {
		.title.en {
			font-size: 0.625rem;
			text-transform: capitalize;
			line-height: 1.5;
		}
	}
</style>
