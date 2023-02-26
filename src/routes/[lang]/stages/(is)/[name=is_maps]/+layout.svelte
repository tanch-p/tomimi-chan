<script lang="ts">
	import type { LayoutData } from './$types';
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
	import { page } from '$app/stores';

	export let data: LayoutData;

	$: mapConfig = $page.data.mapConfig;
	$: language = $page.data.language;
	const pathname = data.url.url.pathname;
</script>

<header class="w-[100vw]  md:w-full transition-none">
	<LanguageSwitcher {language} {mapConfig} {pathname} />
</header>

<main>
	<slot />
</main>
