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

type EnemyFormType = {
	mods: Mods;
	special: string[];
	normal_attack: {
		atk_type: [AttackType, AttackAttribute];
		hits: number;
	};
};

export interface Enemy {
	id: string;
	key: string;
	img: string;
	[key: `name_${string}`]: string;
	format: string;
	stats: Stats[];
	special?: string[];
	forms?: EnemyFormType[];
	powerup?: EnemyFormType;
	imprisoned?: EnemyFormType;
	released?: EnemyFormType;
	status_immune: StatusImmune[];
	normal_attack?: {
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

export interface MapConfig {
	id: string;
	levelId: string;
	tags: string[];
	initialCost: number;
	costIncreaseTime: number;
	floors: number[] | null;
	routes: [] | null;
	code: string;
	[key: `name_${string}`]: string;
	[key: `description_${string}`]: string;
	[key: `eliteDesc_${string}`]: string;
	hard_mods: Mods | null;
	enemies: mapConfigEnemy[];
}

export type StatMods = {
	[key: string]: Mods;
};

export type Mods = {
	[key: string]: number;
};
