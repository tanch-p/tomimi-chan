<script lang="ts">
	import type { Enemy, Language } from '$lib/types';
	import Remark from './Remark.svelte';
	import translations from '$lib/translations.json';
	import EnemyFormTitle from './EnemyFormTitle.svelte';
	import { getEnemySkills, getHandbookEnemySkills } from '$lib/functions/skillHelpers';
	import HandbookSkills from './HandbookSkills.svelte';

	export let enemy: Enemy, language: Language, specialMods, statusImmuneList;
	$: traits = getEnemySkills(enemy, enemy.traits, 0, $specialMods, 'trait');
	$: skills = getHandbookEnemySkills(enemy, $specialMods);
</script>

{#if enemy?.traits?.length > 0 || enemy.forms.some((form) => form.stats.dmg_reduction > 0 || form.special.length > 0)}
	<HandbookSkills {enemy} {skills} {language}/>
	<p class="bg-[#383838] px-3.5 py-0.5 text-[#a2a5a5] font-bold">
		{translations[language].handbook_ability}
	</p>
	<div class="py-1">
		{#each enemy.forms as form, i}
			{@const specialList = getEnemySkills(enemy, form.special, i, $specialMods, 'special').filter(
				(skill) => skill.type !== 'skill'
			)}
			<ul class="list-disc pl-4">
				{#if form.stats.dmg_reduction}
					<li class="py-1">
						{translations[language].dmg_reduction} - {form.stats.dmg_reduction}%
					</li>
				{/if}
				{#each traits as skill}
					<Remark {skill} {language} mode={'handbook'} enemyStats={form.stats} {statusImmuneList} />
				{/each}
			</ul>
			<EnemyFormTitle {enemy} row={i} {language} />
			<ul class="list-disc pl-4">
				{#each specialList as skill}
					<Remark {skill} {language} mode={'handbook'} enemyStats={form.stats} {statusImmuneList} />
				{/each}
			</ul>
		{/each}
	</div>
{/if}
