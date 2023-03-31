<script lang="ts">
	import { getDmgEleHighlight } from '$lib/functions/parseAtkType';
	import translations from '$lib/translations.json';
	import enemySkills from '$lib/data/enemy/enemy_skills.json';
	export let skills: string[], stat: string, statValue: number, language: string;

	$: separator = language === 'en' ? '/' : '・';
	$: skillsToParse = skills
		.map((skillName) => {
			const skill = enemySkills[skillName];
			if (skill.type === stat) {
				const { suffix, multiplier, fixed_inc, fixed_value, hits, dmg_element } = skill;
				let value = statValue;
				if (fixed_value) {
					value = fixed_value;
				} else {
					value = Math.floor(value * (multiplier ?? 1) + (fixed_inc ?? 0));
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
		{'('}{#if stat === 'atk' && skill.hits > 1}{`x ${skill.hits}`}{/if}{skill.suffix[
			language
		]}{#if stat === 'atk' && skill.dmgEle}{separator}<span class={getDmgEleHighlight(skill.dmgEle)}
				>{translations[language][skill.dmgEle]}</span
			>{/if}{')'}
	</p>
{/each}
