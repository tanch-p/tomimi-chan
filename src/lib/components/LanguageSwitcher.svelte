<script lang="ts">
	import { clickOutside } from '$lib/functions/clickOutside.js';
	export let language: string, mapConfig, pathname;
	let showOptions = false;
	let pathEN: string, pathJP: string;
	const { code, name_cn, name_jp, name_en } = mapConfig;
	if (pathname.includes('stages')) {
		pathEN = `/en/stages/${code}_${name_en || name_cn}`;
		pathJP = `/jp/stages/${code}_${name_jp || name_cn}`;
	} else {
		pathEN = pathname.replace(language, 'en');
		pathJP = pathname.replace(language, 'jp');
	}
</script>

<div>
	<button on:click={() => (showOptions = true)}>
		Language: {language}
	</button>
	{#if showOptions}
		<div use:clickOutside on:outclick={() => (showOptions = false)}>
			<a href={pathEN}><div>English</div></a>
			<a href={pathJP}><div>日本語</div></a>
		</div>
	{/if}
</div>
