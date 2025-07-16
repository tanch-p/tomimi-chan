<script lang="ts">
	import type { RogueTopic } from '$lib/types';
	import type { PageData } from './$types';
	import {
		statMods,
		difficulty,
		specialMods,
		runes,
		selectedRelics,
		otherBuffsList,
		eliteMode,
	} from './stores';
	import DifficultySelect from '../../../../../lib/components/DifficultySelect.svelte';
	import StageNav from '../../../(app)/sui/StageNav.svelte';
	import StageInfo from '$lib/components/StageInfo.svelte';
	import FooterBar from '$lib/components/FooterBar.svelte';
	import FloorTitle from './FloorTitle.svelte';
	import StageHeader from '$lib/components/StageHeader.svelte';
	import relicsList from '$lib/data/is/sui/relics_sui.json';
	// import StageDrops from './StageDrops.svelte';
	import { setOtherBuffsList } from '$lib/functions/lib';
	import StageSharedContainer from '$lib/components/StageSharedContainer.svelte';
	import StageHeadMeta from '$lib/components/StageHeadMeta.svelte';

	export let data: PageData;

	$: if (data.mapConfig) {
		setOtherBuffsList(otherBuffsList, rogueTopic, data.enemies, data.mapConfig, language);
		runes.set(data.mapConfig.n_mods);
	}

	$: language = data.language;
	$: stageName = data.mapConfig[`name_${language}`] || data.mapConfig.name_zh;
	const rogueTopic: RogueTopic = data.rogueTopic;

	// function updateReqRelic(levelId, selectedRelics) {
	// 	if (
	// 		ro4_ALTER_BOSS_STAGES.includes(levelId) &&
	// 		!$selectedRelics.find((item) => item.id === 'rogue_4_relic_explore_7')
	// 	) {
	// 		const relic = relicsList.find((item) => item.id === 'rogue_4_relic_explore_7');
	// 		selectedRelics.update((list) => (list = [...list, relic]));
	// 	}
	// 	if (
	// 		['level_rogue4_b-7'].includes(levelId) &&
	// 		!$selectedRelics.find((item) => item.id === 'rogue_4_relic_final_6')
	// 	) {
	// 		const relic = relicsList.find((item) => item.id === 'rogue_4_relic_final_6');
	// 		selectedRelics.update((list) => (list = [...list, relic]));
	// 	}
	// }
</script>

<StageHeadMeta mapConfig={data.mapConfig} {stageName} {language} />

<StageHeader {language}>
	<FloorTitle slot="floorTitle" stageFloors={data.mapConfig.floors} {language} />
</StageHeader>

<main class="bg-neutral-800 text-near-white pb-72 pt-8 sm:pt-16 md:pb-28">
	<div class="w-screen sm:w-full max-w-7xl mx-auto">
		<StageInfo
			mapConfig={data.mapConfig}
			{language}
			{stageName}
			{eliteMode}
			{rogueTopic}
			difficulty={$difficulty}
		>
			<!-- <StageDrops slot="drops" mapConfig={data.mapConfig} {language} {rogueTopic} {selectedFloor} /> -->
		</StageInfo>
		<DifficultySelect {language} {difficulty} {rogueTopic} maxDiff={15}/>
		<StageSharedContainer
			{language}
			traps={data.traps}
			{otherBuffsList}
			{statMods}
			{specialMods}
			mapConfig={data.mapConfig}
			enemies={data.enemies}
			{eliteMode}
			{runes}
			{rogueTopic}
			{selectedRelics}
			otherStores={{}}
			difficulty={$difficulty}
		>
			<StageNav {language} slot="nav" />
		</StageSharedContainer>
	</div>
</main>

<FooterBar {language} {rogueTopic} {selectedRelics} />
