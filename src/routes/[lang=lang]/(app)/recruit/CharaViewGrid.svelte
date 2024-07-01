<script lang="ts">
	import { selectedChara, moduleIndex } from './stores';
	import { charaAssets } from '$lib/data/chara/chara_assets';
	export let chara, values, equip;

	const handleClick = (chara, equip) => {
		selectedChara.set(chara);
		if (equip) {
			const equipIndex = chara.uniequip.findIndex((ele) => ele.uniEquipId === equip.uniEquipId);
			if (equipIndex !== -1) moduleIndex.set(equipIndex);
		}
	};
</script>

<button
	on:click={() => handleClick(chara, equip)}
	class="relative select-none border border-gray-600 border-opacity-50"
>
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
		{#if values?.length > 0}
			<div
				class="absolute bottom-0 w-full gradient-dark bg-opacity-50 pl-3 pt-3 truncate text-left"
			>
				{#each values as value, i}
					{#if i > 0}
						&nbsp;<span class="text-[#c9c9c9] text-sm">/</span>
					{/if}
					<span class={i > 0 ? 'text-[#c9c9c9] text-sm' : ''}>{value}</span>
				{/each}
			</div>
		{:else}
			<img
				src={charaAssets[chara.rarity]}
				alt={chara.rarity}
				class="absolute bottom-0 right-0 h-[20px]"
			/>
		{/if}

		{#if equip}
			{@const typeIcon = equip.typeIcon.toLowerCase()}
			{#await import(`../../../../lib/images/color_equip_icons/icon_${typeIcon}.webp`) then { default: src }}
				<div
					class="absolute -right-1 -top-1 w-[40px] h-[40px] bg-center bg-cover"
					style="background-image: url({src});"
				/>
			{/await}
		{/if}
		<img src={chara.icon} width="100" height="100" alt={chara.appellation} />
	</div>
</button>

<style>
	.gradient-dark {
		background: linear-gradient(to top, #1f1f1f, transparent);
	}
</style>
