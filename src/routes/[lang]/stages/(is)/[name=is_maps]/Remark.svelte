<script lang="ts">
	import enemySkills from '$lib/data/enemy/enemy_skills.json';
	export let skill: string, language: string;
</script>

<div>
	{#each enemySkills[skill].tooltip[language]  as line}
		<p>{line}</p>
	{/each}
</div>

<style>
	div {
		padding: 6px 0px;
	}
</style>
