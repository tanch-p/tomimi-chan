<script lang="ts">
	import type { Language } from '$lib/types';
	import { clickOutside } from '$lib/functions/clickOutside.js';
	import FloorOptions from './FloorOptions.svelte';
	import { selectedFloor, activeChaosEffects, portalMods } from './stores';
	import translations from '$lib/translations.json';
	import { floorPrefixSuffix } from '$lib/functions/languageHelpers';

	export let stageFloors: number[], language: Language;
	let optionsOpen = false;

	// const floorIcons = [floor1, floor2, floor3, floor4, floor5, floor6];

	function updateFloor(floors: number[]) {
		if (!floors.includes($selectedFloor)) {
			selectedFloor.set(Math.min(...stageFloors));
		}
	}
	$: updateFloor(stageFloors);
</script>

<div
	use:clickOutside
	on:outclick={() => (optionsOpen = false)}
	class="relative mx-auto select-none"
>
	<button id="floor-options" on:click={() => (optionsOpen = !optionsOpen)}>
		<div class="flex justify-center items-center gap-x-1">
			<!-- <img src={floorIcons[$selectedFloor - 1]} alt={`floor-${selectedFloor}`} /> -->
			<p>
				{floorPrefixSuffix($selectedFloor, language)} -
			</p>
			{#if $portalMods}
				<p class="text-[#FF99CA]">{translations[language].sami_portal}</p>
			{:else}
				<p>{translations[language]['sami_levels'][$selectedFloor - 1]}</p>
			{/if}
		</div>
	</button>
	{#if $activeChaosEffects.length > 0}
		{#each $activeChaosEffects as effect}
			<img
				src={effect.src}
				class="absolute -inset-[9999px] z-[-1] m-auto"
				alt={effect['name_zh']}
			/>
		{/each}
	{/if}
	<FloorOptions bind:optionsOpen {language} />
</div>
