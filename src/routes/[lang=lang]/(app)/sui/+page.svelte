<script lang="ts">
	import type { PageData } from './$types';
	import banner_sui from '$lib/images/banner_sami_800px.webp';
	import translations from '$lib/translations.json';
	import TogglePanel from '$lib/components/TogglePanel.svelte';
	import HowToUse from '$lib/components/HowToUse.svelte';
	import StageNav from './StageNav.svelte';
	import TitleBlock from '$lib/components/TitleBlock.svelte';

	export let data: PageData;
	$: language = data.language;
</script>

<svelte:head>
	<title>{translations[language].rogue_sui} / {translations[language].title_post}</title>
	<meta name="description" content={translations[language].title_post} />
	<meta property="og:description" content={translations[language].title_post} />
	<meta property="og:title" content={translations[language].rogue_sui} />
	<meta property="og:url" content={`https://tomimi.dev/${language}/sui`} />
</svelte:head>

<div class="bg-neutral-800 min-h-screen">
	<div class="pb-24 max-w-4xl mx-auto">
		<div class="py-4">
			<img
				class="select-none mx-auto py-2"
				src={banner_sui}
				alt={translations[language].rogue_sui}
			/>
		</div>
		<div class="space-y-6">
			<TogglePanel title={translations[language].how_to_use} isOpen={true}>
				<HowToUse {language} rogueTopic={'rogue_sui'} />
			</TogglePanel>
			<TitleBlock title={translations[language].stage_nav}>
				<StageNav {language} />
			</TitleBlock>
		</div>
	</div>
</div>
