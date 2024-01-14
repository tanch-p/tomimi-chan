<script lang="ts">
	import type { PageData } from './$types';
	import banner_mizuki from '$lib/images/banner_mizuki_800px.webp';
	import banner_phantom from '$lib/images/banner_phantom_800px.webp';
	import banner_sami from '$lib/images/banner_sami_800px.webp';
	import cc_banner from '$lib/images/banner_cc12.webp';
	import laoli_banner from '$lib/images/laoli_sim.webp';
	import translations from '$lib/translations.json';
	import ISLogo from '$lib/images/is_logo.webp';
	import CCLogo from '$lib/images/cc_logo.webp';
	import toolsLogo from '$lib/images/CRA-X.webp';
	import babel0 from '$lib/images/babel_sami_0.webp';
	import friendlink from '$lib/images/friendlink.webp';

	export let data: PageData;

	$: language = data.language;
	const is_banners = [
		{ alt: 'rogue_sami', src: banner_sami, href: 'sami' },
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
	<div class="w-screen sm:w-full max-w-7xl mx-auto pb-32">
		<div class="flex flex-col items-center mx-auto gap-x-4 gap-y-8 px-2 sm:px-8 justify-center">
			{#if language === 'zh'}
				<div
					class="w-full md:w-[600px] bg-[#363636] shadow-lg md:shadow-xl pt-2 sm:py-3 px-2 sm:px-6"
				>
					<div class="flex items-center justify-center">
						<span>
							<img src={friendlink} alt={'友情链接'} width="31" height="29" />
						</span>
						<p class={`font-semibold`}>友情链接</p>
					</div>
					<div class="flex flex-wrap w-full justify-center mt-3">
						<a
							href={`https://ytl.viktorlab.cn/tools/rougeCal`}
							target="_blank"
							rel="noopener noreferrer"
						>
							<div class="flex flex-col justify-center items-center">
								<img class="select-none mx-auto" src={babel0} decoding="async" alt={'通天赛'} />
								<p class={`my-1 whitespace-nowrap`}>通天联赛#0附加赛激励计划</p>
							</div>
						</a>
						<p class="italic text-[#aaa] leading-snug">通天联赛#0附加赛正在如火如茶地进行中，在观看比赛的同时，我们也欢迎您一同挑战，获得丰厚奖金</p>
					</div>
				</div>
			{/if}
			<!-- <div
				class="w-full md:w-[600px] bg-[#363636] shadow-lg md:shadow-xl pt-2 sm:py-3 px-2 sm:px-6"
			>
				<div class="flex items-center justify-center">
					<span>
						<img src={CCLogo} alt={translations[language].cc_title} width="34" height="34" />
					</span>
					<p class={`${language === 'en' ? 'text-sm font-bold' : 'font-semibold'}`}>
						{translations[language].cc_title}
					</p>
				</div>
				<div class="flex flex-wrap w-full justify-center">
					<a href={`/${language}/cc/`}>
						<img class="select-none mx-auto py-3" src={cc_banner} decoding="async" alt={'cc11'} />
					</a>
				</div>
			</div> -->
			<div
				class="w-full md:w-[600px] bg-[#363636] shadow-lg md:shadow-xl pt-2 sm:py-3 px-2 sm:px-6"
			>
				<div class="flex items-center justify-center">
					<span>
						<img
							src={toolsLogo}
							alt={translations[language].related_tools}
							width="31"
							height="31"
						/>
					</span>
					<p class={`${language === 'en' ? 'text-sm font-bold' : 'font-semibold'}`}>
						{translations[language].related_tools}
					</p>
				</div>
				<div class="flex flex-wrap w-full justify-center mt-3">
					<a href={`/${language}/laoli/`}>
						<div class="flex flex-col justify-center items-center">
							<img
								class="select-none mx-auto"
								src={laoli_banner}
								decoding="async"
								alt={translations[language].laoli_title}
							/>
							<p class={`my-1 ${language !== 'en' ? 'whitespace-nowrap' : ''}`}>
								{translations[language].laoli_title}
							</p>
						</div>
					</a>
				</div>
			</div>
			<div class="md:w-[600px] bg-[#363636] shadow-lg md:shadow-xl pt-2 sm:py-3 px-2 sm:px-6">
				<div class="flex items-center justify-center">
					<span>
						<img src={ISLogo} alt={translations[language].is_title} width="36" height="36" />
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
