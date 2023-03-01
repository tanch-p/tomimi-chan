<script lang="ts">
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
	import { page } from '$app/stores';

	$: mapConfig = $page.data.mapConfig;
	$: language = $page.data.language;
	const pathname = $page.url.pathname;
</script>

<header class="w-[100vw] md:w-full transition-none">
	<div class="flex justify-between max-w-7xl mx-auto">
		<a href={`/${language}`}>Home</a>
		<LanguageSwitcher {language} {mapConfig} {pathname} />
	</div>
</header>

<main class="bg-neutral-800 text-near-white pb-16 pt-24 md:py-24">
	<slot />
</main>
