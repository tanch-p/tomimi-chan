<script lang="ts">
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import filterOptions from '$lib/data/chara/filter_options.json';
	import CharaFilterToggle from './CharaFilterToggle.svelte';

	export let filtersStore, language: Language;

	const filterLayout = ['rarity', 'profession', ['subProfessionId', 'groups'], 'status_ailment'];

	$: isSelected = (key, value) => {
		return $filtersStore.find((ele) => ele.key === key).options.find((ele) => ele.value === value)
			?.selected;
	};

	const updateFilters = (key, value) => {
		filtersStore.update((list) => {
			const catIndex = list.findIndex((ele) => ele.key === key);
			const optionIndex = list[catIndex].options.findIndex((ele) => ele.value === value);
			list[catIndex].options[optionIndex].selected = !list[catIndex].options[optionIndex].selected;
			return list;
		});
	};
	const reset = () => {
		filtersStore.update((list) =>
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
</script>

<div class="bg-near-white text-almost-black rounded-md p-3 md:p-4">
	<p class="border-b text-center pb-1 md:pb-2">{translations[language].filter}</p>
	<div class="flex flex-col md:grid grid-cols-[100px_1fr] gap-3 mt-2 md:mt-3">
		<p class="md:py-[5px]">{translations[language]['rarity']}:</p>
		<div class="flex flex-wrap gap-2">
			{#each filterOptions['rarity'] as value}
				<button
					class="filter-btn"
					class:active={isSelected('rarity', value)}
					on:click={() => updateFilters('rarity', value)}
				>
					{translations[language][value]}
				</button>
			{/each}
		</div>
		<p class="md:py-[5px]">{translations[language]['profession']}:</p>
		<div class="flex flex-wrap gap-2">
			{#each filterOptions['profession'] as value}
				<button
					class="filter-btn"
					class:active={isSelected('profession', value)}
					on:click={() => updateFilters('profession', value)}
				>
					{translations[language][value]}
				</button>
			{/each}
		</div>
	</div>
	<CharaFilterToggle
		title="{translations[language].subProfessionId}/{translations[language].group}"
	>
		<div class="flex flex-col md:grid grid-cols-[100px_1fr] gap-3 mt-2 md:mt-3">
			<p class="md:py-[5px]">{translations[language]['subProfessionId']}:</p>
			<div class="flex flex-col gap-2">
				{#each Object.keys(filterOptions.subProfessionId) as subKey}
					{@const subOptions = filterOptions.subProfessionId[subKey]}
					<div class="flex flex-wrap gap-2">
						{#each subOptions as value}
							<!-- {@const selected = options.find((ele) => ele.value === value)?.selected} -->
							<button
								class="filter-btn"
								class:active={isSelected('subProfessionId', value)}
								on:click={() => updateFilters('subProfessionId', value)}
							>
								{translations[language][value]}
							</button>
						{/each}
					</div>
				{/each}
			</div>
			<p class="md:py-[5px]">{translations[language]['group']}:</p>
			<div class="flex flex-wrap gap-2">
				{#each filterOptions['group'] as value}
					<button
						class="filter-btn"
						class:active={isSelected('group', value)}
						on:click={() => updateFilters('group', value)}
					>
						{translations[language][value]}
					</button>
				{/each}
			</div>
		</div>
	</CharaFilterToggle>
	<p class="border-b text-center pb-1 md:pb-2 mt-4">{translations[language].filter_ability}</p>
	<div class="flex flex-col md:grid grid-cols-[100px_1fr] gap-3 mt-2 md:mt-3">
		<p class="md:py-[5px]">{translations[language]['status_ailment']}:</p>
		<div class="flex flex-wrap gap-2">
			{#each filterOptions['status_ailment'] as value}
				<button
					class="filter-btn"
					class:active={isSelected('status_ailment', value)}
					on:click={() => updateFilters('status_ailment', value)}
				>
					{translations[language][value]}
				</button>
			{/each}
		</div>
	</div>
	<button class="filter-btn block mt-6 mx-auto active:bg-slate-300" on:click={reset}>
		{translations[language].filter_reset}
	</button>
</div>
