<script lang="ts">
	import type { RogueTopic } from '$lib/types';
	import type { PageData } from './$types';
	import {
		statMods,
		difficulty,
		specialMods,
		eliteMods,
		selectedRelics,
		selectedFloor,
		otherBuffsList,
		eliteMode,
		normalMods
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
	import { applyMods, compileStatModsForChecking } from '$lib/functions/statHelpers';
	import ModsCheck from '$lib/components/ModsCheck.svelte';
	import EnemyCount from '$lib/components/EnemyCount.svelte';
	import skzRelics from '$lib/data/is/sarkaz/relics_sarkaz.json';
	import StageDrops from './StageDrops.svelte';
	import TrapContainer from '$lib/components/TrapContainer.svelte';
	import { applyTrapMods } from '$lib/functions/trapHelpers';
	import { setOtherBuffsList } from '$lib/functions/lib';
	
	export let data: PageData;
	
	$: if (data.mapConfig) {
		updateReqRelic(data.mapConfig.levelId, selectedRelics);
		setOtherBuffsList(otherBuffsList, rogueTopic, data.enemies);
		eliteMode.set(false);
		normalMods.set(data.mapConfig.n_mods);
	}
	const ro4_ALTER_BOSS_STAGES = ['level_rogue4_b-4-b', 'level_rogue4_b-5-b'];

	$: language = data.language;
	$: moddedEnemies = applyMods(data.enemies, data.mapConfig.id, $statMods, $specialMods);
	$: moddedTraps = applyTrapMods(data.traps, $statMods, $specialMods);
	$: modsCheck = compileStatModsForChecking(data.enemies, data.mapConfig.id, $statMods);
	$: stageName = data.mapConfig[`name_${language}`] || data.mapConfig.name_zh;
	const rogueTopic: RogueTopic = data.rogueTopic;

	function updateReqRelic(levelId, selectedRelics) {
		if (
			ro4_ALTER_BOSS_STAGES.includes(levelId) &&
			!$selectedRelics.find((item) => item.id === 'rogue_4_relic_explore_7')
		) {
			const relic = skzRelics.find((item) => item.id === 'rogue_4_relic_explore_7');
			selectedRelics.update((list) => (list = [...list, relic]));
		}
		if (
			['level_rogue4_b-7'].includes(levelId) &&
			!$selectedRelics.find((item) => item.id === 'rogue_4_relic_final_6')
		) {
			const relic = skzRelics.find((item) => item.id === 'rogue_4_relic_final_6');
			selectedRelics.update((list) => (list = [...list, relic]));
		}
	}
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
			difficulty={$difficulty}
		>
			<StageDrops slot="drops" mapConfig={data.mapConfig} {language} {rogueTopic} {selectedFloor} />
		</StageInfo>
		<DifficultySelect {language} {difficulty} {rogueTopic} />
		<TrapContainer {language} traps={moddedTraps} {otherBuffsList} />
		<ModsCheck {language} {modsCheck} mapConfig={data.mapConfig} />
		<EnemyCount
			mapConfig={data.mapConfig}
			enemies={moddedEnemies}
			eliteMods={$eliteMods}
			{language}
		/>
		<div class="sm:px-6">
			{#if data.mapConfig.elite_mods}
				<EliteToggle
					{eliteMode}
					{normalMods}
					mapNormalMods={data.mapConfig.n_mods}
					mapEliteMods={data.mapConfig.elite_mods}
					{eliteMods}
					{rogueTopic}
					{selectedRelics}
					stageId={data.mapConfig.levelId}
				/>
			{/if}
			<EnemyStatDisplay enemies={moddedEnemies} {language} {specialMods} />
			<div id="stageNav" class="mt-8 sm:mt-16 scroll-mt-20">
				<NavTemp {language} />
			</div>
		</div>
	</div>
</main>

<FooterBar {language} {rogueTopic} {selectedRelics} />
