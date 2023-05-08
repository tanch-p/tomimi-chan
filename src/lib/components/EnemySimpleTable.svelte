<script lang="ts">
	import type { Enemy } from '$lib/types';
	import EnemySimpleRow from './EnemySimpleRow.svelte';
	import translations from '$lib/translations.json';
	export let enemies: Enemy[], language: string, statMods, specialMods;
	let tableHeaders = [
		{ key: 'enemy', show: true },
		{ key: 'count', show: false },
		{ key: 'type', show: true },
		{ key: 'hp', show: true },
		{ key: 'atk', show: true },
		{ key: 'aspd', show: true },
		{ key: 'range', show: true },
		{ key: 'def', show: true },
		{ key: 'res', show: true },
		{ key: 'weight', show: true },
		{ key: 'ms', show: true },
		{ key: 'lifepoint', show: true },
		{ key: 'remarks', show: true }
	];
	$: filteredTableHeaders = tableHeaders.filter(({ key, show }) => show);
</script>

<div class="">
	<div>
		<!-- <div>Filter</div> -->

		<div class="">
			<div id="table-wrapper" class="overflow-x-auto md:overflow-visible w-screen sm:w-full">
				<table
					class="border border-gray-400 border-collapse bg-neutral-800 text-near-white w-max sm:w-full"
				>
					<thead>
						<tr>
							{#each filteredTableHeaders as { key }}
								<th
									class={`border border-gray-400 border-solid py-0.5 px-1.5 md:min-w-[50px] ${
										language === 'en' ? 'sm:leading-none' : ''
									}`}
								>
									<span>{translations[language].table_headers[key]}</span>
								</th>
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each enemies as enemy, index (enemy.key)}
							<EnemySimpleRow
								{enemy}
								{filteredTableHeaders}
								{index}
								{language}
								{statMods}
								{specialMods}
							/>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
