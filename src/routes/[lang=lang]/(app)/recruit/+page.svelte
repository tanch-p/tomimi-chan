<script lang="ts">
	import type { PageData } from './$types';
	import type { Language } from '$lib/types';
	import { filters, secFilters, globalCheck, sortFunction, secFilterOptions } from './stores';
	import { getCharaList, genSecFilterOptions } from '$lib/functions/charaHelpers';
	import DisplayContainer from './DisplayContainer.svelte';
	import CharaFilter from './CharaFilter.svelte';
	import CharaFilterDesc from './CharaFilterDesc.svelte';
	import CharaSortOptions from './CharaSortOptions.svelte';
	import CharaSecFilter from './CharaSecFilter.svelte';
	import CharaPopup from './CharaPopup.svelte';
	import translations from '$lib/translations.json';
	import { onMount } from 'svelte';
	import ClearButton from './ClearButton.svelte';
	export let data: PageData;
	let language: Language;
	$: language = data.language;
	let loading = true;
	let characters = [];

	const loadData = async (language) => {
		loading = true;
		characters = await getCharaList(language);
		loading = false;
	};
	$: console.log($secFilterOptions);
	onMount(async () => {
		await loadData(language);
		secFilterOptions.set(genSecFilterOptions(characters));
	});
	$: if (language) {
		loadData(language);
	}
</script>

<svelte:head>
	<title>{translations[language].chara_page} / {translations[language].title_post}</title>
	<meta name="description" content={translations[language].title_post} />
	<meta property="og:description" content={translations[language].title_post} />
</svelte:head>

<ClearButton {language}/>
<div class:loading class="chara pb-60">
	<div class="sm:mx-10">
		<div class="max-w-5xl mx-auto pt-6 md:pt-10 pb-4 text-[0.75rem] md:text-[0.875rem] {language}">
			<CharaFilter {language} />
			<CharaSortOptions {language} />
			<CharaSecFilter {language} />
		</div>
		{#if loading}
			<p class="text-center">{translations[language].data_loading}</p>
		{:else}
			<DisplayContainer
				characters={characters
					.filter($globalCheck)
					.filter($filters)
					.sort($sortFunction)}
				{language}
			/>
		{/if}
	</div>
	<CharaFilterDesc {language} />
	<CharaPopup {language} />
</div>

<style>
	:global(.loading .filter-btn) {
		pointer-events: none;
		cursor: not-allowed;
	}
</style>
