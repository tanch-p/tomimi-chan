<script lang="ts">
	import { onDestroy } from 'svelte';
	import combat_icon from '$lib/images/is/combat_icon.webp';
	import emergency_icon from '$lib/images/is/emergency_icon.webp';

	export let mapEliteMods: any, rogueTopic: string, eliteMods: any, className="";

	$: if (mapEliteMods) {
		eliteMods.set(null);
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

<div class="grid grid-cols-2 font-bold text-lg text-gray-700 select-none {className}">
	<button
		id="normal-toggle"
		class={`flex justify-center items-center py-1 ${combatOpsColor} ${
			!$eliteMods ? 'text-gray-900' : 'opacity-30'
		}`}
		on:click={() => eliteMods.set(null)}
	>
		<img src={combat_icon} width="50px" decoding="async" loading="lazy" alt="combat ops" class="" />
	</button>
	<button
		id="elite-toggle"
		class={`flex justify-center items-center ${eliteOpsColor} ${
			$eliteMods ? 'text-black' : 'opacity-30'
		}`}
		on:click={() => eliteMods.set(mapEliteMods)}
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
