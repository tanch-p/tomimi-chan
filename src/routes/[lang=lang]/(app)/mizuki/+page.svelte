<script lang="ts">
	import MizukiNav from './MizukiNav.svelte';
	import type { PageData } from './$types';
	import banner_mizuki from '$lib/images/banner_mizuki_800px.webp';
	import translations from '$lib/translations.json';
	import TogglePanel from '$lib/components/TogglePanel.svelte';

	export let data: PageData;
	$: language = data.language;
</script>

<svelte:head>
	<title>{translations[language].rogue_mizuki} / {translations[language].title_post}</title>
	<meta name="description" content="tomimi.dev - tool/helper for arknights" />
</svelte:head>

<div class="bg-neutral-800 min-h-screen">
	<div class="pb-24 max-w-4xl mx-auto">
		<div class="py-4">
			<img
				class="select-none mx-auto py-2"
				src={banner_mizuki}
				alt={translations[language].rogue_mizuki}
			/>
		</div>

		<TogglePanel title={'Stage Navigation'} isOpen={true}>
			<MizukiNav {language} />
		</TogglePanel>
	</div>
</div>
