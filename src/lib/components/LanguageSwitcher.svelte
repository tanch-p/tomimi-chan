<script lang="ts">
	import { clickOutside } from '$lib/functions/clickOutside.js';
	import translations from '$lib/translations.json';
	import { page } from '$app/stores';

	let showOptions = false;
	let pathEN: string, pathJA: string, pathZH: string;

	$: mapConfig = $page.data.mapConfig;
	$: language = $page.data.language;
	$: pathname = $page.url.pathname;
	$: code = mapConfig?.code;
	$: name_zh = mapConfig?.name_zh;
	$: name_ja = mapConfig?.name_ja;
	$: name_en = mapConfig?.name_en;
	$: if (mapConfig) {
		pathEN = `/en/stages/${code}_${name_en || name_zh}`;
		pathJA = `/ja/stages/${code}_${name_ja || name_zh}`;
		pathZH = `/zh/stages/${code}_${name_zh}`;
	} else {
		pathEN = pathname.replace(language, 'en');
		pathJA = pathname.replace(language, 'ja');
		pathZH = pathname.replace(language, 'zh');
	}
	const languageCodes = { en: 'EN', ja: '日本語', zh: '中文' };
</script>

<div class="relative" use:clickOutside on:outclick={() => (showOptions = false)}>
	<button on:click={() => (showOptions = !showOptions)} class="sm:py-1 px-2 hover:underline h-full">
		<span class="flex gap-x-1.5">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 20 20"
				class="mb-0.5"
			>
				<title> language </title>
				<path
					fill="#E2E2E2"
					d="M20 18h-1.44a.61.61 0 0 1-.4-.12.81.81 0 0 1-.23-.31L17 15h-5l-1 2.54a.77.77 0 0 1-.22.3.59.59 0 0 1-.4.14H9l4.55-11.47h1.89zm-3.53-4.31L14.89 9.5a11.62 11.62 0 0 1-.39-1.24q-.09.37-.19.69l-.19.56-1.58 4.19zm-6.3-1.58a13.43 13.43 0 0 1-2.91-1.41 11.46 11.46 0 0 0 2.81-5.37H12V4H7.31a4 4 0 0 0-.2-.56C6.87 2.79 6.6 2 6.6 2l-1.47.5s.4.89.6 1.5H0v1.33h2.15A11.23 11.23 0 0 0 5 10.7a17.19 17.19 0 0 1-5 2.1q.56.82.87 1.38a23.28 23.28 0 0 0 5.22-2.51 15.64 15.64 0 0 0 3.56 1.77zM3.63 5.33h4.91a8.11 8.11 0 0 1-2.45 4.45 9.11 9.11 0 0 1-2.46-4.45z"
				/>
			</svg>
			{languageCodes[language]}</span
		>
	</button>
	{#if showOptions}
		<div
			on:click={() => (showOptions = false)}
			class="absolute w-max mt-1 py-0.5 bg-neutral-900 select-none"
		>
			<a href={pathEN}><div class="px-2 my-0.5 hover:bg-gray-600">English</div></a>
			<a href={pathJA}><div class="px-2 my-0.5 hover:bg-gray-600">日本語</div></a>
			<a href={pathZH}><div class="px-2 my-0.5 hover:bg-gray-600">中文</div></a>
		</div>
	{/if}
</div>

<style>
	span {
		display: flex;
		height: 100%;
		align-items: center;
		font-weight: 700;
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
	}
</style>
