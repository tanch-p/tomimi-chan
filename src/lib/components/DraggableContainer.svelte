<script lang="ts">
	import { createSlider } from '$lib/functions/slider';
	import { onMount } from 'svelte';

	export let className: string = '';

	let container: HTMLDivElement;

	onMount(() => {
		const slider = createSlider(container);
		return () => slider();
	});
</script>

<div
	bind:this={container}
	class="draggable-container-wrapper overflow-x-auto overflow-y-visible {className}"
>
	<slot />
</div>
