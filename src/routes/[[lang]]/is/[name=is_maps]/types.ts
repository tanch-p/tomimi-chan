//https://stackoverflow.com/questions/65878880/typescript-template-literal-as-interface-key

type Stats = {
	hp: number;
	atk: number;
	def: number;
	res: number;
	aspd: number;
	range: number;
	weight: number;
	lifepoint: number;
	ms: number;
	special: string[];
};
type StatusImmune = 'stun' | 'silence' | 'freeze' | 'sleep' | 'levitate';
type AttackType = 'no_attack' | 'melee' | 'ranged';
type AttackAttribute = 'phys' | 'arts' | 'true' | 'heal';
type EnemyType =
	| 'NORMAL'
	| 'ELITE'
	| 'BOSS'
	| 'melee'
	| 'ranged'
	| 'no_attack'
	| 'infection'
	| 'drone'
	| 'flying'
	| 'seamonster'
	| 'sarkaz'
	| 'originiumartscraft'
	| 'animated'
	| 'mutant'
	| 'machine'
	| 'wildanimal';

export interface Enemy {
	id: string;
	[key: `name_${string}`]: string;
	format: string;
	stats: Stats[];
	status_immune: StatusImmune[];
	normal_attack: {
		atk_type: [AttackType, AttackAttribute];
		hits: number;
	};
	type: EnemyType[];
}

type overwrittenData = {
	[key: string]: number;
};

type mapConfigEnemy = {
	id: string;
	level: number;
	overwrittenData: overwrittenData;
};

export interface ISMapConfig {
	id: string;
	levelId: string;
	tags: string[];
	initialCost: number;
	costIncreaseTime: number;
	code: string;
	[key: `name_${string}`]: string;
	[key: `description_${string}`]: string;
	[key: `eliteDesc_${string}`]: string;
	enemies: mapConfigEnemy[];
}

export type StatMods = {
	[key: string]: Mods;
};

export type Mods = {
	[key: string]: number;
};
