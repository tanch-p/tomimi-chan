<script lang="ts">
	import type { PageData } from './$types';
	import type { StatMods } from './types';
	import { statMods } from './stores.js';
	import EnemySimpleTable from './EnemySimpleTable.svelte';
	import DifficultySelect from './DifficultySelect.svelte';
	import FloorSelect from './FloorSelect.svelte';
	import MizukiNav from '../MizukiNav.svelte';
	import parseStats from '$lib/functions/parseStats';

	let statModsValue: StatMods;
	statMods.subscribe((value) => (statModsValue = value));

	export let data: PageData;
	$: moddedEnemies = parseStats(data.enemies, statModsValue);
</script>

<svelte:head>
	<title>{data.mapConfig[`name_${'cn'}`]}</title>
	<meta name="description" content={data.mapConfig[`name_${'cn'}`]} />
</svelte:head>

<div class="w-[100vw] md:w-full max-w-5xl mx-auto">
	<h1>{data.mapConfig[`name_${'cn'}`]}</h1>
	<FloorSelect />
	<DifficultySelect />
	<EnemySimpleTable enemies={moddedEnemies} />
	<div class="mt-4">
		{#if data.mapConfig.tags.includes('rogue_mizuki')}
			<MizukiNav />
		{/if}
	</div>
</div>
