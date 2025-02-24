import * as THREE from 'three';
import { countdownShaders } from './shaders';
import { GameConfig } from './GameConfig';
export class ShaderCountdownManager {
	private material: THREE.ShaderMaterial;
	private geometry: THREE.InstancedBufferGeometry;
	private mesh: THREE.Mesh;
	private times: Float32Array;
	private maxTimes: Float32Array;
	private colors: Float32Array;
	private readonly MAX_INSTANCES = 500; // Can handle more instances
	private activeCountdowns: Map<number, number> = new Map();
	private availableIndices: number[] = [];
	private instanceMatrix: THREE.InstancedBufferAttribute;

	constructor() {
		this.initializeGeometry();
		this.initializeMaterial();
		this.initializeShader();
		for (let i = 0; i < this.MAX_INSTANCES; i++) {
			this.availableIndices.push(i);
		}
	}

	private initializeGeometry() {
		// Use simpler geometry with fewer vertices
		const baseGeometry = new THREE.PlaneGeometry(1, 1, 1, 1);
		this.geometry = new THREE.InstancedBufferGeometry();
		this.geometry.setAttribute('position', baseGeometry.getAttribute('position'));
		this.geometry.setAttribute('uv', baseGeometry.getAttribute('uv'));
		this.geometry.setIndex(baseGeometry.getIndex());

		// Initialize instance attributes
		this.times = new Float32Array(this.MAX_INSTANCES);
		this.maxTimes = new Float32Array(this.MAX_INSTANCES);
		this.colors = new Float32Array(this.MAX_INSTANCES * 3);

		const timeAttribute = new THREE.InstancedBufferAttribute(this.times, 1);
		const maxTimeAttribute = new THREE.InstancedBufferAttribute(this.maxTimes, 1);
		const colorAttribute = new THREE.InstancedBufferAttribute(this.colors, 3);

		this.geometry.setAttribute('time', timeAttribute);
		this.geometry.setAttribute('maxTime', maxTimeAttribute);
		this.geometry.setAttribute('instanceColor', colorAttribute);

		// Initialize matrices
		const matrices = new Float32Array(this.MAX_INSTANCES * 16);
		this.instanceMatrix = new THREE.InstancedBufferAttribute(matrices, 16);
		this.geometry.setAttribute('instanceMatrix', this.instanceMatrix);

		// Set frustum culling to improve performance
		this.geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 1000);
	}

	private initializeMaterial() {
		this.material = new THREE.ShaderMaterial({
			vertexShader: countdownShaders.vertex,
			fragmentShader: countdownShaders.fragment,
			transparent: true,
			depthTest: false, // Disable depth testing
			depthWrite: false, // Disable depth buffer writes
		});
	}

	private initializeShader() {
		// Create mesh
		this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.renderOrder = 999;
	}

	public createCountdown(position: THREE.Vector3, duration: number): number {
		if (this.availableIndices.length === 0) {
			console.warn('Maximum number of countdowns reached');
			return -1;
		}

		const index = this.availableIndices.pop();
		const id = Math.random(); // Or use a more sophisticated ID generation

		// Set instance data
		this.times[index] = duration;
		this.maxTimes[index] = duration;

		// Set color based on duration
		const color = new THREE.Color(duration <= 5 ? 0xdc143c : 0xf08080);
		this.colors[index * 3] = color.r;
		this.colors[index * 3 + 1] = color.g;
		this.colors[index * 3 + 2] = color.b;

		// Update instance matrix
		const matrix = new THREE.Matrix4();
		const scale = GameConfig.gridSize / 2; // Adjust scale as needed
		matrix.makeScale(scale, scale, 1);
		matrix.setPosition(position.x, position.y, position.z);

		// Copy matrix elements to the instance buffer
		const matrixArray = matrix.elements;
		for (let i = 0; i < 16; i++) {
			this.instanceMatrix.array[index * 16 + i] = matrixArray[i];
		}

		this.activeCountdowns.set(id, index);

		// Mark attributes as needing update
		this.geometry.getAttribute('time').needsUpdate = true;
		this.geometry.getAttribute('maxTime').needsUpdate = true;
		this.geometry.getAttribute('instanceColor').needsUpdate = true;
		this.instanceMatrix.needsUpdate = true;

		return id;
	}

	public updatePosition(id: number, position: THREE.Vector3) {
		const index = this.activeCountdowns.get(id);
		if (index !== undefined) {
			const matrix = new THREE.Matrix4();
			const scale = GameConfig.gridSize / 2;
			matrix.makeScale(scale, scale, 1);
			matrix.setPosition(position.x, position.y, position.z);

			// Update matrix in buffer
			const matrixArray = matrix.elements;
			for (let i = 0; i < 16; i++) {
				this.instanceMatrix.array[index * 16 + i] = matrixArray[i];
			}

			this.instanceMatrix.needsUpdate = true;
		}
	}

	public update(deltaTime: number) {
		let needsUpdate = false;
		// Batch updates to minimize attribute updates
		this.activeCountdowns.forEach((index, id) => {
			this.times[index] -= deltaTime;

			if (this.times[index] <= 0) {
				this.removeCountdown(id);
				needsUpdate = true;
			}
		});

		// Only update attributes if necessary
		if (needsUpdate) {
			this.geometry.getAttribute('time').needsUpdate = true;
		}
	}

	private removeCountdown(id: number) {
		const index = this.activeCountdowns.get(id);
		if (index !== undefined) {
			this.availableIndices.push(index);
			this.activeCountdowns.delete(id);

			// Reset instance data
			this.times[index] = 0;
			this.maxTimes[index] = 0;
			this.colors[index * 3] = 0;
			this.colors[index * 3 + 1] = 0;
			this.colors[index * 3 + 2] = 0;

			// Reset matrix (scale to 0 to hide)
			const matrix = new THREE.Matrix4();
			matrix.makeScale(0, 0, 0);
			const matrixArray = matrix.elements;
			for (let i = 0; i < 16; i++) {
				this.instanceMatrix.array[index * 16 + i] = matrixArray[i];
			}

			this.geometry.getAttribute('time').needsUpdate = true;
			this.geometry.getAttribute('maxTime').needsUpdate = true;
			this.geometry.getAttribute('instanceColor').needsUpdate = true;
			this.instanceMatrix.needsUpdate = true;
		}
	}

	public dispose() {
		this.geometry.dispose();
		this.material.dispose();
	}

	public getMesh(): THREE.Mesh {
		return this.mesh;
	}
}
