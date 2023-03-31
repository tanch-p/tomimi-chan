<script lang="ts">
	import translations from '$lib/translations.json';
	export let statusImmuneList: [], language: string;

	$: statusImmuneTexts = translations[language].status_immune;
</script>

<div>
	{statusImmuneTexts.pre}{#each statusImmuneList as status, index}<span
			>{statusImmuneTexts[
				status
			]}{#if statusImmuneList.length > 1 && index !== statusImmuneList.length - 1}{statusImmuneTexts.separator}{/if}</span
		>{/each}{statusImmuneTexts.post}
</div>

<style>
	div {
		padding: 6px 0px;
	}
</style>
