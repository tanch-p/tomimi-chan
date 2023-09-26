<script lang="ts">
	import type { PageData } from './$types';
	import translations from '$lib/translations.json';
	import CharaDisplay from '$lib/components/CharaDisplay.svelte';
	import CharaFilter from '$lib/components/CharaFilter.svelte';
	import { filters, filterOptions } from './stores';

	export let data: PageData;
	$: language = data.language;

	const filter = (characters, filters) => {
		for (const key in filters) {
			characters = characters.filter(filters[key]);
		}
		return characters;
	};
	$: console.log($filters);
</script>

<svelte:head>
	<title>{translations[language].chara_page} / {translations[language].title_post}</title>
	<meta name="description" content={translations[language].title_post} />
	<meta property="og:description" content={translations[language].title_post} />
</svelte:head>

<div class="pb-20">
	<CharaFilter {filters} {filterOptions} />
	<CharaDisplay characters={filter(data.characters, $filters)} />
</div>
