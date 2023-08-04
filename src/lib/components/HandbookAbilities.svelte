<script lang="ts">
	import type { Enemy, Language } from '$lib/types';
	import Remark from './Remark.svelte';
	import translations from '$lib/translations.json';
	import EnemyFormTitle from './EnemyFormTitle.svelte';
	import { getEnemySkills } from '$lib/functions/getEnemySkills';

	export let enemy: Enemy, language: Language, statMods, specialMods;
</script>

<p>{translations[language].handbook_ability}</p>
{#if enemy.forms}
	{#each enemy.forms as form, i}
		{@const skills = getEnemySkills(enemy, form.special, $specialMods)}
		<EnemyFormTitle {enemy} row={i} {language} />
		<div>
			{#each skills as skill}
				<Remark {skill} {language} />
			{/each}
		</div>
	{/each}
{:else}
	{@const skills = getEnemySkills(enemy, enemy.special, $specialMods)}
	<div>
		{#each skills as skill}
			<Remark {skill} {language} />
		{/each}
	</div>
{/if}

<style>
	div {
		padding: 6px 0px;
	}
</style>
