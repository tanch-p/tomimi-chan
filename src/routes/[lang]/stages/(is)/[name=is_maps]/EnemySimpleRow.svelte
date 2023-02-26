<script lang="ts">
	import type { Enemy } from './types';
	import RemarksContainer from './RemarksContainer.svelte';
	import AtkType from './AtkType.svelte';
	import { getMaxRowSpan } from '$lib/functions/parseStats';
	export let enemy: Enemy, index: number, filteredTableHeaders, language: string;
	$: maxRowSpan = getMaxRowSpan(enemy);

	let textAlign = function (statKey: string) {
		switch (statKey) {
			case 'hp':
				return 'text-center px-3';
			case 'type':
			case 'atk':
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
							alt={enemy[`name_cn`]}
						/>
					</td>
				{/if}
			{:else if key === 'type'}
				{#if row === 0}
					<td class={`border border-gray-400 h-[65px] ${textAlign(key)}`} rowspan={maxRowSpan}>
						<div>
							{#each enemy.type.filter((ele) => ele !== 'NORMAL') as type}
								<p>{type}</p>
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
						<p>
							{enemy.stats[row][key]}
							{#if key === 'atk'}
								<AtkType {enemy} {language} {row} />
							{/if}
						</p>
						<!-- {parseSpecial(
                            enemy,
                            format,
                            stat,
                            stats,
                            moddedStats[stat],
                            row,
                            specialMods,
                            language
							)} -->
					</div>
				</td>
			{/if}
		{/each}
	</tr>
{/each}
