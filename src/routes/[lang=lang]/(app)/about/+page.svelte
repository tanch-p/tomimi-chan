<script lang="ts">
	import type { PageData } from './$types';
	import translations from '$lib/translations.json';

	export let data: PageData;
	$: language = data.language;
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="max-w-xl mx-auto pt-24 px-2">
	<p class="font-semibold text-lg">{translations[language].about_text}</p>

	<p class="mt-4">
		{translations[language].about_content}
	</p>
	<table class="w-full mt-4 sm:mt-8">
		<tbody>
			<tr>
				<td>Github</td>
				<td>
					<a href="https://github.com/tanch-p" target="_blank" rel="noopener noreferrer">
						<span class="text-blue-400 hover:text-blue-300">tanch-p</span>
					</a>
				</td>
			</tr>
			<tr>
				{#if language === 'zh'}
					<td class="w-[20%]">b站</td>
					<td>
						<a href="https://space.bilibili.com/42504309" target="_blank" rel="noopener noreferrer">
							<span class="text-blue-400 hover:text-blue-300">塔塔酱AT4</span>
						</a>
					</td>
				{:else}
					<td class="w-[20%]">Discord</td>
					<td>@xiiao#0613</td>
				{/if}
			</tr>
		</tbody>
	</table>
</div>

<style>
	td {
		padding: 2px 0;
		border-width: 1px 0;
	}
</style>
