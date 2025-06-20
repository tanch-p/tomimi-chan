import { writable } from 'svelte/store';

export class GameConfig {
	static mode = 'wave_normal';
	static levelId = '';
	static gridSize = 100;
	static speedFactor = 4;
	static baseZIndex = 0;
	static isPaused = false;
	static FrustumSize = 900;
	static showAllRange = true;
	static showAllTimers = true;
	static showTimeline = writable(true);
	static scaledElapsedTime = 0;
	static waveElapsedTime = 0;
	static state = 'loading';
	static subscribers = new Set();
	static tokenCard = null;
	static eliteMode = false;
	static cameraLock = true;
	static currentWaveIndex = 0;
	static specialMods = {};
	static stagePhaseIndex = 0;

	static subscribe(key: string, callback) {
		this.subscribers.add({ key, callback });
		return () => this.subscribers.delete({ key, callback });
	}

	static setValue(key: string, value: unknown) {
		this[key] = value;
		this.subscribers.forEach(({ key: cbKey, callback }) => cbKey === key && callback(value));
	}

	static getValue(key) {
		return this[key];
	}
}
