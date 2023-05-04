<script lang="ts">
	import { page } from '$app/stores';
	import Header from './Header.svelte';

	$: language = $page.params.lang;
</script>

<div class="app">
	<Header {language} />

	<main class="bg-neutral-800 min-h-screen text-near-white">
		<slot />
	</main>

	<footer />
</div>

<style>
</style>
