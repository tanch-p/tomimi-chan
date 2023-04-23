<script lang="ts">
	import MizukiNav from './MizukiNav.svelte';
	import type { PageData } from './$types';
	import banner_mizuki from '$lib/images/banner_mizuki_800px.png';
	import translations from '$lib/translations.json';
	export let data: PageData;
	$: language = data.language;
</script>

<svelte:head>
	<title>{translations[language].rogue_mizuki} / {translations[language].title_post}</title>
	<meta name="description" content="tomimi.dev - tool/helper for arknights" />
</svelte:head>

<div class="mb-16">
	<div class="py-4">
		<img
			class="select-none mx-auto py-2"
			src={banner_mizuki}
			alt={translations[language].rogue_mizuki}
		/>
	</div>
	<MizukiNav {language} />
</div>
