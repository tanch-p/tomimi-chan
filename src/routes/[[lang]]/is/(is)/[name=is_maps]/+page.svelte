<script lang="ts">
	import type { PageData } from './$types';
	import type { StatMods } from './types';
	import { statMods } from './stores.js';
	import EnemySimpleTable from './EnemySimpleTable.svelte';
	import DifficultySelect from './DifficultySelect.svelte';
	import FloorSelect from './FloorSelect.svelte';
	import parseStats from '$lib/functions/parseStats';

	let statModsValue: StatMods;
	statMods.subscribe((value) => (statModsValue = value));

	export let data: PageData;
	let language = data.language;
	$: moddedEnemies = parseStats(data.enemies, statModsValue);
</script>

<svelte:head>
	<title>{data.mapConfig[`name_${language}`]}</title>
	<meta name="description" content={data.mapConfig[`name_${language}`]} />
</svelte:head>

<h1>{data.mapConfig[`name_${language}`]}</h1>
<FloorSelect />
<DifficultySelect />
<EnemySimpleTable enemies={moddedEnemies} />
