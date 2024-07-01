<script lang="ts">
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import TextParser from '$lib/components/TextParser.svelte';
	import { charaAssets } from '$lib/data/chara/chara_assets';
	import { getFullCharaStat, getModuleStat, getTotalPotStat } from '$lib/functions/charaHelpers';
	import { selectedChara, moduleIndex } from './stores';

	export let chara, equip, language: Language;

	const statKeys = ['hp', 'respawnTime', 'atk', 'cost', 'def', 'blockCnt', 'res', 'aspd'];

	const handleClick = (chara, equip) => {
		selectedChara.set(chara);
		if (equip) {
			const equipIndex = chara.uniequip.findIndex((ele) => ele.uniEquipId === equip.uniEquipId);
			if (equipIndex !== -1) moduleIndex.set(equipIndex);
		}
	};

	const phase = ['TIER_1', 'TIER_2'].includes(chara.rarity) ? 0 : chara.rarity === 'TIER_3' ? 1 : 2;
</script>

<div>
	<div class="bg-yellow-500 pl-1.5 rounded-md">
		<div class="grid grid-cols-[120px_1fr] p-1.5 shadow-md rounded-md bg-white">
			<button on:click={() => handleClick(chara, equip)} class="relative pl-6 pr-4">
				<div class="absolute z-[1] top-0 left-0 bg-[#282828] p-1 rounded-md">
					<img
						src={charaAssets[chara.profession]}
						alt={chara.profession}
						width="26"
						loading="lazy"
						decoding="async"
					/>
				</div>
				<div class="feathered">
					<img src={chara.icon} width="100" height="100" alt={chara.appellation} />
				</div>
				<div class="absolute z-[1] bottom-3.5 left-0">
					{#if chara.potential.length > 0}
						<img src={charaAssets.potential[5]} width="30" alt="p5" />
					{:else}
						<img src={charaAssets.potential[0]} width="30" alt="p0" />
					{/if}
				</div>
				<img
					src={charaAssets[chara.rarity]}
					alt={chara.rarity}
					class="absolute z-[1] bottom-[-3px] left-0 h-[20px]"
				/>
				<img
					src={charaAssets['phase'][phase]}
					width="30"
					alt="E{phase}"
					class="absolute z-[2] right-0 bottom-[22px]"
				/>
				<div class="absolute z-[1] right-0 bottom-0">
					<div class="flex items-center justify-center level-shadow rounded-full h-[24px] w-[24px]">
						<p class="text-xl">{chara.stats.level}</p>
					</div>
				</div>
			</button>
			<div class="text-[#333]">
				<h3 class="border-b border-gray-400">{chara.name}</h3>
				<div class="flex gap-x-[10px] pt-1.5">
					<div
						class:none={chara.uniequip.length === 0}
						class="relative shrink-0 module mt-3 mr-1 w-[40px] h-[40px] border-4 border-gray-400"
					>
						{#if equip}
							{@const typeIcon = equip.typeIcon.toLowerCase()}
							{#await import(`../../../../lib/images/equip_icons/icon_${typeIcon}.webp`) then { default: src }}
								<div
									class="absolute left-[-2px] top-[-2px] w-[32px] h-[32px] bg-center bg-contain invert"
									style="background-image: url({src});"
								/>
							{/await}
						{/if}
					</div>

					<div class="grid grid-cols-2 gap-x-1.5 gap-y-0.5 w-full">
						{#each statKeys as statKey}
							{@const potStat = getTotalPotStat(statKey, chara.potential)}
							{@const moduleStat = getModuleStat(
								statKey,
								chara.uniequip?.[$moduleIndex]?.combatData?.phases?.[2]?.attributeBlackboard
							)}
							<div class={`flex flex-col bg-[#161616] bg-opacity-80 px-1 text-sm`}>
								<div class="grid grid-cols-[16px_1fr] items-center gap-x-1">
									<div class="flex items-center bg-[#444] h-full px-[1px]">
										<img src={charaAssets[statKey]} width="16px" height="16px" alt="" />
									</div>
									<p class="text-near-white whitespace-nowrap">
										{getFullCharaStat(statKey, chara, moduleStat, potStat)}{statKey ===
										'respawnTime'
											? 's'
											: ''}
									</p>
								</div>
							</div>
						{/each}
					</div>
					<!-- {#each [0, 1, 2] as i}
						{#if chara.skills[i]}
							<div class="border-4 border-sky-600">
								{#await import(`../../../../lib/images/skill_icons/skill_icon_${getSkillImgUrl(chara.skills[i].skillId)}.webp`) then { default: src }}
									<img {src} width="60" height="60" loading="lazy" alt={''} />
								{/await}
							</div>
						{:else}
							<div class="relative skill none border-4 border-gray-400 w-[68px] h-[68px]" />
						{/if}
					{/each} -->
				</div>
			</div>
		</div>
	</div>

	<div />
</div>

<style>
	.level-shadow {
		background: #444;
		box-shadow: 0 0 5px 5px #333;
	}
	.feathered {
		position: relative;
		display: inline-block;
		border-radius: 5px;
	}
	.feathered::after {
		content: '';
		position: absolute;
		display: block;
		inset: 0;
		box-shadow: inset 0 0 12px 2px #fff;
	}
	.module.none:after {
		content: '';
		position: absolute;
		top: 50%;
		left: 3px;
		width: calc(1px * sqrt(pow(18, 2) * 2) - 1px);
		height: 2px;
		background-color: #555;
		transform: rotate(-45deg);
	}
	.skill.none:after {
		content: '';
		position: absolute;
		top: 50%;
		left: 3px;
		width: calc(1px * sqrt(pow(38, 2) * 2) - 1px);
		height: 2px;
		background-color: #555;
		transform: rotate(-45deg);
	}
</style>
