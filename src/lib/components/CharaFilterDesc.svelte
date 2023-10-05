<script lang="ts">
	import type { Language } from '$lib/types';
	export let filterOptions, language: Language;
	import TextParser from './TextParser.svelte';

	let line = '';

	filterOptions.subscribe((options) => {
		'I am looking for an {rarity} operator {from Nation} that can {skills}...';
		'我要招一个{能skills}的【来自nation】{rarity}干员';
		'{skillsができる}{nationから}の{rarity}を探してます';
	});
</script>

<div class="fixed bottom-0 text-center w-full md:w- p-4 bg-white text-subheading text-black">
	<TextParser {line} />
</div>
