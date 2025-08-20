<script lang="ts">
	import type { RogueTopic } from '$lib/types';
	import type { PageData } from './$types';
	import {
		statMods,
		difficulty,
		specialMods,
		selectedRelics,
		otherBuffsList,
		eliteMode,
		stageType,
		selectedFloor
	} from './stores';
	import DifficultySelect from '$lib/components/DifficultySelect.svelte';
	import StageNav from '../../../(app)/sui/StageNav.svelte';
	import StageInfo from '$lib/components/StageInfo.svelte';
	import FooterBar from '$lib/components/FooterBar.svelte';
	import FloorTitle from './FloorTitle.svelte';
	import StageHeader from '$lib/components/StageHeader.svelte';
	import StageDrops from './StageDrops.svelte';
	import { getStageType, setOtherBuffsList } from '$lib/functions/lib';

	export let data: PageData;

	const rogueTopic: RogueTopic = data.rogueTopic;
	$: if (data.mapConfig) {
		stageType.set(getStageType(data.mapConfig.levelId, rogueTopic));
	}
	$: language = data.language;
	$: stageName = data.mapConfig[`name_${language}`] || data.mapConfig.name_zh;

	setContext('relics', selectedRelics);
	setContext('difficulty', difficulty);
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
			{rogueTopic}
			difficulty={$difficulty}
		>
			<!-- <StageDrops slot="drops" mapConfig={data.mapConfig} {language} {rogueTopic} {selectedFloor} /> -->
		</StageInfo>
		<DifficultySelect {language} {difficulty} {rogueTopic} maxDiff={15} />
		<StageSharedContainer
			{language}
			traps={data.traps}
			{statMods}
			{specialMods}
			mapConfig={data.mapConfig}
			enemies={data.enemies}
			{rogueTopic}
			{selectedRelics}
			difficulty={$difficulty}
		>
			<StageNav {language} slot="nav" />
		</StageSharedContainer>
	</div>
</main>

<FooterBar {language} {rogueTopic} {selectedRelics} />
