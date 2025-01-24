<script lang="ts">
	import { onMount } from 'svelte';
	import { Game } from './objects/Game';

	export let waveData, mapConfig, enemies;

	let count,
		waves,
		isMounted = false,
		game: Game,
		canvasElement: HTMLCanvasElement;

	$: count = waveData.count;
	$: waves = waveData.waves;

	$: if (isMounted && mapConfig && waveData) {
		if (!game) {
			game = new Game(mapConfig, enemies, waves, canvasElement);
		}
		else{
			
		}
	}

	onMount(() => {
		isMounted = true;
	});
</script>

<div>
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
