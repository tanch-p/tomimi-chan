<script lang="ts">
	import MediaQuery from './MediaQuery.svelte';
	import type { Enemy, SpecialMods, Language } from '$lib/types';
	import EnemyHandbookDisplay from './EnemyHandbookDisplay.svelte';
	import EnemyDesktopViewController from './EnemyDesktopViewController.svelte';

	export let enemies: Enemy[], language: Language;
</script>

<MediaQuery>
	<EnemyHandbookDisplay {enemies} {language} slot="mobile" />
	<EnemyDesktopViewController {enemies} {language} slot="pc" />
</MediaQuery>
