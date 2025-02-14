import { Enemy } from './Enemy';
import { GameConfig } from './GameConfig';
import { GameManager } from './GameManager';
import { GameMap } from './GameMap';

class SpawnManager {
	map: GameMap;
	routes;
	waves;
	currentWaveIndex: number;
	currentFragmentIndex: number;
	activeActions = new Map(); // Tracks currently running actions
	completedActions = new Set(); // Tracks completed actions in current fragment
	fragmentsTimeTracker = new Map();
	isProcessingFragment = false;
	nextWaveTimer = 0;
	spawnCount = 0;
	gameManager: GameManager;
	isFinished = false;
	preDelayTimer = 0;
	fragmentPreDelayTimer = 0;
	postDelayTimer = 0;
	constructor(waves, map, gameManager) {
		this.map = map;
		this.waves = waves;
		this.gameManager = gameManager;
		gameManager.spawnManager = this;
		this.routes = gameManager.config.routes;
		this.currentWaveIndex = 0;
		this.currentFragmentIndex = 0;
		console.log(waves);
	}

	// Main update function to be called in animation loop
	update(delta) {
		this.fragmentsTimeTracker.forEach((value, key) => {
			this.fragmentsTimeTracker.set(key, value + delta);
		});
		if (this.currentWaveIndex >= this.waves.length) {
			this.isFinished = true;
			return; // All waves completed
		}
		const currentWave = this.waves[this.currentWaveIndex];

		// Handle wave pre-delay
		if (this.preDelayTimer < currentWave.preDelay) {
			this.preDelayTimer += delta;
			return;
		}

		// Process fragments
		if (this.currentFragmentIndex < currentWave.fragments.length) {
			GameConfig.setValue('waveElapsedTime', GameConfig.waveElapsedTime + delta);
			this.processFragment(currentWave.fragments[this.currentFragmentIndex], delta);
		} else if (this.nextWaveTimer < currentWave.maxTimeWaitingForNextWave) {
			// Handle wave maxTimeWaitingForNextWave
			this.nextWaveTimer += delta;
		} else if (this.postDelayTimer < currentWave.postDelay) {
			// Handle wave post-delay
			this.postDelayTimer += delta;
		} else {
			// Move to next wave
			this.currentWaveIndex++;
			this.currentFragmentIndex = 0;
			GameConfig.waveElapsedTime = 0;
			this.preDelayTimer = 0;
			this.postDelayTimer = 0;
			this.nextWaveTimer = 0;
		}
	}

	processFragment(fragment, delta) {
		// Start fragment if not already processing
		if (!this.isProcessingFragment) {
			this.startFragment(fragment);
			this.fragmentPreDelayTimer = 0;
			return;
		}
		// Handle fragment pre-delay
		if (this.fragmentPreDelayTimer < fragment.preDelay) {
			this.fragmentPreDelayTimer += delta;
			return;
		}
		const key = `w${this.currentWaveIndex}f${this.currentFragmentIndex}`;
		if (!this.fragmentsTimeTracker.has(key)) {
			this.fragmentsTimeTracker.set(key, 0);
		}
		// Update all active actions
		this.updateActiveActions(delta);

		// Check if fragment is complete
		if (this.isFragmentComplete()) {
			this.completeFragment();
		}
	}

	startFragment(fragment) {
		this.isProcessingFragment = true;
		this.activeActions.clear();
		this.completedActions.clear();

		// Initialize all actions in the fragment
		fragment.actions.forEach((action, index) => {
			const actionState = {
				action,
				spawnCount: 0,
				lastSpawnTime: 0,
				isComplete: false
			};
			this.activeActions.set(index, actionState);
		});
	}

	updateActiveActions(delta) {
		const key = `w${this.currentWaveIndex}f${this.currentFragmentIndex}`;
		this.activeActions.forEach((state, index) => {
			if (state.isComplete) return;

			// Handle pre-delay
			if (state.action.preDelay > this.fragmentsTimeTracker.get(key)) {
				return;
			}

			// Handle spawning
			const timeSinceLastSpawn = GameConfig.scaledElapsedTime - state.lastSpawnTime;
			if (state.spawnCount === 0 || timeSinceLastSpawn >= state.action.interval) {
				this.spawnEntity(state.action);
				state.spawnCount++;
				state.lastSpawnTime = GameConfig.scaledElapsedTime;

				// Check if action is complete
				if (state.spawnCount >= state.action.count) {
					state.isComplete = true;
					this.completedActions.add(index);
				}
			}
		});
	}

	isFragmentComplete() {
		return this.completedActions.size === this.activeActions.size;
	}

	completeFragment() {
		this.isProcessingFragment = false;
		this.currentFragmentIndex++;
	}

	spawnEntity(action) {
		if (action.key === '') {
			return;
		}
		switch (action.actionType) {
			case 'SPAWN':
				this.spawnEnemy(action);
				break;
			case 'ACTIVATE_PREDEFINED':
				this.activatePredefined(action);
				break;
			default:
				console.log(`Unknown action type: ${action.actionType}`);
		}
	}

	spawnEnemy(action) {
		const originalRoute = this.routes[action['routeIndex']];
		const route = this.gameManager.convertMovementConfig(structuredClone(originalRoute));
		const enemyData = this.gameManager.enemies.find((ele) => ele.stageId === action.key);
		if (!enemyData) {
			console.log(action.key, ' key not found in enemies list');
			return;
		}
		const key = `w${this.currentWaveIndex}f${this.currentFragmentIndex}`;
		const enemy = new Enemy(enemyData, route, this.gameManager, key);
	}

	activatePredefined(action) {
		this.gameManager.addTrap(null, action.key);
	}

	// Helper method to reset the manager
	reset() {
		this.currentWaveIndex = 0;
		this.currentFragmentIndex = 0;
		this.activeActions.clear();
		this.completedActions.clear();
		this.isProcessingFragment = false;
		this.preDelayTimer = 0;
		this.postDelayTimer = 0;
		this.fragmentStates.clear();
		this.activeFragments.clear();
	}
}

export default SpawnManager;
