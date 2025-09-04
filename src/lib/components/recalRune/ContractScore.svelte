<script lang="ts">
	import type { Language } from '$lib/types';
	import { clearContracts, getScore } from '$lib/functions/recalRune';
	import translations from '$lib/translations.json';

	export let language: Language, contracts;

	let score = 0;
	contracts.subscribe((v) => (score = getScore(v)));
</script>

<div class="flex items-center justify-end bg-[#2c2c2c]">
	<button
		on:click={() => contracts.update((v) => clearContracts(v))}
		class="hover:brightness-150 active:brightness-125 pt-2"
	>
		<img src="/images/recalrune/button_clear.webp" class="h-[45px]" />
	</button>
	<div class="rounded w-[3px] h-[32px] bg-[#444] ml-2 mr-4" />
	<div class="flex items-center justify-center pr-4">
		<img src="/images/recalrune/icon_selected_score.webp" class="h-[45px]" />
		<span class="ml-2 text-sm text-[#888]">{translations[language]['recal.score']}</span>
		<p class="w-[40px] text-end text-4xl">{score}</p>
	</div>
</div>
