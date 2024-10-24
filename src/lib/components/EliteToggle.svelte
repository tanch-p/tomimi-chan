<script lang="ts">
	import { onDestroy } from 'svelte';
	import combat_icon from '$lib/images/is/combat_icon.webp';
	import emergency_icon from '$lib/images/is/emergency_icon.webp';
	import skzRelics from '$lib/data/is/sarkaz/relics_sarkaz.json';

	export let mapEliteMods: any,
		rogueTopic: string,
		eliteMods: any,
		selectedRelics: any,
		stageId: string;
	let eliteMode = false;

	//hotfix to set hardMode to false on nav to another stage with hardMods
	$: if (mapEliteMods) {
		updateEliteMods(false);
	}
	$: if (stageId === 'level_rogue4_b-7') {
		updateEliteMods(true);
	}
	const ro4_SP7_BOSS_STAGES = [
		'level_rogue4_b-4',
		'level_rogue4_b-4-b',
		'level_rogue4_b-5',
		'level_rogue4_b-5-b'
	];

	onDestroy(() => {
		eliteMods.set(null);
	});

	const getColors = (rogueTopic: string) => {
		switch (rogueTopic) {
			case 'rogue_sami':
				return ['bg-[#544a8a]', 'bg-[#8f3033]'];
			case 'rogue_mizuki':
				return ['bg-[#5645a4]', 'bg-[#92344e]'];
			case 'rogue_phantom':
				return ['bg-[#dea41b]', 'bg-[#cb710c]'];
			case 'rogue_skz':
				return ['bg-[#5a4b90]', 'bg-[#bb2210]'];
		}
		return [];
	};
	const updateEliteMods = (option: boolean) => {
		eliteMode = option;
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
		}
	};
	$: [combatOpsColor, eliteOpsColor] = getColors(rogueTopic);
</script>

{#if stageId !== 'level_rogue4_b-7'}
	<div class="grid grid-cols-2 font-bold text-lg text-gray-700 mt-8 mb-3 select-none">
		<button
			id="normal-toggle"
			class={`flex justify-center items-center py-1 ${combatOpsColor} ${
				!eliteMode ? 'text-gray-900' : 'opacity-30'
			}`}
			on:click={() => updateEliteMods(false)}
		>
			<img
				src={combat_icon}
				width="50px"
				decoding="async"
				loading="lazy"
				alt="combat ops"
				class=""
			/>
		</button>
		<button
			id="elite-toggle"
			class={`flex justify-center items-center ${eliteOpsColor} ${
				eliteMode ? 'text-black' : 'opacity-30'
			}`}
			on:click={() => updateEliteMods(true)}
		>
			<img
				src={emergency_icon}
				width="50px"
				decoding="async"
				loading="lazy"
				alt="combat ops"
				class=""
			/>
		</button>
	</div>
{/if}
