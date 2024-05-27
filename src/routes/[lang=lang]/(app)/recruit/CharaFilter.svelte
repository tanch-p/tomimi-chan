<script lang="ts">
	import type { Language } from '$lib/types';
	import { filtersStore, relicFiltersStore, rogueTopic, releaseStatusStore } from './stores';
	import translations from '$lib/translations.json';
	import filterOptions from '$lib/data/chara/filter_options.json';
	import CharaFilterToggle from './CharaFilterToggle.svelte';
	import relics from '$lib/data/chara/relics_chara.json';
	import { relicLookup } from '$lib/data/relic_lookup';
	import Icon from '$lib/components/Icon.svelte';
	import { cookiesEnabled } from '../../../stores';
	import { browser } from '$app/environment';
	import { getCategory, getSelectedFilterOptions } from '$lib/functions/charaHelpers';

	export let language: Language;

	const filterLayout = [
		{
			title: 'enemy_debuff',
			categories: [
				{ catKey: 'stats_debuff', optionKey: 'enemy_stats' },
				{ catKey: 'status_ailment', optionKey: 'status_ailment' },
				{ catKey: 'buff_special', optionKey: 'debuff_special' },
				{ catKey: 'damage_scale', optionKey: 'damage_scale' }
			]
		},
		{
			title: 'ally_buff',
			categories: [
				{ catKey: 'stats_buff', optionKey: 'ally_stats' },
				{ catKey: 'atk_cat', optionKey: 'ally_atk_buffs' },
				{ catKey: 'def_cat', optionKey: 'ally_def_buffs' },
				{ catKey: 'status_ailment', optionKey: 'ally_status_buffs' },
				{ catKey: 'heal_buff', optionKey: 'ally_heal_buffs' },
				{ catKey: 'buff_sp', optionKey: 'ally_sp_buffs' },
				{ catKey: 'others', optionKey: 'ally_others' }
			]
		},
		{
			title: 'self_buff',
			categories: [
				{ catKey: 'stats_buff', optionKey: 'self_stats' },
				{ catKey: 'atk_cat', optionKey: 'self_atk_buffs' },
				{ catKey: 'def_cat', optionKey: 'self_def_buffs' },
				{ catKey: 'status_ailment', optionKey: 'self_status_buffs' },
				{ catKey: 'heal_buff', optionKey: 'self_heal_buffs' },
				{ catKey: 'buff_sp', optionKey: 'self_sp_buffs' }
			]
		},
		{
			title: 'others',
			categories: [
				{ catKey: 'buff_tags', optionKey: 'buff_tags' },
				{ catKey: 'skill', optionKey: 'skill' },
				{ catKey: 'buff_special', optionKey: 'others' },
				{ catKey: 'terrain', optionKey: 'terrain' }
			]
		}
	];

	$: isSelected = (key, value) => {
		return $filtersStore.find((ele) => ele.key === key).options.find((ele) => ele.value === value)
			?.selected;
	};
	let relicDisplayMode = 'grid';
	let selectedRelics = [];

	const updateFilters = (key, value) => {
		filtersStore.update((list) => {
			const catIndex = list.findIndex((ele) => ele.key === key);
			const optionIndex = list[catIndex].options.findIndex((ele) => ele.value === value);
			list[catIndex].options[optionIndex].selected = !list[catIndex].options[optionIndex].selected;
			return list;
		});
	};
	relicFiltersStore.subscribe((list) => {
		selectedRelics = list.filter((relic) => relic.selected);
	});
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
	const updateReleaseStatus = (val) => {
		releaseStatusStore.set(val);
		if (browser && cookiesEnabled) {
			localStorage.setItem('releaseStatus', val);
		}
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

<div class="grid gap-5 text-almost-black">
	<div class="bg-near-white rounded-md p-3 md:p-4">
		<h2 class="border-b text-center pb-1 md:pb-2">
			{translations[language].filter}
		</h2>
		<button class="flex ml-auto mt-1 pr-2" on:click={reset}>
			<Icon name="trash" className="h-[18px]" />
			{translations[language].filter_reset}
		</button>
		<div class="flex flex-col md:grid grid-cols-[100px_1fr] gap-3 pt-2 md:pt-3">
			<p class="md:py-[5px]">{translations[language].chara_filter.release_status}</p>
			<div class="flex flex-wrap gap-2">
				{#each ['global', 'cn'] as value}
					<button
						class="filter-btn"
						class:active={$releaseStatusStore === value}
						on:click={() => updateReleaseStatus(value)}
					>
						{translations[language].chara_filter[value]}
					</button>
				{/each}
			</div>
			<p class="md:py-[5px]">{translations[language]['rarity']}</p>
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
			<p class="md:py-[5px]">{translations[language]['profession']}</p>
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
			<p class="md:py-[5px]">{translations[language]['deployable_tile']}</p>
			<div class="flex flex-wrap gap-2">
				{#each filterOptions['deployable_tile'] as { key, value }}
					<button
						class="filter-btn"
						class:active={isSelected('deployable_tile', value)}
						on:click={() => updateFilters('deployable_tile', value)}
					>
						{translations[language][key]}
					</button>
				{/each}
			</div>
			<p class="md:py-[5px]">{translations[language].damage_type}</p>
			<div class="flex flex-wrap gap-2">
				{#each filterOptions['damage_type'] as value}
					<button
						class="filter-btn"
						class:active={isSelected('damage_type', value)}
						on:click={() => updateFilters('damage_type', value)}
					>
						{translations[language][value]}
					</button>
				{/each}
			</div>
			<p class="md:py-[5px]">{translations[language].table_headers.blockCnt}</p>
			<div class="flex flex-wrap gap-2">
				{#each filterOptions['blockCnt'] as value}
					<button
						class="filter-btn"
						class:active={isSelected('blockCnt', value)}
						on:click={() => updateFilters('blockCnt', value)}
					>
						{value}
					</button>
				{/each}
			</div>
		</div>
		<CharaFilterToggle
			title={translations[language].subProfessionId}
			className="mt-2"
			titleClassName="border-b"
		>
			<div class="flex flex-col md:grid grid-cols-[100px_1fr] gap-3 pt-2 md:pt-3">
				<p class="hidden sm:block md:py-[5px]">{translations[language]['subProfessionId']}</p>
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
		<CharaFilterToggle
			title={translations[language].group}
			className="mt-1.5"
			titleClassName="border-b"
		>
			<div class="flex flex-col md:grid grid-cols-[100px_1fr] gap-3 pt-2 md:pt-3">
				<p class="hidden sm:block md:py-[5px]">{translations[language]['group']}</p>
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
	</div>
	{#each filterLayout as { title, categories }}
		{@const selectedOptions = getSelectedFilterOptions(categories, $filtersStore)}
		<div class="bg-near-white rounded-md">
			<CharaFilterToggle
				title={translations[language][title]}
				isOpen={true}
				innerClassName="border-t py-3 mx-3 md:py-4 md:mx-4"
			>
				<div class="flex flex-col md:grid grid-cols-[100px_1fr] gap-3">
					{#each categories as { catKey, optionKey }}
						<p class="md:py-[5px]">{translations[language][catKey]}</p>
						<div class="flex flex-wrap gap-2">
							{#each filterOptions[optionKey] as { key, value }}
								<button
									class="filter-btn"
									class:active={isSelected(getCategory(value), value)}
									on:click={() => updateFilters(getCategory(value), value)}
								>
									{translations[language].table_headers[key] ?? translations[language][key]}
								</button>
							{/each}
						</div>
					{/each}
				</div>
				<div slot="selected">
					{#if selectedOptions.length > 0}
						<div class="flex flex-wrap gap-2 border-t py-3 mx-3 md:mx-4">
							{#each selectedOptions as { key, value }}
								<button
									class="relative filter-btn"
									class:active={isSelected(getCategory(value), value)}
									on:click={() => updateFilters(getCategory(value), value)}
								>
									{translations[language].table_headers[key] ?? translations[language][key]}
								</button>
							{/each}
						</div>
					{/if}
				</div>
			</CharaFilterToggle>
		</div>
	{/each}
	<div class="bg-near-white rounded-md">
		<CharaFilterToggle
			title={translations[language].is_title}
			innerClassName="border-t py-3 md:py-4 md:mx-4"
		>
			<div
				class="md:absolute right-0 float-right md:float-none flex items-center gap-x-2 w-max ml-auto"
			>
				<button
					class="display-style-button rounded-full p-[9px]"
					class:active={relicDisplayMode === 'grid'}
					on:click={() => (relicDisplayMode = 'grid')}
				>
					<Icon name="grid-view" size={24} className="fill-black" />
				</button>
				<button
					class="display-style-button rounded-full p-[10px]"
					class:active={relicDisplayMode === 'list'}
					on:click={() => (relicDisplayMode = 'list')}
				>
					<Icon name="icon-list" size={22} />
				</button>
			</div>
			<div class="flex md:justify-center gap-3 pt-2">
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
			<div class="flex flex-col md:grid grid-cols-[100px_1fr] gap-3 pt-2 md:pt-5">
				<p class="md:py-[5px]">{translations[language]['rogue_relic']}</p>
				<div class="gap-3 {relicDisplayMode === 'grid' ? 'flex flex-wrap' : 'flex flex-col'}">
					{#each relics[$rogueTopic] as relic}
						<button
							class="gap-2 {relicDisplayMode === 'grid'
								? 'text-center'
								: 'grid grid-cols-[100px_1fr] text-left'} "
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
								class="mx-auto"
							/>
							<div class="px-2">
								<p class="text-base">
									{relic[`name_${language}`] || relic['name_zh']}
								</p>
								{#if relicDisplayMode === 'list'}
									<p class="">{relic[`desc_${language}`] || relic['desc_zh']}</p>
								{/if}
							</div>
						</button>
					{/each}
				</div>
			</div>
			<div slot="selected">
				{#if selectedRelics.length > 0}
					<div class="flex flex-wrap gap-2 border-t py-3 mx-3">
						{#each selectedRelics as { id }}
							{@const relic = relics[$rogueTopic].find((ele) => ele.id === id)}
							<button
								class="text-center"
								class:bg-slate-300={isRelicSelected(relic.id)}
								on:click={() => updateRelicFilters(relic.id)}
							>
								<img
									src={relicLookup[relic['id']]}
									alt={relic[`name_${language}`] || relic['name_zh']}
									width="75"
									height="75"
									loading="lazy"
									decoding="async"
									class="mx-auto"
								/>
								<div class="px-2">
									<p class="text-sm">
										{relic[`name_${language}`] || relic['name_zh']}
									</p>
								</div>
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</CharaFilterToggle>
	</div>
</div>

<style>
	.filter-btn {
		height: 30px;
	}
	.display-style-button {
		background-color: dimgrey;
		opacity: 0.4;
	}
	.display-style-button.active {
		opacity: 1;
	}
</style>
