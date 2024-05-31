<script lang="ts">
	import type { PageData } from './$types';
	import type { sortOrder, Language } from '$lib/types';
	import { filters, sortOptions, globalCheck } from './stores';
	import { getMaxValue, getCharaList } from '$lib/functions/charaHelpers';
	import DisplayContainer from './DisplayContainer.svelte';
	import CharaFilter from './CharaFilter.svelte';
	import CharaFilterDesc from './CharaFilterDesc.svelte';
	import CharaSortOptions from './CharaSortOptions.svelte';
	import CharaPopup from './CharaPopup.svelte';
	import translations from '$lib/translations.json';
	import { onMount } from 'svelte';
	export let data: PageData;
	let language: Language;
	$: language = data.language;
	let loading = true;
	let characters = [];

	$: sortFunction = (a, b): sortOrder => {
		//filter out unselected options and sort by priority
		const sortedArr = Array.from($sortOptions.filter((ele) => ele.order)).sort(
			(a, b) => a.priority - b.priority
		);
		const values = sortedArr.map(({ key, order }) => {
			switch (key) {
				case 'rarity':
				case 'profession':
					return a[key].localeCompare(b[key]) * order;
				
				default:
					const valA = getMaxValue(a, key);
					const valB = getMaxValue(b, key);
					return (valA - valB) * order;
			}
		});
		return values.length > 0 ? values.reduce((acc, curr) => acc || curr) : 0;
	};
	onMount(async () => {
		characters = await getCharaList();
		loading = false;
	});
</script>

<svelte:head>
	<title>{translations[language].chara_page} / {translations[language].title_post}</title>
	<meta name="description" content={translations[language].title_post} />
	<meta property="og:description" content={translations[language].title_post} />
</svelte:head>

<div class="chara pb-40">
	<div class="sm:mx-10">
		<div class="max-w-5xl mx-auto pt-6 md:pt-10 pb-4 text-[0.75rem] md:text-[0.875rem] {language}">
			<CharaFilter {language} />
			<CharaSortOptions {language} />
		</div>
		{#if loading}
			<p class="text-center">{translations[language].data_loading}</p>
		{:else}
			<DisplayContainer
				characters={characters.filter($filters).filter($globalCheck).sort(sortFunction)}
				{language}
			/>
		{/if}
	</div>
	<CharaFilterDesc {language} />
	<CharaPopup {language} />
</div>
