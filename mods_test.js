import samiDifficultyList from './src/lib/data/is/sami/difficulty_mods_sami.json' assert { type: 'json' };

//mode is final unless stated

const checkIsTarget = (enemy, target) => {
	if (target.includes('&')) {
		const targets = target.split('&');
		return targets.reduce((acc, curr) => {
			acc = acc && checkIsTarget(enemy, curr);
			return acc;
		}, true);
	}
	const { id, key, type } = enemy;
	switch (target) {
		case 'ALL':
			return true;
		case 'ranged':
		case 'melee':
		case 'ELITE':
		case 'BOSS':
		case 'collapsal':
		case 'sarkaz':
			return type?.includes(target);
		case 'not_flying':
			return !type?.includes(target.replace('not_', ''));
		case 'not_trap':
			return !key.includes('trap');
		default:
			return target === id || target === key;
	}
};

function applyMods(baseValue, statKey, ...mods) {
	let initialAdd = 0,
		initialMul = 1,
		finalAdd = 0,
		finalMul = 1;
	for (const effects of mods) {
		for (const effect of effects) {
			if (effect.targets.some((target) => checkIsTarget(enemy, target))) {
				for (const mod of effect.mods) {
					const { key, value, mode } = mod;
					if (key === statKey) {
						const order = mod.order || 'final';
						switch (mode) {
							case 'mul':
								if (order === 'initial') {
									initialMul += value - 1;
								} else {
									finalMul *= value;
								}
								break;
							case 'add':
								if (order === 'initial') {
									initialAdd += value;
								} else {
									finalAdd += value;
								}
								break;
							default:
								console.warn('Unknown mod mode', mode);
						}
					}
				}
			}
		}
	}
	return ((baseValue + initialAdd) * initialMul + finalAdd) * finalMul;
}

const enemy = {
	id: 'SKA',
	key: 'enemy_2039_syskad',
	name_zh: '伊莎玛拉，腐化之心',
	name_ja: 'イシャームラ、腐蝕された心',
	name_en: "Ishar'mla, Heart of Corruption",
	stats: [
		{
			hp: 90000,
			atk: 1600,
			def: 1200,
			res: 70.0,
			aspd: 6.0,
			range: 0.0,
			weight: 6,
			lifepoint: 30,
			ms: 0.6,
			epDamageResistance: 0.0,
			epResistance: 0.0,
			traits: [
				{
					key: 'syskad_hp_50_rage_150'
				}
			],
			special: [
				[
					{
						key: 'syskad_heal'
					},
					{
						key: 'syskad_summon_tears'
					},
					{
						key: 'syskad_transform'
					}
				],
				[
					{
						key: 'multi_target',
						value: 3
					},
					{
						key: 'syskad_revert'
					}
				]
			],
			form_mods: [
				[{ key: 'range', value: 20, order: 'initial', mode: 'add' }],
				[
					{ key: 'hp', value: 0.5, order: 'initial', mode: 'mul' },
					{ key: 'atk', value: 0.625, order: 'initial', mode: 'mul' },
					{ key: 'def', value: 0.3, order: 'final', mode: 'mul' },
					{ key: 'res', value: 0.5, order: 'final', mode: 'mul' },
					{ key: 'ms', value: 0.8, order: 'initial', mode: 'mul' },
					{ key: 'atk_interval', value: 0.5, order: 'initial', mode: 'mul' },
					{ key: 'range', value: 4.0, order: 'initial', mode: 'add' }
				]
			]
		}
	],
	forms: [
		{
			title: 'form',
			normal_attack: {
				atk_type: ['ranged', 'heal'],
				hits: 1
			},
			status_immune: ['stun', 'silence', 'sleep', 'freeze', 'levitate']
		},
		{
			title: 'form',
			normal_attack: {
				atk_type: ['ranged', 'true'],
				hits: 1
			},
			status_immune: ['stun', 'silence', 'sleep', 'freeze', 'levitate']
		}
	],
	type: ['ranged', 'seamonster', 'BOSS']
};

const eliteMods = [
	{
		targets: ['ALL'],
		mods: [
			{ key: 'atk', value: 1.5, mode: 'mul' },
			{ key: 'def', value: 1.5, mode: 'mul' },
			{ key: 'hp', value: 1.5, mode: 'mul' },
			{ key: 'aspd', value: 50, mode: 'mul' }
		]
	},
	{
		targets: ['BOSS'],
		mods: [
			{ key: 'atk', value: 1.5, mode: 'mul' },
			{ key: 'hp', value: 1.5, mode: 'mul' }
		]
	}
];

const difficulty = 15;
const diffMods = samiDifficultyList
	.map((ele) => {
		if (ele.difficulty <= difficulty && ele.effects.length > 0) {
			return ele.effects;
		}
	})
	.filter(Boolean);

const floorDifficultyMods = [
	{
		targets: ['ALL'],
		mods: [
			{ key: 'hp', value: (1 + 0.15) ** 5, mode: 'mul' },
			{ key: 'atk', value: (1 + 0.15) ** 5, mode: 'mul' }
		]
	}
];

const mods = [
	{ key: 'floor_diff', modList: [floorDifficultyMods], stackType: 'mul' },
	{ key: 'difficulty', modList: diffMods, stackType: 'add' }
];

const skillBuff = { atk: { value: 1, mode: 'mul', type: 'initial' } };

const originiumBuffMods = [{ key: 'atk', value: 1.5, order: 'initial', mode: 'mul' }];

const statKey = 'atk';
const currentFormIndex = 0;
const enemyLevel = 0;

const baseStat = applyMods(enemy.stats[enemyLevel][statKey], statKey, eliteMods);

console.log(baseStat);

for (const mod of mods) {
	const result = compileMods(enemy, mod, statKey);
	console.log(result);
}



// const actualStat = applyMods(baseStat, statKey, diffMods, originiumBuffMods);
// console.log(actualStat);
