<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let language = 'en';
	onMount(async () => {
		if (browser) {
			const browerLang = window.navigator.language;
			if (browerLang.match(/ja|ja/i)) {
				language = 'ja';
			} else if (browerLang.includes('zh')) {
				language = 'zh';
			}
			await goto(`/${language}`);
		}
	});
</script>

<div class="bg-neutral-800 min-h-screen flex items-center">
	<div class="max-w-7xl mx-auto">
		<p class="text-center text-near-white">
		Welcome to tomimi.dev! <br />

		You will be redirected to the homepage shortly... <br />
		If you are not redirected please click
		<a data-sveltekit-reload class="text-blue-500" href={'/en'}>here</a>
	</p>
</div>
</div>
