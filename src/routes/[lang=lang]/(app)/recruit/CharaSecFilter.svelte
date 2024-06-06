<script lang="ts">
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import { secFiltersStore } from './stores';
	import { getOptionTranslation } from '$lib/functions/charaHelpers';
	import { parseConditions } from '$lib/functions/languageHelpers';
	import Icon from '$lib/components/Icon.svelte';

	export let language: Language;

	const updateSecFilters = (key, subKey, value, type = 'options') => {
		secFiltersStore.update((list) => {
			const catIndex = list.findIndex((ele) => ele.key === key);
			const subIndex = list[catIndex].list.findIndex((ele) => ele.subKey === subKey);
			switch (type) {
				case 'sign':
					if (list[catIndex].list[subIndex].sign === 'gte')
						list[catIndex].list[subIndex].sign = 'lte';
					else list[catIndex].list[subIndex].sign = 'gte';
					break;
				case 'value':
					if (!/\D/.test(value) && value) {
						list[catIndex].list[subIndex].value = parseInt(value);
					}
					break;
				default:
					const optionIndex = list[catIndex].list[subIndex].options.findIndex(
						(ele) => ele.value === value
					);
					list[catIndex].list[subIndex].options[optionIndex].selected =
						!list[catIndex].list[subIndex].options[optionIndex].selected;
			}

			return list;
		});
	};
	const reset = (key) => {
		secFiltersStore.update((list) => {
			const catIndex = list.findIndex((ele) => ele.key === key);
			console.log(list[catIndex].list[0].options);
			list[catIndex] = {
				key,
				list: list[catIndex].list.map((subItem) => {
					if (subItem.type === 'options')
						return {
							...subItem,
							options: subItem.options.map(({ value }) => {
								return { value, selected: false };
							})
						};
					else return subItem;
				})
			};
			return list;
		});
	};

	$: console.log($secFiltersStore);
</script>

{#if $secFiltersStore?.length > 0}
	<div class="bg-near-white text-almost-black rounded-md p-3 md:p-4 mt-5">
		<h2 class="border-b text-center pb-1 md:pb-2">
			{translations[language].filter_round2}
		</h2>
		<div class="flex flex-wrap sm:grid grid-cols-2 gap-3 mt-2">
			{#each $secFiltersStore as { key, list }}
				<div class="relative w-full rounded border p-3 bg-gray-200">
					<button class="flex ml-auto mt-1 pr-2" on:click={() => reset(key)}>
						<Icon name="trash" className="h-[18px] mt-[1px]" />
						{translations[language].filter_reset}
					</button>
					<p class="sm:text-center text-[#006EA1]">
						{getOptionTranslation(key, language)}
					</p>
					<div class="flex flex-col md:grid grid-cols-[auto_1fr] gap-2 md:gap-4 pt-2 md:pt-3">
						{#each list as { subKey, displayKey, type, options, sign, suffix }}
							{#if type === 'compare'}
								<div class="flex items-center gap-x-1.5 col-span-2">
									<span>
										{getOptionTranslation(
											key,
											language
										)}{#if language === 'en'}&nbsp;{/if}{translations[language][suffix]}
									</span>
									<button
										class="text-lg bg-gray-300 hover:bg-gray-400 rounded px-3"
										on:click={() => updateSecFilters(key, subKey, sign, 'sign')}
									>
										{#if sign === 'gte'}
											&ge;
										{:else}
											&le;
										{/if}
									</button>
									<input
										class="w-[50px] pl-1.5"
										value="0"
										on:input={(v) => updateSecFilters(key, subKey, v.currentTarget.value, 'value')}
										type="number"
										pattern="[0-9]*"
										inputmode="numeric"
									/>
								</div>
							{:else}
								{#if displayKey}
									<p class="md:py-[5px] mt-2 md:mt-0">
										{translations[language][displayKey]}
									</p>
								{/if}
								<div class="flex flex-wrap gap-2 {displayKey ? '' : 'col-span-2'} ">
									{#each options as { value, selected }}
										<button
											class="filter-btn"
											class:active={selected}
											on:click={() => updateSecFilters(key, subKey, value, type)}
										>
											{parseConditions(value, language)}
										</button>
									{/each}
								</div>
							{/if}
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.filter-btn {
		height: 30px;
		background-color: rgb(242 242 242);
		text-transform: capitalize;
	}
</style>
