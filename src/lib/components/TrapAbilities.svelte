<script lang="ts">
	import type { Language, Trap } from '$lib/types';
	import { page } from '$app/stores';
	import translations from '$lib/translations.json';
	import TextParser from './TextParser.svelte';
	import TrapSkill from './TrapSkill.svelte';
	import trapSkills from '$lib/data/traps_skills.json';
	import Remark from './Remark.svelte';
	import { getFormTitle, getTrapFormIndex } from '$lib/functions/lib';
	import RangeParser from './RangeParser.svelte';

	export let trap: Trap,
		mode = 'handbook';
	let language: Language;
	$: language = $page.data.language;
</script>

{#if trap.desc}
	{#if mode === 'handbook'}
		<p class="bg-[#383838] px-3.5 py-0.5 text-[#a2a5a5] font-bold">
			{translations[language].trait}<span class="font-normal">/</span>{translations[language]
				.handbook_ability}
		</p>
	{/if}
	<ul class="list-disc pl-4 py-1">
		<li class="py-1">
			<TextParser line={trap.desc} />
		</li>
		{#each trap.special as item, i}
			{#if typeof item === 'string'}
				<Remark skill={trapSkills[item]} {language} mode={'handbook'} enemyStats={trap.stats} />
			{:else}
				{@const formIndex = getTrapFormIndex(trap.special, i)}
				{@const formTitle = getFormTitle('form', formIndex, language)}
				<div class="text-red-400 py-1">{formTitle}</div>
				{#each item as key}
					<Remark skill={trapSkills[key]} {language} mode={'handbook'} enemyStats={trap.stats} />
				{/each}
			{/if}
		{/each}
	</ul>
{/if}

{#if trap.talents?.length > 0}
	{#if mode === 'handbook'}
		<p class="bg-[#383838] px-3.5 py-0.5 text-[#a2a5a5] font-bold">
			{translations[language].talent}
		</p>
	{/if}
	<ul class="py-1 h-max {mode === 'table' ? 'list-disc pl-4' : ''}">
		{#each trap.talents as talent}
			<li>
				{#if mode === 'handbook'}
					<p class="py-[1px] px-2 mt-1.5 w-max bg-[#d4d4d4] rounded-md font-medium text-[#333]">
						{talent.name}
					</p>
				{/if}
				<div class="py-1.5 {talent.rangeId ? 'grid grid-cols-[1fr_72px] gap-x-2' : ''}">
					<TextParser line={talent.desc} />
					{#if talent.rangeId}
						<div
							class="flex flex-col items-center w-[72px] p-2 pb-1 bg-[#161616] bg-opacity-80 rounded"
						>
							<div class="flex items-center h-full">
								<RangeParser rangeId={talent.rangeId} size="small" />
							</div>
							<p class="mt-1 text-sm">{translations[language].effect_range}</p>
						</div>
					{/if}
				</div>
			</li>
		{/each}
	</ul>
{/if}
{#if trap.skills?.length > 0}
	<p class="bg-[#383838] px-3.5 py-0.5 text-[#a2a5a5] font-bold">
		{translations[language].skill}
	</p>
	<div class="py-1.5">
		{#each trap.skills as skill}
			<TrapSkill {skill} {language} />
		{/each}
	</div>
{/if}
