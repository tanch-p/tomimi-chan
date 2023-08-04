<script lang="ts">
	import type { Enemy, Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import { convertToOrdinal } from '$lib/functions/lib';

	export let enemy: Enemy, row: number, language: Language;

	$: formTitle = getFormTitle(enemy?.forms?.[row]?.title, language);

	function getFormTitle(title: string | undefined | null, language: Language) {
		if (!title) {
			return null;
		}
		if (title.includes('form')) {
			const splitString = title.split('.');
			const formTitle = splitString?.[1];
			if (formTitle) {
				return translations[language][formTitle];
			}
			if (language === 'en') {
				return (
					translations[language].multiform_prefix +
					convertToOrdinal(row + 1) +
					' ' +
					translations[language].multiform_suffix
				);
			}
			return (
				translations[language].multiform_prefix +
				(row + 1) +
				translations[language].multiform_suffix
			);
		}

		return translations[language][title];
	}
</script>

{#if formTitle}
	<div class="text-red-400">{formTitle}</div>
{/if}
