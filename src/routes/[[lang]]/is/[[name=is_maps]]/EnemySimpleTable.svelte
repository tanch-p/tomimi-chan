<script lang="ts">
	export let enemies;

	let tableHeaders = [
		{ key: 'enemy', show: true },
		{ key: 'type', show: true },
		{ key: 'hp', show: true },
		{ key: 'atk', show: true },
		{ key: 'aspd', show: true },
		{ key: 'range', show: true },
		{ key: 'def', show: true },
		{ key: 'res', show: true },
		{ key: 'weight', show: true },
		{ key: 'ms', show: false },
		{ key: 'lifepoint', show: true },
		{ key: 'remarks', show: true }
	];
	$: filteredTableHeaders = tableHeaders.filter(({ key, show }) => show);
</script>

<div class="">
	<div>
		<!-- <div>Filter</div> -->

		<div class="">
			<div id="table-wrapper" class="overflow-x-auto md:overflow-visible w-screen md:w-full">
				<table class="border border-gray-400 border-collapse  w-max md:w-full">
					<thead>
						<tr>
							{#each filteredTableHeaders as { key }}
								<th class="border border-gray-400 border-solid py-0.5 px-1.5 md:min-w-[50px]">
									<span>{key}</span>
								</th>
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each enemies as enemy, index}
							<tr class={`${index % 2 === 1 ? ' bg-[#333333]' : ''}`}>
								{#each filteredTableHeaders as { key }}
									{#if key === 'enemy'}
										<td>IMG</td>
									{:else if key === 'type'}
										<td>Type</td>
									{:else if key === 'remarks'}
										<td>Special</td>
									{:else}
										<td>
											{enemy.stats[key]}
										</td>
									{/if}
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
