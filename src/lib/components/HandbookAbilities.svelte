<script lang="ts">
	import type { Enemy, Language } from '$lib/types';
	import Remark from './Remark.svelte';
	import translations from '$lib/translations.json';
	import EnemyFormTitle from './EnemyFormTitle.svelte';
	import { getEnemySkills, getHandbookEnemySkills } from '$lib/functions/skillHelpers';
	import HandbookSkills from './HandbookSkills.svelte';
	import { isEquals } from '$lib/functions/lib';

	export let enemy: Enemy, language: Language, specialMods, statusImmuneList, formIndex;
	$: traits = getEnemySkills(enemy, enemy.traits, 0, $specialMods, 'trait').filter(
		(skill) => skill.type !== 'skill'
	);
	$: skills = getHandbookEnemySkills(enemy, $specialMods);
</script>

<HandbookSkills {enemy} {skills} {language} {statusImmuneList} {formIndex} />
{#if traits.length > 0 || enemy.forms.some((form) => form.stats.dmg_reduction > 0 || form.special.length > 0)}
	{@const sameDmgRedAcrossForms = enemy.forms.reduce((acc, curr, i, list) => {
		if (i + 1 < list.length) {
			acc = acc && isEquals(list[i].stats.dmg_reduction, list[i + 1].stats.dmg_reduction);
		}
		return acc;
	}, true)}
	<p class="bg-[#383838] px-3.5 py-0.5 text-[#a2a5a5] font-bold">
		{translations[language].handbook_ability}
	</p>
	<div class="py-1">
		<ul class="list-disc pl-4">
			{#if sameDmgRedAcrossForms}
				{#if enemy.forms[0].stats.dmg_reduction}
					<li class="py-1">
						{translations[language].dmg_reduction} - {enemy.forms[0].stats.dmg_reduction}%
					</li>
				{/if}
			{/if}
			{#each traits as skill}
				<Remark
					{enemy}
					{skill}
					{language}
					mode={'handbook'}
					enemyStats={enemy.forms[formIndex].stats}
					{statusImmuneList}
				/>
			{/each}
		</ul>
		{#each enemy.forms as form, i}
			{@const specialList = getEnemySkills(enemy, form.special, i, $specialMods, 'special').filter(
				(skill) => skill.type !== 'skill'
			)}
			<ul class="list-disc pl-4">
				{#if !sameDmgRedAcrossForms}
					<li class="py-1">
						{translations[language].dmg_reduction} - {form.stats.dmg_reduction}%
					</li>
				{/if}
			</ul>
			<EnemyFormTitle {enemy} row={i} {language} />
			<ul class="list-disc pl-4">
				{#each specialList as skill}
					<Remark
						{enemy}
						{skill}
						{language}
						mode={'handbook'}
						enemyStats={form.stats}
						{statusImmuneList}
					/>
				{/each}
			</ul>
		{/each}
	</div>
{/if}
