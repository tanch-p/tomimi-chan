import { writable } from 'svelte/store';
import { GameConfig } from './objects/GameConfig';

export const simMode = writable('wave_normal');
export const randomSeeds = writable(Array.from(Array(50)).map(() => Math.random()));