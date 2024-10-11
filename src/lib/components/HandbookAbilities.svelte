<script lang="ts">
	import type { Enemy, Language } from '$lib/types';
	import Remark from './Remark.svelte';
	import translations from '$lib/translations.json';
	import EnemyFormTitle from './EnemyFormTitle.svelte';
	import { getEnemySkills } from '$lib/functions/skillHelpers';

	export let enemy: Enemy, language: Language, specialMods,statusImmuneList;
</script>

{#if enemy?.special?.length > 0 || enemy.forms || enemy.stats[0].dmg_reduction}
	<p class="bg-[#383838] px-3.5 py-0.5 text-[#a2a5a5] font-bold">
		{translations[language].handbook_ability}
	</p>
	<div class="py-1">
		{#if enemy.forms}
			{#each enemy.forms as _, i}
				{@const skills = getEnemySkills(enemy, i, $specialMods)}
				<EnemyFormTitle {enemy} row={i} {language} />
				<ul class="list-disc pl-4">
					{#if enemy.stats[i].dmg_reduction}
						<li class="py-1">
							{translations[language].dmg_reduction} - {enemy.stats[i].dmg_reduction}%
						</li>
					{/if}
					{#each skills as skill}
						<Remark {skill} {language} mode={'handbook'} enemyStats={enemy.stats[i]} {statusImmuneList}/>
					{/each}
				</ul>
			{/each}
		{:else}
			{@const skills = getEnemySkills(enemy, 0, $specialMods)}
			<ul class="list-disc pl-4">
				{#if enemy.stats[0].dmg_reduction}
					<li class="py-1">
						{translations[language].dmg_reduction} - {enemy.stats[0].dmg_reduction}%
					</li>
				{/if}
				{#each skills as skill}
					<Remark {skill} {language} mode={'handbook'} enemyStats={enemy.stats[0]} {statusImmuneList} />
				{/each}
			</ul>
		{/if}
	</div>
{/if}
