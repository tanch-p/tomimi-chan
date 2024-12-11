<script lang="ts">
	import type { Enemy, Language, Skill, StatusImmune } from '$lib/types';
	import translations from '$lib/translations.json';
	import { charaAssets } from '$lib/data/chara/chara_assets';
	import { getFormTitle } from '$lib/functions/lib';
	export let enemy: Enemy,
		skill: Skill,
		language: Language,
		mode = 'table',
		statusImmuneList: StatusImmune[] = [];
	const skillType = skill.initCooldown ? 'COOLDOWN' : skill.skillType;
</script>

{#if mode === 'table'}
	<div class="flex flex-wrap items-center mb-0.5">
		<p class="whitespace-nowrap mr-1.5">{skill.suffix[language]}</p>
		{#if skillType === 'COOLDOWN'}
			<div>
				({translations[language].initCooldown}{#if language === 'en'}<sub>init</sub
					>&nbsp;{/if}{skill.initCooldown}{translations[language].seconds_abbr} / {translations[
					language
				].cooldown}{#if language === 'en'}<sub>n</sub>&nbsp;{/if}{skill.cooldown}{translations[
					language
				].seconds_abbr})
			</div>
		{:else}
			<div class="flex items-center gap-x-1 rounded-[5px] text-sm bg-[#434343]">
				<div class="grid grid-cols-[9px_1fr] gap-x-[1px] items-center pl-[4px] p-0.5">
					<img src={charaAssets.sp_start} alt="start" />
					<p class="leading-tight">{skill?.initSp}</p>
				</div>
				<div class="grid grid-cols-[12px_1fr] items-center py-0.5 pr-0.5">
					<img src={charaAssets.sp_cost} alt="cost" />
					<p class="leading-tight">{skill?.spCost}</p>
				</div>
			</div>
		{/if}
		<p class="pill default ml-1 {skillType}">{translations[language][skillType]}</p>
		{#if skill.can_silence && !statusImmuneList.includes('silence')}
			<span class="skilltag can_silence !ml-0">{translations[language].can_silence}</span>
		{/if}
	</div>
{:else}
	<div class="flex flex-wrap items-center mb-0.5">
		<p class="whitespace-nowrap mr-2.5">{skill.suffix[language]}</p>
		{#if skillType === 'COOLDOWN'}
			<div class="pill default bg-[#555]">
				{translations[language].initCooldown}{#if language === 'en'}<sub>init</sub
					>&nbsp;{/if}{skill.initCooldown}{translations[language].seconds_abbr} / {translations[
					language
				].cooldown}{#if language === 'en'}<sub>n</sub>&nbsp;{/if}{skill.cooldown}{translations[
					language
				].seconds_abbr}
			</div>
		{:else}
			<div class="flex items-center gap-x-1 rounded-[5px] text-sm bg-[#434343]">
				<div class="grid grid-cols-[9px_1fr] gap-x-[1px] items-center pl-[4px] p-0.5">
					<img src={charaAssets.sp_start} alt="start" />
					<p class="leading-tight">{skill?.initSp}</p>
				</div>
				<div class="grid grid-cols-[12px_1fr] items-center py-0.5 pr-0.5">
					<img src={charaAssets.sp_cost} alt="cost" />
					<p class="leading-tight">{skill?.spCost}</p>
				</div>
			</div>
		{/if}
		<p class="pill default {skillType} {skillType!=="COOLDOWN" ? "ml-1" : ""} ">{translations[language][skillType]}</p>
		{#if skill.can_silence}
			<span class="skilltag can_silence !ml-0">{translations[language].can_silence}</span>
		{/if}
	</div>
	{#if enemy.forms.length > 1}
		<p class="text-xs text-gray-400">
			&lt;{#each skill.formIndexes as idx, i}
				{#if i > 1}{translations[language].comma}{/if}<span
					>{getFormTitle(enemy?.forms?.[idx]?.title, idx, language)}</span
				>{/each}&gt;
		</p>
	{/if}
{/if}

<style>
	.pill.default {
		display: flex;
		align-items: center;
		border-radius: 5px;
		height: min-content;
		padding: 0 5px 1px;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.8rem;
	}
</style>
