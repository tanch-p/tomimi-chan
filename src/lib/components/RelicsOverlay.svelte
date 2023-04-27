<script lang="ts">
	import RelicDiv from './RelicDiv.svelte';
	import translations from '$lib/translations.json';
	import mizukiRelics from '$lib/data/relics_mizuki.json';
	import phantomRelics from '$lib/data/relics_phantom.json';

	export let openOverlay: boolean,
		language: string,
		rogueTopic: string,
		selectedRelics,
		selectedUniqueRelic;
</script>

<div
	class={`relative transition-opacity duration-[50ms] ease-in-out select-none ${
		openOverlay ? 'opacity-100' : 'opacity-0 invisible'
	}`}
>
	<div id="relic-list" class="fixed inset-0 bg-ph-bg bg-opacity-90 overflow-y-scroll">
		<div class="w-full max-w-7xl mx-auto py-36">
			<div
				class="grid lg:grid-cols-3 gap-x-10 gap-y-8 w-full overflow-x-auto md:overflow-visible my-auto mx-auto px-4 sm:px-24"
			>
				{#if rogueTopic === 'rogue_mizuki'}
					{#each mizukiRelics as relic}
						<RelicDiv {relic} {language} {rogueTopic} {selectedRelics} />
					{/each}
				{:else}
					{#each phantomRelics as relic}
						<RelicDiv {relic} {language} {rogueTopic} {selectedRelics} />
					{/each}
				{/if}
			</div>
			<slot name="uniqueRelics" />
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
</div>
