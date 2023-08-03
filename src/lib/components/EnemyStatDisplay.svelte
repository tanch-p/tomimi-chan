<script lang="ts">
	import MediaQuery from './MediaQuery.svelte';
	import type { Enemy, StatMods, SpecialMods,Language } from '$lib/types';
	import EnemySimpleTable from './EnemySimpleTable.svelte';
	import EnemyHandbookDisplay from './EnemyHandbookDisplay.svelte';

	export let enemies: Enemy[], language: Language, statMods: StatMods, specialMods: SpecialMods;
</script>

<MediaQuery>
	<EnemyHandbookDisplay {enemies} {language} {statMods} {specialMods} slot="mobile" />
	<EnemySimpleTable {enemies} {language} {statMods} {specialMods} slot="pc" />
</MediaQuery>
