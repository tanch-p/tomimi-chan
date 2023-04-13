<script lang="ts">
	import type { Enemy } from '$lib/types';
	import { getMaxRowSpan } from '$lib/functions/parseStats';
	import { getNormalAtk } from '$lib/functions/parseAtkType';
	import { getEnemySkills } from '$lib/functions/getEnemySkills';
	import RemarksContainer from './RemarksContainer.svelte';
	import AtkSuffix from '$lib/components/AtkSuffix.svelte';
	import StatSkills from '$lib/components/StatSkills.svelte';
	import translations from '$lib/translations.json';

	export let enemy: Enemy, index: number, filteredTableHeaders, language: string;
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

	const powerupOddRows = ['enemy', 'count', 'type', 'hp', 'weight', 'range', 'lifepoint'];
	const multiformOddRows = ['enemy', 'count', 'type', 'weight', 'lifepoint'];
	let getRowSpan = (format: string, statKey: string, maxRowSpan: number) => {
		switch (format) {
			case 'powerup':
			case 'prisoner':
				return powerupOddRows.includes(statKey) ? maxRowSpan : 1;
			case 'multiform':
				return multiformOddRows.includes(statKey) ? maxRowSpan : 1;
			default:
				return 1;
		}
	};
</script>

<!-- {@debug enemy} -->

{#each new Array(maxRowSpan) as _blank, row (enemy.key.concat('-', row.toString()))}
	<tr class={`${index % 2 === 1 ? ' bg-[#333333]' : 'bg-neutral-800'}`}>
		{#each filteredTableHeaders as { key }}
			{#if key === 'enemy'}
				{#if row === 0}
					<td class={`border border-gray-400 w-[75px] ${textAlign(key)}`} rowspan={maxRowSpan}>
						<img
							class="select-none"
							src={enemy.img}
							height="75px"
							width="75px"
							decoding="async"
							loading="lazy"
							alt={enemy[`name_zh`]}
						/>
					</td>
				{/if}
			{:else if key === 'type'}
				{#if row === 0}
					<td class={`border border-gray-400 h-[65px] ${textAlign(key)}`} rowspan={maxRowSpan}>
						<div>
							{#each enemy.type.filter((ele) => ele !== 'NORMAL') as type}
								<p class="whitespace-nowrap">{translations[language].types[type]}</p>
							{/each}
						</div>
					</td>
				{/if}
			{:else if key === 'remarks'}
				<td class={`border border-gray-400 h-[65px] ${textAlign(key)}`}
					><RemarksContainer {enemy} {language} {row} /></td
				>
			{:else if !(row !== 0 && getRowSpan(enemy.format, key, maxRowSpan) > 1)}
				<td
					class={`border border-gray-400 h-[65px] ${textAlign(key)}`}
					rowspan={getRowSpan(enemy.format, key, maxRowSpan)}
				>
					<div>
						<p class="whitespace-nowrap">
							{enemy.stats[row][key]}
							{#if key === 'atk'}
								<AtkSuffix attack={getNormalAtk(enemy, row)} {language} />
							{/if}
						</p>
						<StatSkills
							skills={getEnemySkills(enemy, row)}
							stat={key}
							statValue={enemy.stats[row][key]}
							{language}
						/>
					</div>
				</td>
			{/if}
		{/each}
	</tr>
{/each}
