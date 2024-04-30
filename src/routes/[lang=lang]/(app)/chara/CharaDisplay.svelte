<script lang="ts">
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import Icon from '$lib/components/Icon.svelte';
	import { selectedChara } from './stores';

	export let characters, language: Language;

	let displayMode = 'grid';
</script>

<div class="max-w-5xl mx-auto">
	{#if characters.length === 0}
		<p class="text-center">{translations[language].filter_no_result}</p>
	{:else}
		<div class="relative">
			<div class="absolute flex items-center gap-x-2 w-max right-4 -top-2.5">
				<button
					class="display-style-button rounded-full p-[9px]"
					class:active={displayMode === 'grid'}
					on:click={() => (displayMode = 'grid')}
				>
					<Icon name="grid-view" size={24} />
				</button>
				<button
					class="display-style-button rounded-full p-[10px]"
					class:active={displayMode === 'list'}
					on:click={() => (displayMode = 'list')}
				>
					<Icon name="icon-list" size={22} />
				</button>
			</div>
			<p class="text-center">
				{translations[language].filter_result.replace('<num>', characters.length)}
			</p>
		</div>

		{#if displayMode === 'grid'}
			<div class="mt-4 grid grid-cols-4 md:grid-cols-8">
				{#each characters as chara}
					<button on:click={() => selectedChara.set(chara)}>
						{chara.appellation}
					</button>
				{/each}
			</div>
		{:else}
			<div class="mt-4 flex flex-col">
				{#each characters as chara}
					<button on:click={() => selectedChara.set(chara)}>
						{chara.appellation}
					</button>
				{/each}
			</div>
		{/if}
	{/if}
</div>

<style>
	.display-style-button.active {
		background-color: dimgrey;
	}
</style>
