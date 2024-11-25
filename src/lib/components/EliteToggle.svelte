<script lang="ts">
	import { onDestroy } from 'svelte';
	import combat_icon from '$lib/images/is/combat_icon.webp';
	import emergency_icon from '$lib/images/is/emergency_icon.webp';
	import skzRelics from '$lib/data/is/sarkaz/relics_sarkaz.json';
	import { relicLookup } from '$lib/data/is/relic_lookup';
	import { getEliteColors } from '$lib/functions/lib';

	export let mapEliteMods: any,
		rogueTopic: string,
		eliteMods: any,
		normalMods:any,
		mapNormalMods:any,
		selectedRelics: any,
		stageId: string,
		eliteMode;

	//hotfix to set hardMode to false on nav to another stage with hardMods
	$: if (mapEliteMods) {
		updateEliteMods(false);
	}
	const ro4_SP7_BOSS_STAGES = [
		'level_rogue4_b-4',
		'level_rogue4_b-4-b',
		'level_rogue4_b-5',
		'level_rogue4_b-5-b'
	];

	onDestroy(() => {
		eliteMods.set(null);
		eliteMode.set(false);
	});

	const updateEliteMods = (option: boolean) => {
		eliteMode.set(option);
		if (option) {
			eliteMods.set(mapEliteMods);
			if (
				rogueTopic === 'rogue_skz' &&
				ro4_SP7_BOSS_STAGES.includes(stageId) &&
				!$selectedRelics.find((item) => item.id === 'rogue_4_relic_final_6')
			) {
				const relic = skzRelics.find((item) => item.id === 'rogue_4_relic_final_6');
				selectedRelics.update((list) => (list = [...list, relic]));
			}
		} else {
			eliteMods.set(null);
			normalMods.set(mapNormalMods);
		}
	};
	$: [combatOpsColor, eliteOpsColor] = getEliteColors(rogueTopic);
</script>

<div class="grid grid-cols-2 font-bold text-lg text-gray-700 mt-8 mb-3 select-none">
	<button
		id="normal-toggle"
		class={`flex justify-center items-center py-1 ${combatOpsColor} ${
			!$eliteMode ? 'text-gray-900' : 'opacity-30'
		}`}
		on:click={() => updateEliteMods(false)}
	>
		<img src={combat_icon} width="50px" decoding="async" loading="lazy" alt="combat ops" class="" />
	</button>
	<button
		id="elite-toggle"
		class={`flex justify-center items-center ${eliteOpsColor} ${
			$eliteMode ? 'text-black' : 'opacity-30'
		}`}
		on:click={() => updateEliteMods(true)}
	>
		{#if ro4_SP7_BOSS_STAGES.includes(stageId)}
			<img
				src={relicLookup['rogue_4_relic_final_6']}
				width="50px"
				decoding="async"
				loading="lazy"
				alt="anasa"
				class=""
			/>
		{/if}
		<img
			src={emergency_icon}
			width="50px"
			decoding="async"
			loading="lazy"
			alt="elite ops"
			class=""
		/>
	</button>
</div>
