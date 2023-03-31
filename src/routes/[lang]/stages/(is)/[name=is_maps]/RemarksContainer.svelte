<script lang="ts">
	import type { Enemy } from './types';
	export let enemy: Enemy, row: number, language: string;
	import Remark from './Remark.svelte';
	import StatusImmune from '$lib/components/StatusImmune.svelte';
	import translations from '$lib/translations.json';
	import { getEnemySkills } from '$lib/functions/getEnemySkills';
	$: skills = getEnemySkills(enemy, row);
	const { format } = enemy;
</script>

<div>
	{#if format === 'prisoner' && row === 1}
		<div>{translations[language].prisoner_release}</div>
	{:else if format === 'powerup' && row === 1}
		<div>{translations[language][enemy.powerup.state_name]}</div>
	{:else if format === 'multiform' && row !== 0 && language !== 'en'}
		<div>{translations[language].multiform_suffix.replace('#', row + 1)}</div>
	{/if}
	{#if enemy.status_immune.length > 0}
		<StatusImmune statusImmuneList={enemy.status_immune} {language} />
	{/if}
	{#each skills as skill}
		<Remark {skill} {language} />
	{/each}
</div>

<style>
	div {
		padding: 6px 0px;
	}
</style>
