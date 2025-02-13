import { writable } from 'svelte/store';

export class GameConfig {
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
	static fragmentElapsedTime = 0;
	static state = 'loading';
	static subscribers = new Set();

	static subscribe(key,callback) {
		this.subscribers.add(callback);
		return () => this.subscribers.delete(callback);
	}

	static setValue(key, value) {
		this[key] = value;
		this.subscribers.forEach((callback) => callback(value));
	}

	static getValue(key) {
		return this[key];
	}
}
