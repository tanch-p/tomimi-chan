<script lang="ts">
	import type { PageData } from './$types';
	import EnemySimpleTable from './EnemySimpleTable.svelte';
	import DifficultySelect from './DifficultySelect.svelte';
	import FloorSelect from './FloorSelect.svelte';

	export let data: PageData;
</script>

<h1>{data.mapConfig.name_cn}</h1>
<FloorSelect />
<DifficultySelect />
<EnemySimpleTable enemies={data.enemies} />
