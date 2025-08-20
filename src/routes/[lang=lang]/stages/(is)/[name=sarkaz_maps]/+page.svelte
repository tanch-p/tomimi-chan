<script lang="ts">
	import type { RogueTopic } from '$lib/types';
	import type { PageData } from './$types';
	import {
		statMods,
		difficulty,
		difficultyMode,
		specialMods,
		selectedRelics,
		selectedFloor,
		disasterEffects
	} from './stores';
	import DifficultySelect from '$lib/components/DifficultySelect.svelte';
	import NavTemp from '../../../(app)/sarkaz/NavTemp.svelte';
	import StageInfo from '$lib/components/StageInfo.svelte';
	import FooterBar from '$lib/components/FooterBar.svelte';
	import translations from '$lib/translations.json';
	import FloorTitle from './FloorTitle.svelte';
	import StageHeader from '$lib/components/StageHeader.svelte';
	import skzRelics from '$lib/data/is/sarkaz/relics_sarkaz.json';
	import StageDrops from './StageDrops.svelte';
	import StageSharedContainer from '$lib/components/StageSharedContainer.svelte';
	import StageHeadMeta from '$lib/components/StageHeadMeta.svelte';
	import { mapConfig } from '$lib/global_stores';
	import { setContext } from 'svelte';

	export let data: PageData;

	mapConfig.subscribe((v) => {
		updateReqRelic(v.levelId, selectedRelics);
	});
	const ro4_ALTER_BOSS_STAGES = ['level_rogue4_b-4-b', 'level_rogue4_b-5-b'];

	$: language = data.language;
	$: stageName = $mapConfig[`name_${language}`] || $mapConfig.name_zh;
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

	setContext('disasters', disasterEffects);
	setContext('relics', selectedRelics);
	setContext('difficulty', difficulty);
</script>

<StageHeadMeta mapConfig={$mapConfig} {stageName} {language} />

<StageHeader {language}>
	<FloorTitle slot="floorTitle" stageFloors={$mapConfig.floors} {language} />
</StageHeader>

<main class="bg-neutral-800 text-near-white pb-72 pt-8 sm:pt-16 md:pb-28">
	<div class="w-screen sm:w-full max-w-7xl mx-auto">
		<StageInfo mapConfig={$mapConfig} {language} {stageName} {rogueTopic} difficulty={$difficulty}>
			<StageDrops slot="drops" mapConfig={$mapConfig} {language} {rogueTopic} {selectedFloor} />
		</StageInfo>
		<DifficultySelect {language} {difficulty} {rogueTopic} maxDiff={18} mode={$difficultyMode}>
			<div class="flex gap-1.5 mt-1.5 mb-2.5">
				<button
					class="flex items-center justify-center min-w-[70px] px-[10px] rounded-md bg-gray-500 {$difficultyMode ===
					'normal'
						? ''
						: 'brightness-[.6] hover:brightness-100'}"
					on:click={() => difficultyMode.set('normal')}
				>
					{translations[language].normal_state}
				</button>
				<button
					class="flex items-center justify-center min-w-[70px] px-[10px] rounded-md bg-emerald-700 {$difficultyMode ===
					'normal'
						? 'brightness-[.6] hover:brightness-100'
						: ''}"
					on:click={() => difficultyMode.set('deepseek')}
				>
					{{ en: 'selbaF edisecanruF', ja: '談奇辺炉', zh: '语奇终无' }[language]}
				</button>
			</div>
		</DifficultySelect>
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
			<NavTemp {language} slot="nav" />
		</StageSharedContainer>
	</div>
</main>

<FooterBar {language} {rogueTopic} {selectedRelics} />
