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
		return this.buildPath(startX, startY);
	}
	canMoveDiagonally(x1, y1, x2, y2) {
        const dx = Math.abs(x2 - x1);
        const dy = Math.abs(y2 - y1);
        const sx = x1 < x2 ? 1 : -1;
        const sy = y1 < y2 ? 1 : -1;

        // Case 1: If row or column difference is 1, check entire rectangle
        if (dx === 1 || dy === 1) {
            const minX = Math.min(x1, x2);
            const maxX = Math.max(x1, x2);
            const minY = Math.min(y1, y2);
            const maxY = Math.max(y1, y2);

            // Check all tiles in the 2×X rectangle
            for (let y = minY; y <= maxY; y++) {
                for (let x = minX; x <= maxX; x++) {
                    if (!this.grid.isValid(x, y)) {
                        return false;
                    }
                }
            }
            return true;
        }

        // Bresenham's algorithm with additional diagonal checks
        let x = x1;
        let y = y1;
        let err = dx - dy;

        // Track which axis is shorter for diagonal checks
        const shorterAxis = dx < dy ? 'x' : 'y';

        while (true) {
            if (!this.grid.isValid(x, y)) {
                return false;
            }

            if (x === x2 && y === y2) break;

            const e2 = 2 * err;
            let shorterAxisChanged = false;

            // Check if shorter axis will change
            if (shorterAxis === 'x' && e2 > -dy) {
                shorterAxisChanged = true;
            } else if (shorterAxis === 'y' && e2 < dx) {
                shorterAxisChanged = true;
            }

            // Standard Bresenham step
            if (e2 > -dy) {
                err -= dy;
                x += sx;
            }
            if (e2 < dx) {
                err += dx;
                y += sy;
            }

            // Case 2: Check two additional diagonal tiles when shorter axis changes
            if (shorterAxisChanged) {
                if (shorterAxis === 'x') {
                    // When x (shorter) changes, check diagonals
                    if (!this.grid.isValid(x, y - sy) || 
                        !this.grid.isValid(x - sx, y)) {
                        return false;
                    }
                } else {
                    // When y (shorter) changes, check diagonals
                    if (!this.grid.isValid(x - sx, y) || 
                        !this.grid.isValid(x, y - sy)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

	smoothPaths() {
        for (let y = 0; y < this.grid.height; y++) {
            for (let x = 0; x < this.grid.width; x++) {
                const currentNode = this.grid.getNode(x, y);
                if (!currentNode.nextNode) continue;

                let [nextX, nextY] = currentNode.nextNode;
                let nextNode = this.grid.getNode(nextX, nextY);
				this.debug = x === 7 && y === 2;
                while (nextNode.nextNode) {
                    const [targetX, targetY] = nextNode.nextNode;
					this.debug && console.log(nextNode.distance)
                    if (this.canMoveDiagonally(x, y, targetX, targetY)) {
                        // Keep the original distance to maintain path cost
                        const originalDist = currentNode.distance;
                        currentNode.nextNode = [targetX, targetY];
                        currentNode.distance = originalDist;
                        nextNode = this.grid.getNode(targetX, targetY);
                    } else {
                        break;
                    }
                }
            }
        }
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
		console.log(path);
		return path;
	}
}
