<script lang="ts">
	import PhantomNav from './PhantomNav.svelte';
	import type { PageData } from './$types';
	import banner_phantom from '$lib/images/banner_phantom_800px.webp';
	import translations from '$lib/translations.json';
	import TogglePanel from '$lib/components/TogglePanel.svelte';
	import HowToUse from '$lib/components/HowToUse.svelte';

	export let data: PageData;
	$: language = data.language;
</script>

<svelte:head>
	<title>{translations[language].rogue_phantom} / {translations[language].title_post}</title>
	<meta name="description" content="tomimi.dev - tool/helper for arknights" />
</svelte:head>

<div class="bg-neutral-800 min-h-screen">
	<div class="pb-24 max-w-6xl mx-auto">
		<div class="py-4">
			<img
				class="select-none mx-auto py-2"
				src={banner_phantom}
				alt={translations[language].rogue_phantom}
			/>
		</div>
		<div class="space-y-6">
			<TogglePanel title={translations[language].how_to_use}>
				<HowToUse {language} rogueTopic={"rogue_phantom"}/>
			</TogglePanel>
			<TogglePanel title={translations[language].stage_nav} isOpen={true}>
				<PhantomNav {language} />
			</TogglePanel>
		</div>
	</div>
</div>
