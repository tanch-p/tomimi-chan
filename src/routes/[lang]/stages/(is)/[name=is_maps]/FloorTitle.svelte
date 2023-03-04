<script lang="ts">
	import { clickOutside } from '$lib/functions/clickOutside.js';
	import FloorOptions from './FloorOptions.svelte';
	import { selectedFloor } from './stores';

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
	<p class="cursor-pointer" on:click={() => (optionsOpen = !optionsOpen)}>
		{FLOOR_ROMAN_NUMERALS[$selectedFloor - 1]}
	</p>
	<FloorOptions bind:optionsOpen {language} />
</div>
