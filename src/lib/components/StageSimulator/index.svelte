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

	export let timeline, mapConfig: MapConfig, waveData, language:Language, enemies: Enemy[],randomSeeds;

	let waves;
	let assetManager: AssetManager, canvasElement: HTMLCanvasElement, game: Game;
	// let gameInstances: Game[] = [];

	$: waves = timeline?.waves;

	$: if (timeline) {
		resetGame();
	}

	function resetGame() {
		GameConfig.isPaused = true;
		if (game) {
			game.reset(mapConfig, waveData, enemies);
		}
	}

	async function loadGame(mapConfig) {
		if (game) {
			game.stop();
		}
		if (!assetManager) {
			assetManager = AssetManager.getInstance();
		}
		await assetManager.loadAssets(mapConfig);
		resetGame();
		if (!game) {
			game = new Game(canvasElement, mapConfig, waveData, enemies);
			GameConfig.state = 'ready';
		}
	}

	onDestroy(() => {
		assetManager.cleanup();
		assetManager.texturesLoaded = false;
		if (game) {
			game.cleanup();
		}
	});
</script>

<Settings {game} {mapConfig}/>
<div class="relative mt-4 md:mt-1.5">
	{#await loadGame(mapConfig)}
		<LoadingScreen />
	{:then}
		<SpawnTimeView {waves} {mapConfig} />
		<Interface bind:randomSeeds {game} initialCost={mapConfig.initialCost} {language} count={timeline?.count} maxCost={mapConfig.maxCost}/>
	{:catch error}
		<p class="text-center">An error occured while loading: <br />{error.message}</p>
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
