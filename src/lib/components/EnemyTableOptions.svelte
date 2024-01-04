<script lang="ts">
	import type { Language } from '$lib/types';
	import { tableHeaders, cookiesEnabled } from '../../routes/stores';
	import { browser } from '$app/environment';
	import translations from '$lib/translations.json';
	export let language:Language;
	function updateHeaders(key) {
		tableHeaders.update((list) => {
			const index = list.findIndex((ele) => ele.key === key);
			list[index].show = !list[index].show;
			return list;
		});
	}

	$: if (browser && cookiesEnabled) {
		localStorage.setItem('table_headers', JSON.stringify($tableHeaders));
	}
</script>

<div class="border border-gray-400 my-4">
	<div class="flex flex-wrap gap-x-4 gap-y-3 p-4">
		{#each $tableHeaders as { key, show }}
			<button class={`rounded-full px-4 py-1 ${show ? "bg-sky-600" : "bg-gray-400"}`} on:click={() => updateHeaders(key)}>
				{translations[language].table_headers[key]}
			</button>
		{/each}
	</div>
</div>
