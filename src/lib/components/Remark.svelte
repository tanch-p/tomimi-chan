<script lang="ts">
	import type { Enemy, Language, Skill, StatusImmune } from '$lib/types';
	import TextParser from './TextParser.svelte';
	import { parseValues } from '$lib/functions/skillHelpers';
	import SkillHead from './SkillHead.svelte';

	export let enemy: Enemy,
		skill: Skill,
		language: Language,
		mode = 'table',
		enemyStats,
		statusImmuneList: StatusImmune[] = [];

	const getTooltip = (skill: Skill, language: Language, enemyStats) => {
		if (!skill.tooltip) return;

		return skill.tooltip[language].map((line) => {
			line = parseValues(skill, line, mode, enemyStats);
			if (statusImmuneList.includes('silence')) {
				line = line.replace('{can_silence}', '');
			}
			return line;
		});
	};

	$: tooltips = getTooltip(skill, language, enemyStats);
	$: showSilenceIcon =
		(skill.can_silence || skill.tooltip?.zh?.some((line) => line.includes('can_silence'))) &&
		!statusImmuneList.includes('silence');
</script>

{#if tooltips}
	<li class="py-1 {showSilenceIcon ? 'list-cross' : ''}">
		{#if skill.type === 'skill'}
			<SkillHead {enemy} {skill} {language} {mode} {statusImmuneList} />
		{/if}
		{#each tooltips as line}
			<TextParser {line} />
		{/each}
	</li>
{/if}
