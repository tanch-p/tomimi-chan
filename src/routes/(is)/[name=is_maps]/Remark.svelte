<script lang="ts">
	import enemySkills from '$lib/data/enemy/enemy_skills.json';
	export let skill: string, language: string;
</script>

<div>
	{enemySkills[skill].tooltip.simple[language]}
</div>

<style>
	div {
		padding: 6px 0px;
	}
</style>
