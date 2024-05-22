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
	import tts_banner from '$lib/images/itts1_banner.webp';
	import friendlink from '$lib/images/friendlink.webp';

	export let data: PageData;

	$: language = data.language;
	const is_banners = [
		{ alt: 'rogue_sami', src: banner_sami, href: 'sami' },
		{ alt: 'rogue_mizuki', src: banner_mizuki, href: 'mizuki' },
		{ alt: 'rogue_phantom', src: banner_phantom, href: 'phantom' }
	];
	const tts = {
		zh: {
			title: '通天国际联赛#1',
			link: 'https://live.bilibili.com/22476160',
			desc: '由简中服的巴别塔攻略组、国际服的Lungmen Dragons、日服的極東攻略組、韩服的Team KEO、繁中服的啊？戈爾舟遊籌措會共同举办的「通天国际联赛#1」正在进行中！欢迎大家收看。'
		},
		ja: {
			title: '【ミヅキと紺碧の樹】通天国際大会#1',
			link: 'https://www.youtube.com/@projektfuji9085/streams',
			desc: '大陸鯖の巴别塔攻略组、TWの啊?戈爾舟遊籌措會、グローバルのLungmen Dragons、日本の極東攻略組と韓国のTeam Keoが共催している【ミヅキと紺碧の樹】「通天国際大会#1」開催中！ぜひご視聴ください'
		},
		en: {
			title: 'Skywalking Global League #1',
			link: 'https://www.youtube.com/@LungmenDragons/streams',
			desc: 'Jointly brought to you by CN - Babel Strategy Team, TW - Aegir Organizing Committee, Global - Lungmen Dragons, JP - Projekt Fuji, KR - Team Keo, Skywalking Global League #1 is now underway!  '
		}
	};
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
					<a href={tts[language].link} target="_blank" rel="noopener noreferrer">
						<div class="flex flex-col justify-center items-center">
							<img class="select-none mx-auto" src={tts_banner} decoding="async" alt={'banner'} />
							<p class={`my-1 whitespace-nowrap`}>{tts[language].title}</p>
						</div>
					</a>
					<p class="italic text-[#aaa] leading-snug">
						{tts[language].desc}
					</p>
				</div>
			</div>
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
								width="552"
								height="177"
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
								width="552"
								height="200"
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
