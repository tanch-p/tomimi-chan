<script lang="ts">
	import cc_banner from '$lib/images/banner_cc11.webp';
	import type { PageData } from './$types';
	import translations from '$lib/translations.json';
	import CCNav from '$lib/components/CCNav.svelte';

	export let data: PageData;
	$: language = data.language;
</script>

<svelte:head>
	<title>{translations[language].cc_title} / {translations[language].title_post}</title>
	<meta name="description" content={translations[language].title_post} />
	<meta property="og:description" content={translations[language].title_post} />
	<meta property="og:title" content={translations[language].cc_title} />
	<meta property="og:url" content={`https://tomimi.dev/${language}/mizuki`} />
</svelte:head>

<div class="bg-neutral-800 min-h-screen">
	<div class="pb-24 max-w-4xl mx-auto pt-4 sm:pt-24">
		<img class="select-none mx-auto py-3" src={cc_banner} decoding="async" alt={'cc11'} />
		<CCNav {language} />
	</div>
</div>
