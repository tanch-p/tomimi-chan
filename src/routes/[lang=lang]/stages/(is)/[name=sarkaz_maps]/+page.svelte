<script lang="ts">
	import type { PageData } from './$types';
	import {
		statMods,
		difficulty,
		specialMods,
		eliteMods,
		selectedRelics,
		selectedFloor,
	} from './stores';
	import EnemyStatDisplay from '$lib/components/EnemyStatDisplay.svelte';
	import DifficultySelect from '../../../../../lib/components/DifficultySelect.svelte';
	import NavTemp from '../../../(app)/sarkaz/NavTemp.svelte';
	import StageInfo from '$lib/components/StageInfo.svelte';
	import EliteToggle from '$lib/components/EliteToggle.svelte';
	import FooterBar from '$lib/components/FooterBar.svelte';
	import translations from '$lib/translations.json';
	import FloorTitle from './FloorTitle.svelte';
	import StageHeader from '$lib/components/StageHeader.svelte';
	import { applyMods, compileStatModsForChecking, updateBuffs } from '$lib/functions/statHelpers';
	import ModsCheck from '$lib/components/ModsCheck.svelte';
	import EnemyCount from '$lib/components/EnemyCount.svelte';

	export let data: PageData;

	$: language = data.language;
	$: moddedEnemies = applyMods(data.enemies, data.mapConfig.id, $statMods, $specialMods);
	$: modsCheck = compileStatModsForChecking(data.enemies, data.mapConfig.id, $statMods);
	const rogueTopic = 'rogue_skz';
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
		<StageInfo
			mapConfig={data.mapConfig}
			{language}
			{stageName}
			eliteMods={$eliteMods}
			{rogueTopic}
			{selectedFloor}
			difficulty={$difficulty}
		/>
		<DifficultySelect {language} {difficulty} {rogueTopic} />
		<ModsCheck {language} {modsCheck} mapConfig={data.mapConfig} />
		<EnemyCount
			mapConfig={data.mapConfig}
			enemies={moddedEnemies}
			eliteMods={$eliteMods}
			{language}
		/>
		{#if data.mapConfig.elite_mods}
			<EliteToggle mapEliteMods={data.mapConfig.elite_mods} {eliteMods} {rogueTopic} />
		{/if}
		<EnemyStatDisplay enemies={moddedEnemies} {language} {specialMods} />
		<div id="stageNav" class="mt-8 sm:mt-16 scroll-mt-20">
			<NavTemp {language} />
		</div>
	</div>
</main>

<FooterBar {language} {rogueTopic} {selectedRelics} />
