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
		const [currentRow, currentCol] = current.split(",").map(Number);
		const currentPos = { row: currentRow, col: currentCol };
		if (currentRow === end.row && currentCol === end.col) {
		  return this.reconstructPath(cameFrom, current);
		}
  
		openSet.delete(current);
		closedSet.add(current);
  
		// Get neighbors including intermediate points
		const neighbors = this.getNeighbors(currentRow, currentCol);
  
		for (const neighbor of neighbors) {
		  const neighborKey = `${neighbor.row},${neighbor.col}`;
  
		  if (closedSet.has(neighborKey)) continue;

		  // Special handling for high-cost but enterable tiles (1000000)
		  const isHighCostTile =
		  this.maze[neighbor.row][neighbor.col] > 0 &&
		  this.maze[neighbor.row][neighbor.col] <= 1000000;
		  // Increase cost for high-cost tiles, but still allow path if no alternatives
		  const terrainCost = isHighCostTile ? 1000 : 1;
  
		  const parent = cameFrom.get(current);
		  let parentPos = currentPos;
  
		  if (parent) {
			const [parentRow, parentCol] = parent.split(",").map(Number);
			parentPos = { row: parentRow, col: parentCol };
		  }
  
		  // Prefer straight-line movements when possible
		  const isVerticalMove = neighbor.col === currentPos.col;
		  const isHorizontalMove = neighbor.row === currentPos.row;
		  const movementPenalty = isVerticalMove || isHorizontalMove ? 0.8 : 1;
  
		  const useParentPath =
			parent && this.hasLineOfSight(parentPos, neighbor);
		  const pathParent = useParentPath ? parent : current;
		  const pathStartPos = useParentPath ? parentPos : currentPos;
  
		  const tentativeGScore =
			gScore.get(pathParent) +
			this.getEuclideanDistance(pathStartPos, neighbor) * movementPenalty * terrainCost;
  
		  if (!openSet.has(neighborKey)) {
			openSet.add(neighborKey);
		  } else if (tentativeGScore >= gScore.get(neighborKey)) {
			continue;
		  }
		  cameFrom.set(neighborKey, pathParent);
		  gScore.set(neighborKey, tentativeGScore);
		  fScore.set(
			neighborKey,
			tentativeGScore + this.heuristic(neighbor, end)
		  );
		}
	  }
  
	  return null;
	}
  
	hasLineOfSight(start, end) {
	  const points = this.getLinePoints(start, end);
	  const objSize = 0.1;
	  // Check each point along the line
	  for (let i = 0; i < points.length - 1; i++) {
		const current = points[i];
		const next = points[i + 1];
  
		// Check current point
		if (
		  this.maze[Math.round(current.row + objSize)][
			Math.round(current.col + objSize)
		  ] === Number.POSITIVE_INFINITY
		) {
		  return false;
		}
  
		// Check for diagonal wall cutting between current and next point
		const minRow = Math.min(
		  Math.round(current.row + objSize),
		  Math.round(next.row + objSize)
		);
		const maxRow = Math.max(
		  Math.round(current.row + objSize),
		  Math.round(next.row + objSize)
		);
		const minCol = Math.min(
		  Math.round(current.col + objSize),
		  Math.round(next.col + objSize)
		);
		const maxCol = Math.max(
		  Math.round(current.col + objSize),
		  Math.round(next.col + objSize)
		);
  
		// If moving diagonally, check both adjacent cells
		if (minRow !== maxRow && minCol !== maxCol) {
		  if (
			this.maze[minRow][maxCol] === Number.POSITIVE_INFINITY ||
			this.maze[maxRow][minCol] === Number.POSITIVE_INFINITY
		  ) {
			return false;
		  }
		}
	  }
  
	  // Check final point
	  const lastPoint = points[points.length - 1];
	  return (
		this.maze[Math.floor(lastPoint.row)][Math.floor(lastPoint.col)] !== Number.POSITIVE_INFINITY
	  );
	}
  
	getLinePoints(start, end) {
	  const points = [];
	  // Increase the number of points checked along the line
	  const steps =
		Math.max(Math.abs(end.row - start.row), Math.abs(end.col - start.col)) *
		4; // Increased from 2 to 4 for more precise checking
  
	  for (let i = 0; i <= steps; i++) {
		const t = i / steps;
		points.push({
		  row: start.row + (end.row - start.row) * t,
		  col: start.col + (end.col - start.col) * t,
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
		[1, 1],
	  ];
  
	  for (const [dRow, dCol] of directions) {
		const newRow = row + dRow;
		const newCol = col + dCol;
  
		if (
		  newRow < 0 ||
		  newRow >= this.rows ||
		  newCol < 0 ||
		  newCol >= this.cols
		) {
		  continue;
		}
  
		if (this.maze[newRow][newCol] === Number.POSITIVE_INFINITY) {
		  continue;
		}
  
		// Additional check for diagonal movement
		if (Math.abs(dRow) === 1 && Math.abs(dCol) === 1) {
		  // Check both adjacent cells when moving diagonally
		  if (this.maze[row][newCol] === Number.POSITIVE_INFINITY || this.maze[newRow][col] === Number.POSITIVE_INFINITY) {
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
		const [row, col] = currentKey.split(",").map(Number);
		path.unshift({ row, col });
		currentKey = cameFrom.get(currentKey);
	  }
	  const [row, col] = currentKey.split(",").map(Number);
	  path.unshift({ row, col });
	  return path;
	}
  }
  