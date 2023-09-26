<script lang="ts">
	export let filterOptions;

	const updateFilters = (key, value) => {
		filterOptions.update((list) => {
			const catIndex = list.findIndex((ele) => ele.key === key);
			const optionIndex = list[catIndex].options.findIndex((ele) => ele.value === value);
			list[catIndex].options[optionIndex].selected = !list[catIndex].options[optionIndex].selected;
			return list;
		});
	};
</script>

<div class="max-w-4xl mx-auto pt-20">
	<div class="grid grid-cols-[200px_1fr] gap-3 shadow-md pb-12 mb-8">
		{#each $filterOptions as { key, options }}
			<p>{key}:</p>
			<div class="flex flex-wrap gap-2">
				{#each options as { value, selected }}
					<button class={selected ? 'text-sky-500' : ''} on:click={() => updateFilters(key, value)}
						>{value}</button
					>
				{/each}
			</div>
		{/each}
	</div>
</div>
