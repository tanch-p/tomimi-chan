<script lang="ts">
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import TextParser from '../TextParser.svelte';

	export let language: Language, crisis, contracts;
</script>

<div class="flex items-center justify-center bg-[#82000e]">
	<img src="/images/recalrune/icon_rune_head_essential.webp" alt="essential_icon" />
	<h6>{crisis.fixedRuneSeriesName[language] || crisis.fixedRuneSeriesName['zh']}</h6>
</div>
<div class="grid grid-cols-[50px_1fr] gap-y-5 pt-3">
	{#each $contracts.base.nullGroup as rune}
		<div class="px-1">
			<div
				class="flex items-center justify-center rounded w-full py-0.5 mt-0.5 bg-near-white h-min"
			>
				<img src="/images/recalrune/icon_rune_essential_fixed.webp" alt="base_fixed" width="16" />
			</div>
		</div>
		<TextParser line={rune.description[language] || rune.description['zh']} />
	{/each}
	{#each Object.entries($contracts.base.exclusiveGroups) as [_, runes]}
		{#each runes as rune}
			{#if rune.selected}
				<div class="px-1">
					<div
						class="flex items-center justify-center rounded w-full py-0.5 mt-0.5 bg-near-white h-min"
					>
						<img
							src="/images/recalrune/icon_rune_essential_exclusive.webp"
							alt="base_fixed"
							width="16"
						/>
					</div>
				</div>
				<TextParser line={rune.description[language] || rune.description['zh']} />
			{/if}
		{/each}
	{/each}
</div>
<div class="flex items-center justify-center bg-[#82000e] mt-5">
	<img src="/images/recalrune/icon_rune_head_rewarding.webp" alt="rewarding_icon" />
	<h6>{translations[language]['recal.non_essential']}</h6>
</div>
<div class="grid grid-cols-[50px_1fr] gap-y-5 pt-3 pb-4">
	{#each $contracts.others.nullGroup as rune}
		{#if rune.selected}
			<div class="px-1">
				<div
					class="flex items-center justify-center gap-x-0.5 rounded w-full py-0.5 mt-0.5 bg-near-white h-min"
				>
					<img src="/images/recalrune/icon_rune_rewarding.webp" alt="base_fixed" width="16" />
					<span class="text-[#333] font-semibold">{rune.score}</span>
				</div>
			</div>
			<TextParser line={rune.description[language] || rune.description['zh']} />
		{/if}
	{/each}
	{#each Object.entries($contracts.others.exclusiveGroups) as [_, runes]}
		{#each runes as rune}
			{#if rune.selected}
				<div class="px-1">
					<div
						class="flex items-center justify-center gap-x-0.5 rounded w-full py-0.5 mt-0.5 bg-near-white h-min"
					>
						<img src="/images/recalrune/icon_rune_rewarding.webp" alt="base_fixed" width="16" />
						<span class="text-[#333] font-semibold">{rune.score}</span>
					</div>
				</div>
				<TextParser line={rune.description[language] || rune.description['zh']} />
			{/if}
		{/each}
	{/each}
</div>
