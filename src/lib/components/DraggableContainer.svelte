<script lang="ts">
	import { createSlider } from '$lib/functions/slider';
	import { onMount } from 'svelte';

	export let className: string = '';

	onMount(() => {
		const slider = createSlider('.draggable-container-wrapper');
		return () => slider();
	});
</script>

<div class="draggable-container-wrapper overflow-x-auto overflow-y-visible {className}">
	<slot />
</div>
