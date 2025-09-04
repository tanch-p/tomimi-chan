<script lang="ts">
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import TogglePanel from './TogglePanel.svelte';

	export let language: Language, crisis;
</script>

<TogglePanel title="Contracts" isOpen={true}>
	<div>
		<div class="grid grid-cols-[20px_1fr]">
			<div class="flex flex-col gap-y-[10px]">
				<span class="rune_type">Base</span>
			</div>
			<div class="flex flex-wrap">
				{#each Array(20) as num, i}
					<span class="w-[60px]">{i}</span>
				{/each}
			</div>
		</div>
	</div>
</TogglePanel>

<style>
	span.rune_type {
		writing-mode: vertical-rl;
		text-orientation: upright;
	}
</style>
