<script lang="ts">
	import type { Language, Trap } from '$lib/types';
	import RangeParser from './RangeParser.svelte';
	import StatusImmune from './StatusImmune.svelte';
	import TrapAbilities from './TrapAbilities.svelte';

	export let trap: Trap, tableHeaders, index, language: Language;
</script>

<tr id={trap.key} class={`scroll-mt-24 ${index % 2 === 1 ? ' bg-[#333333]' : 'bg-neutral-800'}`}>
	{#each tableHeaders as key}
		{#if key === 'icon'}
			<td class={`border border-gray-400 w-[75px]`}>
				<img
					class="select-none"
					src={trap.img}
					height="75px"
					width="75px"
					decoding="async"
					alt={trap.name}
				/>
			</td>
		{:else if key === 'name'}
			<td class={`border border-gray-400 h-[65px] text-left px-2.5`}>
				<p class="min-w-[80px] max-w-[110px]">
					{trap.name}
				</p>
			</td>
			<!-- {:else if key === 'type'}
			<td class={`border border-gray-400 h-[65px] text-center>
				<div>
					{#each trap.type.filter((ele) => ele !== 'NORMAL') as type}
						<p class="whitespace-nowrap">{translations[language].types[type]}</p>
					{/each}
				</div>
			</td> -->
		{:else if key === 'range_display'}
			<td class={`border border-gray-400 text-center px-1`}>
				{#if trap.stats.rangeId}
					<div
						class="flex flex-col items-center w-[72px] mx-auto p-2 pb-1 bg-[#161616] bg-opacity-80 rounded h-max"
					>
						<div class="flex items-center">
							<RangeParser rangeId={trap.stats.rangeId} size="small" />
						</div>
					</div>
				{:else}
					-
				{/if}
			</td>
		{:else if key === 'remarks'}
			<td class={`border border-gray-400 text-start px-2 py-2 max-w-[500px]`}>
				<StatusImmune statusImmuneList={trap.status_immune} {language} mode="table" />
				<TrapAbilities {trap} mode="table" />
			</td>
		{:else}
			<td class={`border border-gray-400 h-[65px] text-center`}>
				<div>
					<p class={`whitespace-nowrap text-center`}>
						{trap.stats[key] === -1 ? '-' : trap.stats[key]}
					</p>
				</div>
			</td>
		{/if}
	{/each}
</tr>
