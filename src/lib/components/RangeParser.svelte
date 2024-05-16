<script lang="ts">
	import rangeTable from '$lib/data/range_table.json';
	export let rangeId;
	let grids,
		width: number,
		height: number,
		noCenter: boolean,
		minRow: number,
		maxRow: number,
		minCol: number,
		maxCol: number;
	$: grids = rangeTable?.[rangeId]?.grids;
	$: if (grids) {
		noCenter = true;
		minRow = 0;
		maxRow = 0;
		minCol = 0;
		maxCol = 0;
		for (const { row, col } of grids) {
			if (row === 0 && col === 0) noCenter = false;
			if (row > maxRow) maxRow = row;
			if (row < minRow) minRow = row;
			if (col > maxCol) maxCol = col;
			if (col < minCol) minCol = col;
		}
		width = 26 + (maxCol - minCol) * (22 + 4);
		height = 26 + (maxRow - minRow) * (22 + 4);
	}
</script>

{#if grids}
	<svg {width} {height} viewBox="0 0 {width} {height}">
		{#each grids as grid}
			{@const { row, col } = grid}
			{@const newRow = row - minRow}
			{@const newCol = col - minCol}
			{#if row === 0 && col === 0}
				<use xlink:href="#sq-blue" x={newCol * 26} y={newRow * 26} />
			{:else}
				<use xlink:href="#sq-outline" x={newCol * 26} y={newRow * 26} />
			{/if}
		{/each}
		{#if noCenter}
			<use xlink:href="#sq-blue" x={0} y={((maxRow - minRow) / 2) * 26} />
		{/if}
	</svg>
{:else}
	<p>{rangeId} not found!</p>
{/if}
