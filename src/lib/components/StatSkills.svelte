<script lang="ts">
	import type { Enemy, Language, Skill, StatKey, Trap } from '$lib/types';
	import { getDmgEleHighlight } from '$lib/functions/parseAtkType';
	import translations from '$lib/translations.json';
	import { getModdedStat } from '$lib/functions/statHelpers';

	export let entity: Enemy | Trap,
		formIndex: number,
		skills: Skill[],
		stat: StatKey,
		statValue: number,
		language: Language;
	$: separator = language === 'en' ? '/' : '・';
	$: skillsToParse = skills
		.map((skill) => {
			if (skill.remove) return;
			if (skill[stat]) {
				const { suffix, hits, dmg_element } = skill;
				let value = statValue;
				if (skill[stat].value) {
					value = skill[stat].value;
				} else {
					const runeMods =
						entity.modsList[formIndex].find((ele) =>
							['runes'].includes(ele.key)
						) || [];
					const otherMods = entity.modsList[formIndex].filter(
						(ele) => !['runes'].includes(ele.key)
					);
					const skillMod = {
						key: skill.key,
						mods: [
							{
								key: stat,
								value: skill[stat].multiplier || skill[stat].fixed,
								order: skill[stat].order || 'final',
								mode: skill[stat].multiplier ? 'mul' : 'add'
							}
						]
					};
					if (stat === 'aspd') {
						value = getModdedStat(entity.stats[stat], stat, runeMods, skillMod, ...otherMods);
					} else {
						const baseValue = getModdedStat(entity.stats[stat], stat, runeMods);
						value = getModdedStat(baseValue, stat, skillMod, ...otherMods);
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
		{#if stat === 'atk' && skill.hits > 1}{`x ${skill.hits}`}{/if}{' ('}{skill?.suffix?.[
			language
		]}{#if stat === 'atk' && skill.dmgEle}{separator}<span class={getDmgEleHighlight(skill.dmgEle)}
				>{translations[language][skill.dmgEle]}</span
			>{/if}{')'}
	</p>
{/each}
