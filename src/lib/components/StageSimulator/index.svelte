<script lang="ts">
	import type { Enemy, MapConfig } from '$lib/types';
	import { onDestroy } from 'svelte';
	import { Game } from './objects/Game';
	import { AssetManager } from './objects/AssetManager';
	import LoadingScreen from './LoadingScreen.svelte';

	export let waveData, mapConfig: MapConfig, enemies: Enemy[];

	let count, waves;
	let assetManager: AssetManager, canvasElement: HTMLCanvasElement, game: Game;
	// let gameInstances: Game[] = [];

	$: count = waveData.count;
	$: waves = waveData.waves;

	$: if (waveData) {
		resetGame();
	}
	function resetGame() {
		if (game) {
			game.reset(mapConfig, waves, enemies);
		}
	}

	async function loadGame(mapConfig) {
		resetGame();
		assetManager = AssetManager.getInstance();
		await assetManager.loadAssets(mapConfig);
		if (!game) {
			game = new Game(canvasElement, mapConfig, waves, enemies);
			game.state = 'ready';
		}
	}

	onDestroy(() => {
		assetManager.cleanup();
		if (game) {
			game.cleanup();
		}
	});
</script>

<div class="relative">
	{#await loadGame(mapConfig)}
		<LoadingScreen />
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
	}
</style>
