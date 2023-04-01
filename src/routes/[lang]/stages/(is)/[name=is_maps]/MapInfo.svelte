<script lang="ts">
	import SpEnemy from '$lib/components/SpEnemy.svelte';
	import MapRoutes from '$lib/components/MapRoutes.svelte';

	export let mapConfig, language;
</script>

<div class="mt-2 text-xl mx-auto ">
	{#if mapConfig.routes}
		<MapRoutes routes={mapConfig.routes} {language} />
	{:else}{/if}
	<div class="w-[100vw] md:w-full">
		{#if mapConfig.sp_enemy}
			<SpEnemy spEnemyInfo={mapConfig.sp_enemy} />
		{/if}
	</div>
</div>
