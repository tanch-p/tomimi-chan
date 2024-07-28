<script lang="ts">
	import type { Language, RogueTopic } from '$lib/types';
	import SpEnemy from '$lib/components/SpEnemy.svelte';
	import StageRoutes from '$lib/components/StageRoutes.svelte';
	import SpTerrain from './SpTerrain.svelte';
	import StageDrops from './StageDrops.svelte';
	import EnemyWaves from './EnemyWaves.svelte';
	import translations from '$lib/translations.json';
	import TextParser from './TextParser.svelte';
	import { getStageImg } from '$lib/functions/stageLoad';

	export let mapConfig,
		language: Language,
		stageName: string,
		selectedFloor,
		eliteMods,
		rogueTopic: RogueTopic = null;
	const getEliteDescColor = (rogueTopic: string | null) => {
		switch (rogueTopic) {
			case 'rogue_sami':
				return 'text-[#dc555a]';
			case 'rogue_mizuki':
				return 'text-[#FF99CA]';
			case 'rogue_phantom':
				return 'text-[#ffb476]';
			default:
				return '';
		}
	};
</script>

<div class="sm:px-6 mb-4">
	<h1 id="stage-title" class="px-2 sm:px-0 text-3xl">
		{mapConfig.code ?? ''}
		{stageName.replaceAll('_', ' ')}
	</h1>
	<hr class="border-gray-500 my-1" />
	{#if mapConfig[`description_${language}`] || mapConfig[`description_zh`]}
		<div class="px-2 sm:px-0">
			<TextParser line={mapConfig[`description_${language}`] || mapConfig[`description_zh`]} />
		</div>
	{/if}

	<div class="px-2 sm:px-0 mt-2.5">
		<p>
			{translations[language].initialCost} - {mapConfig.initialCost}
		</p>
		<p>
			{translations[language].characterLimit} - {mapConfig.characterLimit}
		</p>
		{#if mapConfig[`addInfo_${language}`]}
			<div class="flex gap-x-1 mt-4 sm:mt-2.5">
				<p class="whitespace-nowrap">{translations[language].addInfo} -</p>
				<div>
					{#each mapConfig[`addInfo_${language}`] as line}
						<TextParser {line} />
					{/each}
				</div>
			</div>
		{/if}
		{#if mapConfig[`eliteDesc_${language}`]}
			<div class="flex gap-x-1 mt-4 sm:mt-2.5">
				<p class="whitespace-nowrap">
					<span class={`${getEliteDescColor(rogueTopic)}`}>{translations[language].eliteDesc}</span>
					-
				</p>
				<div>
					{#each mapConfig[`eliteDesc_${language}`] as line}
						<TextParser {line} />
					{/each}
				</div>
			</div>
		{/if}
	</div>
	<div class="flex gap-x-1 mt-4 sm:mt-2.5 px-2 sm:px-0">
		<p class="whitespace-nowrap">
			<span class="">{translations[language].outLink}</span>
			-
		</p>
		<div class="flex flex-wrap items-center gap-2">
			{#if language === 'zh'}
				<a
					href="https://search.bilibili.com/all?keyword=明日方舟 {mapConfig.name_zh}"
					target="_blank"
					rel="noopener noreferrer"
					class="text-blue-400 hover:text-blue-300"
				>
					bilibili
				</a>
			{:else if mapConfig[`name_${language}`]}
				<a
					href="https://www.youtube.com/results?search_query={mapConfig[`name_${language}`]}"
					target="_blank"
					rel="noopener noreferrer"
					class="text-blue-400 hover:text-blue-300">Youtube</a
				>
			{/if}
			<a
				href="https://map.ark-nights.com/map/{getStageImg(mapConfig.id, eliteMods)}"
				target="_blank"
				rel="noopener noreferrer"
				class="text-blue-400 hover:text-blue-300"
			>
				PRTS.Map
			</a>
		</div>
	</div>
</div>
{#if rogueTopic === 'rogue_sami'}
	<StageDrops {mapConfig} {rogueTopic} {language} {selectedFloor} />
{/if}
{#if mapConfig.sp_terrain || rogueTopic === "rogue_skz"}
	<SpTerrain spTerrain={mapConfig.sp_terrain} {rogueTopic} {language} />
{/if}
{#if rogueTopic}
	<EnemyWaves {mapConfig} {rogueTopic} {language} {selectedFloor} />
{/if}
{#if mapConfig.routes || mapConfig.contracts}
	<div class="sm:px-6">
		<p class="px-2 sm:px-0 text-subheading mt-4">{translations[language].routeInfo}</p>
		<hr class="border-gray-500 my-1" />
	</div>
	<div class="my-2 sm:max-w-[40rem] mx-auto text-xl">
		{#if mapConfig.contracts}
			<img
				srcset="https://res.cloudinary.com/dbqz7mebk/image/upload/c_fit,w_400/v1680366257/tomimi.dev/maps/{mapConfig.name_zh}.webp 400w, 
		https://res.cloudinary.com/dbqz7mebk/image/upload/c_fit,w_640/v1680366257/tomimi.dev/maps/{mapConfig.name_zh}.webp 600w"
				sizes="(max-width: 480px) 400px, 600px"
				src="https://res.cloudinary.com/dbqz7mebk/image/upload/c_fit,w_640/v1680366257/tomimi.dev/maps/{mapConfig.name_zh}.webp"
				alt={mapConfig[`name_${language}`]}
				decoding="async"
				class="aspect-[1062/600] w-screen max-h-max sm:aspect-auto sm:w-[40rem] sm:h-[360px] mb-12"
			/>
		{/if}
		{#if mapConfig.routes}
			<StageRoutes routes={mapConfig.routes} {language} {rogueTopic} />
		{:else if rogueTopic}
			<p class="text-center">暂无路线，作者还没打到这里</p>
		{/if}
	</div>
{:else}
	<div class="max-w-[600px] w-full sm:h-[338px] mx-auto px-3 sm:px-0">
		{#await import(`../../lib/images/stages/level_${getStageImg(mapConfig.id, eliteMods)}.webp`) then { default: src }}
			<img {src} width="600" height="338px" alt={mapConfig.levelId} loading="lazy" />
		{/await}
	</div>
{/if}
<div class="w-screen sm:w-full">
	{#if mapConfig.sp_enemy}
		<SpEnemy spEnemyInfo={mapConfig.sp_enemy} {language} />
	{/if}
</div>
