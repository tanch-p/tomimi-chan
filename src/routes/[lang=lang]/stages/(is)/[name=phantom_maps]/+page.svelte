<script lang="ts">
	import type { PageData } from './$types';
	import { statMods, specialMods, eliteMods, selectedRelics, selectedUniqueRelic } from './stores';
	import EnemySimpleTable from '$lib/components/EnemySimpleTable.svelte';
	import StageInfo from '$lib/components/StageInfo.svelte';
	import EliteToggle from '$lib/components/EliteToggle.svelte';
	import FooterBar from '$lib/components/FooterBar.svelte';
	import { parseStats } from '$lib/functions/parseStats';
	import translations from '$lib/translations.json';
	import hardRelics from '$lib/data/relics_phantom_hard.json';
	import RelicDivUnique from '$lib/components/RelicDivUnique.svelte';
	import StageHeader from '$lib/components/StageHeader.svelte';
	import FloorTitle from './FloorTitle.svelte';
	import StageNav from './StageNav.svelte';

	export let data: PageData;
	$: language = data.language;
	$: moddedEnemies = parseStats(data.enemies, $statMods);
	const rogueTopic = 'rogue_phantom';
	$: stageName = data.mapConfig[`name_${language}`] || data.mapConfig.name_zh;
</script>

<svelte:head>
	<title
		>{data.mapConfig.code}
		{stageName.replaceAll('_', ' ')} / {translations[language].title_post}</title
	>
	<meta name="description" content={data.mapConfig[`name_${'zh'}`]} />
</svelte:head>

<StageHeader {language}>
	<FloorTitle slot="floorTitle" stageFloors={data.mapConfig.floors} {language} />
</StageHeader>

<main class="bg-neutral-800 text-near-white pb-32 pt-8 sm:pt-16 md:pb-28">
	<div class="w-screen sm:w-full max-w-7xl mx-auto">
		<StageInfo mapConfig={data.mapConfig} {language} {stageName} {rogueTopic} />
		<div class="mt-8">
			{#if data.mapConfig.elite_mods}
				<EliteToggle mapEliteMods={data.mapConfig.elite_mods} {eliteMods} {rogueTopic} />
			{/if}
			<EnemySimpleTable enemies={moddedEnemies} {language} {statMods} {specialMods} />
		</div>
		<div class="mt-4">
			<StageNav {language} />
		</div>
	</div>
</main>

<FooterBar {language} {rogueTopic} {selectedRelics} {selectedUniqueRelic}>
	<div
		slot="uniqueRelics"
		class="grid lg:grid-cols-3 gap-x-10 gap-y-8 w-full overflow-x-auto md:overflow-visible my-auto mx-auto px-4 sm:px-24 mt-8"
	>
		{#each hardRelics as relic}
			<RelicDivUnique {relic} {language} {rogueTopic} {selectedUniqueRelic} />
		{/each}
	</div>
</FooterBar>
