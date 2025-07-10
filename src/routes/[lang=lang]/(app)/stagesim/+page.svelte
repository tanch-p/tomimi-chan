<script lang="ts">
	import type { PageData } from './$types';
	import { statMods, specialMods, runes, eliteMode, otherBuffsList } from './stores';
	import StageInfo from '$lib/components/StageInfo.svelte';
	import translations from '$lib/translations.json';
	import { setOtherBuffsList } from '$lib/functions/lib';
	import StageSharedContainer from '$lib/components/StageSharedContainer.svelte';
	import { onMount } from 'svelte';
	import TitleBlock from '$lib/components/TitleBlock.svelte';

	export let data: PageData;
	$: language = data.language;
	// $: stageName = data.mapConfig[`name_${language}`] || data.mapConfig.name_zh;

	let mapConfig;
	let isLoading = true;
	let selectedEvent = '';

	onMount(() => {
		isLoading = false;
	});
</script>

<svelte:head>
	<title>{translations[language].stage_sim} / {translations[language].title_post}</title>
	<meta name="description" content={translations[language].title_post} />
	<meta property="og:description" content={translations[language].title_post} />
	<meta property="og:title" content={translations[language].stage_sim} />
	<meta property="og:url" content={`https://tomimi.dev/${language}/stagesim`} />
</svelte:head>

<div class="pb-60">
	<div class="max-w-5xl mx-auto pt-6 md:pt-10 pb-4 text-[0.75rem] md:text-[0.875rem]">
		<TitleBlock title={translations[language].stage_sim}>
			<div class="bg-near-white rounded-md p-3 md:p-4 text-almost-black">
				<h2 class="border-b text-center pb-1 md:pb-2">
					{translations[language].settings}
				</h2>
				<div class="flex flex-col md:grid grid-cols-[100px_1fr] gap-2 md:gap-y-3 pt-3">
					<p class="md:py-[5px]">{translations[language].filter_mode}</p>
					<div class="flex flex-wrap gap-2" />
				</div>
				<div class="mt-4 max-w-[500px]" />
			</div>
			<div class="space-y-4">
				<label for="event" class="font-semibold">Select Event:</label>
				<select id="event" bind:value={selectedEvent} class="p-2 border rounded w-full max-w-xs">
					<option disabled value="">-- Choose an Event --</option>
					{#each events as event}
						<option value={event}>{event}</option>
					{/each}
				</select>

				{#if selectedEvent}
					<p class="mt-4">You selected: <strong>{selectedEvent}</strong></p>
				{/if}
			</div>
		</TitleBlock>
	</div>
</div>
