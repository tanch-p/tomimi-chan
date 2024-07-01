<script lang="ts">
	import type { Language } from '$lib/types';
	import { sortOptions, secFilters } from './stores';
	import { getActiveModule, getPrioritySortItemsAndValue } from '$lib/functions/charaHelpers';
	import CharaViewGrid from './CharaViewGrid.svelte';
	import CharaViewDetail from './CharaViewDetail.svelte';

	export let chara, displayMode, language: Language;

	$: equip = getActiveModule(chara);
	$: holder = getPrioritySortItemsAndValue(chara, $sortOptions, $secFilters);
	$: values = holder.values;
	$: items = holder.items;
</script>

{#if displayMode === 'grid'}
	<CharaViewGrid {chara} {values} {equip} />
{:else}
	<CharaViewDetail {chara} {items} {equip} {language} />
{/if}
