import { writable } from "svelte/store";

export const randomSeeds = writable(Array.from(Array(50)).map(() => Math.random()));