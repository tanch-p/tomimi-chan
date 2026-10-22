import { expect, test, vi } from 'vitest';
import { getSimulatedData } from '$lib/components/StageSimulator/functions/Simulator';
import { AssetManager } from '$lib/components/StageSimulator/objects/AssetManager';
import { GameManager } from '$lib/components/StageSimulator/objects/GameManager';
import { Trap } from '$lib/components/StageSimulator/objects/Trap';
import type { MapConfig, Wave } from '$lib/types';

test('offline snapshots preserve trap SP for seeking and continued playback', async () => {
	const keys = ['trap_349_shadvt2', 'trap_345_shadvt'];
	const config = {
		levelId: 'level_test',
		mapData: { map: [[0, 0]], tiles: [['tile_floor', 0, 3, [], 1]] },
		traps: keys.map((key, col) => ({
			key,
			alias: `${key}#1`,
			direction: 'UP',
			pos: { row: 0, col },
			skillIndex: 0,
			mainSkillLvl: 1
		}))
	} as unknown as MapConfig;
	const waves = [
		{ preDelay: 245, postDelay: 0, maxTimeWaitingForNextWave: -1, fragments: [] }
	] as Wave[];
	const assets = AssetManager.getInstance();
	const previousTexturesLoaded = assets.texturesLoaded;
	assets.texturesLoaded = true;
	try {
		const result = await getSimulatedData(config, waves, [], {
			mode: 'wave_normal',
			currentWaveIndex: 0,
			stagePhaseIndex: 0,
			eliteMode: false,
			specialMods: {},
			yieldBudgetMs: Infinity
		});
		expect(result).toBeDefined();
		const snapshots = result!.t;
		for (const time of [0, 120, 240, 245]) {
			expect(snapshots[time].trapSp).toHaveLength(2);
			for (const trap of snapshots[time].trapSp) {
				expect(trap.currSp).toBeCloseTo(Math.min(time, 240));
			}
		}

		const traps = config.traps.map((data) => {
			const trap = new Trap(data, data.pos, true, null);
			trap.isSimulation = false;
			trap.type = 'texture';
			trap.initSpBar(data);
			return trap;
		});
		const manager = Object.create(GameManager.prototype) as GameManager;
		Object.assign(manager, {
			traps: new Map(traps.map((trap) => [`${trap.position.col},${trap.position.row}`, trap])),
			enemiesOnMap: [],
			countdownManager: { removeAllCountdowns: vi.fn() }
		});
		for (const time of [240, 120, 0]) {
			manager.set(snapshots[time]);
			for (const trap of traps) {
				expect(trap.currSp).toBeCloseTo(time);
				expect(trap.spBar!.material.uniforms.progress.value).toBeCloseTo(time / 240);
			}
		}
		manager.set(snapshots[120]);
		for (const trap of traps) {
			trap.update(1);
			expect(trap.currSp).toBeCloseTo(121);
		}
	} finally {
		assets.texturesLoaded = previousTexturesLoaded;
	}
});
