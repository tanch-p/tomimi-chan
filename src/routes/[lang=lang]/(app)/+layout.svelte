<script lang="ts">
	import { page } from '$app/stores';
	import Header from './Header.svelte';

	$: language = $page.params.lang;
</script>

<div>
	<Header {language} />

	<main class={`bg-neutral-800 min-h-screen text-near-white ${language === 'zh' ? 'font-ch' : ''}`}>
		<slot />
	</main>

	<footer />
</div>

<style>
	.font-ch {
		font-family: Noto Sans CJK SC, system-ui, -apple-system, BlinkMacSystemFont, Microsoft Yahei,
			SimSun, sans-serif;
	}
</style>
