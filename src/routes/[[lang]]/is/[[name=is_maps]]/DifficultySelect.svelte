<script lang="ts">
	import { difficulty } from './stores.js';
	function updateDifficulty(n: number) {
		difficulty.update(() => n);
	}
	let selectedDifficulty: number;

	difficulty.subscribe((value) => {
		selectedDifficulty = value;
	});
	let difficulties = new Array(15);
</script>

<div class="w-[50%] mx-auto">
    <div class="text-center">Difficulty</div>
	<div class="grid grid-cols-5">
		{#each difficulties as n, i}
			<button
				on:click={() => updateDifficulty(i + 1)}
				class={`px-2 ${selectedDifficulty === i + 1 ? 'bg-gray-500' : ''}`}
				type="button"
			>
				{i + 1}
			</button>
		{/each}
	</div>
</div>
