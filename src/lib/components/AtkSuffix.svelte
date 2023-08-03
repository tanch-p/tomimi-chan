<script lang="ts">
	import { getDmgEleHighlight } from '$lib/functions/parseAtkType';
	import translations from '$lib/translations.json';
	export let attack, language: string;
	$: atk_type = attack.atk_type;
	$: hits = attack.hits;
	$: separator = language === 'en' ? '/' : '・';
</script>

<!-- {@debug normalAttack} -->

{#if atk_type[0] !== 'raw'}
	{#if hits > 1}
		{`x ${hits}`}
	{/if}
	{#if atk_type[0] !== 'raw' && atk_type[0] !== 'no_attack'}
		{'('}{translations[language][atk_type[0]]}{separator}
		<span class={getDmgEleHighlight(atk_type[1])}>{translations[language][atk_type[1]]}</span>
		{')'}
	{/if}
{/if}
