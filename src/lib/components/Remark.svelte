<script lang="ts">
	import type { Language, Skill } from '$lib/types';
	import TextParser from './TextParser.svelte';
	import { parseValues } from '$lib/functions/skillHelpers';

	export let skill,
		language: Language,
		mode = 'table',
		enemyStats,
		statusImmuneList = [];

	const getTooltip = (skill: Skill, language: Language) => {
		if (!skill.tooltip) return;

		return skill.tooltip[language].map((line) => {
			line = parseValues(skill, line, mode, enemyStats);
			if (statusImmuneList.includes('silence')) {
				line = line.replace('{can_silence}', '');
			}
			return line;
		});
	};

	$: tooltips = getTooltip(skill, language);
</script>

{#if tooltips}
	<li class="py-1">
		{#each tooltips as line}
			<TextParser {line} />
		{/each}
	</li>
{/if}
