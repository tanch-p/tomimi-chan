<script lang="ts">
	import type { PageData } from './$types';
	import translations from '$lib/translations.json';

	export let data: PageData;
	$: language = data.language;
</script>

<svelte:head>
	<title>{translations[language].about_text}</title>
	<meta name="description" content={translations[language].title_post} />
	<meta property="og:description" content={translations[language].title_post} />
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

			{#if language === 'zh'}
				<tr>
					<td class="w-[80px]">b站</td>
					<td>
						<a href="https://space.bilibili.com/42504309" target="_blank" rel="noopener noreferrer">
							<span class="text-blue-400 hover:text-blue-300">塔塔酱AT4</span>
						</a>
					</td>
				</tr>
			{:else}
				<tr>
					<td class="w-[80px]">Discord</td>
					<td>@xiiao</td>
				</tr>
				<tr>
					<td class="w-[80px]">Email</td>
					<td>tomimi.dev@gmail.com</td>
				</tr>
			{/if}
		</tbody>
	</table>
</div>

<style>
	td {
		padding: 2px 0;
		border-width: 1px 0;
	}
</style>
