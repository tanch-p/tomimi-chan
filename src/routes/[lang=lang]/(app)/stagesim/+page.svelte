<script lang="ts">
	import type { PageData } from './$types';
	import type { Enemy, MapConfig, Trap } from '$lib/types';
	import { statMods, specialMods, stageIdStore } from './stores';
	import enemyDatabase from '$lib/data/enemy/enemy_database.json';
	import StageInfo from '$lib/components/StageInfo.svelte';
	import translations from '$lib/translations.json';
	import { getStageData } from '$lib/functions/lib';
	import StageSharedContainer from '$lib/components/StageSharedContainer.svelte';
	import TitleBlock from '$lib/components/TitleBlock.svelte';
	import { overwriteBlackboard } from '$lib/functions/skillHelpers';
	import { parseTraps } from '$lib/functions/trapHelpers';
	import ActivitySelect from './ActivitySelect.svelte';
	import SearchDataList from './SearchDataList.svelte';
	import { onMount } from 'svelte';

	export let data: PageData;
	$: language = data.language;
	// $: stageName = data.mapConfig[`name_${language}`] || data.mapConfig.name_zh;

	let mapConfig: MapConfig,
		traps: Trap[],
		enemies: Enemy[] = [];
	let isLoading = true;

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
		traps = parseTraps(mapConfig.traps, language);
		isLoading = false;
	}
	onMount(() => {
		stageIdStore.subscribe((id) => {
			loadStageData(id);
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
	<div class="relative mt-6">
		{#if isLoading}
			<div class="absolute">{translations[language].loading}</div>
		{/if}
		{#if enemies.length > 0}
			<StageSharedContainer {language} {traps} {statMods} {specialMods} {mapConfig} {enemies} />
		{/if}
	</div>
</div>
