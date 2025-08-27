import { describe, it, expect } from 'vitest';
import { generateWaveTimeline } from '$lib/functions/waveHelpers';
import ro3_b6 from '../lib/data/stages/ro_stage_data/level_rogue3_b-6.json' assert { type: 'json' };

const expectedResults = {
	rogue3_b6: {
		timeline: [
			{
				preDelay: 0,
				postDelay: 0,
				maxTimeWaitingForNextWave: -1,
				timeline: [
					{
						t: 0,
						actions: [
							{
								key: 'enemy_2056_smedzi'
							}
						]
					},
					{
						t: 13,
						actions: [
							{
								key: 'enemy_2045_smdrn'
							},
							{
								key: 'enemy_2045_smdrn'
							}
						]
					},
					{
						t: 16,
						actions: [
							{
								key: 'enemy_2045_smdrn'
							},
							{
								key: 'enemy_2045_smdrn'
							}
						]
					},
					{
						t: 19,
						actions: [
							{
								key: 'enemy_2045_smdrn'
							},
							{
								key: 'enemy_2045_smdrn'
							}
						]
					},
					{
						t: 38,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 41,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 46,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 49,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 61,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 64,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 66,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 69,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 77,
						actions: [
							{
								key: 'enemy_2044_smwiz'
							}
						]
					},
					{
						t: 80,
						actions: [
							{
								key: 'enemy_2044_smwiz'
							}
						]
					},
					{
						t: 92,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							},
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 96,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							},
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 106,
						actions: [
							{
								key: 'enemy_2044_smwiz'
							}
						]
					},
					{
						t: 109,
						actions: [
							{
								key: 'enemy_2044_smwiz'
							}
						]
					},
					{
						t: 119,
						actions: [
							{
								key: 'enemy_2045_smdrn'
							},
							{
								key: 'enemy_2045_smdrn'
							}
						]
					},
					{
						t: 122,
						actions: [
							{
								key: 'enemy_2045_smdrn'
							},
							{
								key: 'enemy_2045_smdrn'
							}
						]
					},
					{
						t: 125,
						actions: [
							{
								key: 'enemy_2045_smdrn'
							},
							{
								key: 'enemy_2045_smdrn'
							}
						]
					},
					{
						t: 144,
						actions: [
							{
								key: 'enemy_1329_cbshld_2'
							}
						]
					},
					{
						t: 148,
						actions: [
							{
								key: 'enemy_1113_empace_2'
							}
						]
					},
					{
						t: 149,
						actions: [
							{
								key: 'enemy_1329_cbshld_2'
							}
						]
					},
					{
						t: 154,
						actions: [
							{
								key: 'enemy_1329_cbshld_2'
							}
						]
					},
					{
						t: 155,
						actions: [
							{
								key: 'enemy_1113_empace_2'
							}
						]
					},
					{
						t: 175,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 177,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 179,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 181,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 185,
						actions: [
							{
								key: 'enemy_2044_smwiz'
							}
						]
					},
					{
						t: 188,
						actions: [
							{
								key: 'enemy_2044_smwiz'
							}
						]
					},
					{
						t: 200,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 202,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 204,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 206,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 210,
						actions: [
							{
								key: 'enemy_2044_smwiz'
							}
						]
					},
					{
						t: 213,
						actions: [
							{
								key: 'enemy_2044_smwiz'
							}
						]
					},
					{
						t: 236,
						actions: [
							{
								key: 'enemy_1329_cbshld_2'
							}
						]
					},
					{
						t: 240,
						actions: [
							{
								key: 'enemy_1113_empace_2'
							}
						]
					},
					{
						t: 241,
						actions: [
							{
								key: 'enemy_1329_cbshld_2'
							}
						]
					},
					{
						t: 246,
						actions: [
							{
								key: 'enemy_1329_cbshld_2'
							}
						]
					},
					{
						t: 247,
						actions: [
							{
								key: 'enemy_1113_empace_2'
							}
						]
					}
				]
			},
			{
				preDelay: 0,
				postDelay: 0,
				maxTimeWaitingForNextWave: -1,
				timeline: [
					{
						t: 0,
						actions: [
							{
								key: 'enemy_2045_smdrn'
							},
							{
								key: 'enemy_2045_smdrn'
							}
						]
					},
					{
						t: 3,
						actions: [
							{
								key: 'enemy_2045_smdrn'
							},
							{
								key: 'enemy_2045_smdrn'
							}
						]
					},
					{
						t: 6,
						actions: [
							{
								key: 'enemy_2045_smdrn'
							},
							{
								key: 'enemy_2045_smdrn'
							}
						]
					},
					{
						t: 22,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 24,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 26,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 28,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 29,
						actions: [
							{
								key: 'enemy_2044_smwiz'
							}
						]
					},
					{
						t: 31,
						actions: [
							{
								key: 'enemy_2044_smwiz'
							}
						]
					},
					{
						t: 32,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 34,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 36,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 37,
						actions: [
							{
								key: 'enemy_2044_smwiz'
							}
						]
					},
					{
						t: 38,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 39,
						actions: [
							{
								key: 'enemy_2044_smwiz'
							}
						]
					},
					{
						t: 62,
						actions: [
							{
								key: 'enemy_1329_cbshld_2'
							}
						]
					},
					{
						t: 66,
						actions: [
							{
								key: 'enemy_1113_empace_2'
							}
						]
					},
					{
						t: 67,
						actions: [
							{
								key: 'enemy_1329_cbshld_2'
							}
						]
					},
					{
						t: 72,
						actions: [
							{
								key: 'enemy_1329_cbshld_2'
							}
						]
					},
					{
						t: 73,
						actions: [
							{
								key: 'enemy_1113_empace_2'
							}
						]
					},
					{
						t: 76,
						actions: [
							{
								key: 'enemy_1113_empace_2'
							}
						]
					},
					{
						t: 77,
						actions: [
							{
								key: 'enemy_1329_cbshld_2'
							}
						]
					},
					{
						t: 94,
						actions: [
							{
								key: 'enemy_1136_redace_2'
							},
							{
								key: 'enemy_1330_cbrush_2'
							}
						]
					},
					{
						t: 99,
						actions: [
							{
								key: 'enemy_1136_redace_2'
							}
						]
					},
					{
						t: 114,
						actions: [
							{
								key: 'enemy_2045_smdrn'
							},
							{
								key: 'enemy_2045_smdrn'
							}
						]
					},
					{
						t: 117,
						actions: [
							{
								key: 'enemy_2045_smdrn'
							},
							{
								key: 'enemy_2045_smdrn'
							}
						]
					},
					{
						t: 120,
						actions: [
							{
								key: 'enemy_2045_smdrn'
							},
							{
								key: 'enemy_2045_smdrn'
							}
						]
					},
					{
						t: 136,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 138,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 140,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 142,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 143,
						actions: [
							{
								key: 'enemy_2044_smwiz'
							}
						]
					},
					{
						t: 145,
						actions: [
							{
								key: 'enemy_2044_smwiz'
							}
						]
					},
					{
						t: 146,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 148,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 150,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 151,
						actions: [
							{
								key: 'enemy_2044_smwiz'
							}
						]
					},
					{
						t: 152,
						actions: [
							{
								key: 'enemy_2043_smsbr'
							}
						]
					},
					{
						t: 153,
						actions: [
							{
								key: 'enemy_2044_smwiz'
							}
						]
					},
					{
						t: 176,
						actions: [
							{
								key: 'enemy_1329_cbshld_2'
							}
						]
					},
					{
						t: 180,
						actions: [
							{
								key: 'enemy_1113_empace_2'
							}
						]
					},
					{
						t: 181,
						actions: [
							{
								key: 'enemy_1329_cbshld_2'
							}
						]
					},
					{
						t: 186,
						actions: [
							{
								key: 'enemy_1329_cbshld_2'
							}
						]
					},
					{
						t: 187,
						actions: [
							{
								key: 'enemy_1113_empace_2'
							}
						]
					},
					{
						t: 190,
						actions: [
							{
								key: 'enemy_1113_empace_2'
							}
						]
					},
					{
						t: 205,
						actions: [
							{
								key: 'enemy_1136_redace_2'
							},
							{
								key: 'enemy_1330_cbrush_2'
							}
						]
					},
					{
						t: 210,
						actions: [
							{
								key: 'enemy_1136_redace_2'
							}
						]
					}
				]
			}
		],
		count: 106
	}
};

describe('test wave timeline generation', () => {
	it('rogue3_b-6', () => {
		const { waves, count } = generateWaveTimeline(ro3_b6, [], 'random', false, [], null);
		expect(count).toBe(expectedResults.rogue3_b6.count);
		expect(waves).toEqual(expectedResults.rogue3_b6.timeline);
	});
});
