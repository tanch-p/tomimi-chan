<script lang="ts">
	import type {Language} from "$lib/types"
	import translations from '$lib/translations.json';
	export let normalAttack, language: Language;
	$: atk_type = normalAttack.atk_type;
	$: hits = normalAttack.hits;
	$: separator = language === 'en' ? '/' : '・';
	$: hasAtkElement = atk_type[0] !== 'raw' && atk_type[0] !== 'no_attack';
</script>

<!-- {@debug normalAttack} -->

{#if atk_type[0] !== 'raw'}
	{#if hits > 1}
		{`x ${hits}`}
	{/if}
	{'('}{translations[language][atk_type[0]]}{#if hasAtkElement}{separator}<span
			class={getDmgEleHighlight(atk_type[1])}>{translations[language][atk_type[1]]}</span
		>{/if}{')'}
{/if}
