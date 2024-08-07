<script lang="ts">
	import type { PageData } from './$types';
	import { statMods, specialMods, eliteMods, selectedRelics, selectedUniqueRelic, selectedFloor } from './stores';
	import StageInfo from '$lib/components/StageInfo.svelte';
	import EliteToggle from '$lib/components/EliteToggle.svelte';
	import EnemyStatDisplay from '$lib/components/EnemyStatDisplay.svelte';
	import FooterBar from '$lib/components/FooterBar.svelte';
	import { applyMods, compileStatModsForChecking } from '$lib/functions/statHelpers';
	import translations from '$lib/translations.json';
	import hardRelics from '$lib/data/is/phantom/relics_phantom_hard.json';
	import RelicDivUnique from '$lib/components/RelicDivUnique.svelte';
	import StageHeader from '$lib/components/StageHeader.svelte';
	import FloorTitle from './FloorTitle.svelte';
	import StageNav from './StageNav.svelte';
	import ModsCheck from '$lib/components/ModsCheck.svelte';

	export let data: PageData;
	$: language = data.language;
	$: moddedEnemies = applyMods(data.enemies, data.mapConfig.id, $statMods);
	$: modsCheck = compileStatModsForChecking(data.enemies, data.mapConfig.id, $statMods);
	const rogueTopic = 'rogue_phantom';
	$: stageName = data.mapConfig[`name_${language}`] || data.mapConfig.name_zh;
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

<main class="bg-neutral-800 text-near-white pb-32 pt-8 sm:pt-16 md:pb-28">
	<div class="w-screen sm:w-full max-w-7xl mx-auto">
		<StageInfo mapConfig={data.mapConfig} {language} {stageName} eliteMods={$eliteMods} {selectedFloor} {rogueTopic} />
		<div class="mt-8">
			<ModsCheck {language} {modsCheck} mapConfig={data.mapConfig} />
			{#if data.mapConfig.elite_mods}
				<EliteToggle mapEliteMods={data.mapConfig.elite_mods} {eliteMods} {rogueTopic} />
			{/if}
			<EnemyStatDisplay enemies={moddedEnemies} {language} {specialMods} />
		</div>
		<div id="stageNav" class="mt-4 scroll-mt-20">
			<StageNav {language} />
		</div>
	</div>
</main>

<FooterBar {language} {rogueTopic} {selectedRelics} {selectedUniqueRelic}>
	<div
		slot="uniqueRelics"
		class="grid lg:grid-cols-3 gap-x-10 gap-y-8 w-full overflow-x-auto md:overflow-visible my-auto mx-auto px-4 sm:px-24 mt-10"
	>
		{#each hardRelics as relic}
			<RelicDivUnique {relic} {language} {rogueTopic} {selectedUniqueRelic} />
		{/each}
	</div>
</FooterBar>
