<script lang="ts">
	import type { Enemy, Language, EnemyFormType } from '$lib/types';
	import { getMaxRowSpan } from '$lib/functions/statHelpers';
	import { getNormalAtk } from '$lib/functions/parseAtkType';
	import { getEnemySkills } from '$lib/functions/remarksHelper';
	import RemarksContainer from '$lib/components/RemarksContainer.svelte';
	import AtkSuffix from '$lib/components/AtkSuffix.svelte';
	import StatSkills from '$lib/components/StatSkills.svelte';
	import translations from '$lib/translations.json';

	export let enemy: Enemy, index: number, filteredTableHeaders, language: Language, specialMods;
	$: maxRowSpan = getMaxRowSpan(enemy);

	let textAlign = function (statKey: string) {
		switch (statKey) {
			case 'hp':
				return 'text-center px-3';
			case 'type':
			case 'atk':
			case 'def':
				return 'text-left px-3 py-1.5';
			case 'remarks':
				return 'text-left px-2 py-2';
			default:
				return 'text-center py-1';
		}
	};
	$: multispanKeys = getMultispanKeys(enemy?.forms);

	const getMultispanKeys = (forms: EnemyFormType[] | undefined) => {
		const statKeys: string[] = [];
		if (forms) {
			if (forms[0].title === 'form') {
				statKeys.push('hp');
				statKeys.push('e_hp');
			}
			forms.forEach((form) => {
				for (const statKey of Object.keys(form.mods)) {
					const key = statKey.replace('fixed_', '');
					if (!statKeys.includes(key)) {
						statKeys.push(key);
					}
					if (key === 'atk_interval') {
						statKeys.push('aspd');
					}
				}
			});
			const sameAtkType =
				JSON.stringify(forms[0].normal_attack) === JSON.stringify(forms[1].normal_attack);
			if (!sameAtkType && !statKeys.includes('atk')) {
				statKeys.push('atk');
			}
		}
		return statKeys;
	};
</script>

<!-- {@debug enemy} -->

{#each new Array(maxRowSpan) as _blank, row (enemy.key.concat('-', row.toString()))}
	<tr class={`${index % 2 === 1 ? ' bg-[#333333]' : 'bg-neutral-800'}`}>
		{#each filteredTableHeaders as { key }}
			{#if key === 'enemy' && row === 0}
				<td class={`border border-gray-400 w-[75px] ${textAlign(key)}`} rowspan={maxRowSpan}>
					<img
						class="select-none"
						src={enemy.img}
						height="75px"
						width="75px"
						decoding="async"
						alt={enemy.id}
						title={enemy[`name_${language}`] || enemy[`name_zh`]}
					/>
				</td>
			{:else if key === 'name' && row === 0}
				<td class={`border border-gray-400 h-[65px] text-left px-2.5`} rowspan={maxRowSpan}>
					<p class="min-w-[100px] max-w-[110px]">
						{enemy[`name_${language}`] || enemy[`name_zh`]}
					</p>
				</td>
			{:else if key === 'type' && row === 0}
				<td class={`border border-gray-400 h-[65px] ${textAlign(key)}`} rowspan={maxRowSpan}>
					<div>
						{#each enemy.type.filter((ele) => ele !== 'NORMAL') as type}
							<p class="whitespace-nowrap">{translations[language].types[type]}</p>
						{/each}
					</div>
				</td>
			{:else if key === 'remarks'}
				<td class={`border border-gray-400 h-[65px] ${textAlign(key)}`}>
					<RemarksContainer {enemy} {language} {row} {specialMods} />
				</td>
			{:else if !(row !== 0 && !multispanKeys.includes(key))}
				<td
					class={`border border-gray-400 h-[65px] ${textAlign(key)}`}
					rowspan={multispanKeys.includes(key) ? 1 : maxRowSpan}
				>
					{#if key === 'e_hp'}
						<p>{Math.round(enemy.stats[row].hp / (1 - enemy.stats[row].dmg_reduction / 100))}</p>
					{:else}
						<div>
							<p class={`whitespace-nowrap ${key === 'atk' ? 'flex' : ''}`}>
								{enemy.stats[row][key] === -1 ? '-' : enemy.stats[row][key]}
								{#if key === 'atk'}
									<AtkSuffix attack={getNormalAtk(enemy, row)} {language} />
								{/if}
							</p>
							<StatSkills
								skills={getEnemySkills(
									enemy,
									enemy?.forms ? enemy.forms[row].special : enemy.special,
									$specialMods
								)}
								stat={key}
								statValue={enemy.stats[row][key]}
								{language}
							/>
						</div>
					{/if}
				</td>
			{/if}
		{/each}
	</tr>
{/each}
