<script lang="ts">
	import type { PageData } from './$types';
	import { statMods, specialMods } from './stores';
	import EnemyStatDisplay from '$lib/components/EnemyStatDisplay.svelte';
	import PermaContracts from './PermaContracts.svelte';
	import DailyContracts from './DailyContracts.svelte';
	import StageInfo from '$lib/components/StageInfo.svelte';
	import { parseStats } from '$lib/functions/parseStats';
	import translations from '$lib/translations.json';
	import SelectedOptions from './SelectedOptions.svelte';
	import StageHeader from '$lib/components/StageHeader.svelte';
	import CCNav from '$lib/components/CCNav.svelte';

	export let data: PageData;
	$: language = data.language;
	$: moddedEnemies = parseStats(data.enemies, $statMods);
	$: stageName = data.mapConfig[`name_${language}`] || data.mapConfig.name_zh;
</script>

<svelte:head>
	<title>
		{stageName} / {translations[language].title_post}
	</title>
	<meta name="description" content={translations[language].title_post} />
	<meta property="og:description" content={translations[language].title_post} />
	<meta property="og:title" content={data.mapConfig.code + '_' + stageName} />
	<meta property="og:url" content={`https://tomimi.dev/${language}/stages/${stageName}`} />
</svelte:head>

<StageHeader {language} />
<main class="bg-neutral-800 text-near-white pb-32 pt-8 sm:pt-16 md:pb-28 min-h-screen">
	<div class="w-screen sm:w-full max-w-7xl mx-auto">
		<StageInfo mapConfig={data.mapConfig} {language} {stageName} />
		{#if data?.contracts.type === 'perma'}
			<PermaContracts contracts={data?.contracts?.list} {language} />
		{:else}
			<DailyContracts contracts={data?.contracts?.list} {language} />
		{/if}
		<SelectedOptions ccType={data?.contracts.type} {language} mapConfig={data.mapConfig} />
		<div class="mt-12">
			<EnemyStatDisplay enemies={moddedEnemies} {language} {statMods} {specialMods} />
		</div>
		<div class="max-w-4xl mx-auto mt-24">
			<CCNav {language} />
		</div>
	</div>
</main>
