<script lang="ts">
	import { charaAssets } from '$lib/data/chara/chara_assets';
	export let chara, values;
</script>

<div class="relative">
	<div class="absolute top-0 left-0 bg-[#1f1f1f]">
		<img
			src={charaAssets[chara.profession]}
			alt={chara.profession}
			width="26"
			loading="lazy"
			decoding="async"
		/>
	</div>
	{#if values.length > 0}
		<div class="absolute bottom-0 w-full gradient-dark bg-opacity-50 pl-3 pt-3 truncate text-left">
			{#each values as value, i}
				{#if i > 0}
					&nbsp;<span class="text-[#c9c9c9] text-sm">/</span>
				{/if}
				<span class="{i>0 ? "text-[#c9c9c9] text-sm" : ""}">{value}</span>
			{/each}
		</div>
	{:else}
		<img
			src={charaAssets[chara.rarity]}
			alt={chara.rarity}
			class="absolute bottom-0 right-0 h-[20px]"
		/>
	{/if}

	<slot />
	<img src={chara.icon} width="100" height="100" alt={chara.appellation} />
</div>

<style>
	.gradient-dark {
		background: linear-gradient(to top, #1f1f1f, transparent);
	}
</style>
