<script lang="ts">
	import type { Enemy, Language } from '$lib/types';
	import Remark from './Remark.svelte';
	import StatusImmune from '$lib/components/StatusImmune.svelte';
	import EnemyFormTitle from './EnemyFormTitle.svelte';
	import { getEnemySkills } from '$lib/functions/getEnemySkills';

	export let enemy: Enemy, row: number, language: Language, specialMods;
	$: skills = getEnemySkills(
		enemy,
		enemy?.forms ? enemy.forms[row].special : enemy.special,
		$specialMods
	);
</script>

<div>
	<EnemyFormTitle {enemy} {row} {language} />
	<StatusImmune {enemy} {specialMods} {language} mode="table" />
	<ul class="list-disc pl-4">
		{#each skills as skill}
			<Remark {skill} {language} />
		{/each}
	</ul>
</div>
