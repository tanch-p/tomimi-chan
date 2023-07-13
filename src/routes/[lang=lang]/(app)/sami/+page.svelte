<script lang="ts">
	import type { PageData } from './$types';
	import banner_sami from '$lib/images/banner_sami_800px.webp';
	import translations from '$lib/translations.json';
	import TogglePanel from '$lib/components/TogglePanel.svelte';
	import HowToUse from '$lib/components/HowToUse.svelte';
	import SamiNavTemp from './SamiNavTemp.svelte';

	export let data: PageData;
	$: language = data.language;
</script>

<svelte:head>
	<title>{translations[language].rogue_mizuki} / {translations[language].title_post}</title>
	<meta name="description" content={translations[language].title_post} />
	<meta property="og:description" content={translations[language].title_post} />
	<meta property="og:title" content={translations[language].rogue_mizuki} />
	<meta property="og:url" content={`https://tomimi.dev/${language}/mizuki`} />
</svelte:head>

<div class="bg-neutral-800 min-h-screen">
	<div class="pb-24 max-w-4xl mx-auto">
		<div class="py-4">
			<img
				class="select-none mx-auto py-2"
				src={banner_sami}
				alt={translations[language].rogue_sami}
			/>
		</div>
		<div class="space-y-6">
			<TogglePanel title="工程进度">
				<div class="px-2">
					<ul class="py-2">做好了</ul>
					<ul class="mt-2">
						验证中
						<li class="list-disc list-inside">敌人数量</li>
						<li class="list-disc list-inside">{translations[language].how_to_use_elite_toggle}</li>
					</ul>
					<ul class="mt-2">
						开发中
						<li class="list-disc list-inside">敌人数量</li>
						<li class="list-disc list-inside">{translations[language].how_to_use_elite_toggle}</li>
					</ul>
				</div>
			</TogglePanel>
			<TogglePanel title={translations[language].how_to_use}>
				<HowToUse {language} rogueTopic={'rogue_mizuki'} />
			</TogglePanel>
			<TogglePanel title={translations[language].stage_nav} isOpen={true} >
				<SamiNavTemp {language} />
			</TogglePanel>
		</div>
	</div>
</div>
