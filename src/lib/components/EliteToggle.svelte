<script lang="ts">
	import { onDestroy } from 'svelte';
	import combat_icon from '$lib/images/is/combat_icon.webp';
	import emergency_icon from '$lib/images/is/emergency_icon.webp';

	export let mapEliteMods: any, rogueTopic: string, eliteMods: any;
	let eliteMode = false;
	$: eliteMode ? eliteMods.set(mapEliteMods) : eliteMods.set(null);
	//hotfix to set hardMode to false on nav to another stage with hardMods
	$: if (mapEliteMods) {
		eliteMode = false;
	}

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
		}
		return [];
	};

	$: [combatOpsColor, eliteOpsColor] = getColors(rogueTopic);
</script>

<div class="grid grid-cols-2 font-bold text-lg text-gray-700 mt-8 mb-3 select-none">
	<button
		id="normal-toggle"
		class={`flex justify-center items-center py-1 ${combatOpsColor} ${
			!eliteMode ? 'text-gray-900' : 'opacity-30'
		}`}
		on:click={() => (eliteMode = false)}
	>
		<img src={combat_icon} width="50px" decoding="async" loading="lazy" alt="combat ops" class="" />
	</button>
	<button
		id="elite-toggle"
		class={`flex justify-center items-center ${eliteOpsColor} ${
			eliteMode ? 'text-black' : 'opacity-30'
		}`}
		on:click={() => (eliteMode = true)}
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
