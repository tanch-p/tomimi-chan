<script lang="ts">
	import { onMount } from 'svelte';
	import { Game } from './objects/Game';

	export let waveData,mapConfig, enemies;

	let count, waves, canvasElement: HTMLCanvasElement;

	$: count = waveData.count;
	$: waves = waveData.waves;

	onMount(() => {
		const game = new Game(mapConfig, enemies, waves, canvasElement);
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