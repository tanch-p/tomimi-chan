import * as THREE from 'three';
import { countdownShaders } from './shaders';

export class ShaderCountdownManager {
    private material: THREE.ShaderMaterial;
    private geometry: THREE.InstancedBufferGeometry;
    private mesh: THREE.Mesh;
    private times: Float32Array;
    private maxTimes: Float32Array;
    private colors: Float32Array;
    private readonly MAX_INSTANCES = 1000;
    private activeCountdowns: Map<number, number> = new Map(); // id -> index
    private availableIndices: number[] = [];

    constructor() {
        this.initializeShader();
    }

    private initializeShader() {
        // Create geometry (single quad for each instance)
        const baseGeometry = new THREE.PlaneGeometry(1, 1);
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

        // Initialize available indices
        for (let i = 0; i < this.MAX_INSTANCES; i++) {
            this.availableIndices.push(i);
        }

        // Create shader material
        this.material = new THREE.ShaderMaterial({
            vertexShader: countdownShaders.vertex,
            fragmentShader:  countdownShaders.fragment,
            transparent: true,
            depthTest: false
        });

        // Create mesh
        this.mesh = new THREE.Mesh(this.geometry, this.material);
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

        // Update instance matrices
        const matrix = new THREE.Matrix4();
        matrix.makeTranslation(position.x, position.y, position.z);
        
        this.activeCountdowns.set(id, index);

        // Mark attributes as needing update
        this.geometry.getAttribute('time').needsUpdate = true;
        this.geometry.getAttribute('maxTime').needsUpdate = true;
        this.geometry.getAttribute('instanceColor').needsUpdate = true;

        return id;
    }

    public update(deltaTime: number) {
        let needsUpdate = false;

        this.activeCountdowns.forEach((index, id) => {
            this.times[index] -= deltaTime;

            if (this.times[index] <= 0) {
                this.removeCountdown(id);
            } else if (this.times[index] <= 5 && this.times[index] + deltaTime > 5) {
                // Update color when crossing the 5-second threshold
                const color = new THREE.Color(0xdc143c);
                this.colors[index * 3] = color.r;
                this.colors[index * 3 + 1] = color.g;
                this.colors[index * 3 + 2] = color.b;
                this.geometry.getAttribute('instanceColor').needsUpdate = true;
            }
            needsUpdate = true;
        });

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

            this.geometry.getAttribute('time').needsUpdate = true;
            this.geometry.getAttribute('maxTime').needsUpdate = true;
            this.geometry.getAttribute('instanceColor').needsUpdate = true;
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
