<script lang="ts">
	import type { Language } from '$lib/types';
	import { onDestroy, onMount } from 'svelte';
	import { GameConfig } from './objects/GameConfig';
	import enemyCount from '$lib/images/is/enemy_count.webp';
	import translations from '$lib/translations.json';

	export let game, initialCost, language: Language, count: number, randomSeeds;

	let state,
		card = GameConfig.tokenCard,
		totalTime = 0,
		min = 0,
		sec = 0,
		unsubscribeFns = [],
		isPaused = false;
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
		GameConfig.setValue("isPaused",!GameConfig.isPaused);
		GameConfig.state = 'running';
	}
	function handleReset() {
		randomSeeds = Array.from(Array(50)).map((_) => Math.random());
		game.softReset();
		GameConfig.setValue("isPaused",true);
	}
	// Sync class -> store
	let unsubscribe;
	onMount(() => {
		unsubscribe = GameConfig.subscribe('scaledElapsedTime', (value) => {
			totalTime = value;
		});
		unsubscribeFns.push(unsubscribe);
		unsubscribe = GameConfig.subscribe('waveElapsedTime', (value) => {
			totalTime = value;
			min = Math.floor(value / 60);
			sec = Math.floor(value % 60);
		});
		unsubscribeFns.push(unsubscribe);
		unsubscribe = GameConfig.subscribe('tokenCard', (value) => {
			card = value;
		});
		unsubscribeFns.push(unsubscribe);
		unsubscribe = GameConfig.subscribe('isPaused', (value) => {
			isPaused = value;
		});
		unsubscribeFns.push(unsubscribe);
	});

	onDestroy(() => {
		unsubscribeFns.forEach((fn) => fn());
	});
</script>

<div class="absolute z-[1] right-4 flex gap-x-4 mt-4">
	<button class="flex items-center justify-center w-[75px] h-[75px] border" on:click={handleReset}>
		R
	</button>
	<button
		class="flex items-center justify-center w-[75px] h-[75px] border"
		on:click={handleSpeedFactor}
	>
		{GameConfig.speedFactor}x
	</button>
	<button class="flex items-center justify-center w-[75px] h-[75px] border" on:click={handlePause}>
		{isPaused ? '>' : '||'}</button
	>
</div>

<div
	class="absolute left-1/2 -translate-x-1/2 mt-6 pb-0.5 bg-neutral-800 bg-opacity-80 pointer-events-none"
>
	<div class="flex items-center gap-x-1.5 px-4">
		<img src={enemyCount} width="40" alt={translations[language].enemy_count} class="shrink-0" />
		<span>{count ?? "-"}</span>
	</div>
	<p class="text-center text-sm mt-1.5 px-3">
		wave<sub>t</sub>
		{min}:{#if sec < 10}0{/if}{sec}
	</p>
</div>

<div class="absolute right-10 bottom-1/3 pointer-events-none">
	Cost: {Math.min(99, Math.floor(initialCost + totalTime))}
</div>

<div class="absolute bottom-0 right-0">
	{#if card?.count > 0}
		<button
			class="relative border border-[#ffffff80] {card.selected ? '' : 'opacity-50'}"
			on:click={() => {
				GameConfig.setValue('tokenCard', { ...card, selected: !card.selected });
			}}
		>
			<div class="absolute top-0 left-1/2 -translate-x-1/2 flex items-center">
				<!-- <img src="/images/chara_icons/token.webp" width="10" height="10" alt="" /> -->
				<span class="bg-black bg-opacity-80 px-1.5 text-sm">5</span>
			</div>
			<img src="/images/chara_icons/{card.key}.webp" width="75" height="75" alt="" />
			<span class="absolute right-2 bottom-0 text-sm">X{card.count}</span>
		</button>
	{/if}
</div>

{#if isPaused}
	<div
		class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 pointer-events-none"
	>
		<p>{GameConfig.state === 'end' ? "ENDED" : "PAUSED"} </p>
	</div>
{/if}
