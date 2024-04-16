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

<div class="md:mx-10">
	<div class="max-w-5xl mx-auto pt-6 md:pt-10 pb-4 text-[0.75rem] md:text-[0.875rem] {language}">
		<div class="bg-near-white text-almost-black rounded-md p-3 md:p-4">
			<p class="border-b text-center pb-1 md:pb-2">{translations[language].filter}</p>
			<div class="flex flex-col md:grid grid-cols-[100px_1fr] gap-3 mt-2 md:mt-3">
				{#each $filterOptions as { key, options }}
					<p class="md:py-[5px]">{translations[language][key]}:</p>
					{#if key === 'subProfessionId'}
						<div class="flex flex-col gap-2">
							{#each Object.keys(charaConst.subProfessionId) as subKey}
								{@const subOptions = charaConst.subProfessionId[subKey]}
								<div class="flex flex-wrap gap-2">
									{#each subOptions as value}
										{@const selected = options.find((ele) => ele.value === value)?.selected}
										<button class:active={selected} on:click={() => updateFilters(key, value)}>
											{translations[language][value]}
										</button>
									{/each}
								</div>
							{/each}
						</div>
					{:else}
						<div class="flex flex-wrap gap-2">
							{#each options as { value, selected }}
								<button class:active={selected} on:click={() => updateFilters(key, value)}>
									{translations[language][value]}
								</button>
							{/each}
						</div>
					{/if}
				{/each}
			</div>
			<button class="block mt-6 mx-auto hover:bg-slate-300" on:click={reset}
				>{translations[language].filter_reset}</button
			>
		</div>
		<div class="bg-near-white text-almost-black rounded-md p-3 md:p-4 mt-4">
			<p class="border-b text-center pb-1 md:pb-2">{translations[language].sort}</p>
			<div class="grid grid-cols-[auto_50px_1fr] gap-2 md:gap-3 mt-2 md:mt-3">
				<p>{translations[language].filter_option}</p>
				<p class="text-center">{translations[language].sort_priority}</p>
				<p />
				{#each $sortOptions as { key, order, priority, visible }}
					{#if visible}
						<p class="py-[5px]">{translations[language][key]}:</p>
						<p class="py-[5px] text-center">{priority || ''}</p>
						<div class="flex flex-wrap gap-2">
							<button class:active={order === 1} on:click={() => updateSortOptions(key, 1)}>
								{translations[language]['asc']}
							</button>
							<button class:active={order === -1} on:click={() => updateSortOptions(key, -1)}>
								{translations[language]['desc']}
							</button>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	button.active {
		background-color: rgb(2 132 199);
		color: rgb(242 242 242);
		border: 1px solid transparent;
	}
	.ja button,
	.zh button {
		min-width: 68px;
		padding: 0.25rem 0.75rem;
		border: 1px solid rgb(209 213 219);
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
	}
	@media only screen and (max-width: 640px) {
		.ja button,
		.zh button {
			min-width: 56px;
			padding: 0.25rem 0.5rem;
			border: 1px solid rgb(209 213 219);
		}
	}
</style>
