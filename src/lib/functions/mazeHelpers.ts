import { GameConfig } from '$lib/components/StageSimulator/objects/GameConfig';

// tiles: [tile_type,heightType,mask,blackboard]
// 0 is path, 1 is wall
const HIGH_WEIGHT_TILES = ['tile_hole'];

export const generateMaze = (map, tiles) => {
	return map.reduce((acc, curr) => {
		const row = [];
		for (const index of curr) {
			const tileName = tiles[index][0];
			if (HIGH_WEIGHT_TILES.includes(tileName)) {
				row.push(1);
			} else {
				row.push(tiles[index][2]);
			}
		}
		acc.push(row);
		return acc;
	}, []);
};

export const convertMovementConfig = (config) => {
	const height = GameConfig.mazeLayout.length;
	const start = {
		row: height - 1 - config.startPosition.row,
		col: config.startPosition.col
	};
	const end = {
		row: height - 1 - config.endPosition.row,
		col: config.endPosition.col
	};
	const checkpoints = [...config.checkpoints];
	for (const checkpoint of checkpoints) {
		checkpoint.position.row = height - 1 - checkpoint.position.row;
	}
	return {
		...config,
		endPosition: end,
		startPosition: start,
		checkpoints: checkpoints
	};
};

export const getVectorCoordinates = (pos, reachOffset) => {
	let offSetX = 0,
		offSetY = 0;
	if (reachOffset) {
		offSetX = reachOffset.x;
		offSetY = reachOffset.y;
	}
	const { row, col } = pos;
	const x = getCoordinate(col + offSetX, 'x');
	const y = -getCoordinate(row - offSetY, 'y');
	return { x, y };
};

const getCoordinate = (coordinate, type = 'x') => {
	const center =
		type === 'x' ? GameConfig.mazeLayout[0].length / 2 : GameConfig.mazeLayout.length / 2;
	if (coordinate === center) {
		if (center % 2 === 0) {
			return GameConfig.gridSize / 2;
		} else {
			return 0;
		}
	}
	return (coordinate - center) * GameConfig.gridSize + GameConfig.gridSize / 2;
};
