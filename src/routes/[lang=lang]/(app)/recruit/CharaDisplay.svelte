<script lang="ts">
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import { selectedChara, filtersStore, moduleIndex } from './stores';
	import CharaIcon from './CharaIcon.svelte';
	import { getActiveModule } from '$lib/functions/charaHelpers';

	export let chara, displayMode, language: Language;

	$: equip = getActiveModule(chara, $filtersStore);

	const handleClick = (chara, equip) => {
		selectedChara.set(chara);
		if (equip) {
			const equipIndex = chara.uniequip.findIndex((ele) => ele.uniEquipId === equip.uniEquipId);
			if (equipIndex !== -1) moduleIndex.set(equipIndex);
		}
	};
</script>

{#if displayMode === 'grid'}
	<button
		on:click={() => handleClick(chara, equip)}
		class="select-none border border-gray-600 border-opacity-50"
	>
		<CharaIcon {chara}>
			{#if equip}
				{@const typeIcon = equip.typeIcon.toLowerCase()}
				{#await import(`../../../../lib/images/color_equip_icons/icon_${typeIcon}.webp`) then { default: src }}
					<div
						class="absolute -right-1 -top-1 w-[40px] h-[40px] bg-center bg-cover"
						style="background-image: url({src});"
					/>
				{/await}
			{/if}
		</CharaIcon>
	</button>
{:else}
	<div class="grid grid-cols-[100px_1fr]">
		<button on:click={() => selectedChara.set(chara)}>
			<CharaIcon {chara} />
		</button>
		{chara.appellation}
	</div>
{/if}
