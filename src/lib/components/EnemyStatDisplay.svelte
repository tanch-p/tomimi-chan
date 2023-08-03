<script lang="ts">
	import MediaQuery from './MediaQuery.svelte';
	import type { Enemy } from '$lib/types';
	import EnemySimpleTable from './EnemySimpleTable.svelte';
	import EnemyHandbookDisplay from './EnemyHandbookDisplay.svelte';

	export let enemies: Enemy[], language: string, statMods, specialMods;
</script>

<MediaQuery>
    <EnemyHandbookDisplay {enemies} {language} {statMods} {specialMods} slot="mobile" />
	<EnemySimpleTable {enemies} {language} {statMods} {specialMods} slot="pc" />
</MediaQuery>

