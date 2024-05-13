<script lang="ts">
	import type { Language } from '$lib/types';
	import { filtersStore, relicFiltersStore, rogueTopic } from './stores';
	import translations from '$lib/translations.json';
	import filterOptions from '$lib/data/chara/filter_options.json';
	import CharaFilterToggle from './CharaFilterToggle.svelte';
	import relics from '$lib/data/chara/relics_chara.json';
	import { relicLookup } from '$lib/data/relic_lookup';
	import { charaAssets } from '$lib/data/chara/chara_assets';
	import Icon from '$lib/components/Icon.svelte';

	export let language: Language;
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
	$: isRelicSelected = (id) => {
		return $relicFiltersStore.find((relic) => relic.id === id)?.selected;
	};
	const updateRelicFilters = (id) => {
		relicFiltersStore.update((list) => {
			const index = list.findIndex((ele) => ele.id === id);
			list[index].selected = !list[index].selected;
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
		relicFiltersStore.update((list) =>
			list.map((ele) => {
				return { ...ele, selected: false };
			})
		);
	};
</script>

<div class="bg-near-white text-almost-black rounded-md p-3 md:p-4">
	<h2 class="border-b text-center pb-1 md:pb-2">
		{translations[language].filter}
	</h2>
	<button class="flex ml-auto mt-1 pr-2" on:click={reset}>
		<Icon name="trash" className="h-[18px]" />
		{translations[language].filter_reset}
	</button>
	<div class="flex flex-col md:grid grid-cols-[100px_1fr] gap-3 pt-2 md:pt-3">
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
	<CharaFilterToggle title={translations[language].subProfessionId}>
		<div class="flex flex-col md:grid grid-cols-[100px_1fr] gap-3 pt-2 md:pt-3">
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
		</div>
	</CharaFilterToggle>
	<CharaFilterToggle title={translations[language].group}>
		<div class="flex flex-col md:grid grid-cols-[100px_1fr] gap-3 pt-2 md:pt-3">
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
	<CharaFilterToggle title={translations[language].enemy_debuff} isOpen={true}>
		<div class="flex flex-col md:grid grid-cols-[100px_1fr] gap-3 pt-2 md:pt-3">
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
			<p class="md:py-[5px]">{translations[language]['special_debuff']}:</p>
			<div class="flex flex-wrap gap-2">
				{#each filterOptions['debuff'] as value}
					<button
						class="filter-btn"
						class:active={isSelected('debuff', value)}
						on:click={() => updateFilters('debuff', value)}
					>
						{translations[language][value]}
					</button>
				{/each}
			</div>
			<p class="md:py-[5px]">{translations[language]['stats']}:</p>
		</div>
	</CharaFilterToggle>
	<CharaFilterToggle title={translations[language].ally_buff}>
		<div class="flex flex-col md:grid grid-cols-[100px_1fr] gap-3 pt-2 md:pt-3">
			<p class="md:py-[5px]">{translations[language]['buff']}:</p>
			<div class="flex flex-wrap gap-2">
				{#each filterOptions['buff'] as value}
					<button
						class="filter-btn"
						class:active={isSelected('buff', value)}
						on:click={() => updateFilters('buff', value)}
					>
						{translations[language][value]}
					</button>
				{/each}
			</div>
		</div></CharaFilterToggle
	>
	<CharaFilterToggle title={translations[language].self_buff} />
	<CharaFilterToggle title={translations[language].others} />
	<CharaFilterToggle title={translations[language].is_title}>
		<div class="flex md:justify-center gap-3 pt-2 md:pt-3">
			{#each Object.keys(relics) as topic}
				<button
					class:active={$rogueTopic === topic}
					class="filter-btn"
					on:click={() => rogueTopic.set(topic)}
				>
					{translations[language][topic]}
				</button>
			{/each}
		</div>
		<div class="flex flex-col md:grid grid-cols-[100px_1fr] gap-3 pt-2 md:pt-3">
			<p class="md:py-[5px]">{translations[language]['rogue_relic']}:</p>
			<div class="flex flex-col gap-3">
				{#each relics[$rogueTopic] as relic}
					<button
						class="grid grid-cols-[100px_1fr] gap-2 text-left"
						class:bg-slate-300={isRelicSelected(relic.id)}
						on:click={() => updateRelicFilters(relic.id)}
					>
						<img
							src={relicLookup[relic['id']]}
							alt={relic[`name_${language}`] || relic['name_zh']}
							width="100"
							height="100"
							loading="lazy"
							decoding="async"
						/>
						<div class="px-2">
							<p class="text-base">
								{relic[`name_${language}`] || relic['name_zh']}
							</p>
							<p class="">{relic[`desc_${language}`] || relic['desc_zh']}</p>
						</div>
					</button>
				{/each}
			</div>
		</div>
	</CharaFilterToggle>
	<button class="filter-btn block mt-6 mx-auto active:bg-slate-300" on:click={reset}>
		{translations[language].filter_reset}
	</button>
</div>
