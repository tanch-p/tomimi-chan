import { BranchManager } from './BranchManager';
import { Enemy } from './Enemy';
import { GameConfig } from './GameConfig';
import { GameManager } from './GameManager';
import { GameMap } from './GameMap';

export class SpawnManager {
	map: GameMap;
	routes;
	waves;
	currentWaveIndex: number;
	currentFragmentIndex: number;
	activeActions = new Map(); // Tracks currently running actions
	completedActions = new Set(); // Tracks completed actions in current fragment
	fragmentsTimeTracker = new Map();
	branchIndex = 0;
	branches = new Map();
	isProcessingFragment = false;
	nextWaveTimer = 0;
	nextWaveType: 'TIME' | 'NO_ENEMIES';
	enterNextWaveFlag = false;
	gameManager: GameManager;
	isFinished = false;
	preDelayTimer = 0;
	fragmentPreDelayTimer = 0;
	postDelayTimer = 0;
	waveElapsedTime = 0; //for use in simulation only
	constructor(waves, map, gameManager: GameManager) {
		this.map = map;
		this.waves = waves;
		this.gameManager = gameManager;
		gameManager.spawnManager = this;
		this.routes = gameManager.config.routes;
		this.currentWaveIndex = GameConfig.currentWaveIndex;
		this.currentFragmentIndex = 0;
		this.nextWaveType = waves[0].maxTimeWaitingForNextWave < 0 ? 'NO_ENEMIES' : 'TIME';
		if (this.gameManager.config.levelId === 'level_rogue4_b-8') {
			switch (this.currentWaveIndex) {
				case 3:
					this.addBranch('amiy_blink_1');
					break;
				case 5:
					this.addBranch('amiy_blink_2');
					break;
			}
		}
	}

	// Main update function to be called in animation loop
	update(delta) {
		// handle branches
		this.branches.forEach((branch) => {
			branch.update(delta);
		});

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
		if (this.gameManager.isSimulation) {
			this.waveElapsedTime += delta;
		} else {
			GameConfig.setValue('waveElapsedTime', GameConfig.waveElapsedTime + delta);
		}
		// Process fragments
		if (this.currentFragmentIndex < currentWave.fragments.length) {
			this.processFragment(currentWave.fragments[this.currentFragmentIndex], delta);
		} else if (this.postDelayTimer < currentWave.postDelay) {
			// Handle wave post-delay
			this.postDelayTimer += delta;
		} else if (!this.checkNextWaveFlag(delta)) {
		} else {
			// Move to next wave
			this.currentWaveIndex++;
			GameConfig.setValue('currentWaveIndex', this.currentWaveIndex);
			this.currentFragmentIndex = 0;
			if (this.gameManager.isSimulation) {
				this.waveElapsedTime = 0;
			} else {
				GameConfig.setValue('waveElapsedTime', 0);
			}
			this.preDelayTimer = 0;
			this.postDelayTimer = 0;
			this.nextWaveTimer = 0;
			this.nextWaveType =
				this.waves[this.currentWaveIndex]?.maxTimeWaitingForNextWave < 0 ? 'NO_ENEMIES' : 'TIME';
		}
	}

	checkNextWaveFlag(delta) {
		if (this.enterNextWaveFlag) {
			return true;
		}
		if (this.nextWaveType === 'NO_ENEMIES') {
			return this.gameManager.noEnemyAlive;
		}
		if (this.nextWaveTimer < this.waves[this.currentWaveIndex].maxTimeWaitingForNextWave) {
			this.nextWaveTimer += delta;
		}
		return (
			this.nextWaveTimer >= this.waves[this.currentWaveIndex].maxTimeWaitingForNextWave ||
			this.gameManager.noEnemyAlive
		);
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

	updateActiveActions() {
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
		let enemyKey = action.key;
		const enemyReplace = GameConfig.eliteMode
			? this.gameManager.config.elite_runes?.enemy_replace || {}
			: {};
		if (enemyReplace[action.key]) {
			enemyKey = enemyReplace[action.key];
		}
		const enemyData = this.gameManager.enemies.find((ele) => ele.stageId === enemyKey);
		if (!enemyData) {
			return;
		}
		const key = `w${this.currentWaveIndex}f${this.currentFragmentIndex}`;
		const enemy = new Enemy(enemyData, route, this.gameManager, key);
	}

	activatePredefined(action) {
		this.gameManager.addTrap(null, action.key);
	}

	addBranch(branch, index = -1) {
		if (typeof branch === 'string') {
			branch = this.gameManager.config.branches[branch];
		}
		if (index !== -1) {
			branch.phases = [branch.phases[index]];
		}
		this.branches.set(this.branchIndex, new BranchManager(branch, this.gameManager));
		this.branchIndex++;
	}

	set(data) {
		GameConfig.setValue('waveElapsedTime', data.waveElapsedTime);
		this.currentWaveIndex = data.currentWaveIndex;
		GameConfig.setValue('currentWaveIndex', data.currentWaveIndex);
		this.currentFragmentIndex = data.currentFragmentIndex;
		this.activeActions = data.activeActions;
		this.completedActions = data.completedActions;
		this.fragmentsTimeTracker = data.fragmentsTimeTracker;
		this.isProcessingFragment = data.isProcessingFragment;
		this.nextWaveTimer = data.nextWaveTimer;
		this.nextWaveType = data.nextWaveType;
		this.enterNextWaveFlag = data.enterNextWaveFlag;
		this.preDelayTimer = data.preDelayTimer;
		this.fragmentPreDelayTimer = data.fragmentPreDelayTimer;
		this.postDelayTimer = data.postDelayTimer;
		this.isFinished = false;
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
	}
}
