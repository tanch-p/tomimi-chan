import { browser } from '$app/environment';
import { derived, writable } from 'svelte/store';

export const mapConfig = writable({});
export const eliteMode = writable(false);
export const runes = derived([mapConfig, eliteMode], ([$mapConfig, $eliteMode]) =>
	$eliteMode ? $mapConfig.elite_mods : $mapConfig.n_mods
);
export const allMods = derived([mapConfig], ([$mapConfig]) => $mapConfig.all_mods);
export const otherBuffs = writable([]);

//Stage Sim related stores
export const simMode = writable('wave_normal');
export const randomSeeds = writable(Array.from(Array(50)).map(() => Math.random()));

mapConfig.subscribe(() => {
	eliteMode.set(false);
	simMode.set('wave_normal');
	otherBuffs.set([]);
});
simMode.subscribe((v) => (GameConfig.mode = v));

import { GameConfig } from '$lib/components/StageSimulator/objects/GameConfig';

let initialTableHeaders = [
	{ key: 'enemy', show: true },
	{ key: 'name', show: true },
	{ key: 'type', show: true },
	{ key: 'hp', show: true },
	{ key: 'e_hp', show: false },
	{ key: 'atk', show: true },
	{ key: 'aspd', show: true },
	{ key: 'range', show: true },
	{ key: 'def', show: true },
	{ key: 'res', show: true },
	{ key: 'weight', show: true },
	{ key: 'ms', show: true },
	{ key: 'lifepoint', show: true },
	{ key: 'other_buffs', show: true },
	{ key: 'remarks', show: true }
];

export let cookiesEnabled = true;
if (browser) {
	try {
		localStorage.getItem('language');
	} catch {
		cookiesEnabled = false;
	}
}
export let defaultOpenStageSim = false;

if (browser && cookiesEnabled) {
	const stored_headers = localStorage.getItem('table_headers');
	if (stored_headers) {
		const stored_data = JSON.parse(stored_headers);
		initialTableHeaders = initialTableHeaders.map(({ key, show }) => {
			const storedValue = stored_data.find((ele) => ele.key === key);
			const showValue = storedValue?.show ?? show;
			return { key, show: showValue };
		});
	}
	const openStageSim = localStorage.getItem('openStageSim');
	if (openStageSim == 1) defaultOpenStageSim = true;
	const showAllRange = localStorage.getItem('showAllRange');
	if (showAllRange == 0) GameConfig.showAllRange = false;
	const showAllTimers = localStorage.getItem('showAllTimers');
	if (showAllTimers == 0) GameConfig.showAllTimers = false;
	const showTimeline = localStorage.getItem('showTimeline');
	if (showTimeline == 0) GameConfig.showTimeline.set(false);
}
export const tableHeaders = writable(initialTableHeaders);
