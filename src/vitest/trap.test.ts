import { describe, expect, it } from 'vitest';
import { Trap } from '$lib/components/StageSimulator/objects/Trap';
import type { GameManager } from '$lib/components/StageSimulator/objects/GameManager';

const branch = {
	phases: [
		{
			preDelay: 0,
			actions: [
				{ actionType: 'SPAWN', routeIndex: 5 },
				{ actionType: 'SPAWN', routeIndex: 6 },
				{ actionType: 'SPAWN', routeIndex: 7 },
				{ actionType: 'SPAWN', routeIndex: 8 }
			]
		}
	]
};

const createTrap = (overrideSkillBlackboard: object[]) =>
	new Trap(
		{
			key: 'trap_086_larva',
			alias: 'trap_086_larva#1',
			direction: 'UP',
			overrideSkillBlackboard
		},
		{ row: 1, col: 4 },
		true,
		null,
		{ config: { branches: { route6: branch } } } as unknown as GameManager
	);

describe('Trap SP bars', () => {
	it.each(['trap_349_shadvt2', 'trap_345_shadvt'])(
		'charges the SP bar for %s and caps it at full',
		(key) => {
			const data = { key, alias: `${key}#1`, direction: 'UP', skillIndex: 0, mainSkillLvl: 1 };
			const trap = new Trap(data, { row: 1, col: 4 }, true, null);
			expect(trap.spBar).toBeNull();
			expect(trap.spCost).toBe(240);
			trap.update(120);
			expect(trap.currSp).toBeCloseTo(120);
			trap.isSimulation = false;
			trap.initSpBar(data);
			expect(trap.spBar?.material.uniforms.progress.value).toBe(0);
			expect(trap.spBar?.parent).toBe(trap.meshGroup);

			// Advance the trap without requiring a rendered Spine model.
			trap.isSimulation = false;
			trap.type = 'texture';
			trap.update(120);
			expect(trap.spBar?.material.uniforms.progress.value).toBe(0.5);
			trap.update(240);
			expect(trap.currSp).toBe(240);
			expect(trap.spBar?.material.uniforms.progress.value).toBe(1);
		}
	);

	it('does not add an SP bar to other traps', () => {
		const trap = createTrap([]);
		trap.initSpBar({});
		expect(trap.spBar).toBeNull();
	});
});

describe('Trap branch actions', () => {
	it('uses the full branch when action_index is absent', () => {
		const trap = createTrap([{ key: 'branch_id', value: 0, valueStr: 'route6' }]);

		expect(trap.actionIndex).toBeNull();
		expect(trap.branch).toBe(branch);
	});

	it('uses only the action selected by action_index', () => {
		const trap = createTrap([
			{ key: 'branch_id', value: 0, valueStr: 'route6' },
			{ key: 'action_index', value: 3, valueStr: null }
		]);

		expect(trap.actionIndex).toBe(3);
		expect(trap.branch.phases[0].actions).toEqual([{ actionType: 'SPAWN', routeIndex: 8 }]);
		expect(branch.phases[0].actions).toHaveLength(4);
	});

	it('supports action index zero', () => {
		const trap = createTrap([
			{ key: 'branch_id', value: 0, valueStr: 'route6' },
			{ key: 'action_index', value: 0, valueStr: null }
		]);

		expect(trap.branch.phases[0].actions).toEqual([{ actionType: 'SPAWN', routeIndex: 5 }]);
	});

	it('does not use the full branch when action_index is out of range', () => {
		const trap = createTrap([
			{ key: 'branch_id', value: 0, valueStr: 'route6' },
			{ key: 'action_index', value: 99, valueStr: null }
		]);

		expect(trap.branch.phases[0].actions).toEqual([]);
	});
});
