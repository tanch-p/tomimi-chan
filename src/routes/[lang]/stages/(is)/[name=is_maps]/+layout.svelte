<script lang="ts">
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
	import FooterBar from './FooterBar.svelte';
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

<header class="fixed top-0 w-[100vw] md:w-full transition-none bg-neutral-800 text-near-white">
	<div class="flex justify-between max-w-7xl mx-auto">
		<a href={`/${language}`}>Home</a>
		<LanguageSwitcher {language} {mapConfig} {pathname} />
	</div>
</header>

<main class="bg-neutral-800 text-near-white pb-32 pt-24 md:pb-28">
	<slot />
</main>

{#if rogueTopic}
	<FooterBar {language} {rogueTopic} />
{/if}
