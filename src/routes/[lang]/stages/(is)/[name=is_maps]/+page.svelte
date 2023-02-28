<script lang="ts">
	import type { PageData } from './$types';
	import { statMods } from './stores.js';
	import EnemySimpleTable from './EnemySimpleTable.svelte';
	import DifficultySelect from './DifficultySelect.svelte';
	import FloorSelect from './FloorSelect.svelte';
	import MizukiNav from '../../../(app)/mizuki/MizukiNav.svelte';
	import HardModeToggle from './HardModeToggle.svelte';
	import parseStats from '$lib/functions/parseStats';

	export let data: PageData;
	$: language = data.language;
	$: moddedEnemies = parseStats(data.enemies, $statMods);
</script>

<svelte:head>
	<title>{data.mapConfig[`name_${'zh'}`]}</title>
	<meta name="description" content={data.mapConfig[`name_${'zh'}`]} />
</svelte:head>

<div class="w-[100vw] md:w-full max-w-7xl mx-auto">
	<h1>{data.mapConfig[`name_${'zh'}`]}</h1>
	<FloorSelect />
	<DifficultySelect {language} />
	{#if data.mapConfig.hard_mods}
		<HardModeToggle mapHardMods={data.mapConfig.hard_mods} />
	{/if}
	<EnemySimpleTable enemies={moddedEnemies} {language} />
	<div class="mt-4">
		{#if data.mapConfig.tags.includes('rogue_mizuki')}
			<MizukiNav {language} />
		{/if}
	</div>
</div>
