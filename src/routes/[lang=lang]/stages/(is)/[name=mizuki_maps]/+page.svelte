<script lang="ts">
	import type { PageData } from './$types';
	import type { RogueTopic } from '$lib/types';
	import {
		statMods,
		difficulty,
		specialMods,
		eliteMods,
		selectedRelics,
		eliteMode,
		normalMods,
		otherBuffsList
	} from './stores';
	import EnemyStatDisplay from '$lib/components/EnemyStatDisplay.svelte';
	import DifficultySelect from '$lib/components/DifficultySelect.svelte';
	import MizukiNav from '../../../(app)/mizuki/MizukiNav.svelte';
	import StageInfo from '$lib/components/StageInfo.svelte';
	import EliteToggle from '$lib/components/EliteToggle.svelte';
	import FooterBar from '$lib/components/FooterBar.svelte';
	import { applyMods, compileStatModsForChecking } from '$lib/functions/statHelpers';
	import translations from '$lib/translations.json';
	import Mission from './Mission.svelte';
	import FloorTitle from './FloorTitle.svelte';
	import StageHeader from '$lib/components/StageHeader.svelte';
	import ModsCheck from '$lib/components/ModsCheck.svelte';
	import TrapContainer from '$lib/components/TrapContainer.svelte';
	import { applyTrapMods } from '$lib/functions/trapHelpers';
	import EnemyCount from '$lib/components/EnemyCount.svelte';
	import { setOtherBuffsList } from '$lib/functions/lib';

	export let data: PageData;
	$: if (data.mapConfig) {
		setOtherBuffsList(otherBuffsList, rogueTopic, data.enemies, data.mapConfig, language);
		eliteMode.set(false);
		normalMods.set(data.mapConfig.n_mods);
	}
	$: if (data.mapConfig || $difficulty) {
		setOtherBuffsList(otherBuffsList, rogueTopic, data.enemies, data.mapConfig, language, $difficulty);
	}
	$: language = data.language;
	$: moddedEnemies = applyMods(data.enemies, data.mapConfig.id, $statMods);
	$: moddedTraps = applyTrapMods(data.traps, $statMods, $specialMods);
	$: modsCheck = compileStatModsForChecking(data.enemies, data.mapConfig.id, $statMods,$specialMods);
	const rogueTopic: RogueTopic = data.rogueTopic;
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

<main class="bg-neutral-800 text-near-white pb-72 pt-8 sm:pt-16 md:pb-28">
	<div class="w-screen sm:w-full max-w-7xl mx-auto">
		<StageInfo
			mapConfig={data.mapConfig}
			{language}
			{stageName}
			eliteMods={$eliteMods}
			{rogueTopic}
		/>
		<Mission {language} />
		<DifficultySelect {language} {difficulty} {rogueTopic} maxDiff={18}/>
		<TrapContainer {language} traps={moddedTraps} specialMods={$specialMods} />
		<ModsCheck {language} {modsCheck} mapConfig={data.mapConfig} />
		<EnemyCount
			mapConfig={data.mapConfig}
			enemies={moddedEnemies}
			eliteMode={$eliteMode}
			{language}
		/>
		{#if data.mapConfig.elite_mods}
			<EliteToggle
				{eliteMode}
				{normalMods}
				mapNormalMods={data.mapConfig.n_mods}
				mapEliteMods={data.mapConfig.elite_mods}
				{eliteMods}
				{rogueTopic}
			/>
		{/if}
		<EnemyStatDisplay enemies={moddedEnemies} {language} {specialMods} {otherBuffsList} />
		<div id="stageNav" class="mt-8 sm:mt-16 scroll-mt-20">
			<MizukiNav {language} />
		</div>
	</div>
</main>

<FooterBar {language} {rogueTopic} {selectedRelics} />
