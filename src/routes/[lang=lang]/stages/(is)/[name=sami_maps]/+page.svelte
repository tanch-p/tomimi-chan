<script lang="ts">
	import type { RogueTopic } from '$lib/types';
	import type { PageData } from './$types';
	import { statMods, difficulty, specialMods, selectedRelics, selectedFloor } from './stores';
	import DifficultySelect from '$lib/components/DifficultySelect.svelte';
	import SamiNav from '../../../(app)/sami/SamiNavTemp.svelte';
	import StageInfo from '$lib/components/StageInfo.svelte';
	import FooterBar from '$lib/components/FooterBar.svelte';
	import FloorTitle from './FloorTitle.svelte';
	import StageHeader from '$lib/components/StageHeader.svelte';
	import StageDrops from './StageDrops.svelte';
	import StageSharedContainer from '$lib/components/StageSharedContainer.svelte';
	import StageHeadMeta from '$lib/components/StageHeadMeta.svelte';
	import { mapConfig } from '$lib/global_stores';
	import { setContext } from 'svelte';

	export let data: PageData;

	$: language = data.language;
	$: stageName = $mapConfig[`name_${language}`] || $mapConfig.name_zh;
	const rogueTopic: RogueTopic = data.rogueTopic;

	setContext('relics', selectedRelics);
	setContext('difficulty', difficulty);
</script>

<StageHeadMeta mapConfig={$mapConfig} {stageName} {language} />

<StageHeader {language}>
	<FloorTitle slot="floorTitle" stageFloors={$mapConfig.floors} {language} />
</StageHeader>

<main class="bg-neutral-800 text-near-white pb-72 pt-8 sm:pt-16 md:pb-28">
	<div class="w-screen sm:w-full max-w-7xl mx-auto">
		<StageInfo mapConfig={$mapConfig} {language} {stageName} {rogueTopic}>
			<StageDrops slot="drops" mapConfig={$mapConfig} {language} {rogueTopic} {selectedFloor} />
		</StageInfo>
		<DifficultySelect {language} {difficulty} {rogueTopic} />
		<StageSharedContainer
			{language}
			traps={data.traps}
			{statMods}
			{specialMods}
			enemies={data.enemies}
			{rogueTopic}
			{selectedRelics}
			difficulty={$difficulty}
		>
			<SamiNav slot="nav" {language} />
		</StageSharedContainer>
	</div>
</main>

<FooterBar {language} {rogueTopic} {selectedRelics} />
