<script lang="ts">
	import { clickOutside } from '$lib/functions/clickOutside.js';
	import FloorOptions from './FloorOptions.svelte';
	import { selectedFloor, activeFloorEffects } from './stores';
	import translations from '$lib/translations.json';

	export let stageFloors: number[], language: string;
	let optionsOpen = false;

	// const floorIcons = [floor1, floor2, floor3, floor4, floor5, floor6];

	function updateFloor(floors: number[]) {
		if (!floors.includes($selectedFloor)) {
			selectedFloor.set(Math.min(...stageFloors));
			activeFloorEffects.set([]);
		}
	}
	$: updateFloor(stageFloors);
</script>

<div use:clickOutside on:outclick={() => (optionsOpen = false)} class="mx-auto select-none">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="cursor-pointer" on:click={() => (optionsOpen = !optionsOpen)}>
		<div class="flex justify-center items-center gap-x-1">
			<!-- <img src={floorIcons[$selectedFloor - 1]} alt={`floor-${selectedFloor}`} /> -->
			<p>{$selectedFloor}层 - </p>
			<p>{translations[language]['sami_levels'][$selectedFloor - 1]}</p>
		</div>
		{#if $activeFloorEffects.length > 0}
			<div class="flex gap-x-2.5 mt-1.5">
				{#each $activeFloorEffects as effect}
					<div class="relative rounded-full bg-[#640c1c] w-20 h-6 overflow-hidden">
						<img
							src={effect.src}
							class="absolute -inset-[9999px] m-auto max-h-[150%]"
							alt={effect['name_zh']}
						/>
					</div>
				{/each}
			</div>
		{/if}
	</div>
	<FloorOptions bind:optionsOpen {language} />
</div>
