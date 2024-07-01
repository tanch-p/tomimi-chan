<script lang="ts">
	import type { Language } from '$lib/types';
	import { sortOptions, secFilters } from './stores';
	import { getActiveModule, getPrioritySortValue } from '$lib/functions/charaHelpers';
	import CharaViewGrid from './CharaViewGrid.svelte';
	import CharaViewDetail from './CharaViewDetail.svelte';

	export let chara, displayMode, language: Language;

	$: equip = getActiveModule(chara);
	$: values = getPrioritySortValue(chara, $sortOptions, $secFilters);
</script>

{#if displayMode === 'grid'}
	<CharaViewGrid {chara} {values} {equip} />
{:else}
	<CharaViewDetail {chara} {equip} {language}/>
{/if}
