<script lang="ts">
	import rangeTable from '$lib/data/range_table.json';
	export let rangeId,
		size = 'normal',
		extend = 0;

	let grids,
		width: number,
		height: number,
		noCenter: boolean,
		minRow: number,
		maxRow: number,
		minCol: number,
		maxCol: number,
		sqSize = size === 'small' ? 12 : 26;
	$: grids = extendGrids(rangeTable?.[rangeId]?.grids, extend);
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
		width = sqSize + (maxCol - minCol) * sqSize;
		height = sqSize + (maxRow - minRow) * sqSize;
	}

	function extendGrids(grids, extend) {
		if (extend === 0) {
			return grids;
		}
		let newGrids = [...grids];
		const lastColOfRow = {};
		for (const { row, col } of grids) {
			if (!lastColOfRow[row]) {
				lastColOfRow[row] = col;
			} else {
				if (col > lastColOfRow[row]) lastColOfRow[row] = col;
			}
		}
		if (extend < 0) {
			const adjustedLastCols = Object.keys(lastColOfRow).reduce((acc, curr) => {
				acc[curr] = lastColOfRow[curr] + extend;
				return acc;
			}, {});
			newGrids = grids.reduce((acc, { row, col }) => {
				if (col <= adjustedLastCols[row]) {
					acc.push({ row, col });
				}
				return acc;
			}, []);
		} else {
			for (let i = 0; i < extend; i++) {
				for (const row in lastColOfRow) {
					newGrids.push({ row, col: lastColOfRow[row] + i + 1 });
				}
			}
		}
		return newGrids;
	}
</script>

{#if grids}
	<svg {width} {height} viewBox="0 0 {width} {height}">
		{#each grids as grid}
			{@const { row, col } = grid}
			{@const newRow = row - minRow}
			{@const newCol = col - minCol}
			{#if row === 0 && col === 0}
				<use
					xlink:href={size === 'small' ? '#sq-white' : '#sq-blue'}
					x={newCol * sqSize}
					y={newRow * sqSize}
				/>
			{:else}
				<use
					xlink:href={size === 'small' ? '#sq-outline-sm' : '#sq-outline'}
					x={newCol * sqSize}
					y={newRow * sqSize}
				/>
			{/if}
		{/each}
		{#if noCenter}
			<use
				xlink:href={size === 'small' ? '#sq-white' : '#sq-blue'}
				x={0}
				y={((maxRow - minRow) / 2) * sqSize}
			/>
		{/if}
	</svg>
{:else}
	<p>{rangeId} not found!</p>
{/if}
