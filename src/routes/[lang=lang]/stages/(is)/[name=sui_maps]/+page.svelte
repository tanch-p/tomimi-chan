<script lang="ts">
	import type { RogueTopic } from '$lib/types';
	import type { PageData } from './$types';
	import {
		statMods,
		difficulty,
		specialMods,
		runes,
		allMods,
		selectedRelics,
		otherBuffsList,
		eliteMode,
		stageType
	} from './stores';
	import DifficultySelect from '../../../../../lib/components/DifficultySelect.svelte';
	import StageNav from '../../../(app)/sui/StageNav.svelte';
	import StageInfo from '$lib/components/StageInfo.svelte';
	import FooterBar from '$lib/components/FooterBar.svelte';
	import FloorTitle from './FloorTitle.svelte';
	import StageHeader from '$lib/components/StageHeader.svelte';
	// import StageDrops from './StageDrops.svelte';
	import { getStageType, setOtherBuffsList } from '$lib/functions/lib';
	import StageSharedContainer from '$lib/components/StageSharedContainer.svelte';
	import StageHeadMeta from '$lib/components/StageHeadMeta.svelte';

	export let data: PageData;

	const rogueTopic: RogueTopic = data.rogueTopic;
	$: if (data.mapConfig) {
		stageType.set(getStageType(data.mapConfig.levelId, rogueTopic));
		setOtherBuffsList(otherBuffsList, rogueTopic, data.enemies, data.mapConfig, language);
		runes.set(data.mapConfig.n_mods);
		allMods.set(data.mapConfig.all_mods);
	}

	$: language = data.language;
	$: stageName = data.mapConfig[`name_${language}`] || data.mapConfig.name_zh;
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
		<DifficultySelect {language} {difficulty} {rogueTopic} maxDiff={15} />
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
			otherStores={{relics:selectedRelics}}
			difficulty={$difficulty}
		>
			<StageNav {language} slot="nav" />
		</StageSharedContainer>
	</div>
</main>

<FooterBar {language} {rogueTopic} {selectedRelics} />
