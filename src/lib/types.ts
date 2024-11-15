//https://stackoverflow.com/questions/65878880/typescript-template-literal-as-interface-key

export type Language = 'zh' | 'ja' | 'en';
export type RogueTopic = 'rogue_phantom' | 'rogue_mizuki' | 'rogue_sami' | 'rogue_skz' | null;
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
	eleRes: number;
	eleDmgRes: number;
	dmg_reduction?: number;
};
type StatusImmune = 'stun' | 'silence' | 'freeze' | 'sleep' | 'levitate' | 'disarmCombat' | 'fear';
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
	| 'wildanimal'
	| 'collapsal';

export type EnemyFormType = {
	title: string | null;
	mods: Mods;
	special: Skill[];
	status_immune: StatusImmune[];
	normal_attack: {
		atk_type: [AttackType, AttackAttribute];
		hits: number;
	};
};

export interface Enemy {
	id: string;
	key: string;
	stageId: string;
	img: string;
	[key: `name_${string}`]: string;
	stats: Stats[];
	special?: Skill[];
	forms?: EnemyFormType[] | undefined;
	status_immune: StatusImmune[];
	normal_attack?: {
		atk_type: [AttackType, AttackAttribute];
		hits: number;
	};
	type: EnemyType[];
	overwritten?: true | false;
	ignore_diff: true | undefined;
}

export interface Trap {
	key:string;
	name: string;
	desc: string;
	stats: trapStats;
	talents: [];
	skills: [];
	status_immune: StatusImmune[];
}
export interface TrapData {
	name_zh: string;
	name_ja: string;
	name_en: string;
	desc_zh: string;
	desc_ja: string;
	desc_en: string;
	stats: trapStats[];
	special: string[];
	status_immune: StatusImmune[];
}
type trapStats = {
	hp: number;
	atk: number;
	def: number;
	res: number;
	blockCnt: number;
	aspd: number;
	rangeId: string | null;
};

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
	elite_mods: Mods | null;
	traps: mapConfigTrap[];
	enemies: mapConfigEnemy[];
}

export type mapConfigTrap = {
	key: string;
	level: number;
	mainSkillLvl: number;
};

export type StatMods = {
	initial: ModGroup[];
	final: ModGroup[];
};
type ModOperation = 'times' | 'add';

export type ModGroup = {
	key: string;
	mods: [Effects];
	operation: ModOperation;
};

export type SpecialMods = {
	[key: string]: Skill;
};

export type Mods = {
	[key: string]: number;
};

export type Effects = [{ targets: string[]; mods: Mods }];

export type Skill = {
	key: string;
	value?: number;
	initCooldown?: number;
	cooldown?: number;
	init?: number;
	spCost?: number;
	dmg_element?: 'phys' | 'arts' | 'true' | 'heal';
	suffix?: Tooltip;
	hits?: number;
	tooltip: Tooltip | null;
};

type Tooltip = {
	zh: [string];
	ja: [string];
	en: [string];
};

export type sortOrder = -1 | 0 | 1;
