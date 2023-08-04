<script lang="ts">
	import type { Enemy, Language, SpecialMods } from '$lib/types';
	import translations from '$lib/translations.json';
	export let enemy: Enemy, language: Language, specialMods, mode: 'handbook' | 'table';

	let statusImmuneList = [];

	specialMods.subscribe((mods: SpecialMods) => {
		if (mods?.[enemy.id]?.status_immune) {
			statusImmuneList = [...enemy.status_immune, ...mods[enemy.id].status_immune];
		} else {
			statusImmuneList = enemy.status_immune;
		}
	});
	$: statusImmuneTexts = translations[language].status_immune;
</script>

{#if statusImmuneList.length > 0}
	{#if mode === 'handbook'}
		<p>{translations[language].handbook_immune}</p>
		<div class="flex flex-wrap gap-1.5 my-1">
			{#each statusImmuneList as status}
				<p class="rounded-md bg-neutral-700 px-1.5 text-sm">
					{language === 'en' ? '' : statusImmuneTexts.pre}{statusImmuneTexts[
						status
					]}{statusImmuneTexts.post}
				</p>
			{/each}
		</div>
	{:else}
		<div>
			{statusImmuneTexts.pre}{#each statusImmuneList as status, index}<span
					>{statusImmuneTexts[
						status
					]}{#if statusImmuneList.length > 1 && index !== statusImmuneList.length - 1}{statusImmuneTexts.separator}{/if}</span
				>{/each}{statusImmuneTexts.post}
		</div>
	{/if}
{/if}

<style>
	div {
		padding: 6px 0px;
	}
</style>
