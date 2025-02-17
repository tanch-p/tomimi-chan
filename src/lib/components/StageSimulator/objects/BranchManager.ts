import { shuffleArray } from '$lib/functions/waveHelpers';
import { Enemy } from './Enemy';
import { GameConfig } from './GameConfig';
import { GameManager } from './GameManager';

export class BranchManager {
	routes;
	phases;
	branch;
	currentPhaseIndex = 0;
	activeActions = new Map(); // Tracks currently running actions
	completedActions = new Set(); // Tracks completed actions in current fragment
	isProcessingPhase = false;
	gameManager: GameManager;
	isFinished = false;
	phasePreDelayTimer = 0;
	phaseTimer = 0;
	constructor(branch, gameManager: GameManager) {
		this.branch = branch;
		this.gameManager = gameManager;
		this.routes = gameManager.config.extra_routes;
		const indexes = Array.from({ length: branch.phases.length }, (_, i) => i);
		const shuffledIndexes = shuffleArray(indexes);
		this.phases = branch.phases.map((phase, i) => {
			return { preDelay: phase.preDelay, actions: branch.phases[shuffledIndexes[i]].actions };
		});
	}

	update(delta) {
		if(this.isFinished){
			return;
		}
		if (this.currentPhaseIndex >= this.phases.length) {
			this.isFinished = true;
			return; // All phases completed
		}
		this.processPhase(this.phases[this.currentPhaseIndex], delta);
	}

	processPhase(phase, delta) {
		// Start phase if not already processing
		if (!this.isProcessingPhase) {
			this.startPhase(phase);
			this.phasePreDelayTimer = 0;
			return;
		}
		// Handle phase pre-delay
		if (this.phasePreDelayTimer < phase.preDelay) {
			this.phasePreDelayTimer += delta;
			return;
		}
		this.phaseTimer += delta;
		// Update all active actions
		this.updateActiveActions(delta);

		// Check if phase is complete
		if (this.isPhaseComplete()) {
			this.completePhase();
		}
	}

	startPhase(phase) {
		this.isProcessingPhase = true;
		this.activeActions.clear();
		this.completedActions.clear();
		// Initialize all actions in the phase
		phase.actions.forEach((action, index) => {
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
		this.activeActions.forEach((state, index) => {
			if (state.isComplete) return;

			// Handle pre-delay
			if (state.action.preDelay > this.phaseTimer) {
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

	isPhaseComplete() {
		return this.completedActions.size === this.activeActions.size;
	}

	completePhase() {
		this.isProcessingPhase = false;
		this.currentPhaseIndex++;
		this.phaseTimer = 0;
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
		const enemy = new Enemy(enemyData, route, this.gameManager, null);
	}

	activatePredefined(action) {
		this.gameManager.addTrap(null, action.key);
	}
}
