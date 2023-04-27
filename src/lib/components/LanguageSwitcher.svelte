<script lang="ts">
	import { clickOutside } from '$lib/functions/clickOutside.js';
	import translations from '$lib/translations.json';
	import { page } from '$app/stores';

	let showOptions = false;
	let pathEN: string, pathJA: string, pathZH: string;

	$: mapConfig = $page.data.mapConfig;
	$: language = $page.data.language;
	$: pathname = $page.url.pathname;
	$: code = mapConfig.code;
	$: name_zh = mapConfig.name_zh;
	$: name_ja = mapConfig.name_ja;
	$: name_en = mapConfig.name_en;
	$: if (mapConfig) {
		pathEN = `/en/stages/${code}_${name_en || name_zh}`;
		pathJA = `/ja/stages/${code}_${name_ja || name_zh}`;
		pathZH = `/zh/stages/${code}_${name_zh}`;
	} else {
		pathEN = pathname.replace(language, 'en');
		pathJA = pathname.replace(language, 'ja');
	}
	const languageCodes = { en: 'EN', ja: '日本語', zh: '中文' };
</script>

<div class="sm:py-1 relative" use:clickOutside on:outclick={() => (showOptions = false)}>
	<button on:click={() => (showOptions = !showOptions)} class="px-2 hover:underline">
		{translations[language].language}: {languageCodes[language]}
	</button>
	{#if showOptions}
		<div
			on:click={() => (showOptions = false)}
			class="absolute w-full mt-1 py-1 bg-neutral-900 select-none"
		>
			<a href={pathEN}><div class="px-2 my-0.5 hover:bg-gray-600">English</div></a>
			<a href={pathJA}><div class="px-2 my-0.5 hover:bg-gray-600">日本語</div></a>
			<a href={pathZH}><div class="px-2 my-0.5 hover:bg-gray-600">中文</div></a>
		</div>
	{/if}
</div>
