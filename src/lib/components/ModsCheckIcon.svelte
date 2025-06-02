<script lang="ts">
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import { relicLookup } from '$lib/data/is/relic_lookup';
	import { getFormTitle } from '$lib/functions/lib';

	export let enemy, formIndex, key, language: Language;
</script>

<div class="absolute top-[125%] left-1/2 -translate-x-1/2 w-max text-xs">
	{#if translations[language][key]}
		{translations[language][key]}
	{:else if key.includes('enemy')}
		<img
			class="select-none"
			src={`/images/enemy_icons/${key}.webp`}
			height="30px"
			width="30px"
			decoding="async"
		/>
	{:else if key.includes('relic')}
		<img
			src={relicLookup[key]}
			alt={key}
			loading="lazy"
			height="30px"
			width="30px"
			decoding="async"
		/>
	{:else if key === 'form_mods'}
		{getFormTitle(enemy.forms[formIndex].title, formIndex, language)}
	{:else}
		{key}
	{/if}
</div>
