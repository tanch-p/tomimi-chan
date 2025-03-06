class Node {
	distance;
	nextNode;
	inQueue;
	constructor() {
		this.distance = Infinity;
		this.nextNode = null; // Will store [x, y]
		this.inQueue = false;
	}
}

class PathGrid {
	nodes;
	width: number;
	height: number;
	grid: number[][];
	constructor(mazeLayout: number[][]) {
		this.width = mazeLayout[0].length;
		this.height = mazeLayout.length;
		this.grid = mazeLayout;

		// Initialize nodes map
		this.nodes = new Map();

		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				this.nodes.set(`${x},${y}`, new Node());
			}
		}
	}

	isValid(x: number, y: number): boolean {
		if (x < 0 || y < 0 || x >= this.width || y >= this.height) return false;
		if (this.grid[y][x] === Number.POSITIVE_INFINITY) return false;
		return true;
	}

	getNode(x, y) {
		return this.nodes.get(`${x},${y}`);
	}

	setNode(x, y, node) {
		this.nodes.set(`${x},${y}`, node);
	}
}

export class PathCache {
	private cache = new Map<string, PathGrid>();

	getCacheKey(targetX: number, targetY: number): string {
		return `${targetX},${targetY}`;
	}

	get(targetX: number, targetY: number): PathGrid | undefined {
		const key = this.getCacheKey(targetX, targetY);
		return this.cache.get(key);
	}

	set(targetX: number, targetY: number, grid: PathGrid): void {
		const key = this.getCacheKey(targetX, targetY);
		this.cache.set(key, this.cloneGrid(grid));
	}

	clear(): void {
		this.cache.clear();
	}

	cloneGrid(grid: PathGrid): PathGrid {
		// Create new grid with same layout
		const newGrid = new PathGrid(grid.grid);

		// Clone all nodes and their properties
		for (let y = 0; y < grid.height; y++) {
			for (let x = 0; x < grid.width; x++) {
				const originalNode = grid.getNode(x, y);
				const newNode = newGrid.getNode(x, y);
				newNode.distance = originalNode.distance;
				newNode.nextNode = originalNode.nextNode ? [...originalNode.nextNode] : null;
				newNode.inQueue = originalNode.inQueue;
			}
		}

		return newGrid;
	}
}

export class SPFA {
	grid: PathGrid;
	directions = [
		[0, 1], // up
		[1, 0], // right
		[0, -1], // down
		[-1, 0] // left
	];
	constructor(mazeLayout: number[][]) {
		this.grid = new PathGrid(mazeLayout);
	}
	debug = false;
	pathCache = new PathCache();

	findPath(start, end, allowDiagonal = true) {
		const targetX = end.col;
		const targetY = end.row;
		this.debug = targetX === 3 && targetY === 4;
		// Try to get cached path grid
		const cachedGrid = this.pathCache.get(targetX, targetY);
		if (cachedGrid) {
			// Clone the cached grid to avoid modifications affecting the cache
			this.grid = this.pathCache.cloneGrid(cachedGrid);
			return this.buildPath(start.col, start.row);
		}

		// If no cache exists, calculate new path
		// Reset all nodes
		for (let y = 0; y < this.grid.height; y++) {
			for (let x = 0; x < this.grid.width; x++) {
				const node = this.grid.getNode(x, y);
				node.distance = Infinity;
				node.nextNode = null;
				node.inQueue = false;
			}
		}

		// Initialize target node
		const targetNode = this.grid.getNode(targetX, targetY);
		targetNode.distance = 0;
		targetNode.inQueue = true;

		const queue = [[targetX, targetY]];

		// SPFA algorithm implementation
		while (queue.length > 0) {
			const [currentX, currentY] = queue.shift();
			const currentNode = this.grid.getNode(currentX, currentY);
			currentNode.inQueue = false;

			for (const [dx, dy] of this.directions) {
				const nextX = currentX + dx;
				const nextY = currentY + dy;

				if (!this.grid.isValid(nextX, nextY)) continue;

				let penalty = 1;
				const tileValue = this.grid.grid[nextY][nextX];
				if (tileValue === Infinity) continue;
				else if (tileValue > 0) {
					penalty = tileValue;
				}

				const newDist = currentNode.distance + penalty;
				const neighborNode = this.grid.getNode(nextX, nextY);

				if (newDist < neighborNode.distance) {
					neighborNode.distance = newDist;
					neighborNode.nextNode = [currentX, currentY];

					if (!neighborNode.inQueue) {
						queue.push([nextX, nextY]);
						neighborNode.inQueue = true;
					}
				}
			}
		}

		if (allowDiagonal) {
			this.smoothPaths();
		}

		// Cache the calculated path grid
		this.pathCache.set(targetX, targetY, this.grid);

		return this.buildPath(start.col, start.row);
	}

	// Method to invalidate cache (useful when map changes)
	static invalidateCache(): void {
		this.pathCache.clear();
	}

	canMoveDiagonally(x1, y1, x2, y2) {
		const dx = Math.abs(x2 - x1);
		const dy = Math.abs(y2 - y1);
		const sx = x1 < x2 ? 1 : -1;
		const sy = y1 < y2 ? 1 : -1;

		// Case 1: Row or column difference is 1
		if (dx === 1 || dy === 1) {
			const minX = Math.min(x1, x2);
			const maxX = Math.max(x1, x2);
			const minY = Math.min(y1, y2);
			const maxY = Math.max(y1, y2);

			// Check entire 2×X rectangle
			for (let y = minY; y <= maxY; y++) {
				for (let x = minX; x <= maxX; x++) {
					if (this.grid.grid[y][x] > 0) {
						return false;
					}
				}
			}
			return true;
		}

		// Modified Bresenham with diagonal checks
		let x = x1;
		let y = y1;
		let err = dx - dy;

		// Determine shorter axis for diagonal checks
		const shorterAxis = dx < dy ? 'x' : 'y';

		while (true) {
			if (!this.grid.isValid(x, y)) {
				return false;
			}

			if (x === x2 && y === y2) break;

			const e2 = 2 * err;
			let shorterAxisChanged = false;

			// Track when shorter axis will change
			if (shorterAxis === 'x' && e2 > -dy) {
				shorterAxisChanged = true;
			} else if (shorterAxis === 'y' && e2 < dx) {
				shorterAxisChanged = true;
			}

			// Standard Bresenham steps
			if (e2 > -dy) {
				err -= dy;
				x += sx;
			}
			if (e2 < dx) {
				err += dx;
				y += sy;
			}

			// Check additional diagonal tiles when shorter axis changes
			if (shorterAxisChanged) {
				if (shorterAxis === 'x') {
					// When x is shorter axis
					if (!this.grid.isValid(x, y - sy) || !this.grid.isValid(x - sx, y)) {
						return false;
					}
				} else {
					// When y is shorter axis
					if (!this.grid.isValid(x - sx, y) || !this.grid.isValid(x, y - sy)) {
						return false;
					}
				}
			}
		}
		return true;
	}

	smoothPaths() {
		const smoothedPaths = Object.assign(Object.create(Object.getPrototypeOf(this.grid)), this.grid);
		smoothedPaths.nodes = structuredClone(this.grid.nodes);
		for (let y = 0; y < this.grid.height; y++) {
			for (let x = 0; x < this.grid.width; x++) {
				const currentNode = this.grid.getNode(x, y);
				const smCurrNode = smoothedPaths.getNode(x, y);
				if (!currentNode.nextNode) continue;

				const [nextX, nextY] = currentNode.nextNode;
				let nextNode = this.grid.getNode(nextX, nextY);
				while (nextNode.nextNode) {
					const [targetX, targetY] = nextNode.nextNode;
					// Try to create diagonal shortcut
					if (this.canMoveDiagonally(x, y, targetX, targetY)) {
						// Important: Keep original distance - don't update it!
						smCurrNode.nextNode = [targetX, targetY];
						nextNode = this.grid.getNode(targetX, targetY);
					} else {
						break;
					}
				}
			}
		}
		this.grid = smoothedPaths;
	}
	buildPath(startX, startY) {
		const path = [];
		let currentX = startX;
		let currentY = startY;

		while (true) {
			path.push([currentX, currentY]);
			const currentNode = this.grid.getNode(currentX, currentY);

			if (!currentNode.nextNode) break;

			const [nextX, nextY] = currentNode.nextNode;

			// Check if movement is purely horizontal or vertical
			const isHorizontal = currentY === nextY;
			const isVertical = currentX === nextX;

			if (isHorizontal || isVertical) {
				// Get all intermediate nodes
				const minX = Math.min(currentX, nextX);
				const maxX = Math.max(currentX, nextX);
				const minY = Math.min(currentY, nextY);
				const maxY = Math.max(currentY, nextY);

				let foundDifferentNext = false;
				let intermediateX = currentX;
				let intermediateY = currentY;

				// Check each intermediate node
				for (let x = minX; x <= maxX; x++) {
					for (let y = minY; y <= maxY; y++) {
						// Skip current and target nodes
						if (x === currentX && y === currentY) continue;
						if (x === nextX && y === nextY) continue;

						const intermediateNode = this.grid.getNode(x, y);
						if (!intermediateNode.nextNode) continue;

						const [intermediateNextX, intermediateNextY] = intermediateNode.nextNode;
						// If intermediate node points to a different next node
						if (intermediateNextX !== nextX || intermediateNextY !== nextY) {
							foundDifferentNext = true;
							intermediateX = x;
							intermediateY = y;
							break;
						}
					}
					if (foundDifferentNext) break;
				}

				if (foundDifferentNext) {
					// Route through the intermediate node
					currentX = intermediateX;
					currentY = intermediateY;
					continue;
				}
			}

			currentX = nextX;
			currentY = nextY;
		}

		return path;
	}
}
