<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let language = 'en';
	onMount(async () => {
		if (browser) {
			const browerLang = window.navigator.language;
			if (browerLang.match(/jp|ja/i)) {
				language = 'jp';
			} else if (browerLang.includes('zh')) {
				language = 'zh';
			}
			console.log(language);
			await goto(`/${language}`);
		}
	});
</script>

<div class="max-w-7xl mx-auto">
	<p class="mt-24 text-center">
		You will be redirected shortly... <br />
		If you are not redirected please click
		<a data-sveltekit-reload class="text-blue-500" href={'/en'}>here</a>
	</p>
</div>
