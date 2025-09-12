<script lang="ts">
	import type { PageData } from './$types';
	import type { Enemy, MapConfig, Trap } from '$lib/types';
	import {
		statMods,
		specialMods,
		runes,
		eliteMode,
		otherBuffsList,
		stageIdStore,
		contracts,
		systemRunes,
		allMods
	} from './stores';
	import enemyDatabase from '$lib/data/enemy/enemy_database.json';
	import StageInfo from '$lib/components/StageInfo.svelte';
	import translations from '$lib/translations.json';
	import { getStageData, setOtherBuffsList, sortEnemies } from '$lib/functions/lib';
	import StageSharedContainer from '$lib/components/StageSharedContainer.svelte';
	import TitleBlock from '$lib/components/TitleBlock.svelte';
	import { overwriteBlackboard } from '$lib/functions/skillHelpers';
	import { parseTraps } from '$lib/functions/trapHelpers';
	import ActivitySelect from './ActivitySelect.svelte';
	import SearchDataList from './SearchDataList.svelte';
	import { onMount } from 'svelte';
	import RecalRune from '$lib/components/recalRune/RecalRuneContainer.svelte';
	import { initContracts } from '$lib/functions/recalRune';

	export let data: PageData;
	$: language = data.language;

	let mapConfig: MapConfig,
		traps: Trap[],
		enemies: Enemy[],
		stageName = '';
	let isLoading = true;

	$: if (mapConfig) {
		runes.set(mapConfig.n_mods);
		allMods.set(mapConfig.all_mods);
		setOtherBuffsList(otherBuffsList, null, enemies, mapConfig, language, 0);
		stageName = mapConfig[`name_${language}`] || mapConfig[`name_zh`];
		initContracts(contracts, mapConfig);
	}

	async function loadStageData(stageId: string) {
		isLoading = true;
		mapConfig = await getStageData(stageId, 'all');
		enemies = mapConfig.enemies.map(({ id, prefabKey, level, overwrittenData }) => {
			const enemy = structuredClone(enemyDatabase[prefabKey]);
			enemy.stageId = id;
			enemy.level = level;
			enemy.stats = structuredClone(enemy.stats[level]);
			if (overwrittenData) {
				enemy.overwritten = true;
				for (const key in overwrittenData) {
					if (key === 'talentBlackboard') {
						overwriteBlackboard(enemy.stats, overwrittenData[key]);
					} else if (key === 'levelType') {
						if (overwrittenData[key] === 'NORMAL') {
							enemy.type = enemy.type.filter((ele) => !['BOSS', 'ELITE'].includes(ele));
						}
					} else {
						enemy.stats[key] = overwrittenData[key];
					}
				}
			}
			enemy.traits = enemy.stats.traits;
			return enemy;
		});
		enemies.sort(sortEnemies);
		traps = parseTraps(mapConfig.traps, language);
		isLoading = false;
	}

	function removeHash() {
		if (window.location.hash) {
			history.replaceState(null, '', window.location.pathname + window.location.search);
		}
	}

	onMount(() => {
		stageIdStore.subscribe((id) => {
			loadStageData(id);
			removeHash();
		});
	});

	const WIP = {
		zh: '施工中',
		ja: '作業進行中',
		en: 'Work In Progress'
	};
</script>

<svelte:head>
	<title>{translations[language].stage_sim} / {translations[language].title_post}</title>
	<meta name="description" content={translations[language].title_post} />
	<meta property="og:description" content={translations[language].title_post} />
	<meta property="og:title" content={translations[language].stage_sim} />
	<meta property="og:url" content={`https://tomimi.dev/${language}/stagesim`} />
</svelte:head>

<div class="pb-72 pt-8 sm:pt-16 md:pb-28 w-screen sm:w-full max-w-7xl mx-auto">
	<TitleBlock title={translations[language].stage_sim}>
		<div class="px-2 md:px-0">
			<p class="text-yellow-500 text-base">
				※{WIP[language]}
			</p>
			<div class="mt-24 space-y-3">
				<SearchDataList {language} />
				<ActivitySelect {language} />
			</div>
		</div>
	</TitleBlock>
	<div class="relative mt-8">
		{#if isLoading}
			<div
				class="fixed h-screen z-[1] inset-0 flex items-center justify-center bg-black bg-opacity-50 text-2xl"
			>
				<p class="bg-neutral-800 bg-opacity-80 px-2 py-1">
					{translations[language].loading}
				</p>
			</div>
		{/if}
		{#if mapConfig}
			<StageInfo {mapConfig} {language} {stageName} {eliteMode} />
			{#if mapConfig.systems?.crisis}
				<RecalRune {language} crisis={mapConfig.systems?.crisis} {contracts} />
			{/if}
			<StageSharedContainer
				{language}
				{traps}
				{otherBuffsList}
				{statMods}
				{specialMods}
				{mapConfig}
				{enemies}
				{eliteMode}
				{runes}
				{systemRunes}
			/>
		{/if}
	</div>
</div>
