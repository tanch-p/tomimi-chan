<script lang="ts">
	import { slide } from 'svelte/transition';
	import Icon from './Icon.svelte';
	import { setLocalStorage } from '$lib/functions/lib';

	export let title = 'title',
		key = '',
		isOpen = false,
		size = 'large',
		className = '',
		titleIcon = '';

	const toggle = () => {
		isOpen = !isOpen;
		if (key === 'stageSim') {
			setLocalStorage('openStageSim', isOpen ? 1 : 0);
		}
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="sm:px-6 {className}">
	<div
		class="flex justify-between items-center px-2 sm:px-0 hover:cursor-pointer"
		on:click={toggle}
	>
		<div class="flex items-center gap-x-3">
			<h2 class={`${size === 'subheading' ? 'text-subheading' : 'text-3xl'}`}>{title}</h2>
			{#if titleIcon}
				<img src={titleIcon} width="40" height="40" loading="lazy" alt={''} />
			{/if}
		</div>
		{#if isOpen}
			<Icon name="icon-minus" className="w-6 h-6 sm:w-8 sm:h-8 mt-2" />
		{:else}
			<Icon name="icon-plus" className="w-6 h-6 sm:w-8 sm:h-8 mt-2" />
		{/if}
	</div>
	<hr class="border-gray-500 my-1" />
	{#if isOpen}
		<div transition:slide|local={{ duration: 300 }}>
			<slot>No children given</slot>
		</div>
	{/if}
</div>
