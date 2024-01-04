<script lang="ts">
	import MediaQuery from './MediaQuery.svelte';
	import type { Enemy, SpecialMods,Language } from '$lib/types';
	import EnemySimpleTable from './EnemySimpleTable.svelte';
	import EnemyHandbookDisplay from './EnemyHandbookDisplay.svelte';

	export let enemies: Enemy[], language: Language, specialMods;
</script>

<MediaQuery>
	<EnemyHandbookDisplay {enemies} {language} {specialMods} slot="mobile" />
	<EnemySimpleTable {enemies} {language} {specialMods} slot="pc" />
</MediaQuery>
