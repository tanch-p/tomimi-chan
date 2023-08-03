<script lang="ts">
	import type { Enemy, Language, SpecialMods } from '$lib/types';
	import Remark from './Remark.svelte';
	import StatusImmune from '$lib/components/StatusImmune.svelte';
	import translations from '$lib/translations.json';
	import { getEnemySkills } from '$lib/functions/getEnemySkills';
	import enemySkills from '$lib/data/enemy/enemy_skills.json';
	import { checkIsTarget } from '$lib/functions/parseStats';

	export let enemy: Enemy, row: number, language: Language, specialMods;

	$: skillNames = getEnemySkills(enemy, row);
	const { format } = enemy;
	let statusImmuneList = [];

	specialMods.subscribe((mods) => {
		if (mods?.[enemy.id]?.status_immune) {
			statusImmuneList = [...enemy.status_immune, ...mods[enemy.id].status_immune];
		} else {
			statusImmuneList = enemy.status_immune;
		}
	});
	$: skills = parseSkills(skillNames, $specialMods);

	const parseSkills = (skillRefs, specialMods) => {
		let currentSkills = [];
		let extraSkills = [];

		currentSkills = skillRefs.map((skillRef) => {
			if (specialMods[enemy.id] && Object.keys(specialMods[enemy.id]).includes(skillRef.key)) {
				return specialMods[enemy.id][skillRef.key];
			} else {
				return { ...enemySkills[skillRef.key], ...skillRef };
			}
		});

		for (const target in specialMods) {
			if (checkIsTarget(enemy, target)) {
				extraSkills = Object.keys(specialMods[target])
					.map((key) => {
						if (key !== 'status_immune' && !skillRefs.find((ref) => ref.key === key)) {
							return specialMods[target][key];
						}
					})
					.filter(Boolean);
			}
		}
		return [...extraSkills, ...currentSkills];
	};
</script>

<div>
	{#if format === 'prisoner' && row === 1}
		<div>{translations[language].prisoner_release}</div>
	{:else if format === 'powerup' && row === 1}
		<div>{translations[language][enemy.powerup.state_name]}</div>
	{:else if format === 'multiform' && row !== 0 && language !== 'en'}
		<div>{translations[language].multiform_suffix.replace('#', row + 1)}</div>
	{/if}
	{#if statusImmuneList.length > 0}
		<StatusImmune {statusImmuneList} {language} />
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
