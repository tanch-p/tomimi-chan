import * as THREE from 'three';
import { expect, test, vi } from 'vitest';
import { GameMap } from '$lib/components/StageSimulator/objects/GameMap';
import stage from '$lib/data/stages/ro_stage_data/ro6/level_rogue6_5-8.json';
import { compileSpecialMods } from '$lib/functions/statHelpers';
import { TileManager } from '$lib/components/StageSimulator/objects/TileManager';
import { AssetManager } from '$lib/components/StageSimulator/objects/AssetManager';

vi.mock('$lib/components/StageSimulator/objects/StickBox', () => ({
	StickBox: class {
		getMesh() {
			return new THREE.Group();
		}
	}
}));

test('system forbidden locations render both tile heights using bottom-origin row,column', () => {
	const mapData = {
		map: [
			[0, 1, 0],
			[0, 0, 0],
			[0, 0, 0]
		],
		tiles: [
			['tile_road', 0, 3, {}, 1],
			['tile_wall', 1, 3, {}, 1]
		]
	};
	const getTile = vi.fn((_tile: unknown[], _isForbidden = false) => new THREE.Group());
	const gameMap = Object.create(GameMap.prototype);
	Object.assign(gameMap, {
		config: {},
		scene: new THREE.Scene(),
		gameManager: {
			runtime: {
				eliteMode: false,
				specialMods: {
					system: [
						{ key: 'global_forbid_location', value: ['0,2'] },
						{ key: 'global_forbid_location', value: ['2,1'] },
						{ key: 'other_mod', value: ['1,0'] }
					]
				}
			},
			tileManager: { get: getTile },
			getVectorCoordinates: () => ({ x: 0, y: 0 }),
			tiles: new Map()
		}
	});

	gameMap.setup(mapData);
	const renderedNames = getTile.mock.calls.map(([tile]) => tile[0]);
	expect(renderedNames).toEqual([
		'tile_road',
		'tile_wall',
		'tile_road',
		'tile_road',
		'tile_road',
		'tile_road',
		'tile_road',
		'tile_road',
		'tile_road'
	]);
	expect(getTile.mock.calls.map(([, isForbidden]) => isForbidden)).toEqual([
		false,
		true,
		false,
		false,
		false,
		false,
		false,
		false,
		true
	]);
	expect(mapData.tiles[0][0]).toBe('tile_road');
	expect(mapData.tiles[1][0]).toBe('tile_wall');
});

test.each([0, 1])(
	'forbidden tiles preserve their texture over a floor layer at height %i',
	(height) => {
		const floorTexture = new THREE.Texture();
		const originalTexture = new THREE.Texture();
		const textures = vi
			.spyOn(AssetManager.getInstance().textures, 'get')
			.mockImplementation((key) => ({
				texture: key === 'tile_floor' ? floorTexture : originalTexture
			}));
		try {
			const manager = new TileManager('level_test');
			const tile = [height ? 'tile_wall' : 'tile_road', height, 3, null, 1];
			const rendered = manager.get(tile, true);
			const planes = rendered.children.filter(
				(child): child is THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial> =>
					child instanceof THREE.Mesh && child.geometry instanceof THREE.PlaneGeometry
			);
			const floor = planes.find((plane) => plane.material.map === floorTexture)!;
			const original = planes.find((plane) => plane.material.map === originalTexture)!;
			expect(floor.position.z).toBeCloseTo(height * 20 + 0.01);
			expect(original.position.z).toBeCloseTo(height * 20 + 0.1);
			expect(floor.geometry.parameters.width).toBeGreaterThan(original.geometry.parameters.width);
			const normal = manager.get(tile);
			expect(normal.children.some((child) => (child as any).material?.map === floorTexture)).toBe(
				false
			);
		} finally {
			textures.mockRestore();
			floorTexture.dispose();
			originalTexture.dispose();
		}
	}
);

test('level_rogue6_5-8 restores its original tiles after elite mode is disabled', () => {
	const config = structuredClone(stage.data[0]);
	const originalMapData = structuredClone(config.mapData);
	const getTile = vi.fn((_tile: unknown[], _isForbidden = false) => new THREE.Group());
	const gameMap = Object.create(GameMap.prototype);
	const runtime = { eliteMode: false, specialMods: {} };
	Object.assign(gameMap, {
		config,
		scene: new THREE.Scene(),
		gameManager: {
			runtime,
			tileManager: { get: getTile },
			getVectorCoordinates: () => ({ x: 0, y: 0 }),
			tiles: new Map()
		}
	});
	const render = () => {
		getTile.mockClear();
		gameMap.setup(config.mapData);
		return getTile.mock.calls.map(([tile, isForbidden]) => ({ tile, isForbidden }));
	};
	const normalTiles = render();
	runtime.eliteMode = true;
	runtime.specialMods = compileSpecialMods([config.elite_mods] as any);
	const eliteTiles = render();
	for (const col of [1, 3, 5, 7]) {
		const index = 6 * config.mapData.map[0].length + col;
		expect(normalTiles[index].isForbidden).toBe(false);
		expect(eliteTiles[index].isForbidden).toBe(true);
		expect(eliteTiles[index].tile).toEqual(normalTiles[index].tile);
	}
	runtime.eliteMode = false;
	runtime.specialMods = {};
	expect(render()).toEqual(normalTiles);
	expect(config.mapData).toEqual(originalMapData);
});
