<script lang="ts">
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
	import FooterBar from './FooterBar.svelte';
	import FloorTitle from './FloorTitle.svelte';
	import { page } from '$app/stores';

	$: mapConfig = $page.data.mapConfig;
	$: language = $page.data.language;
	const pathname = $page.url.pathname;

	$: rogueTopic = mapConfig.tags.includes('rogue_mizuki')
		? 'mizuki'
		: mapConfig.tags.includes('rogue_phantom')
		? 'phantom'
		: null;
</script>

<header
	class="sticky top-0 w-[100vw] md:w-full transition-none bg-neutral-800 text-near-white py-4 z-[1]"
>
	<div class="grid grid-cols-3 max-w-7xl mx-auto sm:px-6">
		<div>
			<a href={`/${language}`} class="hover:underline">Home</a>
		</div>
		{#if rogueTopic}
			<FloorTitle stageFloors={mapConfig.floors} {language} />
		{:else}
			<div />
		{/if}
		<div class="flex justify-end">
			<LanguageSwitcher {language} {mapConfig} {pathname} />
		</div>
	</div>
</header>

<main class="bg-neutral-800 text-near-white pb-32 pt-24 md:pb-28">
	<slot />
</main>

{#if rogueTopic}
	<FooterBar {language} {rogueTopic} />
{/if}
