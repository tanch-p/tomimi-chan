<script lang="ts">
	import MediaQuery from './MediaQuery.svelte';
	import type { Enemy, SpecialMods, Language } from '$lib/types';
	import EnemyHandbookDisplay from './EnemyHandbookDisplay.svelte';
	import EnemyDesktopViewController from './EnemyDesktopViewController.svelte';

	export let enemies: Enemy[], language: Language, statMods, specialMods, otherBuffsList;
</script>

<MediaQuery>
	<EnemyHandbookDisplay {enemies} {language} {statMods} {specialMods} {otherBuffsList} slot="mobile" />
	<EnemyDesktopViewController {enemies} {language} {statMods} {specialMods} {otherBuffsList} slot="pc" />
</MediaQuery>
