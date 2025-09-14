<script lang="ts">
	import type { Enemy, Language, MapConfig } from '$lib/types';
	import { onDestroy } from 'svelte';
	import { Game } from './objects/Game';
	import { AssetManager } from './objects/AssetManager';
	import LoadingScreen from './LoadingScreen.svelte';
	import Interface from './Interface.svelte';
	import SpawnTimeView from './SpawnTimeView.svelte';
	import Settings from './Settings.svelte';
	import { GameConfig } from './objects/GameConfig';
	import { getSimulatedData } from './functions/Simulator';
	import BranchSummons from './BranchSummons.svelte';
	import { generateBranchTimeline } from '$lib/functions/waveHelpers';
	import { simMode } from './stores';

	export let timeline, mapConfig: MapConfig, waveData, language: Language, enemies: Enemy[];

	let branchKey = null,
		branchIndex = -1;
	let assetManager = AssetManager.getInstance(),
		canvasElement: HTMLCanvasElement,
		game: Game,
		simulatedData;

	$: if (timeline) {
		resetGame();
	}
	$: if (waveData) {
		simulatedData = getSimulatedData(mapConfig, waveData, enemies);
	}

	function resetGame() {
		if (game) {
			game.reset(mapConfig, waveData, enemies);
		}
	}

	async function loadGame(mapConfig) {
		if (game) {
			game.stop();
		}

		await assetManager.loadAssets(mapConfig);
		assetManager.texturesLoaded = true;
		resetGame();
		if (!game) {
			game = new Game(canvasElement, mapConfig, waveData, enemies);
			GameConfig.state = 'ready';
		}
	}

	simMode.subscribe((v) => {
		GameConfig.mode = v;
		game && assetManager.texturesLoaded && game.softReset(false);
	});

	onDestroy(() => {
		assetManager.cleanup();
		assetManager.texturesLoaded = false;
		if (game) {
			game.cleanup();
		}
	});
</script>

<Settings {game} {mapConfig} />
<div class="relative mt-4 md:mt-1.5 max-w-full overflow-hidden">
	{#await loadGame(mapConfig)}
		<LoadingScreen />
	{:then}
		{#if $simMode === 'wave_summons' && mapConfig.branches}
			<BranchSummons bind:branchKey bind:branchIndex {language} {game} {mapConfig} />
		{/if}
		<SpawnTimeView
			{branchKey}
			{branchIndex}
			waves={$simMode === 'wave_summons'
				? generateBranchTimeline(mapConfig, branchKey, branchIndex)
				: timeline.waves}
			{mapConfig}
		/>
		<Interface
			{simulatedData}
			{game}
			initialCost={mapConfig.initialCost}
			{language}
			count={timeline?.count}
			maxCost={mapConfig.maxCost}
		/>
		<!-- {:catch error} -->
		<!-- <p class="text-center">An error occured while loading: <br />{error.message}</p> -->
	{/await}
	<canvas bind:this={canvasElement} />
</div>

<style>
	canvas {
		width: 100%;
		height: 100%;
		display: block;
		margin: 0 auto;
		touch-action: none; /* Prevents default touch behaviors on mobile */
	}
</style>
