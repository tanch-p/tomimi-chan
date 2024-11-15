import type { Language, Trap, mapConfigTrap, TrapData, StatMods } from '$lib/types';
import trapLookup from '$lib/data/traps.json';
import trapSkills from '$lib/data/traps_skills.json';
import { calculateModdedStat, distillMods } from './statHelpers';

const TRAPS_AFFECTED_BY_DIFFICULTY = ['trap_757_skzbox', 'trap_760_skztzs'];

const STATS = ['hp', 'atk', 'aspd', 'def', 'res'];

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
	for (const { key, level, mainSkillLvl } of traps) {
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
			return {
				name: skill[`name_${language}`] || skill[`name_zh`],
				desc: skill[`desc_${language}`] || skill[`desc_zh`],
				skillType: skill.skillType,
				durationType: skill.durationType,
				spType: skill.spType,
				rangeId: skill.rangeId,
				duration: skill.levels[mainSkillLvl - 1].duration,
				spData: skill.levels[mainSkillLvl - 1].spData
			};
		});
		const stats = getTrapStats(trap, level);
		holder.push({
			key: key,
			name: trap[`name_${language}`] || trap[`name_zh`],
			desc: trap[`desc_${language}`] || trap[`desc_zh`],
			stats: stats,
			talents: talents,
			skills: skills,
			special: trap.special,
			status_immune: trap.status_immune
		});
	}
	return holder;
};

export function applyTrapMods(traps: Trap[], statMods: StatMods) {
	return traps.map((trap) => {
		const moddedStats = parseStats(trap, statMods);
		return {
			...trap,
			stats: moddedStats
		};
	});
}

function parseStats(trap: Trap, statMods: StatMods) {
	if (!TRAPS_AFFECTED_BY_DIFFICULTY.includes(trap.key)) {
		return trap.stats;
	}
	const relevantMods = [...statMods.initial, ...statMods.final];
	const additionModsList = relevantMods.filter(
		(mod) =>
			!['floor_diff', 'relic', 'sarkaz_disaster'].includes(mod.key) ||
			(mod.key === 'sarkaz_disaster' && mod.mods?.[0]?.[0]?.targets?.includes('trap_760_skztzs'))
	);
	const finalModsList = relevantMods.filter(
		(mod) => !additionModsList.some((addMod) => addMod.key === mod.key)
	);

	let modsList = [];
	for (const mod of additionModsList) {
		// runes have a char or enemy target in arknights map data, over here there is no such separation because traps were not taken into account for initially
		if (mod.key === 'elite_ops') {
			mod.mods = mod.mods
				.filter(Boolean)
				.map((effects) => {
					return effects.filter((effect) =>
						effect.targets.some((target) => target.includes(trap.key))
					);
				})
				.filter(Boolean);
		}
		modsList.push(distillMods(trap, '', mod, 0));
	}

	const initialMods = modsList.reduce((acc, curr) => {
		for (const statKey in curr) {
			if (statKey === 'dmg_reduction') {
				continue;
			}
			if (statKey.includes('fixed') || statKey === 'dmg_reduction' || statKey === 'atk_interval') {
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
	modsList = [];
	for (const mod of finalModsList) {
		modsList.push(distillMods(trap, '', mod, 0));
	}
	// different list from enemy final mods
	const finalMods = modsList.reduce((acc, curr) => {
		for (const statKey in curr) {
			if (statKey === 'dmg_reduction') {
				continue;
			}
			if (statKey.includes('fixed') || statKey === 'dmg_reduction' || statKey === 'atk_interval') {
				acc[statKey] += curr[statKey];
			} else {
				acc[statKey] *= curr[statKey];
			}
		}
		return acc;
	});
	const trap_stats = {};
	for (const stat of STATS) {
		let statToUse = trap.stats[stat];
		trap_stats[stat] = calculateModdedStat(
			statToUse,
			stat,
			initialMods?.[`fixed_${stat}`] ?? 0,
			initialMods[stat],
			finalMods?.[`fixed_${stat}`] ?? 0,
			finalMods[stat],
			stat === 'aspd' ? (initialMods?.atk_interval ?? 0) + (finalMods?.atk_interval ?? 0) : 0
		);
	}
	return trap_stats;
}
