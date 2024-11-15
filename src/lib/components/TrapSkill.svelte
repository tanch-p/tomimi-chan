<script lang="ts">
	import type { Language } from '$lib/types';
	import { charaAssets } from '$lib/data/chara/chara_assets';
	import { getSkillImgUrl } from '$lib/functions/charaHelpers';
	import RangeParser from './RangeParser.svelte';
	import translations from '$lib/translations.json';
	import TextParser from './TextParser.svelte';
	import Icon from './Icon.svelte';

	export let skill, language: Language;
</script>

<div class="grid grid-cols-[200px_1fr] gap-x-3 mt-6">
	<div class="self-end">
		<div class="relative h-max w-[90px]">
			{#await import(`../../../../lib/images/skill_icons/skill_icon_${getSkillImgUrl(skill.skillId)}.webp`) then { default: src }}
				<img {src} width="90" height="90" loading="lazy" alt={''} />
			{/await}
			<div class="absolute flex -bottom-0.5 -right-0.5">
				{#if skill.spData?.initSp}
					<div class="grid grid-cols-[11px_1fr] items-center bg-[#434343] pl-[4px] pr-[1px]">
						<img src={charaAssets.sp_start} alt="" />
						<p class="text-[20px] leading-tight">{skill?.spData?.initSp}</p>
					</div>
				{/if}
				<div class="ml-1 grid grid-cols-[16px_1fr] items-center bg-[#434343] pr-[1px]">
					<img src={charaAssets.sp_cost} alt="" />
					<p class="text-[20px] leading-tight">{skill?.spData?.spCost}</p>
				</div>
			</div>
		</div>
		<p
			class="mt-1.5 text-lg {language !== 'en' ? 'text-center max-w-[90px] whitespace-nowrap' : ''}"
		>
			{skill.name}
		</p>
	</div>
	{#if skill.rangeId}
		<RangeParser rangeId={skill.rangeId} />
	{/if}
</div>
<div class="flex mt-2">
	{#if skill.skillType !== 'PASSIVE'}
		<p class="pill default {skill?.spType}">
			{translations[language][skill?.spType]}
		</p>
	{/if}
	<p class="pill default bg-[#737373]">{translations[language][skill.skillType]}</p>
	{#if skill?.duration > 0}
		<div class="pill default grid grid-cols-[20px_1fr] gap-x-1.5 items-center bg-[#555]">
			<Icon name="clock-icon" />
			<span>{skill?.duration}{language === 'en' ? 's' : '秒'}</span>
		</div>
	{/if}
</div>
<TextParser line={skill.desc} className="mt-1.5" />

<style>
	.pill.default {
		min-width: 72px;
		border-radius: 5px;
		padding: 0 6px 1px;
		text-align: center;
	}
</style>
