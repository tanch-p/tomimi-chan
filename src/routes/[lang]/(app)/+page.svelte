<script lang="ts">
	import type { PageData } from './$types';
	import banner_mizuki from '$lib/images/banner_mizuki_800px.png';
	import banner_phantom from '$lib/images/banner_phantom_800px.png';
	import translations from '$lib/translations.json';

	export let data: PageData;

	$: language = data.language;
	const is_banners = [
		{ alt: 'rogue_mizuki', src: banner_mizuki, href: 'mizuki' },
		{ alt: 'rogue_phantom', src: banner_phantom, href: 'phantom' }
	];
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="tomimi.dev - tool/helper for arknights" />
</svelte:head>

<section>
	<div class="h-[10vh]" />
	<div class="flex mx-auto gap-4">
		<div class="grow">
			<p class="">Integrated Strategies</p>
			<div class="flex flex-wrap w-[512px] mx-auto">
				{#each is_banners as { alt, src, href }}
					<a class="w-fit" href={`/${language}/${href}`}>
						<img
							class="select-none mx-auto py-2"
							{src}
							width="512"
							decoding="async"
							alt={translations[language][alt]}
						/></a
					>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	p {
		text-align: center;
	}
</style>
