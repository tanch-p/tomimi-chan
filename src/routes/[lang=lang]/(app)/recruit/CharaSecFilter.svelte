<script lang="ts">
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import { secFiltersStore } from './stores';
	import { getOptionTranslationKey, updateFilters } from '$lib/functions/charaHelpers';

	export let language: Language;
</script>

{#if $secFiltersStore?.length > 0}
	<div class="bg-near-white text-almost-black rounded-md p-3 md:p-4 mt-5">
		<h2 class="border-b text-center pb-1 md:pb-2">
			{translations[language].filter_round2}
		</h2>
		<div class="flex flex-col md:grid grid-cols-[100px_1fr] gap-3 pt-2 md:pt-3">
			{#each $secFiltersStore as { key, options }}
				<p class="md:py-[5px]">{translations[language][getOptionTranslationKey(key)]}</p>
				<div class="flex flex-wrap gap-2">
					{#each options as { value, selected }}
						<button
							class="filter-btn"
							class:active={selected}
							on:click={() => updateFilters(key, value, secFiltersStore)}
						>
							{translations[language][value]}
						</button>
					{/each}
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.filter-btn {
		height: 30px;
		background-color: rgb(242 242 242);
		text-transform: capitalize;
	}
	.display-style-button {
		background-color: dimgrey;
		opacity: 0.4;
	}
	.display-style-button.active {
		opacity: 1;
	}
</style>
