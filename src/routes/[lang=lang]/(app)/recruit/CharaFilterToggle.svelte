<script lang="ts">
	import { slide } from 'svelte/transition';
	import Icon from '$lib/components/Icon.svelte';

	export let title = 'title',
		isOpen = false,
		id='',
		className = '',
		titleClassName = '',
		innerClassName = '';

	const toggle = () => (isOpen = !isOpen);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="relative {className}">
	<button {id} class="block w-full relative p-3 hover:cursor-pointer {titleClassName}" on:click={toggle}>
		<p class={`text-center`}>{title}</p>
		<Icon
			name={isOpen ? 'icon-minus' : 'icon-plus'}
			className="absolute z-[1] right-2 top-[50%] -translate-y-[50%] w-4 h-4"
		/>
	</button>
	<slot name="triangle"/>
	{#if isOpen}
		<div transition:slide|local={{ duration: 300 }} class="relative {innerClassName}">
			<slot>No children given</slot>
		</div>
	{:else}
		<div transition:slide|local={{ duration: 300 }}>
			<slot name="selected" />
		</div>
	{/if}
</div>
