<script lang="ts">
	import type { Enemy, Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import StatusImmune from './StatusImmune.svelte';
	import HandbookAbilities from './HandbookAbilities.svelte';
	import HandbookAtkType from './HandbookAtkType.svelte';
	import HandBookStats from './HandBookStats.svelte';
	import { getFormTitle } from '$lib/functions/lib';
	import bossIcon from '$lib/images/is/boss_icon.webp';
	import eliteIcon from '$lib/images/is/elite_icon.webp';
	import life_blue from '$lib/images/is/sprite_base_hp.webp';
	import life_red from '$lib/images/is/sprite_base_hp_red.webp';
	import weightIcon from '$lib/images/is/weight.webp';
	import { getStatusImmune } from '$lib/functions/skillHelpers';
	import OtherBuffs from './OtherBuffs.svelte';

	export let enemy: Enemy, language: Language, specialMods,otherBuffsList;

	const enemyLevels = ['NORMAL', 'ELITE', 'BOSS'];

	let formIndex = 0;

	$: statusImmuneList = getStatusImmune(
		enemy,
		enemy?.forms
			? enemy.forms[formIndex].mods?.status_immune ?? enemy.status_immune
			: enemy.status_immune,
		$specialMods
	);
</script>

<div id={enemy.stageId} class="scroll-mt-16 px-2 bg-neutral-900 bg-opacity-40">
	<div class="relative">
		{#if enemy.type.includes('BOSS')}
			<img
				src={bossIcon}
				alt=""
				width="100px"
				height="100px"
				class="absolute top-0 right-[6%] opacity-30"
			/>
		{:else if enemy.type.includes('ELITE')}
			<img
				src={eliteIcon}
				alt=""
				width="100px"
				height="100px"
				class="absolute top-0 right-[6%] opacity-20"
			/>
		{/if}
		<div class="h-4" />
		<div class="flex gap-x-2">
			{#each enemy.type.filter((ele) => !enemyLevels.includes(ele)) as type}
				<p class="whitespace-nowrap text-[#83a39f] text-sm">{translations[language].types[type]}</p>
			{/each}
		</div>
		<div class="flex items-center mt-0.5">
			<p class="text-xs text-center bg-almost-black py-0.5 w-12">{enemy.id}</p>
			{#if enemy.overwritten}
				<p class="text-xs text-center bg-[#981313] py-0.5 w-[1.75rem]">Sp.</p>
			{/if}
			<p class="ml-1.5 font-semibold">{enemy[`name_${language}`]}</p>
		</div>
		<div class="flex justify-between">
			<HandbookAtkType {enemy} {language} {formIndex} />
			{#if enemy.stats[0].lifepoint !== 1}
				{@const isBlue = enemy.stats[0].lifepoint === 0}
				<div class="flex items-center justify-between w-16">
					<img
						src={isBlue ? life_blue : life_red}
						width="28px"
						height="28px"
						alt=""
						class="z-[1]"
					/>
					<span class={`text-2xl font-bold ${isBlue ? 'text-[#0288c4]' : 'text-red-600'}`}>
						{enemy.stats[0].lifepoint}
					</span>
				</div>
			{/if}
		</div>
	</div>
	<div class="grid grid-cols-[minmax(75px,auto)_1fr] gap-x-1.5">
		<div class="flex flex-col gap-y-1 max-[390px]:w-[75px]">
			<img
				class="select-none"
				src={enemy.img}
				height="95px"
				width="95px"
				decoding="async"
				loading="lazy"
				alt={enemy.id}
			/>
			<div class="flex flex-wrap items-center bg-almost-black px-1.5">
				<div class="flex items-center gap-x-1 py-1 max-[390px]:text-sm">
					<div class="max-[390px]:w-[12px]">
						<img src={weightIcon} width="18px" height="18px" alt="" />
					</div>
					<span class={`text-[#858585] font-bold ${language === 'en' ? 'text-sm' : ''}`}>
						{translations[language].table_headers.weight}
					</span>
				</div>
				<span class="text-[#a2a5a5] text-lg font-bold ml-auto">{enemy.stats[0].weight}</span>
			</div>
		</div>
		{#if enemy?.forms}
			<div class="overflow-auto">
				<div class="overflow-auto no-scrollbar">
					<div class="flex whitespace-nowrap">
						{#each enemy.forms as form, index}
							<button
								data-id="form-{index + 1}"
								class={`text-sm py-1 px-2 ${
									formIndex === index ? 'bg-almost-black' : 'opacity-60'
								}`}
								on:click={() => (formIndex = index)}
							>
								{getFormTitle(form.title, index, language)}
							</button>
						{/each}
					</div>
				</div>
				<HandBookStats {enemy} {language} {formIndex} />
			</div>
		{:else}
			<HandBookStats {enemy} {language} {formIndex} />
		{/if}
	</div>
	<div class="flex flex-col mt-3">
		<OtherBuffs {otherBuffsList} {language} entity={enemy} />
		<HandbookAbilities {enemy} {language} {specialMods} {statusImmuneList} />
		<StatusImmune {statusImmuneList} {language} mode="handbook" />
	</div>
</div>
