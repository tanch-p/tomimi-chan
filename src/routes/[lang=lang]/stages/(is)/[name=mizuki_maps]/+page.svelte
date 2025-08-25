<script lang="ts">
	import type { PageData } from './$types';
	import type { RogueTopic } from '$lib/types';
	import { statMods, difficulty, specialMods, selectedRelics } from './stores';
	import DifficultySelect from '$lib/components/DifficultySelect.svelte';
	import MizukiNav from '../../../(app)/mizuki/MizukiNav.svelte';
	import StageInfo from '$lib/components/StageInfo.svelte';
	import FooterBar from '$lib/components/FooterBar.svelte';
	import Mission from './Mission.svelte';
	import FloorTitle from './FloorTitle.svelte';
	import StageHeader from '$lib/components/StageHeader.svelte';
	import StageSharedContainer from '$lib/components/StageSharedContainer.svelte';
	import StageHeadMeta from '$lib/components/StageHeadMeta.svelte';
	import { mapConfig } from '$lib/global_stores';
	import { setContext } from 'svelte';

	export let data: PageData;

	$: language = data.language;
	const rogueTopic: RogueTopic = data.rogueTopic;
	$: stageName = $mapConfig[`name_${language}`] || $mapConfig.name_zh;

	setContext('relics', selectedRelics);
	setContext('difficulty',difficulty)
</script>

<StageHeadMeta mapConfig={$mapConfig} {stageName} {language} />

<StageHeader {language}>
	<FloorTitle slot="floorTitle" stageFloors={$mapConfig.floors} {language} />
</StageHeader>

<main class="bg-neutral-800 text-near-white pb-72 pt-8 sm:pt-16 md:pb-28">
	<div class="w-screen sm:w-full max-w-7xl mx-auto">
		<StageInfo mapConfig={$mapConfig} {language} {stageName} {rogueTopic} />
		<Mission {language} />
		<DifficultySelect {language} {difficulty} {rogueTopic} maxDiff={18} />
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
			<MizukiNav slot="nav" {language} />
		</StageSharedContainer>
	</div>
</main>

<FooterBar {language} {rogueTopic} {selectedRelics} />
