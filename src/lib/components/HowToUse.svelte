<script lang="ts">
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';

	export let language: Language, rogueTopic: string;
</script>

<div class="px-2">
	<p>
		{translations[language].how_to_use_main}
	</p>
	<ul class="mt-2">
		{translations[language].how_to_use_ui_list}

		<li class="list-disc list-inside">{translations[language].how_to_use_relic}</li>
		<li class="list-disc list-inside">{translations[language].how_to_use_elite_toggle}</li>
		{#if rogueTopic !== 'rogue_phantom'}
			<li class="list-disc list-inside">{translations[language].how_to_use_diff}</li>
			<li class="list-disc list-inside">{translations[language].how_to_use_floor}</li>
		{/if}
		{#if rogueTopic === 'rogue_mizuki'}
			<li class="list-disc list-inside">{translations[language].how_to_use_seaborn}</li>
			<li class="list-disc list-inside">{translations[language].how_to_use_mission}</li>
		{:else if rogueTopic === 'rogue_sami'}
			<li class="list-disc list-inside">{translations[language].how_to_use_chaos}</li>
		{:else if rogueTopic === 'rogue_phantom'}
			<li class="list-disc list-inside">{translations[language].how_to_use_hallu}</li>
		{:else if rogueTopic === 'rogue_skz'}
			<li class="list-disc list-inside">{translations[language].how_to_use_sarkaz}</li>
		{/if}
	</ul>
</div>
