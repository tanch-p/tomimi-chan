<script lang="ts">
	import type { Language, sortOrder } from '$lib/types';
	import translations from '$lib/translations.json';
	import { updateSortPriority } from '$lib/functions/charaHelpers';

	export let language: Language, sortOptions;

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


<div class="bg-near-white text-almost-black rounded-md p-3 md:p-4 mt-4">
    <p class="border-b text-center pb-1 md:pb-2">{translations[language].sort}</p>
    <div class="grid grid-cols-[minmax(75px,auto)_50px_1fr] gap-2 md:gap-3 mt-2 md:mt-3">
        <p>{translations[language].filter_option}</p>
        <p class="text-center">{translations[language].sort_priority}</p>
        <p />
        {#each $sortOptions as { key, order, priority, visible }}
            {#if visible}
                <p class="py-[5px]">{translations[language][key]}:</p>
                <p class="py-[5px] text-center">{priority || ''}</p>
                <div class="flex flex-wrap gap-2">
                    <button class="filter-btn" class:active={order === 1} on:click={() => updateSortOptions(key, 1)}>
                        {translations[language]['asc']}
                    </button>
                    <button class="filter-btn" class:active={order === -1} on:click={() => updateSortOptions(key, -1)}>
                        {translations[language]['desc']}
                    </button>
                </div>
            {/if}
        {/each}
    </div>
</div>