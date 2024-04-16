<script lang="ts">
	import type { PageData } from './$types';
	import type { sortOrder, Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import CharaDisplay from '$lib/components/CharaDisplay.svelte';
	import CharaFilter from '$lib/components/CharaFilter.svelte';
	import { filters, filterOptions, sortOptions, selectedChara } from './stores';
	import CharaFilterDesc from '$lib/components/CharaFilterDesc.svelte';
	import { getMaxValue } from '$lib/functions/charaHelpers';
	import CharaDrawer from './CharaDrawer.svelte';

	export let data: PageData;
	let language: Language;
	$: language = data.language;

	$: sortFunction = (a, b): sortOrder => {
		//filter out unselected options and sort by priority
		const sortedArr = Array.from($sortOptions.filter((ele) => ele.order)).sort(
			(a, b) => a.priority - b.priority
		);
		const values = sortedArr.map(({ key, order }) => {
			switch (key) {
				case 'rarity':
					return a.rarity.localeCompare(b.rarity) * order;

				default:
					const valA = getMaxValue(a, key);
					const valB = getMaxValue(b, key);
					return (valA - valB) * order;
			}
		});
		return values.length > 0 ? values.reduce((acc, curr) => acc || curr) : 0;
	};
</script>

<svelte:head>
	<title>{translations[language].chara_page} / {translations[language].title_post}</title>
	<meta name="description" content={translations[language].title_post} />
	<meta property="og:description" content={translations[language].title_post} />
</svelte:head>

<div class="pb-40">
	<CharaFilter {filterOptions} {language} {sortOptions} />
	<CharaDisplay characters={data.characters.filter($filters).sort(sortFunction)} {selectedChara} {language}/>
	<CharaFilterDesc {filterOptions} {language} />
	<CharaDrawer />
</div>
