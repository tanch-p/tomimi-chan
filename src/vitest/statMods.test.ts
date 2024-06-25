import { expect, test } from 'vitest';
// import updateMods from '$lib/functions/compileMods';

// test(`mods to add up correctly`, () => {
// 	const floor = 6;
// 	const difficulty = 15;
// 	const eliteMods = [
// 		{
// 			targets: ['ALL'],
// 			mods: {
// 				atk: 1.2,
// 				def: 1.3,
// 				hp: 1.5,
// 				ms: 1.3
// 			}
// 		}
// 	];
// 	const floorDifficultyMods = [
// 		{
// 			targets: ['ALL'],
// 			mods: {
// 				hp: (1 + 0.01 * difficulty) ** floor,
// 				atk: (1 + 0.01 * difficulty) ** floor
// 			}
// 		}
// 	];
// 	const compiledMods = updateMods([eliteMods], [floorDifficultyMods]);
// 	expect(Math.round(compiledMods.statMods.ALL.hp * 1000) / 1000).toBe(3.47);
// 	expect(Math.round(compiledMods.statMods.ALL.atk * 1000) / 1000).toBe(2.776);
// });
