<script lang="ts">
	import { onMount } from 'svelte';

	export let waveData;

	let count, waves, canvasElement: HTMLCanvasElement;

	$: count = waveData.count;
	$: waves = waveData.waves;

	onMount(() => {
		// const game = new Game(config, enemies, canvasElement);
	});
</script>

<div>
	<canvas bind:this={canvasElement} />
</div>
