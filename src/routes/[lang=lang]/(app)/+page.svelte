<script lang="ts">
	import type { PageData } from './$types';
	import banner_mizuki from '$lib/images/banner_mizuki_800px.webp';
	import banner_phantom from '$lib/images/banner_phantom_800px.webp';
	import translations from '$lib/translations.json';
	import ISLogo from '$lib/images/is_logo.webp';

	export let data: PageData;

	$: language = data.language;
	const is_banners = [
		{ alt: 'rogue_mizuki', src: banner_mizuki, href: 'mizuki' },
		{ alt: 'rogue_phantom', src: banner_phantom, href: 'phantom' }
	];
</script>

<svelte:head>
	<title>{translations[language].home} / {translations[language].title_post}</title>
	<meta name="description" content={translations[language].title_post} />
	<meta property="og:description" content={translations[language].title_post} />
	<meta property="og:title" content={translations[language].home} />
	<meta property="og:url" content={`https://tomimi.dev/${language}`} />
</svelte:head>

<section>
	<div class="h-[10vh]" />
	<div class="w-screen sm:w-full max-w-7xl mx-auto">
		<div class="flex flex-wrap mx-auto gap-4 px-2 sm:px-8  justify-center">
			<!-- <div class="basis-2/6 bg-neutral-900 pt-3 pb-2">
				<p class="">Tools</p>
			</div> -->
			<div
				class="md:basis-3/4 lg:basis-2/4 bg-[#363636] shadow-lg md:shadow-xl pt-2 sm:pt-4 sm:pb-6 px-2 sm:px-8"
			>
				<div class="flex items-center justify-center">
					<span>
						<img src={ISLogo} alt={translations[language].is_title} />
					</span>
					<p class={`${language === 'en' ? 'text-sm font-bold' : 'font-semibold'}`}>
						{translations[language].is_title}
					</p>
				</div>
				<div class="flex flex-wrap w-full justify-center">
					{#each is_banners as { alt, src, href }}
						<a href={`/${language}/${href}`}>
							<img
								class="select-none mx-auto py-3"
								{src}
								decoding="async"
								loading="lazy"
								alt={translations[language][alt]}
							/>
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	p {
		text-align: center;
		padding: 0 0.5rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
	}
</style>
