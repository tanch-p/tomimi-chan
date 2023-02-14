<script lang="ts">
	import type { PageData } from './$types';
	import { statMods } from './stores.js';
	import EnemySimpleTable from './EnemySimpleTable.svelte';
	import DifficultySelect from './DifficultySelect.svelte';
	import FloorSelect from './FloorSelect.svelte';
	import parseStats from '$lib/functions/parseStats';

	let statModsValue;
	statMods.subscribe((value) => (statModsValue = value));
	
	export let data: PageData;
	$: moddedEnemies = parseStats(data.enemies, statModsValue);
</script>

<h1>{data.mapConfig.name_cn}</h1>
<FloorSelect />
<DifficultySelect />
<EnemySimpleTable enemies={moddedEnemies} />
