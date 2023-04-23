<script lang="ts">
	import SpEnemy from '$lib/components/SpEnemy.svelte';
	import StageRoutes from '$lib/components/StageRoutes.svelte';
	import SpTerrain from './SpTerrain.svelte';
	import translations from '$lib/translations.json';

	export let mapConfig, language: string;

	$: stageName = mapConfig[`name_${language}`] || mapConfig.name_zh;
</script>

<div class="px-2 sm:px-6">
	<p class="text-3xl">{mapConfig.code} {stageName}</p>
	<hr class="border-gray-500 my-1" />
	<div class="">
		<p>
			{translations[language].initialCost} - {mapConfig.initialCost}
		</p>
		<p>
			{translations[language].characterLimit} - {mapConfig.characterLimit}
		</p>
		{#if mapConfig[`addInfo_${language}`]}
			<div class="flex gap-x-1">
				<p>{translations[language].addInfo} -</p>
				<div>
					{#each mapConfig[`addInfo_${language}`] as line}
						<li class="list-none">{line}</li>
					{/each}
				</div>
			</div>
		{/if}
		{#if mapConfig[`eliteDesc_${language}`]}
			<div class="flex gap-x-1">
				<p class="whitespace-nowrap">
					<span class="text-[#FF99CA]">{translations[language].eliteDesc}</span> -
				</p>
				<div>
					{#each mapConfig[`eliteDesc_${language}`] as line}
						<li class="list-none">{line}</li>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
{#if mapConfig.sp_terrain}
	<SpTerrain spTerrain={mapConfig.sp_terrain} {language} />
{/if}
<div class="px-2 sm:px-6">
	<p class="text-subheading mt-4">{translations[language].routeInfo}</p>
	<hr class="border-gray-500 my-1" />
</div>
<div class="my-2 sm:max-w-[40rem] mx-auto text-xl">
	{#if mapConfig.routes}
		<StageRoutes routes={mapConfig.routes} {language} />
	{:else}<p class="text-center">暂无路线，作者还没打到这里</p>{/if}
	<div class="w-[100vw] md:w-full">
		{#if mapConfig.sp_enemy}
			<SpEnemy spEnemyInfo={mapConfig.sp_enemy} />
		{/if}
	</div>
</div>
