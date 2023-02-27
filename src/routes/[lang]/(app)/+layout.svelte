<script lang="ts">
	import type { LayoutData } from './$types';
	export let data: LayoutData;

	$: language = data.params.lang;
	import Header from './Header.svelte';
</script>

<div class="app">
	<Header {language} />

	<main class="max-w-7xl mx-auto">
		<slot />
	</main>

	<footer />
</div>

<style>
</style>
