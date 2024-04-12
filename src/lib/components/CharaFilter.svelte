<script lang="ts">
	import type { Language, sortOrder } from '$lib/types';
	import translations from '$lib/translations.json';
	import { updateSortPriority } from '$lib/functions/charaHelpers';
	import charaConst from '$lib/data/chara/chara_const.json';

	export let filterOptions, language: Language, sortOptions;
	const updateFilters = (key, value) => {
		filterOptions.update((list) => {
			const catIndex = list.findIndex((ele) => ele.key === key);
			const optionIndex = list[catIndex].options.findIndex((ele) => ele.value === value);
			list[catIndex].options[optionIndex].selected = !list[catIndex].options[optionIndex].selected;
			return list;
		});
	};
	const reset = () => {
		filterOptions.update((list) =>
			list.map((ele) => {
				return {
					...ele,
					options: ele.options.map((option) => {
						return { ...option, selected: false };
					})
				};
			})
		);
	};
	const updateSortOptions = (key, order: sortOrder) => {
		sortOptions.update((list) => {
			const copy = Array.from(list);
			const index = list.findIndex((ele) => ele.key === key);
			if (index !== -1) {
				if (copy[index].order === order && list.filter((ele) => ele.order !== 0).length !== 1) {
					copy[index].order = 0;
					updateSortPriority(copy, index);
				} else {
					copy[index].order = order;
					if (!copy[index].priority) {
						copy[index].priority = copy.filter((ele) => ele.visible && ele.order !== 0).length;
					}
				}
			}

			list = copy;
			return list;
		});
	};
</script>

<div class="max-w-4xl mx-auto pt-20 shadow-md pb-12 mb-8">
	<p class="text-center">Filter</p>
	<div class="grid grid-cols-[200px_1fr] gap-3">
		{#each $filterOptions as { key, options }}
			<p>{translations[language][key]}:</p>
			{#if key === 'subProfessionId'}
				<div class="flex flex-col gap-2">
					{#each Object.keys(charaConst.subProfessionId) as subKey}
						{@const subOptions = charaConst.subProfessionId[subKey]}
						<div class="flex flex-wrap gap-x-2">
							{#each subOptions as value}
								{@const selected = options.find((ele) => ele.value === value)?.selected}
								<button
									class={selected ? 'text-sky-500' : ''}
									on:click={() => updateFilters(key, value)}
								>
									{translations[language][value]}
								</button>
							{/each}
						</div>
					{/each}
				</div>
			{:else}
				<div class="flex flex-wrap gap-2">
					{#each options as { value, selected }}
						<button
							class={selected ? 'text-sky-500' : ''}
							on:click={() => updateFilters(key, value)}
						>
							{translations[language][value]}
						</button>
					{/each}
				</div>
			{/if}
		{/each}
	</div>
	<button class="block my-4 mx-auto" on:click={reset}>Reset</button>

	<p class="text-center">Sort</p>
	<div class="grid grid-cols-[150px_50px_1fr] gap-3">
		{#each $sortOptions as { key, order, priority, visible }}
			{#if visible}
				<p>{translations[language][key]}:</p>
				<p>{priority || ''}</p>
				<div class="flex flex-wrap gap-2">
					<button
						class={order === 1 ? 'text-sky-500' : ''}
						on:click={() => updateSortOptions(key, 1)}
					>
						ascending
					</button>
					<button
						class={order === -1 ? 'text-sky-500' : ''}
						on:click={() => updateSortOptions(key, -1)}
					>
						descending
					</button>
				</div>
			{/if}
		{/each}
	</div>
</div>
