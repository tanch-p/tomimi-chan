<script lang="ts">
	import type { PageData } from './$types';
	import {
		statMods,
		difficultyMods,
		specialMods,
		eliteMods,
		selectedRelics,
		selectedFloor
	} from './stores';
	import EnemySimpleTable from '$lib/components/EnemySimpleTable.svelte';
	import DifficultySelect from './DifficultySelect.svelte';
	import SamiNav from '../../../(app)/sami/SamiNavTemp.svelte';
	import StageInfo from '$lib/components/StageInfo.svelte';
	import EliteToggle from '$lib/components/EliteToggle.svelte';
	import FooterBar from '$lib/components/FooterBar.svelte';
	import { parseStats } from '$lib/functions/parseStats';
	import translations from '$lib/translations.json';
	import FloorTitle from './FloorTitle.svelte';
	import StageHeader from '$lib/components/StageHeader.svelte';

	export let data: PageData;
	$: language = data.language;
	$: moddedEnemies = parseStats(data.enemies, $statMods, ...$difficultyMods);
	const rogueTopic = 'rogue_sami';
	$: stageName = data.mapConfig[`name_${language}`] || data.mapConfig.name_zh;
</script>

<svelte:head>
	<title
		>{data.mapConfig.code}
		{stageName} / {translations[language].title_post}</title
	>
	<meta name="description" content={translations[language].title_post} />
	<meta property="og:description" content={translations[language].title_post} />
	<meta property="og:title" content={data.mapConfig.code + '_' + stageName} />
	<meta
		property="og:url"
		content={`https://tomimi.dev/${language}/stages/${data.mapConfig.code + '_' + stageName}`}
	/>
</svelte:head>

<StageHeader {language}>
	<FloorTitle slot="floorTitle" stageFloors={data.mapConfig.floors} {language} />
</StageHeader>

<main class="bg-neutral-800 text-near-white pb-32 pt-8 sm:pt-16 md:pb-28">
	<div class="w-screen sm:w-full max-w-7xl mx-auto">
		<StageInfo mapConfig={data.mapConfig} {language} {stageName} {rogueTopic} {selectedFloor} />
		<DifficultySelect {language} />
		{#if data.mapConfig.elite_mods}
			<EliteToggle mapEliteMods={data.mapConfig.elite_mods} {eliteMods} {rogueTopic} />
		{/if}
		<EnemySimpleTable enemies={moddedEnemies} {language} {statMods} {specialMods} />
		<div class="mt-8 sm:mt-16">
			<SamiNav {language} />
		</div>
	</div>
</main>

<FooterBar {language} {rogueTopic} {selectedRelics} />
