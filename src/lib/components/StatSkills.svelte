<script lang="ts">
	import type { StatMods, Enemy, Language } from '$lib/types';
	import { getDmgEleHighlight } from '$lib/functions/parseAtkType';
	import translations from '$lib/translations.json';
	import enemySkills from '$lib/data/enemy/enemy_skills.json';
	import enemyDatabase from '$lib/data/enemy/enemy_database.json';
	import { applyMods } from '$lib/functions/parseStats';
	export let skills: string[],
		enemy: Enemy,
		stat: string,
		statValue: number,
		statMods: StatMods,
		specialMods,
		language: Language;

	$: separator = language === 'en' ? '/' : '・';
	$: skillsToParse = skills
		.map((skillRef) => {
			let skill = { ...enemySkills[skillRef.key], ...skillRef };
			if (specialMods[enemy.id] && Object.keys(specialMods[enemy.id]).includes(skillRef.key)) {
				skill = specialMods[enemy.id][skillRef.key];
			}
			if (skill[stat]) {
				const { suffix, summon_enemy, hits, dmg_element } = skill;
				let value = statValue;
				if (skill[stat].value) {
					value = skill[stat].value;
				} else if (summon_enemy) {
					const enemy = {
						...enemyDatabase[summon_enemy],
						stats: enemyDatabase[summon_enemy].stats[0]
					};
					const moddedStats = applyMods(enemy, statMods, 0);
					value = moddedStats[stat];
				} else {
					value = Math.floor(value * (skill[stat].multiplier ?? 1) + (skill[stat].fixed ?? 0));
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
