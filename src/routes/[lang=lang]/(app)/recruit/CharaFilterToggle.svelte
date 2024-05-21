<script lang="ts">
	import { slide } from 'svelte/transition';
	import Icon from '$lib/components/Icon.svelte';

	export let title = 'title',
		isOpen = false,
		className = '';

	const toggle = () => (isOpen = !isOpen);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class={className}>
	<div class="relative border-b pb-1 md:pb-2 hover:cursor-pointer" on:click={toggle}>
		<p class={`text-center`}>{title}</p>
		<Icon name={isOpen ? 'icon-minus' : 'icon-plus'} className="absolute right-2 top-0.5 w-4 h-4" />
	</div>
	{#if isOpen}
		<div transition:slide|local={{ duration: 300 }} class="relative">
			<slot>No children given</slot>
		</div>
	{/if}
</div>
