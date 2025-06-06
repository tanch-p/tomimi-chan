<script lang="ts">
	import type { RogueTopic } from '$lib/types';
	import type { PageData } from './$types';
	import {
		statMods,
		difficulty,
		diff10Mods,
		diff10ModifierStore,
		specialMods,
		selectedRelics,
		selectedUniqueRelic,
		eliteMode,
		runes,
		otherBuffsList
	} from './stores';
	import StageInfo from '$lib/components/StageInfo.svelte';
	import FooterBar from '$lib/components/FooterBar.svelte';
	import translations from '$lib/translations.json';
	import hardRelics from '$lib/data/is/phantom/relics_phantom_hard.json';
	import RelicDivUnique from '$lib/components/RelicDivUnique.svelte';
	import StageHeader from '$lib/components/StageHeader.svelte';
	import FloorTitle from './FloorTitle.svelte';
	import StageNav from '../../../(app)/phantom/PhantomNav.svelte';
	import { setOtherBuffsList } from '$lib/functions/lib';
	import StageSharedContainer from '$lib/components/StageSharedContainer.svelte';
	import DifficultySelect from '$lib/components/DifficultySelect.svelte';

	export let data: PageData;
	$: if (data.mapConfig) {
		setOtherBuffsList(
			otherBuffsList,
			rogueTopic,
			data.enemies,
			data.mapConfig,
			language,
			$difficulty
		);
		runes.set(data.mapConfig.n_mods);
		diff10ModifierStore.set(
			data.mapConfig.id.includes('_b_') && $difficulty >= 10 ? diff10Mods : null
		);
	}
	$: language = data.language;
	$: stageName = data.mapConfig[`name_${language}`] || data.mapConfig.name_zh;
	const rogueTopic: RogueTopic = data.rogueTopic;
</script>

<svelte:head>
	<title
		>{data.mapConfig.code}
		{stageName.replaceAll('_', ' ')} / {translations[language].title_post}</title
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
		<StageInfo mapConfig={data.mapConfig} {language} {stageName} {eliteMode} {rogueTopic} />
		<DifficultySelect {language} {difficulty} {rogueTopic} />

		<div class="mt-8">
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
				difficulty={$difficulty}
				otherStores={{ eliteMode: eliteMode }}
			>
				<StageNav slot="nav" {language} />
			</StageSharedContainer>
		</div>
	</div>
</main>

<FooterBar {language} {rogueTopic} {selectedRelics} {selectedUniqueRelic}>
	<div
		slot="uniqueRelics"
		class="grid lg:grid-cols-3 gap-x-10 gap-y-8 w-full overflow-x-auto md:overflow-visible my-auto mx-auto px-4 sm:px-24 mb-4"
	>
		{#each hardRelics as relic}
			<RelicDivUnique {relic} {language} {rogueTopic} {selectedUniqueRelic} />
		{/each}
	</div>
</FooterBar>
