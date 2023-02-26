<script lang="ts">
	import { clickOutside } from '$lib/functions/clickOutside.js';
	import translations from '$lib/translations.json';
	export let language: string, mapConfig, pathname: string;
	let showOptions = false;
	let pathEN: string, pathJP: string;
	$: code = mapConfig.code;
	$: name_zh = mapConfig.name_zh;
	$: name_jp = mapConfig.name_jp;
	$: name_en = mapConfig.name_en;
	$: if (pathname.includes('stages')) {
		pathEN = `/en/stages/${code}_${name_en || name_zh}`;
		pathJP = `/jp/stages/${code}_${name_jp || name_zh}`;
	} else {
		pathEN = pathname.replace(language, 'en');
		pathJP = pathname.replace(language, 'jp');
	}
</script>

<div use:clickOutside on:outclick={() => (showOptions = false)}>
	<button on:click={() => (showOptions = !showOptions)}>
		{translations[language].language}: {language}
	</button>
	{#if showOptions}
		<div on:click={() => (showOptions = false)}>
			<a href={pathEN}><div>English</div></a>
			<a href={pathJP}><div>日本語</div></a>
		</div>
	{/if}
</div>
