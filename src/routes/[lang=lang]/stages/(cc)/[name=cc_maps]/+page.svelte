<script lang="ts">
	import type { PageData } from './$types';
	import { statMods, specialMods } from './stores';
	import EnemySimpleTable from '$lib/components/EnemySimpleTable.svelte';
	import Contracts from './Contracts.svelte';
	import StageInfo from '$lib/components/StageInfo.svelte';
	import { parseStats } from '$lib/functions/parseStats';
	import translations from '$lib/translations.json';
	import SelectedOptions from './SelectedOptions.svelte';

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

<main class="bg-neutral-800 text-near-white pb-32 pt-8 sm:pt-16 md:pb-28 min-h-screen">
	<div class="w-screen sm:w-full max-w-7xl mx-auto">
		<StageInfo mapConfig={data.mapConfig} {language} {stageName} />
		<Contracts contracts={data?.contracts?.list} {language} />
		<SelectedOptions ccType={data?.contracts.type} {language}/>
		<div class="mt-12">
			<EnemySimpleTable enemies={moddedEnemies} {language} {statMods} {specialMods} />
		</div>
	</div>
</main>
