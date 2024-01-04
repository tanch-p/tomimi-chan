import { browser } from '$app/environment';
import { writable } from 'svelte/store';

let initialTableHeaders = [
	{ key: 'enemy', show: true },
	{ key: 'name', show: true },
	// { key: 'count', show: false },
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
}

export const tableHeaders = writable(initialTableHeaders);
