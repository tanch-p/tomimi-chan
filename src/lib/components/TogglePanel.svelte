<script lang="ts">
	import { slide } from 'svelte/transition';

	export let title = 'title',
		isOpen = false,
		size = 'large';

	const toggle = () => (isOpen = !isOpen);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="sm:px-6">
	<div
		class="flex justify-between items-center px-2 sm:px-0 hover:cursor-pointer"
		on:click={toggle}
	>
		<p class={`${size === "subheading" ? "text-subheading" : "text-3xl"}`}>{title}</p>
		{#if isOpen}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6 sm:w-8 sm:h-8 mt-2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
			</svg>
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6 sm:w-8 sm:h-8 mt-2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
			</svg>
		{/if}
	</div>
	<hr class="border-gray-500 my-1" />
	{#if isOpen}
		<div transition:slide|local={{ duration: 300 }}>
			<slot>No children given</slot>
		</div>
	{/if}
</div>
