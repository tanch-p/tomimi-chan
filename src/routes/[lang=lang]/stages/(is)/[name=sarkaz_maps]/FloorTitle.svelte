<script lang="ts">
	import type { Language } from '$lib/types';
	import { clickOutside } from '$lib/functions/clickOutside.js';
	import FloorOptions from './FloorOptions.svelte';
	import { selectedFloor, disasterEffects } from './stores';
	import translations from '$lib/translations.json';
	import roman_1 from '$lib/images/is/sarkaz/icon_zone_1.webp';
	import roman_2 from '$lib/images/is/sarkaz/icon_zone_2.webp';
	import roman_3 from '$lib/images/is/sarkaz/icon_zone_3.webp';
	import roman_4 from '$lib/images/is/sarkaz/icon_zone_4.webp';
	import roman_5 from '$lib/images/is/sarkaz/icon_zone_5.webp';
	import roman_6 from '$lib/images/is/sarkaz/icon_zone_6.webp';
	import disaster_1 from '$lib/images/is/sarkaz/rogue_4_disaster_1.webp';
	import disaster_2 from '$lib/images/is/sarkaz/rogue_4_disaster_2.webp';
	import disaster_5 from '$lib/images/is/sarkaz/rogue_4_disaster_5.webp';

	const lookup = {
		roman_1: roman_1,
		roman_2: roman_2,
		roman_3: roman_3,
		roman_4: roman_4,
		roman_5: roman_5,
		roman_6: roman_6,
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
		<p class="flex items-center justify-center relative text-center">
			<img
				class="h-[20px] mt-[1px]"
				src={lookup[`roman_${$selectedFloor}`]}
				alt={$selectedFloor}
			/>&nbsp;{translations[language].sarkaz_levels[$selectedFloor - 1]}
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
