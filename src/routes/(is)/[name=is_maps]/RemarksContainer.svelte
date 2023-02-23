<script lang="ts">
	import type { Enemy } from './types';
	export let enemy: Enemy, row: number, language: string;
	import Remark from './Remark.svelte';
	import translations from '$lib/translations.json';
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
	{#if format === 'prisoner' && row === 0}
		{#each enemy.imprisoned.special as skill}
			<Remark {skill} {language} />
		{/each}
	{:else if format === 'prisoner' && row === 1}
		{#each enemy.released.special as skill}
			<Remark {skill} {language} />
		{/each}
	{:else if format === 'multiform'}
		{#each enemy.forms[row].special as skill}
			<Remark {skill} {language} />
		{/each}
	{:else}
		{#each enemy.special as skill}
			<Remark {skill} {language} />
		{/each}
	{/if}
</div>

<style>
	div {
		padding: 6px 0px;
	}
</style>
