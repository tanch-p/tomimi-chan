<script lang="ts">
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import TextParser from '../TextParser.svelte';

	export let language: Language, crisis, contracts;
</script>

<div class="w-full bg-[#1b1b1b] max-h-[60vh] md:max-h-full overflow-y-auto">
	<div class="flex items-center justify-center bg-[#82000e]">
		{crisis.fixedRuneSeriesName[language] || crisis.fixedRuneSeriesName['zh']}
	</div>
	<div class="grid grid-cols-[50px_1fr] gap-y-5 pt-3">
		{#each $contracts.base.nullGroup as rune}
			<div>icon</div>
			<TextParser line={rune.description[language] || rune.description['zh']} />
		{/each}
		{#each Object.entries($contracts.base.exclusiveGroups) as [_, runes]}
			{#each runes as rune}
				{#if rune.selected}
					<div>icon</div>
					<TextParser line={rune.description[language] || rune.description['zh']} />
				{/if}
			{/each}
		{/each}
	</div>
	<div class="flex items-center justify-center bg-[#82000e] mt-5">
		{translations[language]['recal.non_essential']}
	</div>
	<div class="grid grid-cols-[100px_1fr] gap-y-5 pt-3">
		{#each $contracts.others.nullGroup as rune}
			{#if rune.selected}
				<div>icon</div>
				<TextParser line={rune.description[language] || rune.description['zh']} />
			{/if}
		{/each}
		{#each Object.entries($contracts.others.exclusiveGroups) as [_, runes]}
			{#each runes as rune}
				{#if rune.selected}
					<div>icon</div>
					<TextParser line={rune.description[language] || rune.description['zh']} />
				{/if}
			{/each}
		{/each}
	</div>
</div>
