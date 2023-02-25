<script lang="ts">
	import type { Enemy } from './types';
	import { getAtkEleHighlight, getAtkType } from '$lib/functions/parseAtkType';
	import translations from '$lib/translations.json';
	export let enemy: Enemy, row: number, language: string;
	const { atk_type, hits } = getAtkType(enemy, row);
	$: separator = language === 'en' ? '/' : '・';
	const hasAtkElement = atk_type[0] !== 'raw' && atk_type[0] !== 'no_attack';
</script>

{#if atk_type[0] !== 'raw'}
	{#if hits > 1}
		{`x ${hits}`}
	{/if}
	{'('}{translations[language][atk_type[0]]}{#if hasAtkElement}{separator}<span
			class={getAtkEleHighlight(atk_type[1])}>{translations[language][atk_type[1]]}</span
		>{/if}{')'}
{/if}
