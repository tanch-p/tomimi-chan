<script lang="ts">
	import { clickOutside } from '$lib/functions/clickOutside';
	import { selectedChara } from './stores';
</script>

<div class="overlay" class:visible={$selectedChara}>
	<div
		class:visible={$selectedChara}
		class="popup text-black"
		use:clickOutside
		on:outclick={() => selectedChara.set(null)}
	>
		<button class="text-black" on:click={() => selectedChara.set(null)}>x</button>
		{#if $selectedChara}
			{$selectedChara.appellation}
		{/if}
	</div>
</div>

<style>
	.overlay {
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 99;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.3s;
	}
	.popup {
		border-radius: 5px;
		width: min(calc(100% - 15px), 500px);
		position: fixed;
		background-color: white;
		inset: 0;
		min-height: 300px;
		max-height: 500px;
		margin: auto;
		pointer-events: none;
		transition: transform 0.3s, opacity 0.2s, -webkit-transform 0.3s;
		opacity: 0;
		overflow-y: auto;
	}
	.overlay.visible,
	.popup.visible {
		pointer-events: all;
		opacity: 1;
	}
</style>
