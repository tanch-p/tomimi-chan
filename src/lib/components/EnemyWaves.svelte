<script lang="ts">
	import type { Language, RogueTopic } from '$lib/types';
	import translations from '$lib/translations.json';
	import DLD from '$lib/images/enemy_icons/icon_enemy_2001_duckmi.webp';
	import GPN from '$lib/images/enemy_icons/icon_enemy_2002_bearmi.webp';
	import THF from '$lib/images/enemy_icons/icon_enemy_2034_sythef.webp';
	import FAT from '$lib/images/enemy_icons/icon_enemy_2085_skzjxd.webp';
	import sami_smbox from '$lib/images/is/sami/sktok_smbox.webp';
	import sami_smrbox from '$lib/images/is/sami/sktok_smrbox.webp';
	import sami_smbbox from '$lib/images/is/sami/sktok_smbbox.webp';
	import skzbox from '$lib/images/is/sarkaz/skzbox.webp';
	import skzmbx from '$lib/images/is/sarkaz/skzmbx.webp';
	import skzwyx from '$lib/images/is/sarkaz/skzwyx.webp';
	import SpEnemy from '$lib/components/SpEnemy.svelte';
	import StageRoutes from '$lib/components/StageRoutes.svelte';
	import skz_calamity from '$lib/images/is/sarkaz/skz_calamity.webp';
	import unknown from '$lib/images/is/skz_unknown.webp';
	import skz_4_1a from '$lib/images/stages/level_ro4_n_4_1_a.webp';
	import skz_4_1b from '$lib/images/stages/level_ro4_n_4_1_b.webp';
	import { getStageImg } from '$lib/functions/stageLoad';
	export let mapConfig, rogueTopic: RogueTopic, language: Language, eliteMods;

	const stagesWithMultipleImgs = ['level_rogue4_4-1'];
	const multipleImgLookup = {
		'level_rogue4_4-1': [
			{ key: 'a', img: skz_4_1a },
			{ key: 'b', img: skz_4_1b }
		]
	};
	let index = 0;

	$: if (mapConfig) {
		index = 0;
	}

	$: isBossStage = mapConfig.id.includes('_b_');
	$: isEventStage =
		mapConfig.id.includes('_ev_') ||
		mapConfig.id.includes('_t_') ||
		mapConfig.id.includes('_duel_');
	$: isCombatStage = !isBossStage && !isEventStage;
</script>

{#if isCombatStage}
	<div class="sm:px-6 my-4">
		<h2 class="px-2 sm:px-0 text-subheading mt-4">{translations[language].hidden_enemy_prob}</h2>
		<hr class="border-gray-500 my-1" />
		<div class="flex flex-col gap-y-4 px-2 sm:px-0">
			<div class="flex items-center">
				<img src={DLD} width="50px" alt="DLD" /> <span>5%</span>
				<img src={GPN} width="50px" alt="GPN" /> <span>5%</span>
				{#if rogueTopic !== 'rogue_phantom'}
					<img src={THF} width="50px" alt="THF" /> <span>5%</span>
				{/if}
				{#if rogueTopic === 'rogue_skz'}
					<img src={FAT} width="50px" alt="FAT" /> <span>5%</span>
				{/if}
			</div>
			{#if ['rogue_sami', 'rogue_mizuki'].includes(rogueTopic)}
				<div class="flex items-center">
					<img src={sami_smbox} width="50px" alt="smbox" /> <span>10.5%</span>
					<img src={sami_smrbox} width="50px" alt="smrbox" /> <span>3%</span>
					<img src={sami_smbbox} width="50px" alt="smbbox" /> <span>1.5%</span>
				</div>
			{:else if rogueTopic === 'rogue_skz'}
				<div class="flex items-center">
					<img src={skzbox} width="50px" alt="skzbox" /> <span>10.5%</span>
					<img src={skzmbx} width="50px" alt="skzmbx" /> <span>3%</span>
					<img src={skzwyx} width="50px" alt="skzwyx" /> <span>1.5%</span>
				</div>
			{/if}
		</div>
		<p class="mt-4">* - {translations[language].enemy_prob_dev}</p>
	</div>
{/if}
{#if mapConfig.routes}
	<div class="sm:px-6">
		<p class="px-2 sm:px-0 text-subheading mt-4">{translations[language].routeInfo}</p>
		<hr class="border-gray-500 my-1" />
	</div>
	<div class="my-2 sm:max-w-[40rem] mx-auto text-xl">
		{#if mapConfig.routes}
			<StageRoutes routes={mapConfig.routes} {language} {rogueTopic} />
		{:else if rogueTopic}
			<p class="text-center">暂无路线，作者还没打到这里</p>
		{/if}
	</div>
{:else}
	<div class="max-w-[600px] w-full mx-auto px-3 sm:px-0">
		{#if stagesWithMultipleImgs.includes(mapConfig.levelId)}
			<div
				class="grid grid-flow-col auto-cols-fr font-bold text-lg text-near-white text-center select-none divide-x divide-gray-500 py-1"
			>
				{#each multipleImgLookup[mapConfig.levelId] as { key }, i}
					<button class={index === i ? '' : 'text-gray-400'} on:click={() => (index = i)}
						>{key}</button
					>
				{/each}
			</div>
			<img
				src={multipleImgLookup[mapConfig.levelId][index].img}
				width="600"
				height="338px"
				alt={mapConfig.levelId + '_' + multipleImgLookup[mapConfig.levelId][index].key}
				loading="lazy"
			/>
		{:else}
			{#await import(`../../lib/images/stages/level_${getStageImg(mapConfig.id, eliteMods)}.webp`) then { default: src }}
				<img {src} width="600" height="338px" alt={mapConfig.levelId} loading="lazy" />
			{/await}
		{/if}

		{#if rogueTopic === 'rogue_skz'}
			<div class="flex flex-wrap gap-x-4 gap-y-1.5 mt-1.5">
				<div class="flex">
					<img src={skz_calamity} width="24px" height="24px" alt="calamity" />
					<p>{translations[language].skz_calamity}</p>
				</div>
				<div class="flex">
					<div class="rounded-full bg-[#f14c4c]">
						<img src={unknown} width="24px" height="24px" alt="?" />
					</div>
					<p class="ml-1">{translations[language].stageinfo_random}</p>
				</div>
			</div>
		{/if}
	</div>
{/if}
<div class="w-screen sm:w-full">
	{#if mapConfig.sp_enemy}
		<SpEnemy spEnemyInfo={mapConfig.sp_enemy} {language} />
	{/if}
</div>

<style>
	span {
		margin: 0px 10px;
	}
</style>
