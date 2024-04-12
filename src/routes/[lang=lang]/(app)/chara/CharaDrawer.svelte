<script lang="ts">
	import { clickOutside } from '$lib/functions/clickOutside';
	import { selectedChara } from './stores';
</script>

<div
	class:visible={$selectedChara}
	class="drawer text-black"
	use:clickOutside
	on:outclick={() => selectedChara.set(null)}
>
	<button class="text-black" on:click={() => selectedChara.set(null)}>x</button>
	{#if $selectedChara}
		{$selectedChara.appellation}
	{/if}
</div>

<style>
	.drawer {
		width: 600px;
		position: fixed;
		right: 0;
		z-index: 10;
		top: 0px;
		height: 100%;
		pointer-events: none;
		overflow: hidden;
		transition: 250ms transform;
		transform: translate(100%);
		background-color: #f2f2f2;
		box-shadow: 0 4px 16px #0d131e1a;
	}
	.drawer.visible {
		pointer-events: all;
		transform: translate(0px);
	}
</style>
