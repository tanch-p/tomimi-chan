<script lang="ts">
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import TextParser from '$lib/components/TextParser.svelte';
	import { charaAssets } from '$lib/data/chara/chara_assets';
	import {
		getAttackRangeId,
		getFullCharaStat,
		getModuleStat,
		getSkillImgUrl,
		getTotalPotStat
	} from '$lib/functions/charaHelpers';
	import { selectedChara, moduleIndex, sortOptions } from './stores';
	import { parseConditions } from '$lib/functions/languageHelpers';
	import Icon from '$lib/components/Icon.svelte';
	import RangeParser from '$lib/components/RangeParser.svelte';

	export let chara, equip, items, language: Language;

	let prioritySortOption;
	sortOptions.subscribe((list) => {
		prioritySortOption = list.find((ele) => ele.priority === 1);
	});

	$: console.log(items);
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
	<div class="relative z-[1] bg-yellow-500 pl-1.5 rounded-md">
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
				<div class="gap-x-[10px] pt-1.5">
					<!-- <div
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
					</div> -->
					{#if items.length > 0 || true}
						<div class="flex">
							<div class="grid grid-flow-col auto-cols-[40px]">
								<div class="bg-black flex items-center justify-center h-[40px] p-1">
									{#await import(`../../../../lib/images/chara_assets/sub_${chara.subProfessionId}_icon.webp`) then { default: src }}
										<div
											class="w-full h-full bg-center bg-contain bg-no-repeat bg-black"
											style="background-image: url({src});"
										/>
									{/await}
								</div>
							</div>
							<div class="flex flex-col items-center p-1.5 pb-1 bg-[#161616] bg-opacity-80 rounded">
								<div class="flex justify-center items-center min-h-[45px] max-h-[65px] w-[55px]">
									<RangeParser rangeId={getAttackRangeId(chara, $moduleIndex, 0)} />
								</div>
								<p class="mt-1 text-near-white text-xs">
									{translations[language].attack_range}
								</p>
							</div>
						</div>
					{:else}
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
					{/if}
				</div>
			</div>
		</div>
	</div>
	{#if items.length > 0}
		{@const talents = items.filter((ele) => ele.key === 'talent').map((ele) => ele.data)}
		{@const skills = items.filter((ele) => ele.key === 'skill').map((ele) => ele.data)}
		{#if talents.length > 0 || skills.length > 0}
			<div class="relative rounded-b-md bg-gray-300 pt-4 pb-2 -mt-2 space-y-2.5 text-[#333]">
				{#if talents.length > 0}
					<div class="px-3">
						{#each talents as talent}
							<p class="py-[1px] px-2 w-max bg-[#f9f9f9] rounded-md font-medium text-[#333]">
								{talent.name}
							</p>
							<TextParser className="mt-1" line={talent.desc} />
						{/each}
					</div>
				{/if}
				{#if skills.length > 0}
					{#each skills as skill}
						{@const hasMastery = skill.levels.length > 1}
						{@const mastery = hasMastery ? 3 : 0}
						<div class="grid grid-cols-[75px_1fr] gap-x-[10px] pl-1">
							<div class="flex flex-col items-center">
								<div class="relative flex items-center justify-center w-[75px] h-[75px]">
									{#await import(`../../../../lib/images/skill_icons/skill_icon_${getSkillImgUrl(skill.skillId)}.webp`) then { default: src }}
										<img {src} width="70" height="70" loading="lazy" alt={''} />
									{/await}
									{#if hasMastery}
										<img
											src={charaAssets.mastery[mastery]}
											width="15"
											alt="M{mastery}"
											class="absolute top-0 left-0"
										/>
									{/if}
									<div class="absolute flex -bottom-0.5 -right-0.5 shadow-md text-near-white">
										{#if skill.levels?.[mastery]?.spData?.initSp}
											<div
												class="grid grid-cols-[9px_1fr] items-center border-r border-black bg-[#434343] pl-[4px] pr-[1px]"
											>
												<img src={charaAssets.sp_start} alt="" />
												<p class="text-sm leading-tight">
													{skill.levels?.[mastery]?.spData?.initSp}
												</p>
											</div>
										{/if}
										<div class="grid grid-cols-[12px_1fr] items-center bg-[#434343] pr-[1px]">
											<img src={charaAssets.sp_cost} alt="" />
											<p class="text-sm leading-tight">
												{skill.levels?.[mastery]?.spData?.spCost}
											</p>
										</div>
									</div>
								</div>
								<p class="text-sm mt-1">{skill.name}</p>
							</div>
							<div class="pr-2.5">
								<div class="flex text-near-white">
									{#if skill.skillType !== 'PASSIVE'}
										<p class="pill px-1.5 {skill?.spType}">
											{translations[language][skill?.spType]}
										</p>
									{/if}
									<p class="pill px-1.5 bg-[#737373]">{translations[language][skill.skillType]}</p>
									{#if skill.levels?.[mastery]?.duration > 0}
										<div
											class="pill px-0.5 grid grid-cols-[20px_1fr] gap-x-1 items-center bg-[#555]"
										>
											<Icon name="clock-icon" className="w-[20px]" />
											<span
												>{skill.levels?.[mastery]?.duration}{language === 'en' ? 's' : '秒'}</span
											>
										</div>
									{/if}
								</div>
								<TextParser line={skill.levels[mastery].desc} className="mt-0.5" />
							</div>
						</div>
					{/each}
				{/if}
			</div>
		{/if}
	{/if}
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

	.pill {
		min-width: 60px;
		border-radius: 5px;
		text-align: center;
		font-size: 0.875rem;
		line-height: 24px;
	}
	.pill.PASSIVE {
		background-color: #737373;
	}
	.pill.INCREASE_WHEN_ATTACK {
		background-color: #fc793e;
	}
	.pill.INCREASE_WHEN_TAKEN_DAMAGE {
		background-color: #ffb400;
	}
	.pill.INCREASE_WITH_TIME {
		background-color: #8ec31f;
	}
</style>
