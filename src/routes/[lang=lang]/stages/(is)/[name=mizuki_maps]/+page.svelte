<script lang="ts">
	import type { PageData } from './$types';
	import { statMods, eliteMods, selectedRelics } from './stores.js';
	import EnemySimpleTable from './EnemySimpleTable.svelte';
	import DifficultySelect from './DifficultySelect.svelte';
	import MizukiNav from '../../../(app)/mizuki/MizukiNav.svelte';
	import StageInfo from '$lib/components/StageInfo.svelte';
	import EliteToggle from '$lib/components/EliteToggle.svelte';
	import FooterBar from '$lib/components/FooterBar.svelte';
	import { parseStats } from '$lib/functions/parseStats';
	import translations from '$lib/translations.json';
	import Mission from './Mission.svelte';

	export let data: PageData;
	$: language = data.language;
	$: moddedEnemies = parseStats(data.enemies, $statMods);
	const rogueTopic = 'rogue_mizuki';
</script>

<svelte:head>
	<title
		>{data.mapConfig.code}
		{data.mapConfig[`name_${'zh'}`]} / {translations[language].title_post}</title
	>
	<meta name="description" content={data.mapConfig[`name_${'zh'}`]} />
</svelte:head>

<div class="w-[100vw] md:w-full max-w-7xl mx-auto">
	<StageInfo mapConfig={data.mapConfig} {language} />
	<Mission {language} />
	<DifficultySelect {language} />
	{#if data.mapConfig.elite_mods}
		<EliteToggle mapEliteMods={data.mapConfig.elite_mods} {eliteMods} {rogueTopic} />
	{/if}
	<EnemySimpleTable enemies={moddedEnemies} {language} />
	<div class="mt-4">
		<MizukiNav {language} />
	</div>
	<FooterBar {language} {rogueTopic} {selectedRelics} />
</div>
