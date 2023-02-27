<script lang="ts">
	import type { LayoutData } from './$types';
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
	import { page } from '$app/stores';

	export let data: LayoutData;

	$: mapConfig = $page.data.mapConfig;
	$: language = $page.data.language;
	const pathname = data.url.pathname;
</script>

<header class="w-[100vw] md:w-full transition-none">
	<div class="flex justify-between max-w-7xl mx-auto">
		<a href={`/${language}`}>Home</a>
		<LanguageSwitcher {language} {mapConfig} {pathname} />
	</div>
</header>

<main>
	<slot />
</main>
