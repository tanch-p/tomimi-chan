<script lang="ts">
	import type { PageData } from './$types';
	import translations from '$lib/translations.json';

	export let data: PageData;
	$: language = data.language;
</script>

<svelte:head>
	<title>{translations[language].chara_page}</title>
	<meta name="description" content={translations[language].title_post} />
	<meta property="og:description" content={translations[language].title_post} />
</svelte:head>


