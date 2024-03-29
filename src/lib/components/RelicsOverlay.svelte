<script lang="ts">
	import type {Language, RogueTopic} from "$lib/types"
	import { createEventDispatcher } from 'svelte';
	import RelicDiv from './RelicDiv.svelte';
	import translations from '$lib/translations.json';
	import mizukiRelics from '$lib/data/relics_mizuki.json';
	import phantomRelics from '$lib/data/relics_phantom.json';
	import samiRelics from '$lib/data/relics_sami.json';

	const dispatch = createEventDispatcher();

	export let openOverlay: boolean,
		language: Language,
		rogueTopic: RogueTopic,
		selectedRelics,
		selectedUniqueRelic;

	function handleOverlayClick(e) {
		if (!e.target.className.includes('relic') && !e.target.id.includes('reset')) {
			dispatch('close');
		}
	}
</script>

<div
	class={`relative transition-opacity duration-[50ms] ease-in-out select-none ${
		openOverlay ? 'opacity-100' : 'opacity-0 invisible'
	}`}
>
	{#if openOverlay}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="fixed inset-0 bg-ph-bg bg-opacity-90 overflow-y-scroll no-scrollbar"
			on:click={handleOverlayClick}
		>
			<div class="w-full max-w-7xl mx-auto py-36">
				<div
					class="grid lg:grid-cols-3 gap-x-10 gap-y-8 w-full overflow-x-auto md:overflow-visible my-auto mx-auto px-4 sm:px-24"
				>
					{#if rogueTopic === 'rogue_mizuki'}
						{#each mizukiRelics as relic}
							<RelicDiv {relic} {language} {rogueTopic} {selectedRelics} />
						{/each}
					{:else if rogueTopic === 'rogue_sami'}
						{#each samiRelics as relic}
							<RelicDiv {relic} {language} {rogueTopic} {selectedRelics} />
						{/each}
					{:else}
						{#each phantomRelics as relic}
							<RelicDiv {relic} {language} {rogueTopic} {selectedRelics} />
						{/each}
					{/if}
				</div>
				<slot name="uniqueRelics" />
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					id="reset"
					class="rounded-xl bg-neutral-700 text-near-white px-16 py-2 mt-12 mx-auto w-min hover:cursor-pointer hover:bg-neutral-600"
					on:click={() => {
						selectedRelics.set([]);
						if (selectedUniqueRelic !== null) {
							selectedUniqueRelic.set(null);
						}
					}}
				>
					<p class="whitespace-nowrap">{translations[language]['reset']}</p>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	p {
		text-align: center;
		padding: 0 0.5rem;
		font-weight: 700;
		letter-spacing: 0.1em;
	}
</style>
