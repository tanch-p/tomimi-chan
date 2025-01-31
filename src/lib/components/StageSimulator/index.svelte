<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Game } from './objects/Game';
	import { AssetManager } from './objects/AssetManager';
	import LoadingScreen from './LoadingScreen.svelte';

	export let waveData, mapConfig, enemies;

	let count, waves;
	let assetManager: AssetManager,
		canvasElement: HTMLCanvasElement,
		isLoading = true,
		game: Game;
	// let gameInstances: Game[] = [];

	$: count = waveData.count;
	$: waves = waveData.waves;

	$: if (mapConfig) {
		loadAssets(mapConfig.enemies);
		resetGame();
	}
	$: if (waveData) {
		resetGame();
	}
	function resetGame() {
		if (game) {
			game.reset(mapConfig,waves);
		}
	}

	async function loadAssets(enemies) {
		isLoading = true;
		if (assetManager) {
			await assetManager.loadAssets(enemies);
			assetManager.texturesLoaded = true;
			isLoading = false;
		}
	}

	onMount(async () => {
		isLoading = true;
		assetManager = AssetManager.getInstance();
		await assetManager.loadAssets(mapConfig.enemies);
		assetManager.texturesLoaded = true;
		isLoading = false;
		game = new Game(mapConfig, waves, canvasElement);
	});

	onDestroy(() => {
		if (game) {
			game.cleanup();
		}
	});
</script>

<div class="relative">
	{#if isLoading}
		<LoadingScreen />
	{/if}
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
