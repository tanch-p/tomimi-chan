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
type EnemyDBStats = {
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
	traits: Skill[];
	special: [Skill[]];
	form_mods?: Mods[];
};
export type StatusImmune =
	| 'stun'
	| 'silence'
	| 'freeze'
	| 'sleep'
	| 'levitate'
	| 'disarmCombat'
	| 'fear';
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
	normal_attack: {
		atk_type: [AttackType, AttackAttribute];
		hits: number;
	};
	status_immune: StatusImmune[];
	stats: Stats;
	special: Skill[];
};

type EnemyDBFormType = {
	title: string | null;
	normal_attack: {
		atk_type: [AttackType, AttackAttribute];
		hits: number;
	};
	status_immune: StatusImmune[];
};

// used in all stages and stat display
export interface Enemy {
	id: string;
	key: string;
	stageId: string;
	level: number;
	img: string;
	[key: `name_${string}`]: string;
	forms: EnemyFormType[];
	traits: Skill[]; //traits = active throughout all enemy forms
	type: EnemyType[];
	overwritten?: true | false;
}

export interface EnemyDBEntry {
	id: string;
	key: string;
	[key: `name_${string}`]: string;
	stats: EnemyDBStats[];
	forms: EnemyDBFormType[];
	type: EnemyType[];
}

export interface Trap {
	key: string;
	stageId: string;
	name: string;
	desc: string;
	tauntLevel: number;
	mainSkillLvl: number;
	modelType: string;
	hideTile: boolean;
	stats: trapStats;
	talents: [];
	skills: [];
	status_immune: StatusImmune[];
	ops: 'elite' | 'normal' | null;
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

type MapConfigEnemy = {
	id: string;
	level: number;
	overwrittenData: overwrittenData;
};

export interface MapConfig {
	id: string;
	levelId: string;
	tags: string[];
	initialCost: number;
	maxCost:number;
	costIncreaseTime: number;
	floors: number[] | null;
	routes: [] | null;
	code: string;
	[key: `name_${string}`]: string;
	[key: `description_${string}`]: string;
	[key: `eliteDesc_${string}`]: string;
	n_runes:null;
	elite_runes:any|null;
	n_mods: Mods | null;
	elite_mods: Mods | null;
	traps: MapConfigTrap[];
	trap_pos: TrapPos[];
	enemies: MapConfigEnemy[];
	sp_terrain: [];
}

export type MapConfigTrap = {
	key: string;
	level: number;
	mainSkillLvl: number;
};

type TrapPos = {
	alias: string;
	position;
	direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
	hidden: boolean;
};

export type Position = {
	row: number;
	col: number;
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
	type?: 'skill' | 'buff' | undefined;
	value?: number;
	initCooldown?: number;
	cooldown?: number;
	initSp?: number;
	spCost?: number;
	skillRange?: number;
	skillType?: 'INCREASE_WITH_TIME' | 'INCREASE_WHEN_ATTACK';
	can_silence?: boolean;
	dmg_element?: 'phys' | 'arts' | 'true' | 'heal';
	suffix?: Tooltip;
	hits?: number;
	formIndexes?: number[];
	tooltip: Tooltip | null;
};

type Tooltip = {
	zh: [string];
	ja: [string];
	en: [string];
};

export type sortOrder = -1 | 0 | 1;
