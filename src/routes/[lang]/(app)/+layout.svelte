<script lang="ts">
	import { page } from '$app/stores';
	import Header from './Header.svelte';

	$: language = $page.params.lang;
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
