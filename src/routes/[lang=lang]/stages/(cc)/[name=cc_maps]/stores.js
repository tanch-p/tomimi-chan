import { writable, derived } from 'svelte/store';

export const selectedContracts = writable([]);

export const statMods = writable({});
export const specialMods = writable({});
