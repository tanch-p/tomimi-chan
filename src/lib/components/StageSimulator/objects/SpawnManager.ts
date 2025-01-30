import { GameMap } from './GameMap';

class SpawnManager {
	map: GameMap;
	routes: any;
	waves: any;
	currentWaveIndex: number;
	nextWaveTimer: number;
	actionIndex: number;
	spawnCount = 0;
	constructor(waves, map) {
		this.map = map;
		this.waves = waves;
		this.currentWaveIndex = 0;
		this.actionIndex = 0;
		this.preDelayTimer = this.waves[0].preDelay;
		this.postDelayTimer = this.waves[0].postDelay;
		this.nextWaveTimer = this.waves[0].maxTimeWaitingForNextWave || -1;
	}

	// Main update function to be called in animation loop
	update(delta, elapsedTime) {
		if (this.currentWaveIndex >= this.waves.length) {
			return; // All waves completed
		}
		const currentWave = this.waves[this.currentWaveIndex];
		for (let i = this.actionIndex; i < currentWave.timeline.length; i++) {
			const fragment = currentWave.timeline[i];
			if (elapsedTime >= fragment.t) {
				for (const action of fragment.actions) {
					this.spawnEntity(action);
					this.spawnCount += 1;
				}
				this.actionIndex += 1;
			} else {
				break;
			}
		}
		if(this.actionIndex >= currentWave.timeline.length){
			this.currentWaveIndex+=1;
			this.actionIndex=0;
		}

		// // Handle wave pre-delay
		// if (this.preDelayTimer < currentWave.preDelay) {
		//   this.preDelayTimer += delta;
		//   return;
		// }

		// // Process fragments
		// if (this.currentFragmentIndex < currentWave.fragments.length) {
		//   this.processFragment(
		//     currentWave.fragments[this.currentFragmentIndex],
		//     delta
		//   );
		// } else if (this.postDelayTimer < currentWave.postDelay) {
		//   // Handle wave post-delay
		//   this.postDelayTimer += delta;
		// } else {
		//   // Move to next wave
		//   this.currentWaveIndex++;
		//   this.preDelayTimer = 0;
		//   this.postDelayTimer = 0;
		// }
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
		this.map.addEnemy(action);
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
