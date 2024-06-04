<script lang="ts">
	import { clickOutside } from '$lib/functions/clickOutside';
	import type { Language } from '$lib/types';
	import { selectedChara, moduleIndex } from './stores';
	import translations from '$lib/translations.json';
	import { charaAssets } from '$lib/data/chara/chara_assets';
	import CharaSkill from './CharaSkill.svelte';
	import {
		convertStatKeys,
		getFullCharaStat,
		getModuleStat,
		getModuleTalentDesc,
		getModuleTrait,
		getTotalPotStat,
		getModuleNewTalent,
		getSkillRangeId,

		getAttackRangeId

	} from '$lib/functions/charaHelpers';
	import TextParser from '$lib/components/TextParser.svelte';
	import RangeParser from '$lib/components/RangeParser.svelte';
	import CharaTokens from './CharaTokens.svelte';

	export let language: Language;

	const statKeys = ['hp', 'respawnTime', 'atk', 'cost', 'def', 'blockCnt', 'res', 'aspd'];
	$: hasModule = ['TIER_4', 'TIER_5', 'TIER_6'].includes($selectedChara?.rarity);
	$: moduleStage = 2;

	$: console.log($selectedChara);
	selectedChara.subscribe((val) => {
		if (!val) {
			moduleIndex.set(0);
		}
	});
	moduleIndex.subscribe((val) => {
		if (val) moduleStage = 2;
	});
</script>

<div class="overlay" class:visible={$selectedChara}>
	<div
		class:visible={$selectedChara}
		class="popup text-near-white bg-neutral-800 bg-opacity-95 pb-12 no-scrollbar"
		use:clickOutside
		on:outclick={() => selectedChara.set(null)}
	>
		{#if $selectedChara}
			{@const displayLang = !!$selectedChara.name_en ? language : 'zh'}
			{@const phase = ['TIER_1', 'TIER_2'].includes($selectedChara.rarity)
				? 0
				: $selectedChara.rarity === 'TIER_3'
				? 1
				: 2}
			<div class="grid grid-cols-[100px_1fr] pr-10">
				<img
					src={$selectedChara.icon}
					width="100"
					height="100"
					alt={$selectedChara.appellation}
					class="ring-1 ring-[#555]"
				/>
				<div class="pl-3 pt-1.5">
					<img
						src={charaAssets[$selectedChara.rarity]}
						alt={$selectedChara.rarity}
						class="relative -left-1 h-[20px]"
					/>
					{#if language !== 'en'}
						<p>{$selectedChara.appellation}</p>
					{/if}
					<p class="text-xl">{$selectedChara[`name_${displayLang}`]}</p>
					<!--TODO <p>全部位</p> -->
				</div>
			</div>
			<div>
				<div class="grid grid-cols-[70px_1fr] gap-x-2 items-center px-1 mt-3">
					<div class="flex flex-col items-center justify-evenly h-full">
						<div class="border-2 border-[#ffd800] rounded-full h-[60px] w-[60px] text-center">
							<p class="text-[10px] mt-[1px] tracking-widest">LV</p>
							<p class="-mt-2 text-4xl">{$selectedChara.stats.level}</p>
						</div>
						<img src={charaAssets['phase'][phase]} width="50" alt="E2" />
						{#if $selectedChara.potential.length > 0}
							<div class="relative group">
								<img src={charaAssets.potential[5]} width="60" alt="p5" />
								<div
									class="absolute hidden group-hover:block top-[-50%] left-[100%] bg-neutral-700 text-near-white w-max py-1.5 px-2 z-[1] rounded-md text-sm shadow-md"
								>
									{#each $selectedChara.potential as pot}
										<p>{pot[`desc_${displayLang}`]}</p>
									{/each}
								</div>
							</div>
						{:else}
							<img src={charaAssets.potential[0]} width="60" alt="p0" />
						{/if}
					</div>
					<div class="grid grid-cols-2 gap-x-2 gap-y-1">
						{#each statKeys as statKey}
							{@const potStat = getTotalPotStat(statKey, $selectedChara.potential)}
							{@const moduleStat = getModuleStat(
								statKey,
								$selectedChara.uniequip?.[$moduleIndex]?.combatData?.phases?.[moduleStage]
									?.attributeBlackboard
							)}
							<div
								class={`flex flex-col bg-[#161616] bg-opacity-80 px-1 ${
									language === 'en' ? 'text-sm' : ''
								}`}
							>
								<div class="grid grid-cols-[16px_1fr] items-center gap-x-1">
									<img src={charaAssets[statKey]} width="16px" height="16px" alt="" />
									<span class="text-[#b3b3b3] font-semibold">
										{translations[language].table_headers[statKey]}
									</span>
								</div>
								<p class="text-near-white pl-[20px] whitespace-nowrap">
									{getFullCharaStat(statKey, $selectedChara, moduleStat, potStat)}{statKey ===
									'respawnTime'
										? 's'
										: ''}
									{#if potStat}
										<span class="text-[#00B0FF] text-sm">({potStat > 0 ? '+' : ''}{potStat})</span>
									{/if}
									{#if moduleStat}
										<span class="text-red-400 text-sm"
											>({moduleStat > 0 ? '+' : ''}{moduleStat})</span
										>
									{/if}
								</p>
							</div>
						{/each}
					</div>
				</div>
			</div>
			<div class="px-1.5 mt-3">
				<div
					class="flex flex-col items-center min-w-28 p-3 pb-1 bg-[#161616] bg-opacity-80 rounded float-right"
				>
					<div class="flex items-center min-h-[50px]">
						<RangeParser rangeId={getAttackRangeId($selectedChara, $moduleIndex, moduleStage)} />
					</div>
					<p class="mt-1">{translations[language].attack_range}</p>
				</div>
				<div class="min-h-[130px]">
					{#if Object.keys($selectedChara.favorData).length > 0}
						<p class="mb-3">
							{translations[language].favor}:
							{#each Object.keys($selectedChara.favorData) as key, i}
								{#if i !== 0}
									,
								{/if}
								<span>
									{translations[language].table_headers[convertStatKeys[key]]}+{$selectedChara
										.favorData[key]}
								</span>
							{/each}
						</p>
					{/if}
					<div class="grid grid-cols-[70px_1fr] items-center">
						<div class="flex items-center justify-center w-[65px] h-[65px] bg-neutral-900">
							{#await import(`../../../../lib/images/chara_assets/sub_${$selectedChara.subProfessionId}_icon.webp`) then { default: src }}
								<img {src} width="50" alt={$selectedChara.subProfessionId} />
							{/await}
						</div>
						<p class="ml-3 text-xl">
							{translations[language][$selectedChara.subProfessionId]}
						</p>
					</div>
					<TextParser
						line={getModuleTrait(
							$selectedChara[`desc_${displayLang}`],
							$selectedChara.uniequip[$moduleIndex],
							moduleStage,
							language
						)}
						className="mt-2 {hasModule ? 'min-h-20' : ''}"
					/>
					{#if hasModule}
						<p class="mt-4">
							{translations[language].module}
							{#if hasModule && $selectedChara.uniequip.length > 0}
								<span class="text-[#999]">※{translations[language].chara_module_stage_click}</span>
							{/if}
						</p>
						<div class="overflow-scroll max-w-full no-scrollbar">
							<div class="flex mt-4 gap-x-8 w-max px-4">
								{#if $selectedChara.uniequip.length === 0}
									<div class="module none" />
								{:else}
									{#each $selectedChara.uniequip as equip, idx}
										{@const typeIcon = equip.typeIcon.toLowerCase()}
										<div class="flex flex-col w-[75px]">
											<button
												class:active={$moduleIndex === idx}
												class="module flex-col"
												on:click={() => moduleIndex.set(idx)}
											>
												<div class="grid place-items-center h-[48px]">
													{#await import(`../../../../lib/images/equip_icons/icon_${typeIcon}.webp`) then { default: src }}
														<img {src} height="40" alt={typeIcon} class="max-h-[40px]" />
													{/await}
												</div>
												<div class="flex gap-x-0.5 text-xs font-light uppercase">
													{#if typeIcon !== 'original'}
														{@const parts = typeIcon.split('-')}
														{parts[0]}
														<img src={charaAssets[parts[1]]} alt={parts[1]} width="12px" />
													{:else}
														{typeIcon}
													{/if}
												</div>
											</button>
											{#if $moduleIndex !== 0 && $moduleIndex == idx}
												<button
													class="flex items-center justify-center border border-[#3d3d3d] bg-[#272727] mt-1.5 py-[1px]"
													on:click={() => {
														if (moduleStage === 2) return (moduleStage = 0);
														return (moduleStage += 1);
													}}
												>
													<p class="text-[#7d7d7d] font-bold text-sm">STAGE</p>
													<div class="w-[11px] ml-1.5 mt-0.5">
														<img
															src={charaAssets[`solid_${moduleStage + 1}`]}
															alt="7"
															class="max-h-[15px]"
														/>
													</div>
												</button>
											{/if}
											{#if $moduleIndex == idx}
												<div
													class="flex justify-center mt-1 text-center {$moduleIndex === 0
														? 'pb-[30px]'
														: ''} {language !== 'en' ? 'whitespace-nowrap' : ''}"
												>
													<p
														title={equip[`name_${language}`] || equip.name_zh}
														class={language === 'en' ? 'truncate' : ''}
													>
														{equip[`name_${language}`] || equip.name_zh}
													</p>
												</div>
											{/if}
										</div>
									{/each}
								{/if}
							</div>
						</div>
					{/if}
				</div>
				<hr class="mt-4 mb-3 border-t-2 border-[#555]" />
				{#if $selectedChara.talents && $selectedChara.talents.length > 0}
					{@const newTalent = getModuleNewTalent(
						$selectedChara.uniequip[$moduleIndex],
						moduleStage,
						language
					)}
					<p>{translations[language].talent}</p>
					{#each $selectedChara.talents as talent, idx}
						{@const moduleTalentDesc = getModuleTalentDesc(
							idx,
							$selectedChara.uniequip[$moduleIndex],
							moduleStage,
							language
						)}
						<p class="py-[1px] px-2 mt-4 w-max bg-[#f9f9f9] rounded-md font-medium text-[#333]">
							{talent[`name_${displayLang}`]}
						</p>
						<TextParser className="mt-1" line={moduleTalentDesc || talent[`desc_${displayLang}`]} />
					{/each}
					{#if newTalent}
						<p class="py-[1px] px-2 mt-4 w-max bg-[#f9f9f9] rounded-md font-medium text-[#333]">
							{newTalent.name}
						</p>
						<TextParser className="mt-1" line={newTalent.desc} />
					{/if}
				{/if}
				{#if $selectedChara.skills && $selectedChara.skills.length > 0}
					<p class="mt-8">
						{translations[language].skill}
						{#if $selectedChara.rarity !== 'TIER_3'}
							<span class="text-[#999]">※{translations[language].chara_skill_rank_click}</span>
						{/if}
					</p>
					{#each $selectedChara.skills as skill}
						<CharaSkill
							{skill}
							{displayLang}
							{language}
							overrideRangeId={getSkillRangeId(skill, $selectedChara, $moduleIndex, moduleStage)}
						/>
					{/each}
				{/if}
				{#if $selectedChara.tokens && $selectedChara.tokens.length > 0}
					<hr class="mt-4 mb-3 border-t-2 border-[#555]" />
					<CharaTokens
						tokens={$selectedChara.tokens}
						chara={$selectedChara}
						moduleIndex={$moduleIndex}
						{moduleStage}
						{displayLang}
						{language}
					/>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	.overlay {
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.8);
		z-index: 99;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.3s;
	}
	.popup {
		border-radius: 5px;
		width: min(calc(100% - 15px), 550px);
		position: fixed;
		inset: 0;
		min-height: 300px;
		max-height: max(500px, 70vh);
		margin: auto;
		pointer-events: none;
		transition: transform 0.3s, opacity 0.2s, -webkit-transform 0.3s;
		opacity: 0;
		overflow-y: auto;
		overscroll-behavior: contain;
	}
	.overlay.visible,
	.popup.visible {
		pointer-events: all;
		opacity: 1;
	}
	.module {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 75px;
		height: 75px;
		border: 3px solid #555;
	}
	.module.active {
		border-color: #0098dc;
	}
	.module.none:after {
		content: '';
		position: absolute;
		top: 50%;
		left: 0;
		width: calc(1px * sqrt(pow(50, 2) * 2) - 1px);
		height: 1px;
		background-color: #555;
		transform: rotate(-45deg);
	}
</style>
