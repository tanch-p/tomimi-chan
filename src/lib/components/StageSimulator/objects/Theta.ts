export class Theta {
	constructor(mazeLayout: [number[]]) {
		this.maze = mazeLayout;
		this.rows = mazeLayout.length;
		this.cols = mazeLayout[0].length;
	}

	findPath(start, end) {
		const openSet = new Set();
		const closedSet = new Set();
		const cameFrom = new Map();
		const gScore = new Map();
		const fScore = new Map();
		const startKey = `${start.row},${start.col}`;

		openSet.add(startKey);
		gScore.set(startKey, 0);
		fScore.set(startKey, this.heuristic(start, end));

		while (openSet.size > 0) {
			let current = null;
			let lowestFScore = Infinity;

			for (const key of openSet) {
				const score = fScore.get(key);
				if (score < lowestFScore) {
					lowestFScore = score;
					current = key;
				}
			}

			const [currentRow, currentCol] = current.split(',').map(Number);
			const currentPos = { row: currentRow, col: currentCol };

			if (currentRow === end.row && currentCol === end.col) {
				return this.reconstructPath(cameFrom, current);
			}

			openSet.delete(current);
			closedSet.add(current);

			const neighbors = this.getNeighbors(currentRow, currentCol);

			for (const neighbor of neighbors) {
				const neighborKey = `${neighbor.row},${neighbor.col}`;

				if (closedSet.has(neighborKey)) continue;

				// Special handling for high-cost but enterable tiles (1000000)
				const isHighCostTile =
					this.maze[neighbor.row][neighbor.col] > 0 &&
					this.maze[neighbor.row][neighbor.col] <= 1000000;

				const parent = cameFrom.get(current);
				let parentPos = currentPos;

				if (parent) {
					const [parentRow, parentCol] = parent.split(',').map(Number);
					parentPos = { row: parentRow, col: parentCol };
				}

				const useParentPath = parent && this.hasLineOfSight(parentPos, neighbor);
				const pathParent = useParentPath ? parent : current;
				const pathStartPos = useParentPath ? parentPos : currentPos;

				// Increase cost for high-cost tiles, but still allow path if no alternatives
				const terrainCost = isHighCostTile ? 10 : 1;

				const tentativeGScore =
					gScore.get(pathParent) + this.getEuclideanDistance(pathStartPos, neighbor) * terrainCost;

				if (!openSet.has(neighborKey)) {
					openSet.add(neighborKey);
				} else if (tentativeGScore >= gScore.get(neighborKey)) {
					continue;
				}

				cameFrom.set(neighborKey, pathParent);
				gScore.set(neighborKey, tentativeGScore);
				fScore.set(neighborKey, tentativeGScore + this.heuristic(neighbor, end));
			}
		}

		return null;
	}

	hasLineOfSight(start, end) {
		const points = this.getLinePoints(start, end);
		const objSize = 0.2;

		for (let i = 0; i < points.length - 1; i++) {
			const current = points[i];
			const next = points[i + 1];

			// Check current point
			const currentRow = Math.round(current.row + objSize);
			const currentCol = Math.round(current.col + objSize);
			const currentTile = this.maze[currentRow][currentCol];

			// If current tile is null or infinite, no line of sight
			if (currentTile === null || currentTile === Number.POSITIVE_INFINITY) {
				return false;
			}

			// Check diagonal wall scenario
			const minRow = Math.min(Math.round(current.row + objSize), Math.round(next.row + objSize));
			const maxRow = Math.max(Math.round(current.row + objSize), Math.round(next.row + objSize));
			const minCol = Math.min(Math.round(current.col + objSize), Math.round(next.col + objSize));
			const maxCol = Math.max(Math.round(current.col + objSize), Math.round(next.col + objSize));

			// Check adjacent cells for diagonal movement
			if (minRow !== maxRow && minCol !== maxCol) {
				if (
					this.maze[minRow][maxCol] === null ||
					this.maze[maxRow][minCol] === null ||
					this.maze[minRow][maxCol] === Number.POSITIVE_INFINITY ||
					this.maze[maxRow][minCol] === Number.POSITIVE_INFINITY
				) {
					return false;
				}
			}
		}

		// Check final point
		const lastPoint = points[points.length - 1];
		const lastTile = this.maze[Math.floor(lastPoint.row)][Math.floor(lastPoint.col)];

		return lastTile !== null && lastTile !== Number.POSITIVE_INFINITY;
	}

	getLinePoints(start, end) {
		const points = [];
		// Increase the number of points checked along the line
		const steps = Math.max(Math.abs(end.row - start.row), Math.abs(end.col - start.col)) * 4; // Increased from 2 to 4 for more precise checking

		for (let i = 0; i <= steps; i++) {
			const t = i / steps;
			points.push({
				row: start.row + (end.row - start.row) * t,
				col: start.col + (end.col - start.col) * t
			});
		}

		return points;
	}

	getNeighbors(row, col) {
		const neighbors = [];
		const directions = [
			[-1, -1],
			[-1, 0],
			[-1, 1],
			[0, -1],
			[0, 1],
			[1, -1],
			[1, 0],
			[1, 1]
		];

		for (const [dRow, dCol] of directions) {
			const newRow = row + dRow;
			const newCol = col + dCol;

			// Check if position is within maze bounds
			if (newRow < 0 || newRow >= this.rows || newCol < 0 || newCol >= this.cols) {
				continue;
			}

			// Skip null tiles
			const tileValue = this.maze[newRow][newCol];
			if (tileValue === null) {
				continue;
			}

			// Skip infinite cost tiles
			if (tileValue === Number.POSITIVE_INFINITY) {
				continue;
			}

			// Additional check for diagonal movement
			if (Math.abs(dRow) === 1 && Math.abs(dCol) === 1) {
				if (this.maze[row][newCol] === null || this.maze[newRow][col] === null) {
					continue;
				}
			}

			neighbors.push({ row: newRow, col: newCol });
		}

		return neighbors;
	}

	getEuclideanDistance(a, b) {
		const dRow = a.row - b.row;
		const dCol = a.col - b.col;
		return Math.sqrt(dRow * dRow + dCol * dCol);
	}
	isValidPosition(row, col) {
		return (
			row >= 0 &&
			row < this.rows &&
			col >= 0 &&
			col < this.cols &&
			this.maze[row][col] !== Number.POSITIVE_INFINITY
		);
	}

	heuristic(a, b) {
		// Modified heuristic to prefer straight-line movements
		const dRow = Math.abs(a.row - b.row);
		const dCol = Math.abs(a.col - b.col);
		const straight = Math.abs(dRow - dCol);
		const diagonal = Math.min(dRow, dCol);
		return straight + diagonal * 1.1; // Slight penalty for diagonal movement
	}

	reconstructPath(cameFrom, current) {
		const path = [];
		let currentKey = current;

		while (cameFrom.has(currentKey)) {
			const [row, col] = currentKey.split(',').map(Number);
			path.unshift({ row, col });
			currentKey = cameFrom.get(currentKey);
		}
		const [row, col] = currentKey.split(',').map(Number);
		path.unshift({ row, col });
		return path;
	}
}
