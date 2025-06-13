<script lang="ts">
	import type { Language } from '$lib/types';
	import type { PageData } from './$types';
	import translations from '$lib/translations.json';

	export let data: PageData, language: Language;
	$: language = data.language;
</script>

<svelte:head>
	<title>{translations[language].donate_text}</title>
	<meta name="description" content={translations[language].title_post} />
	<meta property="og:description" content={translations[language].title_post} />
</svelte:head>

<div class="max-w-xl mx-auto pt-24 px-2">
	<p class="font-semibold text-lg">{translations[language].donate_text}</p>

	<p class="mt-4">
		{{
			zh: '喜欢这个网页的话，考虑支持一下作者买个咖啡给我助力吧！',
			ja: 'このサイトが気に入ったら、作者にコーヒーをおごることで応援してください！',
			en: 'Consider supporting me with some coffee if you like this website!'
		}[language]}
	</p>
	<table class="w-full mt-4 sm:mt-8">
		<tbody>
			<tr>
				<td>Github</td>
				<td>
					<a
						href="https://github.com/tanch-p/tomimi-chan"
						target="_blank"
						rel="noopener noreferrer"
					>
						<span class="text-blue-400 hover:text-blue-300">Github Page</span>
					</a>
				</td>
			</tr>
			<tr>
				<td class="w-[80px]">Kofi</td>
				<td
					><a
						href="https://ko-fi.com/tartarchan"
						target="_blank"
						rel="noopener noreferrer"
						class="text-blue-400 hover:text-blue-300"
					>
						Buy me a coffee
					</a></td
				>
			</tr>
			<tr>
				<td class="w-[80px]">AFDIAN</td>
				<td
					><a
						href="https://afdian.com/a/tomimi"
						target="_blank"
						rel="noopener noreferrer"
						class="text-blue-400 hover:text-blue-300"
					>
						在爱发电支持我吧！
					</a></td
				>
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
