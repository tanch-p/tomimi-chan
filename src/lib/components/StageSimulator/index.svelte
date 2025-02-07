<script lang="ts">
	import type { Enemy, MapConfig } from '$lib/types';
	import { onDestroy } from 'svelte';
	import { Game } from './objects/Game';
	import { AssetManager } from './objects/AssetManager';
	import LoadingScreen from './LoadingScreen.svelte';
	import Interface from './Interface.svelte';
	import SpawnTimeView from './SpawnTimeView.svelte';
	import Settings from './Settings.svelte';
	import { GameConfig } from './objects/GameConfig';

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
		GameConfig.isPaused = false;
		if (game) {
			game.reset(mapConfig, waves, enemies);
		}
	}

	async function loadGame(mapConfig) {
		if(game){
			game.stop();
		}
		if (!assetManager) {
			assetManager = AssetManager.getInstance();
		}
		await assetManager.loadAssets(mapConfig);
		resetGame();
		if (!game) {
			game = new Game(canvasElement, mapConfig, waves, enemies);
			game.state.set('ready');
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

<Settings {game} />
<div class="relative">
	{#await loadGame(mapConfig)}
		<LoadingScreen />
	{:then}
		<SpawnTimeView {game} {waves} />
		<Interface {game} initialCost={mapConfig.initialCost} />
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
