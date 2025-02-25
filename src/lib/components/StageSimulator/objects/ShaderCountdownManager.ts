import * as THREE from 'three';
import { GameConfig } from './GameConfig';

// Constants moved to JavaScript
const GRID_SIZE = GameConfig.gridSize;

// Fixed shader code with precision qualifiers and proper uniform declarations
const COUNTDOWN_VERTEX_SHADER = `
  precision highp float;
  precision highp int;
  
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float time;
  
  attribute vec2 position;
  attribute vec2 uv;
  attribute float instanceIndex;
  attribute vec4 instanceData; // x: startTime, y: duration, z,w: position
  attribute vec3 instanceColor;
  
  varying vec2 vUv;
  varying float vTimeRemaining;
  varying float vMaxTime;
  varying vec3 vColor;
  varying float vInstanceId;
  
  void main() {
    vUv = uv;
    vColor = instanceColor;
    vInstanceId = instanceIndex;
    
    // Get instance data
    float startTime = instanceData.x;
    float duration = instanceData.y;
    vec2 instancePosition = instanceData.zw;
    
    // Calculate remaining time
    float elapsed = time - startTime;
    vTimeRemaining = max(0.0, duration - elapsed);
    vMaxTime = duration;
    
    // Transform vertex
    float scale = float(GRID_SIZE) / 2.0; // Explicit conversion to float
    vec2 scaledPosition = position * scale;
    vec2 worldPosition = instancePosition + scaledPosition;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPosition, 0.0, 1.0);
  }
`;

const COUNTDOWN_FRAGMENT_SHADER = `
  precision highp float;
  precision highp int;
  
  varying vec2 vUv;
  varying float vTimeRemaining;
  varying float vMaxTime;
  varying vec3 vColor;
  varying float vInstanceId;
  
  // SDF functions
  float sdBox(vec2 p, vec2 b) {
    vec2 d = abs(p) - b;
    return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
  }
  
  float sdSegment(vec2 p, vec2 a, vec2 b, float w) {
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h) - w;
  }
  
  // Optimized digit rendering with lookup table approach
  float drawDigit(vec2 uv, float number) {
    float d = 1e6;
    float w = 0.12; // Segment width
    
    // Scale factor for bigger digits
    float scale = 0.7;
    uv = uv * (1.0 / scale);
    
    // Define digit segments positions
    vec2 s1 = vec2(-0.2, 0.35);
    vec2 s2 = vec2(0.2, 0.35);
    vec2 s3 = vec2(-0.2, 0.0);
    vec2 s4 = vec2(0.2, 0.0);
    vec2 s5 = vec2(-0.2, -0.35);
    vec2 s6 = vec2(0.2, -0.35);
    
    // Efficient segment lookup using step functions
    float n = floor(number);
    
    // Horizontal top
    if (step(0.5, n) * (1.0 - step(1.5, n)) + 
        step(2.5, n) * (1.0 - step(4.5, n)) + 
        step(5.5, n) * (1.0 - step(6.5, n)) +
        step(8.5, n) > 0.5) {
      d = min(d, sdSegment(uv, s1, s2, w));
    }
    
    // Vertical top left
    if ((1.0 - step(1.5, n)) * (1.0 - step(0.5, n)) + 
        step(4.5, n) * (1.0 - step(5.5, n)) +
        step(6.5, n) * (1.0 - step(7.5, n)) +
        step(8.5, n) + step(9.5, n) > 0.5) {
      d = min(d, sdSegment(uv, s1, s3, w));
    }
    
    // Vertical top right
    if ((1.0 - step(1.5, n)) + 
        step(2.5, n) * (1.0 - step(3.5, n)) +
        step(4.5, n) * (1.0 - step(5.5, n)) +
        step(8.5, n) + step(9.5, n) > 0.5) {
      d = min(d, sdSegment(uv, s2, s4, w));
    }
    
    // Horizontal middle
    if (step(2.5, n) * (1.0 - step(3.5, n)) + 
        step(4.5, n) * (1.0 - step(5.5, n)) +
        step(6.5, n) * (1.0 - step(7.5, n)) +
        step(8.5, n) + step(9.5, n) > 0.5) {
      d = min(d, sdSegment(uv, s3, s4, w));
    }
    
    // Vertical bottom left
    if ((1.0 - step(1.5, n)) * (1.0 - step(0.5, n)) +
        step(2.5, n) * (1.0 - step(3.5, n)) +
        step(6.5, n) * (1.0 - step(7.5, n)) +
        step(8.5, n) > 0.5) {
      d = min(d, sdSegment(uv, s3, s5, w));
    }
    
    // Vertical bottom right
    if ((1.0 - step(1.5, n)) * (1.0 - step(0.5, n)) +
        step(1.5, n) * (1.0 - step(2.5, n)) +
        step(3.5, n) * (1.0 - step(4.5, n)) +
        step(4.5, n) * (1.0 - step(5.5, n)) +
        step(5.5, n) * (1.0 - step(6.5, n)) +
        step(8.5, n) + step(9.5, n) > 0.5) {
      d = min(d, sdSegment(uv, s4, s6, w));
    }
    
    // Horizontal bottom
    if ((1.0 - step(1.5, n)) * (1.0 - step(0.5, n)) +
        step(2.5, n) * (1.0 - step(3.5, n)) +
        step(5.5, n) * (1.0 - step(6.5, n)) +
        step(8.5, n) > 0.5) {
      d = min(d, sdSegment(uv, s5, s6, w));
    }
    
    return smoothstep(0.015, 0.0, d);
  }
  
  void main() {
    // Base circle
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(vUv, center);
    float circle = smoothstep(0.5, 0.48, dist);
    
    // Progress ring
    float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
    float normalizedAngle = angle * 0.15915494309; // 1/(2*PI)
    float progress = 1.0 - (vTimeRemaining / vMaxTime);
    float ring = step(normalizedAngle, progress);
    float ringThickness = smoothstep(0.5, 0.48, dist) - smoothstep(0.45, 0.43, dist);
    
    // Render digit - optimization: only render if time is > 0
    float digit = 0.0;
    if (vTimeRemaining > 0.0) {
      vec2 digitUV = (vUv - vec2(0.5)) * 2.0;
      digit = drawDigit(digitUV, mod(ceil(vTimeRemaining), 10.0));
    }
    
    // Combine effects
    vec3 baseColor = vColor;
    vec3 ringColor = vec3(0.4, 0.4, 0.4);
    vec3 digitColor = vec3(1.0);
    
    vec3 color = mix(ringColor, baseColor, circle * (1.0 - ringThickness));
    float alpha = max(circle * (1.0 - ringThickness), ringThickness * ring);
    
    // Add digit
    color = mix(color, digitColor, digit);
    alpha = max(alpha, digit);
    
    // Discard transparent pixels for better performance
    if (alpha < 0.01) discard;
    
    gl_FragColor = vec4(color, alpha);
  }
`;

export class ShaderCountdownManager {
	private material: THREE.RawShaderMaterial;
	private geometry: THREE.InstancedBufferGeometry;
	private mesh: THREE.Mesh;
	private readonly MAX_INSTANCES = 5000; // Increased capacity

	// Optimized data structures
	private instanceData: Float32Array; // [startTime, duration, posX, posY]
	private instanceColors: Float32Array;
	private availableIndices: number[] = [];
	private activeCountdowns: Map<number, number> = new Map();

	// Time tracking
	private clock: THREE.Clock;
	private elapsedTime: number = 0;

	constructor() {
		this.clock = new THREE.Clock();
		this.initializeBuffers();
		this.initializeGeometry();
		this.initializeMaterial();
		this.createMesh();

		// Initialize available indices
		for (let i = 0; i < this.MAX_INSTANCES; i++) {
			this.availableIndices.push(i);
		}
	}

	private initializeBuffers() {
		// Create instance data buffer: [startTime, duration, posX, posY] per instance
		this.instanceData = new Float32Array(this.MAX_INSTANCES * 4);

		// Create instance colors buffer: [r, g, b] per instance
		this.instanceColors = new Float32Array(this.MAX_INSTANCES * 3);

		// Initialize with inactive state (-1 start time means inactive)
		for (let i = 0; i < this.MAX_INSTANCES; i++) {
			this.instanceData[i * 4] = -1; // startTime = -1 (inactive)
		}
	}

	private initializeGeometry() {
		// Create instanced plane geometry
		const planeGeometry = new THREE.PlaneGeometry(1, 1, 1, 1);
		this.geometry = new THREE.InstancedBufferGeometry();

		// Copy attributes from the base geometry
		this.geometry.setAttribute('position', planeGeometry.getAttribute('position'));
		this.geometry.setAttribute('uv', planeGeometry.getAttribute('uv'));
		this.geometry.setIndex(planeGeometry.getIndex());

		// Add instance-specific attributes
		const indices = new Float32Array(this.MAX_INSTANCES);
		for (let i = 0; i < this.MAX_INSTANCES; i++) {
			indices[i] = i;
		}

		// Add instance index attribute
		this.geometry.setAttribute(
			'instanceIndex',
			new THREE.InstancedBufferAttribute(indices, 1, false)
		);

		// Add instance data attribute
		this.geometry.setAttribute(
			'instanceData',
			new THREE.InstancedBufferAttribute(this.instanceData, 4, true)
		);

		// Add instance color attribute
		this.geometry.setAttribute(
			'instanceColor',
			new THREE.InstancedBufferAttribute(this.instanceColors, 3, true)
		);
	}

	private initializeMaterial() {
		this.material = new THREE.RawShaderMaterial({
			vertexShader: COUNTDOWN_VERTEX_SHADER.replace('GRID_SIZE', GRID_SIZE.toString()),
			fragmentShader: COUNTDOWN_FRAGMENT_SHADER,
			transparent: true,
			depthTest: false,
			depthWrite: false,
			uniforms: {
				time: { value: 0 }
			}
		});
	}

	private createMesh() {
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.renderOrder = 999;
	}

	/**
	 * Create a new countdown timer at the specified position
	 */
	public createCountdown(position: THREE.Vector3, duration: number): number {
		if (this.availableIndices.length === 0) {
			console.warn('Maximum number of countdowns reached');
			return -1;
		}

		const instanceIndex = this.availableIndices.pop();
		const id = Math.floor(Math.random() * 1000000); // Simple ID generation

		// Update instance data
		const dataOffset = instanceIndex * 4;
		this.instanceData[dataOffset] = this.elapsedTime; // startTime
		this.instanceData[dataOffset + 1] = duration; // duration
		this.instanceData[dataOffset + 2] = position.x; // posX
		this.instanceData[dataOffset + 3] = position.y; // posY

		// Update color based on duration
		const colorOffset = instanceIndex * 3;
		const color = new THREE.Color(duration <= 5 ? 0xdc143c : 0xf08080);
		this.instanceColors[colorOffset] = color.r;
		this.instanceColors[colorOffset + 1] = color.g;
		this.instanceColors[colorOffset + 2] = color.b;

		// Mark data as needing update
		this.geometry.getAttribute('instanceData').needsUpdate = true;
		this.geometry.getAttribute('instanceColor').needsUpdate = true;

		// Store the association
		this.activeCountdowns.set(id, instanceIndex);

		return id;
	}

	/**
	 * Update the position of an existing countdown
	 */
	public updatePosition(id: number, position: THREE.Vector2 | THREE.Vector3): boolean {
		const instanceIndex = this.activeCountdowns.get(id);
		if (instanceIndex === undefined) return false;

		const dataOffset = instanceIndex * 4;
		this.instanceData[dataOffset + 2] = position.x;
		this.instanceData[dataOffset + 3] = position instanceof THREE.Vector2 ? position.y : position.y;

		this.geometry.getAttribute('instanceData').needsUpdate = true;
		return true;
	}

	/**
	 * Update the countdown system
	 */
	public update() {
		const deltaTime = this.clock.getDelta();
		this.elapsedTime += deltaTime;

		// Update uniform time
		this.material.uniforms.time.value = this.elapsedTime;

		// Optional: Check for expired countdowns
		this.removeExpiredCountdowns();
	}

	/**
	 * Remove countdowns that have expired
	 */
	private removeExpiredCountdowns() {
		const toRemove: number[] = [];

		this.activeCountdowns.forEach((instanceIndex, id) => {
			const dataOffset = instanceIndex * 4;
			const startTime = this.instanceData[dataOffset];
			const duration = this.instanceData[dataOffset + 1];

			if (startTime >= 0 && this.elapsedTime - startTime > duration) {
				toRemove.push(id);
			}
		});

		// Remove expired countdowns
		for (const id of toRemove) {
			this.removeCountdown(id);
		}
	}

	/**
	 * Remove a specific countdown
	 */
	public removeCountdown(id: number): boolean {
		const instanceIndex = this.activeCountdowns.get(id);
		if (instanceIndex === undefined) return false;

		// Mark this instance as inactive
		const dataOffset = instanceIndex * 4;
		this.instanceData[dataOffset] = -1; // startTime = -1 means inactive

		// Update the attribute
		this.geometry.getAttribute('instanceData').needsUpdate = true;

		// Free up the index
		this.availableIndices.push(instanceIndex);
		this.activeCountdowns.delete(id);

		return true;
	}

	/**
	 * Get the countdown mesh to add to the scene
	 */
	public getMesh(): THREE.Mesh {
		return this.mesh;
	}

	/**
	 * Clean up resources
	 */
	public dispose() {
		this.geometry.dispose();
		this.material.dispose();
	}
}
