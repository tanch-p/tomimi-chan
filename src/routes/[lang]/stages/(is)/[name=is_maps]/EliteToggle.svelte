<script lang="ts">
	import { eliteMods } from './stores.js';
	import { onDestroy } from 'svelte';
	import combat_icon from '$lib/images/is/combat_icon.webp';
	import emergency_icon from '$lib/images/is/emergency_icon.webp';
	export let mapEliteMods;
	let eliteMode = false;
	$: eliteMode ? eliteMods.set(mapEliteMods) : eliteMods.set(null);
	//hotfix to set hardMode to false on nav to another stage with hardMods
	$: if (mapEliteMods) {
		eliteMode = false;
	}

	onDestroy(() => {
		eliteMods.set(null);
	});
</script>

<div class="grid grid-cols-2 font-bold text-lg text-gray-700 mt-8 mb-3 select-none">
	<div
		class={`flex justify-center items-center py-1 brightness-110 bg-[#4e3f95] hover:cursor-pointer ${
			!eliteMode ? 'text-gray-900' : 'opacity-30'
		}`}
		on:click={() => (eliteMode = false)}
	>
		<img src={combat_icon} width="50px" decoding="async" loading="lazy" alt="combat ops" class="" />
	</div>
	<div
		class={`flex justify-center items-center bg-[#852f47] brightness-110  hover:cursor-pointer ${
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
	</div>
</div>
