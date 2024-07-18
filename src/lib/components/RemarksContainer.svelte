<script lang="ts">
	import type { Enemy, Language } from '$lib/types';
	import Remark from './Remark.svelte';
	import StatusImmune from '$lib/components/StatusImmune.svelte';
	import EnemyFormTitle from './EnemyFormTitle.svelte';
	import { getEnemySkills, getStatusImmune } from '$lib/functions/remarksHelper';
	import translations from '$lib/translations.json';

	export let enemy: Enemy, row: number, language: Language, specialMods;
	$: skills = getEnemySkills(
		enemy,
		enemy?.forms ? enemy.forms[row].special : enemy.special,
		$specialMods
	);
</script>

<div>
	<EnemyFormTitle {enemy} {row} {language} />
	<StatusImmune
		statusImmuneList={getStatusImmune(
			enemy,
			enemy?.forms
				? enemy.forms[row].mods?.status_immune ?? enemy.status_immune
				: enemy.status_immune,
			$specialMods
		)}
		{language}
		mode="table"
	/>
	<ul class="list-disc pl-5">
		{#if enemy.stats[row].dmg_reduction}
			<li class="py-1">
				{translations[language].dmg_reduction} - {enemy.stats[row].dmg_reduction}%
			</li>
		{/if}
		{#each skills as skill}
			<Remark {skill} {language} enemyStats={enemy.stats[row]} />
		{/each}
	</ul>
</div>
