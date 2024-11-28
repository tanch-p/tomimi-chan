<script lang="ts">
	import type { Trap, Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import TrapTableRow from './TrapTableRow.svelte';
	export let traps: Trap[], language: Language, specialMods;

	const tableHeaders = [
		'icon',
		'name',
		// 'type',
		'hp',
		'atk',
		// 'aspd',
		'range_display',
		'def',
		'res',
		'blockCnt',
		'remarks'
	];
</script>

<div class="w-screen sm:w-full">
	<table class="border border-gray-400 border-collapse bg-neutral-800 text-near-white w-full">
		<thead>
			<tr>
				{#each tableHeaders as key}
					<th
						class={`border border-gray-400 border-solid py-0.5 px-1.5 ${
							language === 'en' ? 'sm:leading-none' : ''
						}`}
					>
						<div class="relative group">
							{translations[language].table_headers[key]}
						</div>
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each traps as trap, index}
				<TrapTableRow {trap} {index} {tableHeaders} {language} {specialMods}/>
			{/each}
		</tbody>
	</table>
</div>
