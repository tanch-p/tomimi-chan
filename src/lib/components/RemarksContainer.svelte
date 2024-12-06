<script lang="ts">
	import type { Enemy, Language } from '$lib/types';
	import Remark from './Remark.svelte';
	import StatusImmune from '$lib/components/StatusImmune.svelte';
	import EnemyFormTitle from './EnemyFormTitle.svelte';
	import { getEnemySkills, getStatusImmune } from '$lib/functions/skillHelpers';
	import translations from '$lib/translations.json';

	export let enemy: Enemy, row: number, language: Language, specialMods;
	$: traits = getEnemySkills(enemy, enemy.traits, row, $specialMods, 'trait');
	$: specialList = getEnemySkills(enemy, enemy.forms[row].special, row, $specialMods, 'special');
	$: statusImmuneList = getStatusImmune(enemy, enemy.forms[row].status_immune, $specialMods);
</script>

<div>
	{#if enemy.forms.length === 1}
		<StatusImmune {statusImmuneList} {language} mode="table" />
		<ul class="list-disc pl-5">
			{#if enemy.forms[row].stats.dmg_reduction}
				<li class="py-1">
					{translations[language].dmg_reduction} - {enemy.forms[row].stats.dmg_reduction}%
				</li>
			{/if}
			{#each traits as skill}
				<Remark {skill} {language} enemyStats={enemy.forms[row].stats} {statusImmuneList} />
			{/each}
		</ul>
		<ul class="list-disc pl-5">
			{#each specialList as skill}
				<Remark {skill} {language} enemyStats={enemy.forms[row].stats} {statusImmuneList} />
			{/each}
		</ul>
	{:else}
		{#if row === 0}
			<ul class="list-disc pl-5">
				{#if enemy.forms[row].stats.dmg_reduction}
					<li class="py-1">
						{translations[language].dmg_reduction} - {enemy.forms[row].stats.dmg_reduction}%
					</li>
				{/if}
				{#each traits as skill}
					<Remark {skill} {language} enemyStats={enemy.forms[row].stats} {statusImmuneList} />
				{/each}
			</ul>
		{/if}
		<EnemyFormTitle {enemy} {row} {language} />
		<StatusImmune {statusImmuneList} {language} mode="table" />
		<ul class="list-disc pl-5">
			{#each specialList as skill}
				<Remark {skill} {language} enemyStats={enemy.forms[row].stats} {statusImmuneList} />
			{/each}
		</ul>
	{/if}
</div>
