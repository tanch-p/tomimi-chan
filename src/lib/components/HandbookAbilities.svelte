<script lang="ts">
	import type { Enemy, Language } from '$lib/types';
	import Remark from './Remark.svelte';
	import translations from '$lib/translations.json';
	import EnemyFormTitle from './EnemyFormTitle.svelte';
	import { getEnemySkills } from '$lib/functions/getEnemySkills';

	export let enemy: Enemy, language: Language, statMods, specialMods;
</script>

<p>{translations[language].handbook_ability}</p>
<div class="py-1">
	{#if enemy.forms}
		{#each enemy.forms as form, i}
			{@const skills = getEnemySkills(enemy, form.special, $specialMods)}
			<EnemyFormTitle {enemy} row={i} {language} />
			<ul class="list-disc pl-4">
				{#each skills as skill}
					<Remark {skill} {language} mode={'handbook'} enemyStats={enemy.stats[i]} />
				{/each}
			</ul>
		{/each}
	{:else}
		{@const skills = getEnemySkills(enemy, enemy.special, $specialMods)}
		<ul class="list-disc pl-4">
			{#each skills as skill}
				<Remark {skill} {language} mode={'handbook'} enemyStats={enemy.stats[0]} />
			{/each}
		</ul>
	{/if}
</div>
