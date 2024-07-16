<script lang="ts">
	import type { Language } from '$lib/types';
	import { clickOutside } from '$lib/functions/clickOutside.js';
	import FloorOptions from './FloorOptions.svelte';
	import { selectedFloor, disasterEffects } from './stores';
	import translations from '$lib/translations.json';
	import romanNumerals from '$lib/roman_numerals.json';
	import disaster_1 from '$lib/images/is/sarkaz/rogue_4_disaster_1.webp';
	import disaster_2 from '$lib/images/is/sarkaz/rogue_4_disaster_2.webp';
	import disaster_5 from '$lib/images/is/sarkaz/rogue_4_disaster_5.webp';

	const lookup = {
		rogue_4_disaster_1: disaster_1,
		rogue_4_disaster_2: disaster_2,
		rogue_4_disaster_5: disaster_5
	};

	export let stageFloors: number[], language: Language;
	let optionsOpen = false;

	function updateFloor(floors: number[]) {
		if (!floors.includes($selectedFloor)) {
			selectedFloor.set(Math.min(...stageFloors));
		}
	}
	$: updateFloor(stageFloors);
</script>

<div use:clickOutside on:outclick={() => (optionsOpen = false)} class="mx-auto select-none">
	<button id="floor-options" on:click={() => (optionsOpen = !optionsOpen)}>
		<p class="relative text-center">
			{romanNumerals[$selectedFloor - 1]}&nbsp;{translations[language].sarkaz_levels[
				$selectedFloor - 1
			]}
		</p>
		{#if $disasterEffects.length > 0}
			<div class="flex gap-x-2.5 my-0.5 justify-center">
				{#each $disasterEffects as effect}
					<div class="relative rounded-full bg-[#ff382e] w-20 h-6 overflow-hidden">
						<img
							src={lookup[effect.iconId]}
							class="absolute -inset-[9999px] m-auto max-h-[150%]"
							alt={effect['name_zh']}
						/>
					</div>
				{/each}
			</div>
		{/if}
	</button>
	<FloorOptions bind:optionsOpen {language} />
</div>
