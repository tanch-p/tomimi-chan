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
	grid: [number[]];
	constructor(mazeLayout) {
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

export class SPFA {
	grid: PathGrid;
	directions = [
		[0, 1], // up
		[1, 0], // right
		[0, -1], // down
		[-1, 0] // left
	];
	constructor(mazeLayout: [number[]]) {
		this.grid = new PathGrid(mazeLayout);
	}

	findPath(start, end, allowDiagonal = true) {
		const startX = start.col;
		const startY = start.row;
		const targetX = end.col;
		const targetY = end.row;
		// Reset all nodes
		for (let y = 0; y < this.grid.height; y++) {
			for (let x = 0; x < this.grid.width; x++) {
				const node = this.grid.getNode(x, y);
				node.distance = Infinity;
				node.nextNode = null;
				node.inQueue = false;
			}
		}

		const targetNode = this.grid.getNode(targetX, targetY);
		targetNode.distance = 0;
		targetNode.inQueue = true;

		const queue = [[targetX, targetY]];

		// SPFA algorithm
		while (queue.length > 0) {
			const [currentX, currentY] = queue.shift();
			const currentNode = this.grid.getNode(currentX, currentY);
			currentNode.inQueue = false;

			// Check all 4 directions
			for (const [dx, dy] of this.directions) {
				const nextX = currentX + dx;
				const nextY = currentY + dy;

				if (!this.grid.isValid(nextX, nextY)) continue;

				const penalty = this.grid.grid[nextY][nextX];
				if (penalty === Infinity) continue;

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

		// Path smoothing for diagonal movement
		if (allowDiagonal) {
			this.smoothPaths();
		}
		console.log(this.buildPath(startX, startY));
		return this.buildPath(startX, startY);
	}

	smoothPaths() {
		for (let y = 0; y < this.grid.height; y++) {
			for (let x = 0; x < this.grid.width; x++) {
				const currentNode = this.grid.getNode(x, y);
				if (!currentNode.nextNode) continue;

				// Try to connect to nodes further away
				const [nextX, nextY] = currentNode.nextNode;
				let nextNode = this.grid.getNode(nextX, nextY);
				while (nextNode) {
					if (this.canSkipNode({ x, y }, { x: nextX, y: nextY })) {
						currentNode.nextNode = nextNode.nextNode;
					}
					nextNode = nextNode.nextNode;
				}
			}
		}
	}
	private canSkipNode(start, end): boolean {
		let { x: x0, y: y0 } = start;
		const { x: x1, y: y1 } = end;
		const dx = Math.abs(x1 - x0);
		const dy = Math.abs(y1 - y0);
		const sx = x0 < x1 ? 1 : -1;
		const sy = y0 < y1 ? 1 : -1;
		let err = dx - dy;

		while (x0 !== x1 || y0 !== y1) {
			if (!this.grid.isValid(x0, y0)) return false;
			const e2 = 2 * err;
			if (e2 > -dy) {
				err -= dy;
				x0 += sx;
			}
			if (e2 < dx) {
				err += dx;
				y0 += sy;
			}
		}

		return true;
	}

	buildPath(startX, startY) {
		const path = [];
		let currentX = startX;
		let currentY = startY;

		while (true) {
			path.push([currentX, currentY]);
			const currentNode = this.grid.getNode(currentX, currentY);

			if (!currentNode.nextNode) break;

			[currentX, currentY] = currentNode.nextNode;
		}

		return path;
	}
}
