<script lang="ts">
	import type { Language, Trap } from '$lib/types';
	import { page } from '$app/stores';
	import translations from '$lib/translations.json';
	import StatusImmune from './StatusImmune.svelte';
	import TrapStats from './TrapStats.svelte';
	import RangeParser from './RangeParser.svelte';
	import TrapAbilities from './TrapAbilities.svelte';
	import { getOtherBuffsCount, updateOtherBuffsList } from '$lib/functions/lib';

	export let trap: Trap, otherBuffsList;
	let language: Language;
	$: language = $page.data.language;
</script>

<div
	id={trap.key}
	class="scroll-mt-16 p-2 bg-neutral-900 bg-opacity-40 sm:max-w-[500px] w-full mx-auto"
>
	<div class="relative pt-3">
		<div class="flex items-center">
			{#if trap.overwritten}
				<p class="text-xs text-center bg-[#981313] py-0.5 w-[1.75rem]">Sp.</p>
			{/if}
			<p class="ml-1 font-semibold">{trap.name}</p>
		</div>
	</div>
	<div class="flex gap-x-2.5 mt-1">
		<div class="space-y-2.5">
			<img
				class="select-none"
				src={trap.img}
				height="75px"
				width="75px"
				decoding="async"
				loading="lazy"
				alt={trap.name}
			/>
			<!-- <div class="flex flex-wrap items-center bg-almost-black px-1.5">
				<div class="flex items-center gap-x-1 py-1 max-[390px]:text-sm">
					<p>Enemy</p>
				</div>
			</div> -->
			{#if trap.stats.rangeId}
				<div
					class="flex flex-col items-center w-[75px] p-2 pb-1 bg-[#161616] bg-opacity-80 rounded h-max"
				>
					<div class="flex items-center">
						<RangeParser rangeId={trap.stats.rangeId} size="small" />
					</div>
					<p class="mt-1 text-xs">{translations[language].attack_range}</p>
				</div>
			{/if}
		</div>
		<TrapStats {trap} />
	</div>
	<div class="mt-3">
		{#if otherBuffsList && trap.key === 'trap_760_skztzs'}
			<p class="bg-[#383838] px-3.5 py-0.5 text-[#a2a5a5] font-bold">
				{translations[language].other_buffs}
			</p>
			<div class="flex flex-wrap px-2.5 py-2">
				{#each $otherBuffsList as buff}
					{@const currentCount = getOtherBuffsCount($otherBuffsList, buff.key, trap.key)}
					<button
						class:brightness-50={currentCount === 0}
						class="flex flex-col gap-y-0.5"
						on:click={() => updateOtherBuffsList(otherBuffsList, buff.key, trap.key)}
					>
						<img src={buff.img} alt={buff.name} width="60" height="60" />
						<p class={language !== 'en' ? 'text-center max-w-[90px] w-full whitespace-nowrap' : ''}>
							{buff.name}
						</p>
					</button>
				{/each}
			</div>
		{/if}
		<TrapAbilities {trap}/>
		<StatusImmune statusImmuneList={trap.status_immune} {language} mode="handbook" />
	</div>
</div>
