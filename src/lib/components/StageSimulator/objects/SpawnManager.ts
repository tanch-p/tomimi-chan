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
	isProcessingFragment = false;
	nextWaveTimer: number;
	actionIndex: number;
	spawnCount = 0;
	gameManager: GameManager;
	isFinished = false;
	preDelayTimer = 0;
	postDelayTimer = 0;
	constructor(waves, map, gameManager) {
		this.map = map;
		this.waves = waves;
		this.gameManager = gameManager;
		this.routes = gameManager.config.routes;
		this.currentWaveIndex = 0;
		this.currentFragmentIndex = 0;
		this.actionIndex = 0;
		this.preDelayTimer = this.waves[0].preDelay;
		this.postDelayTimer = this.waves[0].postDelay;
		this.nextWaveTimer = this.waves[0].maxTimeWaitingForNextWave || -1;
	}

	// Main update function to be called in animation loop
	update(delta) {
		GameConfig.scaledElapsedTime += delta;
		GameConfig.waveElapsedTime += delta;
		GameConfig.fragmentElapsedTime += delta;
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
			this.processFragment(currentWave.fragments[this.currentFragmentIndex], delta);
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
		}
	}

	processFragment(fragment, delta) {
		// Start fragment if not already processing
		if (!this.isProcessingFragment) {
			GameConfig.fragmentElapsedTime = 0;
			this.startFragment(fragment);
			return;
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
				preDelayTimer: 0,
				spawnCount: 0,
				lastSpawnTime: 0,
				isComplete: false
			};
			this.activeActions.set(index, actionState);
		});
	}

	updateActiveActions(delta) {
		this.activeActions.forEach((state, index) => {
			if (state.isComplete) return;

			// Handle pre-delay
			if (state.preDelayTimer < state.action.preDelay) {
				state.preDelayTimer += delta;
				return;
			}

			// Handle spawning
			const timeSinceLastSpawn = GameConfig.scaledElapsedTime - state.lastSpawnTime;
			if (timeSinceLastSpawn >= state.action.interval || state.spawnCount === 0) {
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
		switch (action.actionType) {
			case 'SPAWN':
				this.spawnEnemy(action);
				break;
			case 'ACTIVATE_PREDEFINED':
				this.activatePredefined(action);
				break;
			default:
				this.spawnEnemy(action);
			// console.warn(`Unknown action type: ${action.actionType}`);
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
		const enemy = new Enemy(enemyData, route, this.gameManager);
	}

	activatePredefined(action) {
		// Implementation for activating predefined entities
		console.log(`Activating predefined entity: ${action.key} at route ${action.routeIndex}`);
		// Example:
		// const entity = this.predefinedEntities.get(action.key);
		// entity.activate(this.routes[action.routeIndex]);
	}

	// Helper method to reset the manager
	reset() {
		this.currentWaveIndex = 0;
		this.preDelayTimer = 0;
		this.postDelayTimer = 0;
	}
}

export default SpawnManager;
