<script lang="ts">
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import Icon from '$lib/components/Icon.svelte';
	import CharaDisplay from './CharaDisplay.svelte';
	import { onMount } from 'svelte';

	export let characters, language: Language;

	let displayMode = 'grid';
	let loading = false;
	let visibleItems = [];
	let itemsPerLoad = 50;
	let currentIndex = 0;

	$: if (characters) {
		visibleItems = [];
		currentIndex = 0;
		loadMoreItems();
	}

	function loadMoreItems() {
		if (loading || currentIndex >= characters.length) return;

		loading = true;
		setTimeout(() => {
			const newItems = characters.slice(currentIndex, currentIndex + itemsPerLoad);
			visibleItems = [...visibleItems, ...newItems];
			currentIndex += itemsPerLoad;
			loading = false;
		}, 300); // Simulate network delay
	}

	function handleScroll() {
		const windowHeight = window.innerHeight;
		const documentHeight = document.documentElement.scrollHeight;
		const scrollTop = window.scrollY || document.documentElement.scrollTop;

		if (documentHeight - (scrollTop + windowHeight) <= 200) {
			loadMoreItems();
		}
	}

	onMount(() => {
		loadMoreItems();
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
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
			<p class="md:text-center ml-4 md:ml-0">
				{translations[language].filter_result.replace('<num>', characters.length)}
			</p>
		</div>
		<div
			class="mt-4 {displayMode === 'grid'
				? 'grid grid-cols-4 sm:flex flex-wrap gap-1.5 px-1.5 sm:px-0'
				: 'flex flex-col gap-3.5 px-1.5'}"
		>
			{#each visibleItems as chara (chara.id)}
				<CharaDisplay {chara} {displayMode} {language} />
			{/each}
		</div>
		{#if loading}
			<div class="text-center mt-5">{translations[language].loading}</div>
		{/if}
	{/if}
</div>

<style>
	.display-style-button.active {
		background-color: dimgrey;
	}
</style>
