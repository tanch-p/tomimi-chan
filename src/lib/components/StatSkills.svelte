<script lang="ts">
	import type { Language, Skill } from '$lib/types';
	import { getDmgEleHighlight } from '$lib/functions/parseAtkType';
	import translations from '$lib/translations.json';

	export let skills: Skill[], stat: string, statValue: number, language: Language;
	$: separator = language === 'en' ? '/' : '・';
	$: skillsToParse = skills
		.map((skill) => {
			if (skill[stat]) {
				const { suffix, hits, dmg_element } = skill;
				let value = statValue;
				if (skill[stat].value) {
					value = skill[stat].value;
				} else {
					if (stat === 'aspd') {
						let aspd = 100 + (skill[stat].fixed ?? 0);
						value =
							Math.round((value / ((aspd * (skill[stat].multiplier ?? 1)) / 100)) * 100) / 100;
					} else {
						if (skill[stat].type === 'initial') {
							//for now initial type only exists for multipliers
							value = Math.floor(value * (skill[stat].multiplier + 1));
						} else {
							value = Math.floor(value * (skill[stat].multiplier ?? 1) + (skill[stat].fixed ?? 0));
						}
					}
				}
				return { suffix, value, hits: hits ?? 0, dmgEle: dmg_element ?? '' };
			}
			return;
		})
		.filter(Boolean);
</script>

{#each skillsToParse as skill}
	<p class="whitespace-nowrap">
		{skill.value}
		{#if stat === 'atk' && skill.hits > 1}{`x ${skill.hits}`}{/if}{' ('}{skill.suffix[
			language
		]}{#if stat === 'atk' && skill.dmgEle}{separator}<span class={getDmgEleHighlight(skill.dmgEle)}
				>{translations[language][skill.dmgEle]}</span
			>{/if}{')'}
	</p>
{/each}
