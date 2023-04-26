<script lang="ts">
	import { clickOutside } from '$lib/functions/clickOutside.js';
	import FloorOptions from './FloorOptions.svelte';
	import { selectedFloor, activeFloorEffects } from './stores';
	import translations from '$lib/translations.json';
	import floor1 from '$lib/images/is/mizuki/floor1.webp';
	import floor2 from '$lib/images/is/mizuki/floor2.webp';
	import floor3 from '$lib/images/is/mizuki/floor3.webp';
	import floor4 from '$lib/images/is/mizuki/floor4.webp';
	import floor5 from '$lib/images/is/mizuki/floor5.webp';
	import floor6 from '$lib/images/is/mizuki/floor6.webp';

	export let stageFloors: number[], language: string;
	let optionsOpen = false;

	const floorIcons = [floor1, floor2, floor3, floor4, floor5, floor6];

	function updateFloor(floors: number[]) {
		if (!floors.includes($selectedFloor)) {
			selectedFloor.set(Math.min(...stageFloors));
			activeFloorEffects.set([]);
		}
	}
	$: updateFloor(stageFloors);
</script>

<div use:clickOutside on:outclick={() => (optionsOpen = false)} class="mx-auto select-none">
	<div class="cursor-pointer" on:click={() => (optionsOpen = !optionsOpen)}>
		<div class="flex justify-center items-center gap-x-1">
			<img src={floorIcons[$selectedFloor - 1]} alt={`floor-${selectedFloor}`} />
			<p>{translations[language]['mizuki_levels'][$selectedFloor - 1]}</p>
		</div>
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
