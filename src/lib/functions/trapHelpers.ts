import type { Language, Trap, mapConfigTrap, TrapData, StatMods } from '$lib/types';
import trapLookup from '$lib/data/traps.json';
import trapSkills from '$lib/data/traps_skills.json';
import { calculateModdedStat, distillMods } from './statHelpers';

const TRAPS_AFFECTED_BY_DIFFICULTY = [
	'trap_086_larva',
	'trap_760_skztzs',
	'trap_761_skzthx',
	'trap_480_roadblockxb',
	'trap_065_normbox',
	'trap_066_rarebox',
	'trap_108_smbox',
	'trap_109_smrbox',
	'trap_757_skzbox'
];

const STATS = ['hp', 'atk', 'aspd', 'def', 'res'];

const getTrapWeight = (key) => {
	switch (key) {
		case 'trap_762_skztxy':
		case 'trap_763_skzddd':
		case 'trap_779_skzth':
		case 'trap_761_skzthx':
			return 0;
		case 'trap_760_skztzs':
			return 1;
		case 'trap_079_allydonq':
		case 'trap_764_skzshp':
			return 99;
		case 'trap_065_normbox':
		case 'trap_108_smbox':
		case 'trap_757_skzbox':
			return 100;
		case 'trap_066_rarebox':
		case 'trap_109_smrbox':
		case 'trap_759_skzwyx':
			return 101;
		case 'trap_068_badbox':
		case 'trap_110_smbbox':
		case 'trap_758_skzmbx':
			return 102;
		default:
			return 50;
	}
};
const getTrapStats = (trap: TrapData, level: number) => {
	if (trap.stats.length === 1 || level === 1) {
		return { ...trap.stats[0] };
	}
	const MAX_LEVEL = 30;
	return {
		hp: Math.round(
			trap.stats[0].hp + ((trap.stats[1].hp - trap.stats[0].hp) / (MAX_LEVEL - 1)) * (level - 1)
		),
		atk: Math.round(
			trap.stats[0].atk + ((trap.stats[1].atk - trap.stats[0].atk) / (MAX_LEVEL - 1)) * (level - 1)
		),
		def: Math.round(
			trap.stats[0].def + ((trap.stats[1].def - trap.stats[0].def) / (MAX_LEVEL - 1)) * (level - 1)
		),
		res: Math.round(
			trap.stats[0].res + ((trap.stats[1].res - trap.stats[0].res) / (MAX_LEVEL - 1)) * (level - 1)
		),
		blockCnt: trap.stats[0].blockCnt,
		aspd: trap.stats[0].aspd,
		rangeId: trap.stats[0].rangeId
	};
};

export const parseTraps = (traps: mapConfigTrap[], language: Language) => {
	const holder: Trap[] = [];
	for (const { key, level, mainSkillLvl, eliteSkillLvl } of traps) {
		const trap: TrapData = trapLookup[key];
		const talents = trap?.talents?.map((key) => {
			const talent = trapSkills[key];
			return {
				name: talent[`name_${language}`] || talent[`name_zh`],
				desc: talent[`desc_${language}`] || talent[`desc_zh`],
				rangeId: talent.rangeId
			};
		});
		const skills = trap.skills?.map((key) => {
			const skill = trapSkills[key];
			let eliteSpData;
			if (eliteSkillLvl) {
				eliteSpData = skill.levels[eliteSkillLvl - 1].spData;
			}
			return {
				skillId: key,
				name: skill[`name_${language}`] || skill[`name_zh`],
				desc: skill[`desc_${language}`] || skill[`desc_zh`],
				level: mainSkillLvl + '/' + skill.levels.length,
				skillType: skill.skillType,
				durationType: skill.durationType,
				spType: skill.spType,
				rangeId: skill.rangeId,
				duration: skill.levels[mainSkillLvl - 1].duration,
				spData: skill.levels[mainSkillLvl - 1].spData,
				eliteSpData
			};
		});
		const stats = getTrapStats(trap, level);
		holder.push({
			key: key,
			name: trap[`name_${language}`] || trap[`name_zh`],
			desc: trap[`desc_${language}`] || trap[`desc_zh`],
			tauntLevel: trap.tauntLevel,
			stats: stats,
			talents: talents,
			skills: skills,
			special: trap.special,
			status_immune: trap.status_immune
		});
	}
	return holder.sort((a, b) => getTrapWeight(a.key) - getTrapWeight(b.key));
};

export function applyTrapMods(traps: Trap[], statMods: StatMods, specialMods) {
	return traps.map((trap) => {
		const moddedStats = parseStats(trap, statMods);
		let skill = { ...trap.skills?.[0] };
		if (skill && specialMods[trap.key]) {
			skill = { ...skill, ...specialMods[trap.key] };
		}
		return {
			...trap,
			skills: trap.skills.length > 0 ? [skill] : [],
			stats: moddedStats,
			overwritten: specialMods[trap.key] ? true : false
		};
	});
}

function isAdditionMod(mod, target) {
	switch (target) {
		case 'trap_760_skztzs':
			return (
				!['floor_diff', 'relic', 'sarkaz_disaster'].includes(mod.key) ||
				(mod.key === 'sarkaz_disaster' && mod.mods?.[0]?.[0]?.targets?.includes('trap_760_skztzs'))
			);
		default:
			return ['combat_ops', 'elite_ops'].includes(mod.key);
	}
}
function getRelevantMods(list, target) {
	if (TRAPS_AFFECTED_BY_DIFFICULTY.includes(target)) {
		return list;
	}
	return list.filter((mod) => ['combat_ops', 'elite_ops'].includes(mod.key));
}

function parseStats(trap: Trap, statMods: StatMods) {
	const relevantMods = getRelevantMods([...statMods.initial, ...statMods.final], trap.key);
	const additionModsList = relevantMods.filter((mod) => isAdditionMod(mod, trap.key));
	const finalModsList = relevantMods.filter(
		(mod) => !additionModsList.some((addMod) => addMod.key === mod.key)
	);

	let modsList = [];
	for (const mod of additionModsList) {
		// runes have a char or enemy target in arknights map data, over here there is no such separation because traps were not taken into account for initially
		const applicableMods = {
			...mod,
			mods: mod.mods
				.filter(Boolean)
				.map((effects) => {
					return effects.filter((effect) =>
						effect.targets.some((target) => target.includes(trap.key))
					);
				})
				.filter(Boolean)
		};
		modsList.push(distillMods(trap, '', applicableMods, 0));
	}
	let initialMods = {};
	if (modsList.length > 0) {
		initialMods = modsList.reduce((acc, curr) => {
			for (const statKey in curr) {
				if (statKey === 'dmg_reduction') {
					continue;
				}
				if (
					statKey.includes('fixed') ||
					statKey === 'dmg_reduction' ||
					statKey === 'atk_interval'
				) {
					acc[statKey] += curr[statKey];
				} else {
					if (curr[statKey] < 1) {
						acc[statKey] -= curr[statKey];
					} else {
						acc[statKey] += curr[statKey] - 1;
					}
				}
			}
			return acc;
		});
	}
	modsList = [];
	for (const mod of finalModsList) {
		modsList.push(distillMods(trap, '', mod, 0));
	}
	// different list from enemy final mods
	let finalMods = {};
	if (modsList.length > 0) {
		finalMods = modsList.reduce((acc, curr) => {
			for (const statKey in curr) {
				if (statKey === 'dmg_reduction') {
					continue;
				}
				if (
					statKey.includes('fixed') ||
					statKey === 'dmg_reduction' ||
					statKey === 'atk_interval'
				) {
					acc[statKey] += curr[statKey];
				} else {
					acc[statKey] *= curr[statKey];
				}
			}
			return acc;
		});
	}
	const trap_stats = {};
	for (const stat of STATS) {
		let statToUse = trap.stats[stat];
		trap_stats[stat] = calculateModdedStat(
			statToUse,
			stat,
			initialMods?.[`fixed_${stat}`] ?? 0,
			initialMods[stat] ?? 1,
			finalMods?.[`fixed_${stat}`] ?? 0,
			finalMods[stat] ?? 1,
			stat === 'aspd' ? (initialMods?.atk_interval ?? 0) + (finalMods?.atk_interval ?? 0) : 0
		);
	}
	return trap_stats;
}
