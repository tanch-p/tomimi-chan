<script lang="ts">
	import type { Language } from '$lib/types';
	import TextParser from './TextParser.svelte';

	export let skill, language: Language;

	const parseValues = (text: string) => {
		const regex = new RegExp(`<v.*?>`, 'g');
		const extractedSubstrings = text.match(regex) || [];
		for (const string of extractedSubstrings) {
			const isPercent = string.includes('%');
			let key = string.replace('%', '').slice(3, -1);
			if (key.includes('.')) {
				const [statKey, valueKey] = key.split('.');
				if (valueKey === 'multiplier') {
					text = text.replace(string, Math.round(skill[statKey][valueKey] * 100).toString());
				} else {
					text = text.replace(string, skill[statKey][valueKey]);
				}
			} else {
				text = text.replace(
					string,
					addOverwrittenHighlight(Math.round(skill[key] * (isPercent ? 100 : 1)).toString(), skill)
				);
			}
		}
		return text;
	};
	//temp hotfix for overwritten skills
	const addOverwrittenHighlight = (string: string, skill) => {
		if (skill.overwritten) {
			return '$' + string + '$';
		}
		return string;
	};
	$: tooltips = skill.tooltip && skill.tooltip[language].map((line) => parseValues(line));
</script>

{#if tooltips}
	<li class="py-1">
		{#each tooltips as line}
			<TextParser {line} />
		{/each}
	</li>
{/if}
