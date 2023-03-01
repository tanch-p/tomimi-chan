<script lang="ts">
	import { eliteMods } from './stores.js';
	import { onDestroy } from 'svelte';

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
		class={`flex justify-center items-center py-3 bg-[#dea41b] hover:cursor-pointer ${
			!eliteMode ? 'text-gray-900' : 'opacity-30'
		}`}
		on:click={() => (eliteMode = false)}
	>
		<p>normal</p>
	</div>
	<div
		class={`flex justify-center items-center bg-[#cb710c]  hover:cursor-pointer ${
			eliteMode ? 'text-black' : 'opacity-30'
		}`}
		on:click={() => (eliteMode = true)}
	>
		<p>hard</p>
	</div>
</div>
