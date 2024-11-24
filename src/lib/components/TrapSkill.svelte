<script lang="ts">
	import type { Language } from '$lib/types';
	import { charaAssets } from '$lib/data/chara/chara_assets';
	import { getSkillImgUrl } from '$lib/functions/charaHelpers';
	import RangeParser from './RangeParser.svelte';
	import translations from '$lib/translations.json';
	import TextParser from './TextParser.svelte';
	import Icon from './Icon.svelte';
	import { getEliteColors } from '$lib/functions/lib';
	import { page } from '$app/stores';
	import combat_icon from '$lib/images/is/combat_icon.webp';
	import emergency_icon from '$lib/images/is/emergency_icon.webp';

	export let skill, language: Language;

	let eliteMode = false,
		spKey = 'spData';

	$: rogueTopic = $page.data.rogueTopic;
	$: [combatOpsColor, eliteOpsColor] = getEliteColors(rogueTopic);
	$: spKey = eliteMode ? 'eliteSpData' : 'spData';
</script>

{#if skill.eliteSpData}
	<div class="grid grid-cols-2 font-bold text-lg text-gray-700 select-none">
		<button
			id="normal-toggle"
			class={`flex justify-center items-center py-0.5 ${combatOpsColor} ${
				!eliteMode ? 'text-gray-900' : 'opacity-30'
			}`}
			on:click={() => (eliteMode = false)}
		>
			<img
				src={combat_icon}
				width="50px"
				decoding="async"
				loading="lazy"
				alt="combat ops"
				class=""
			/>
		</button>
		<button
			id="elite-toggle"
			class={`flex justify-center items-center ${eliteOpsColor} ${
				eliteMode ? 'text-black' : 'opacity-30'
			}`}
			on:click={() => (eliteMode = true)}
		>
			<img
				src={emergency_icon}
				width="50px"
				decoding="async"
				loading="lazy"
				alt="elite ops"
				class=""
			/>
		</button>
	</div>
{/if}
<div class="grid grid-cols-[1fr_80px] gap-x-3 mt-6">
	<div class="self-end">
		<div class="relative h-max w-[90px]">
			{#await import(`../images/skill_icons/skill_icon_${getSkillImgUrl(skill.skillId)}.webp`) then { default: src }}
				<img {src} width="90" height="90" loading="lazy" alt={''} />
			{/await}
			{#if skill.skillType !== 'PASSIVE'}
				<div class="absolute flex -bottom-0.5 -right-0.5">
					{#if skill?.[spKey]?.initSp}
						<div class="grid grid-cols-[9px_1fr] items-center bg-[#434343] pl-[4px] pr-[1px]">
							<img src={charaAssets.sp_start} alt="start" />
							<p class="text-sm leading-tight">{skill?.[spKey]?.initSp}</p>
						</div>
					{/if}
					<div class="ml-1 grid grid-cols-[12px_1fr] items-center bg-[#434343] pr-[1px]">
						<img src={charaAssets.sp_cost} alt="cost" />
						<p class="text-sm leading-tight">{skill?.[spKey]?.spCost}</p>
					</div>
				</div>
			{/if}
		</div>
		<p class="mt-1.5 {language !== 'en' ? 'text-center max-w-[90px] whitespace-nowrap' : ''}">
			{skill.name}
		</p>
	</div>
	{#if skill.rangeId}
		<div
			class="flex flex-col items-center min-w-[72px] p-2 pb-1 bg-[#161616] bg-opacity-80 rounded"
		>
			<div class="flex items-center h-full">
				<RangeParser rangeId={skill.rangeId} size="small" />
			</div>
			<p class="mt-1 text-xs">{translations[language].effect_range}</p>
		</div>
	{/if}
</div>
<div class="flex mt-2 text-sm">
	{#if skill.skillType !== 'PASSIVE'}
		<p class="pill default {skill?.spType}">
			{translations[language][skill?.spType]}
		</p>
	{/if}
	<p class="pill default bg-[#737373]">{translations[language][skill.skillType]}</p>
	{#if skill?.duration > 0}
		<div class="pill default grid grid-cols-[20px_1fr] gap-x-0.5 items-center bg-[#555]">
			<Icon name="clock-icon" size={20} />
			<span>{skill?.duration}{language === 'en' ? 's' : '秒'}</span>
		</div>
	{/if}
</div>
<TextParser line={skill.desc} className="mt-1.5" />

<style>
	.pill.default {
		max-width: 100px;
		border-radius: 5px;
		padding: 0 5px 1px;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
