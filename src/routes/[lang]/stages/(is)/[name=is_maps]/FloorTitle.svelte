<script lang="ts">
	import { clickOutside } from '$lib/functions/clickOutside.js';
	import FloorOptions from './FloorOptions.svelte';
	import { selectedFloor, activeFloorEffects } from './stores';
	import translations from '$lib/translations.json';

	export let stageFloors: number[], language: string;
	let optionsOpen = false;

	const FLOOR_ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI'];

	function updateFloor(floors: number[]) {
		if (!floors.includes($selectedFloor)) {
			console.log('running');
			selectedFloor.set(Math.min(...stageFloors));
		}
	}
	$: updateFloor(stageFloors);
</script>

<div use:clickOutside on:outclick={() => (optionsOpen = false)} class="mx-auto select-none">
	<div class="cursor-pointer" on:click={() => (optionsOpen = !optionsOpen)}>
		<p class="text-center">
			{$selectedFloor} - {translations[language]['mizuki_levels'][$selectedFloor - 1]}
		</p>
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
	</div>
	<FloorOptions bind:optionsOpen {language} />
</div>
