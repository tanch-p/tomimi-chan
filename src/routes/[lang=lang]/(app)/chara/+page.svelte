<script lang="ts">
	import type { PageData } from './$types';
	import translations from '$lib/translations.json';
	import CharaDisplay from '$lib/components/CharaDisplay.svelte';
	import CharaFilter from '$lib/components/CharaFilter.svelte';
	import { filters, filterOptions, sortOptions } from './stores';
	import CharaFilterDesc from '$lib/components/CharaFilterDesc.svelte';
	import { getMaxValue } from '$lib/functions/charaHelpers';

	export let data: PageData;
	$: language = data.language;

	const filter = (characters, filters) => {
		for (const key in filters) {
			characters = characters.filter(filters[key]);
		}
		return characters;
	};
	$: sortFunction = (a, b) => {
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
		return values.reduce((acc, curr) => acc || curr);
	};

	$: console.log($filters);
</script>

<svelte:head>
	<title>{translations[language].chara_page} / {translations[language].title_post}</title>
	<meta name="description" content={translations[language].title_post} />
	<meta property="og:description" content={translations[language].title_post} />
</svelte:head>

<div class="pb-20">
	<CharaFilter {filterOptions} {language} {sortOptions} />
	<CharaDisplay characters={filter(data.characters, $filters).sort(sortFunction)} />
	<CharaFilterDesc {filterOptions} {language} />
</div>
