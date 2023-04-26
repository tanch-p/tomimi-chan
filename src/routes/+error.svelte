<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	let language = 'en';
	let redirectTime = 10000;
	let timer = redirectTime / 1000;
	onMount(() => {
		if (browser) {
			const browerLang = window.navigator.language;
			if (browerLang.match(/ja|ja/i)) {
				language = 'ja';
			} else if (browerLang.includes('zh')) {
				language = 'zh';
			}
			setTimeout(async () => {
				await goto(`/${language}`);
			}, redirectTime);
		}
	});
	$: message = $page.error?.message;
</script>

<title>404 / tomimi.dev</title>
<div class="bg-neutral-800 min-h-screen flex items-center">
	<div class="max-w-7xl mx-auto">
		<p class="text-center text-near-white">
			{#if message === 'Not Found'}
				The page you requested could not be found
			{:else}
				An unexpected error occured while loading the page. <br />
				If this error persists, please kindly inform me on discord xiiao#0613
			{/if}
			<br /><br />
			You will be redirected to the homepage in {timer} seconds...<br />
			If you are not redirected please click
			<a data-sveltekit-reload class="text-blue-500" href={`/${language}`}>here</a>
		</p>
	</div>
</div>
