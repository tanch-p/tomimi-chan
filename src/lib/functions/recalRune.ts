import type { MapConfig } from '$lib/types';

export function splitRunesData(runes) {
	// First level grouping: by score (0 vs not 0)
	const scoreGroups = {
		base: runes.filter((rune) => rune.score === 0),
		others: runes.filter((rune) => rune.score > 0)
	};

	// Second level grouping: by exclusiveGroupId within each score group
	const result = {
		base: groupByExclusiveGroupId(scoreGroups.base),
		others: groupByExclusiveGroupId(scoreGroups.others)
	};

	return result;
}

function groupByExclusiveGroupId(runes) {
	const groups = {
		nullGroup: [],
		exclusiveGroups: {}
	};

	runes.forEach((rune) => {
		if (rune.exclusiveGroupId === null) {
			groups.nullGroup.push(rune);
		} else {
			if (!groups.exclusiveGroups[rune.exclusiveGroupId]) {
				groups.exclusiveGroups[rune.exclusiveGroupId] = [];
			}
			groups.exclusiveGroups[rune.exclusiveGroupId].push(rune);
		}
	});

	return groups;
}

export function initContracts(contracts, mapConfig: MapConfig) {
	if (!mapConfig.systems?.crisis) {
		return contracts.set(null);
	}
	const groupedRunes = splitRunesData(mapConfig.systems?.crisis.runes);
	groupedRunes.base.nullGroup.forEach((rune) => (rune.selected = true));
	Object.entries(groupedRunes.base.exclusiveGroups).forEach(([_, runes]) =>
		runes.forEach((rune, i) => (rune.selected = i === 0))
	);
	groupedRunes.others.nullGroup.forEach((rune) => (rune.selected = false));
	Object.entries(groupedRunes.others.exclusiveGroups).forEach(([_, runes]) =>
		runes.forEach((rune) => (rune.selected = false))
	);
	contracts.set(groupedRunes);
}

export function updateContracts(contracts, type, groupId, runeId) {
	const holder = structuredClone(contracts);
	if (groupId === null) {
		const index = holder[type]['nullGroup'].findIndex((rune) => rune.runeId === runeId);
		if (index !== -1) {
			holder[type]['nullGroup'][index].selected = !holder[type]['nullGroup'][index].selected;
		}
	} else {
		const index = holder[type].exclusiveGroups[groupId].findIndex((rune) => rune.runeId === runeId);
		if (index !== -1) {
			holder[type].exclusiveGroups[groupId][index].selected =
				!holder[type].exclusiveGroups[groupId][index].selected;
			holder[type].exclusiveGroups[groupId].forEach((rune, i) => {
				if (index !== i) {
					rune.selected = false;
				}
			});
		}
	}
	return holder;
}

export function clearContracts(contracts) {
	const holder = structuredClone(contracts);
	holder.base.nullGroup.forEach((rune) => (rune.selected = true));
	Object.entries(holder.base.exclusiveGroups).forEach(([_, runes]) =>
		runes.forEach((rune, i) => (rune.selected = i === 0))
	);
	holder.others.nullGroup.forEach((rune) => (rune.selected = false));
	Object.entries(holder.others.exclusiveGroups).forEach(([_, runes]) =>
		runes.forEach((rune) => (rune.selected = false))
	);
	return holder;
}

export function getScore(contracts) {
	if (!contracts) return 0;
	const nullGroupScore = contracts.others.nullGroup.reduce((acc, rune) => {
		if (rune.selected) {
			acc += rune.score;
		}
		return acc;
	}, 0);
	const exclusiveGroupScore = Object.entries(contracts.others.exclusiveGroups).reduce(
		(acc, [_, runes]) => {
			const score = runes.reduce((acc2, rune) => {
				if (rune.selected) {
					acc2 += rune.score;
				}
				return acc2;
			}, 0);
			acc += score;
			return acc;
		},
		0
	);
	return nullGroupScore + exclusiveGroupScore;
}

export function consolidateMods(contracts) {
	if (!contracts) return [];
	function consolidator(acc, rune) {
		if (rune.selected) {
			acc.push(rune.mods);
		}
		return acc;
	}
	const baseNullGroupMods = contracts.base.nullGroup.reduce(consolidator, []);
	const baseExclusiveGroupMods = Object.entries(contracts.base.exclusiveGroups)
		.reduce((acc, [_, runes]) => {
			const groupMods = runes.reduce(consolidator, []);
			if (groupMods.length > 0) {
				acc = [...acc, groupMods];
			}
			return acc;
		}, [])
		.flat();
	const othersNullGroupMods = contracts.others.nullGroup.reduce(consolidator, []);
	const othersExclusiveGroupMods = Object.entries(contracts.others.exclusiveGroups)
		.reduce((acc, [_, runes]) => {
			const groupMods = runes.reduce(consolidator, []);
			if (groupMods.length > 0) {
				acc = [...acc, groupMods];
			}
			return acc;
		}, [])
		.flat();
	return [
		...baseNullGroupMods,
		...baseExclusiveGroupMods,
		...othersNullGroupMods,
		...othersExclusiveGroupMods
	];
}
