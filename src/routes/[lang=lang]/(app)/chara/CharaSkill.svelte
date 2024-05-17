<script lang="ts">
	import type { Language } from '$lib/types';
	import { charaAssets } from '$lib/data/chara/chara_assets';
	import { skillIcons } from '$lib/data/chara/skill_lookup';
	import translations from '$lib/translations.json';
	import Icon from '$lib/components/Icon.svelte';
	import TextParser from '$lib/components/TextParser.svelte';
	import RangeParser from '$lib/components/RangeParser.svelte';

	export let skill, displayLang: Language, language: Language;

	const hasMastery = skill.levels.length > 1;
	let mastery: number = hasMastery ? 3 : 0;

	function getMasteryLvl(mastery: number) {
		if (!hasMastery) return mastery;
		if (mastery === 3) return 0;
		return mastery + 1;
	}
</script>

<div class="grid grid-cols-[200px_1fr] gap-x-3 mt-6">
	<div class="self-end">
		<div class="relative h-max w-[90px]">
			<img
				src={skillIcons['skill_icon_' + skill.skillId]}
				width="90"
				height="90"
				loading="lazy"
				alt={''}
			/>
			<div class="absolute flex -bottom-0.5 -right-0.5">
				{#if skill.levels?.[mastery]?.spData?.initSp > mastery}
					<div class="grid grid-cols-[11px_1fr] items-center bg-[#434343] pl-[4px] pr-[1px]">
						<img src={charaAssets.sp_start} alt="" />
						<p class="text-[20px] leading-tight">{skill.levels?.[mastery]?.spData?.initSp}</p>
					</div>
				{/if}
				<div class="ml-1 grid grid-cols-[16px_1fr] items-center bg-[#434343] pr-[1px]">
					<img src={charaAssets.sp_cost} alt="" />
					<p class="text-[20px] leading-tight">{skill.levels?.[mastery]?.spData?.spCost}</p>
				</div>
			</div>
		</div>
		<p
			class="mt-1.5 text-lg {language !== 'en' ? 'text-center max-w-[90px] whitespace-nowrap' : ''}"
		>
			{skill[`name_${displayLang}`]}
		</p>
		<button
			class="grid grid-cols-[1fr_30px] w-max mt-1.5"
			on:click={() => (mastery = getMasteryLvl(mastery))}
		>
			<div class="flex items-center border border-[#3e3e3e] bg-[#272727] pl-2 pr-1 h-[24px]">
				<p class="leading-tight">RANK</p>
				<img src={charaAssets.solid_7} width="12" alt="7" class="ml-1.5 mt-0.5" />
			</div>
			{#if hasMastery}
				<img src={charaAssets.mastery[mastery]} width="25" height="24" alt="M{mastery}" />
			{/if}
		</button>
	</div>
	{#if skill.levels?.[mastery]?.rangeId}
		<div class="flex justify-center items-center">
			<RangeParser rangeId={skill.levels?.[mastery]?.rangeId} />
		</div>
	{/if}
</div>
<div class="flex mt-2">
	{#if skill.skillType !== 'PASSIVE'}
		<p class="pill {skill?.spType}">
			{translations[language][skill?.spType]}
		</p>
	{/if}
	<p class="pill bg-[#737373]">{translations[language][skill.skillType]}</p>
	{#if skill.levels?.[mastery]?.duration > 0}
		<div class="pill grid grid-cols-[20px_1fr] gap-x-1.5 items-center bg-[#555]">
			<Icon name="clock-icon" />
			<span>{skill.levels?.[mastery]?.duration}{language === 'en' ? 's' : '秒'}</span>
		</div>
	{/if}
</div>
<TextParser line={skill.levels[mastery][`description_${displayLang}`]} className="mt-1.5" />

<style>
	.pill {
		min-width: 72px;
		border-radius: 5px;
		padding: 0 6px 1px;
		text-align: center;
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
