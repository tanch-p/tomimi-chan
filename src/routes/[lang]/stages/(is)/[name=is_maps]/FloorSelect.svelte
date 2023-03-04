<script lang="ts">
	import { selectedFloor } from './stores.js';
	let floors = new Array(6);
</script>

<div class="w-[50%] mx-auto">
	<div class="text-center">Floor</div>
	<div class="grid grid-cols-6">
		{#each floors as n, i}
			<button
				on:click={() => selectedFloor.set(i + 1)}
				class={`px-2 ${$selectedFloor === i + 1 ? 'bg-gray-500' : ''}`}
				type="button"
			>
				{i + 1}
			</button>
		{/each}
	</div>
</div>
