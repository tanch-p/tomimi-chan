<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { GameConfig } from './objects/GameConfig';

	export let game, initialCost;

	let state,
		totalTime = 0,
		min = 0,
		sec = 0;
	function handleSpeedFactor() {
		switch (GameConfig.speedFactor) {
			case 1:
				return (GameConfig.speedFactor = 2);
			case 2:
				return (GameConfig.speedFactor = 4);
			case 4:
				return (GameConfig.speedFactor = 1);
		}
	}
	function handlePause() {
		GameConfig.isPaused = !GameConfig.isPaused;
	}
	// Sync class -> store
	let unsubscribe;
	onMount(() => {
		unsubscribe = GameConfig.subscribe('scaledElapsedTime', (value) => {
			totalTime = value;
			min = Math.floor(value / 60);
			sec = Math.floor(value % 60);
		});
	});

	onDestroy(() => {
		if (unsubscribe) unsubscribe();
	});
</script>

{#if GameConfig.state === 'ready'}
	<div
		class="absolute z-[2] inset-0 flex items-center justify-center bg-black bg-opacity-10 pointer-events-none"
	>
		<p>Touch to begin</p>
	</div>
{/if}
{#if GameConfig.state === 'end'}
	<div
		class="absolute z-[2] inset-0 flex items-center justify-center bg-black bg-opacity-10 pointer-events-none"
	>
		<p>Ended</p>
	</div>
{/if}

<div class="absolute z-[1] right-4 flex gap-x-4 mt-4">
	<button
		class="flex items-center justify-center w-[75px] h-[75px] border"
		on:click={handleSpeedFactor}
	>
		{GameConfig.speedFactor}x
	</button>
	<button class="flex items-center justify-center w-[75px] h-[75px] border" on:click={handlePause}>
		{GameConfig.isPaused ? '>' : '||'}</button
	>
</div>

<div class="absolute left-1/2 -translate-x-1/2 mt-6">
	<p>
		{min}:{#if sec < 10}0{/if}{sec}
	</p>
</div>

<div class="absolute right-10 bottom-1/3 select-none">
	Cost: {Math.min(99, Math.floor(initialCost + totalTime))}
</div>

{#if GameConfig.isPaused}
	<div
		class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 pointer-events-none"
	>
		<p>PAUSED</p>
	</div>
{/if}
