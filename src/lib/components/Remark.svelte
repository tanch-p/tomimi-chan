<script lang="ts">
	import type { Language, Skill } from '$lib/types';
	import TextParser from './TextParser.svelte';
	import { getTooltipEndIndex } from '$lib/functions/lib';

	export let skill,
		language: Language,
		mode = 'table',
		enemyStats,
		statusImmuneList;

	const getTooltip = (skill: Skill, language: Language) => {
		if (!skill.tooltip) return;

		return skill.tooltip[language].map((line) => {
			line = parseValues(line);
			if(statusImmuneList.includes("silence")){
				line=line.replace("{can_silence}","")
			}
			return line;
		});
	};

	const parseValues = (text: string) => {
		const regex = new RegExp(`<v.*?>`, 'g');
		const extractedSubstrings = text.match(regex) || [];
		for (const string of extractedSubstrings) {
			const isPercent = string.includes('%');
			let key = string.replace('%', '').slice(3, -1);
			if (key.includes('.')) {
				const [statKey, valueKey] = key.split('.');
				if (valueKey === 'multiplier') {
					text = text.replace(
						string,
						addOverwrittenHighlight(
							Math.round(skill[statKey][valueKey] * 100).toString(),
							skill,
							statKey
						)
					);
					if (statKey === 'atk' && mode === 'handbook') {
						//check for skilltag
						const endIndex = getTooltipEndIndex(text);
						const value = ` (${Math.round(enemyStats[statKey] * skill[statKey][valueKey])})`;
						text = text.slice(0, endIndex) + value + text.slice(endIndex);
					}
				} else {
					text = text.replace(string, skill[statKey][valueKey]);
				}
			} else {
				text = text.replace(
					string,
					addOverwrittenHighlight(
						(isPercent ? Math.round(skill[key] * 100) : skill[key]).toString(),
						skill,
						key
					)
				);
			}
		}
		return text;
	};
	//temp hotfix for overwritten skills
	const addOverwrittenHighlight = (string: string, skill, key) => {
		if (skill.overwrittenKeys.includes(key)) {
			return '$' + string + '$';
		}
		return string;
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
