<script lang="ts">
	import SpEnemy from '$lib/components/SpEnemy.svelte';
	import StageRoutes from '$lib/components/StageRoutes.svelte';
	import SpTerrain from './SpTerrain.svelte';
	import translations from '$lib/translations.json';

	export let mapConfig,
		language: string,
		stageName: string,
		rogueTopic: string | null = null;

	const getEliteDescColor = (rogueTopic: string | null) => {
		switch (rogueTopic) {
			case 'rogue_mizuki':
				return 'text-[#FF99CA]';
			case 'rogue_phantom':
				return 'text-[#ffb476]';
			default:
				return '';
		}
	};
</script>

<div class="sm:px-6">
	<p class="px-2 sm:px-0 text-3xl">{mapConfig.code ?? ''} {stageName.replaceAll('_', ' ')}</p>
	<hr class="border-gray-500 my-1" />
	<div class="px-2 sm:px-0">
		<p>
			{translations[language].initialCost} - {mapConfig.initialCost}
		</p>
		<p>
			{translations[language].characterLimit} - {mapConfig.characterLimit}
		</p>
		{#if mapConfig[`addInfo_${language}`]}
			<div class="flex gap-x-1 mt-4 sm:mt-2">
				<p class="whitespace-nowrap">{translations[language].addInfo} -</p>
				<div>
					{#each mapConfig[`addInfo_${language}`] as line}
						<li class="list-none">{line}</li>
					{/each}
				</div>
			</div>
		{/if}
		{#if mapConfig[`eliteDesc_${language}`]}
			<div class="flex gap-x-1 mt-4 sm:mt-2">
				<p class="whitespace-nowrap">
					<span class={`${getEliteDescColor(rogueTopic)}`}>{translations[language].eliteDesc}</span>
					-
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
	{:else}<p class="text-center">暂无路线，作者还没打到这里</p>
	{/if}
	<div class="w-screen sm:w-full">
		{#if mapConfig.sp_enemy}
			<SpEnemy spEnemyInfo={mapConfig.sp_enemy} {language} />
		{/if}
	</div>
</div>
