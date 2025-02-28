import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { AssetManager } from './AssetManager';
import { GameConfig } from './GameConfig';

// Font atlas generator that uses Three.js FontLoader
class SDFFontAtlas {
	texture: THREE.Texture;
	charWidth: number;
	charHeight: number;
	charsPerRow: number;
	chars: string;
	isReady: boolean = false;
	onReadyCallbacks: (() => void)[] = [];
	assetManager: AssetManager;

	constructor() {
		this.assetManager = AssetManager.getInstance();
		this.chars = '0123456789';
		this.charWidth = 64;
		this.charHeight = 64;
		this.charsPerRow = 4;

		// Create a placeholder texture until the font loads
		const canvas = document.createElement('canvas');
		canvas.width = 1;
		canvas.height = 1;
		this.texture = new THREE.Texture(canvas);

		// Load the font and generate the SDF atlas
		this.generateAtlas();
	}

	private generateAtlas(): void {
		const font = this.assetManager.font;

		// Create canvas for the atlas
		const canvas = document.createElement('canvas');
		const atlasWidth = this.charWidth * this.charsPerRow;
		const atlasHeight = this.charHeight * Math.ceil(this.chars.length / this.charsPerRow);
		canvas.width = atlasWidth;
		canvas.height = atlasHeight;

		const ctx = canvas.getContext('2d');
		if (!ctx) throw new Error('Could not get canvas context');

		// Clear canvas
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Create a temporary scene to render each character
		const tempScene = new THREE.Scene();
		const tempCamera = new THREE.OrthographicCamera(
			-this.charWidth / 2,
			this.charWidth / 2,
			this.charHeight / 2,
			-this.charHeight / 2,
			0.1,
			100
		);
		tempCamera.position.z = 50;

		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
			preserveDrawingBuffer: true
		});
		renderer.setSize(this.charWidth, this.charHeight);

		// Generate SDF for each character
		for (let i = 0; i < this.chars.length; i++) {
			const char = this.chars[i];

			// Create text geometry with the loaded font
			const textGeometry = new TextGeometry(char, {
				font: font,
				size: 40,
				depth: 0, // Flat text for SDF
				curveSegments: 12
			});

			// Center the text geometry
			textGeometry.computeBoundingBox();
			const textWidth =
				textGeometry.boundingBox?.max.x || 0 - (textGeometry.boundingBox?.min.x || 0);
			const textHeight =
				textGeometry.boundingBox?.max.y || 0 - (textGeometry.boundingBox?.min.y || 0);
			textGeometry.translate(
				-(textGeometry.boundingBox?.min.x || 0) - textWidth / 2,
				-(textGeometry.boundingBox?.min.y || 0) - textHeight / 2,
				0
			);

			// Create mesh and add to scene
			const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
			const textMesh = new THREE.Mesh(textGeometry, material);
			tempScene.add(textMesh);

			// Render to generate the character
			renderer.render(tempScene, tempCamera);

			// Draw to atlas
			const x = (i % this.charsPerRow) * this.charWidth;
			const y = Math.floor(i / this.charsPerRow) * this.charHeight;

			// Get the rendered image
			const image = renderer.domElement;

			// Draw to the atlas
			ctx.drawImage(image, x, y, this.charWidth, this.charHeight);

			// Clean up
			tempScene.remove(textMesh);
			textGeometry.dispose();
			material.dispose();
		}

		// Post-process the atlas to create SDF
		this.createSDF(canvas);

		// Clean up
		renderer.dispose();

		// Notify that atlas is ready
		this.isReady = true;
		this.onReadyCallbacks.forEach((callback) => callback());
	}

	// Generate SDF from the rendered characters
	private createSDF(canvas: HTMLCanvasElement): void {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		// Get image data
		const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		const data = imageData.data;

		// Simple SDF algorithm (in a real implementation, use a more sophisticated algorithm)
		// This is a basic approximation - a production implementation would use a proper SDF algorithm
		const sdfData = new Uint8ClampedArray(data.length);
		const maxDistance = 20; // Maximum distance to check

		// For each pixel in the atlas
		for (let y = 0; y < canvas.height; y++) {
			for (let x = 0; x < canvas.width; x++) {
				const idx = (y * canvas.width + x) * 4;

				// Check if this is a text pixel (white in our rendering)
				const isText = data[idx] > 128;

				// Find distance to nearest opposite pixel
				let minDistance = maxDistance;

				// Search in a square around the current pixel
				for (let dy = -maxDistance; dy <= maxDistance; dy++) {
					for (let dx = -maxDistance; dx <= maxDistance; dx++) {
						const nx = x + dx;
						const ny = y + dy;

						// Skip pixels outside the atlas
						if (nx < 0 || nx >= canvas.width || ny < 0 || ny >= canvas.height) continue;

						const nidx = (ny * canvas.width + nx) * 4;
						const nIsText = data[nidx] > 128;

						// If the neighboring pixel is of the opposite type
						if (nIsText !== isText) {
							const dist = Math.sqrt(dx * dx + dy * dy);
							minDistance = Math.min(minDistance, dist);
						}
					}
				}

				// Normalize distance to 0-1 range and convert to 0-255
				let sdfValue = minDistance / maxDistance;
				if (!isText) sdfValue = 1 - sdfValue; // Invert for outside pixels

				// Set the SDF value in the output
				sdfData[idx] = Math.round(sdfValue * 255);
				sdfData[idx + 1] = Math.round(sdfValue * 255);
				sdfData[idx + 2] = Math.round(sdfValue * 255);
				sdfData[idx + 3] = 255; // Alpha
			}
		}

		// Create new image data with SDF values
		const sdfImageData = new ImageData(sdfData, canvas.width, canvas.height);
		ctx.putImageData(sdfImageData, 0, 0);

		// Update the texture
		this.texture.image = canvas;
		this.texture.needsUpdate = true;
	}

	// Register a callback for when the atlas is ready
	onReady(callback: () => void): void {
		if (this.isReady) {
			callback();
		} else {
			this.onReadyCallbacks.push(callback);
		}
	}

	// Get UV coordinates for a character
	getCharUVs(char: string): THREE.Vector4 {
		const index = this.chars.indexOf(char);
		if (index === -1) return new THREE.Vector4(0, 0, 0, 0); // Invalid char

		const x = (index % this.charsPerRow) * this.charWidth;
		const y = Math.floor(index / this.charsPerRow) * this.charHeight;

		// UV coordinates (left, bottom, right, top)
		return new THREE.Vector4(
			x / this.texture.image.width,
			1 - (y + this.charHeight) / this.texture.image.height,
			(x + this.charWidth) / this.texture.image.width,
			1 - y / this.texture.image.height
		);
	}
}

// Countdown Manager Class
export class CountdownManager {
	private static instance: CountdownManager;
	private fontAtlas: SDFFontAtlas;
	private countdowns: Map<number, CountdownSprite>;
	private shaderMaterial: THREE.ShaderMaterial;
	private isReady: boolean = false;
	private pendingCountdowns: Array<{
		id: number;
		initialTime: number;
		color: number;
		callback: (countdown: CountdownSprite) => void;
	}> = [];
	private indexCounter = 0;

	// Singleton pattern
	public static getInstance(): CountdownManager {
		if (!CountdownManager.instance) {
			CountdownManager.instance = new CountdownManager();
		}
		return CountdownManager.instance;
	}

	private constructor() {
		this.fontAtlas = new SDFFontAtlas();
		this.countdowns = new Map();

		// Create the shader material for all countdowns
		this.shaderMaterial = new THREE.ShaderMaterial({
			uniforms: {
				fontTexture: { value: this.fontAtlas.texture },
				color: { value: new THREE.Color(0xffffff) },
				time: { value: 0.0 }
			},
			vertexShader: `
		  varying vec2 vUv;
		  void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		  }
		`,
			fragmentShader: `
		  uniform sampler2D fontTexture;
		  uniform vec3 color;
		  uniform float time;
		  
		  varying vec2 vUv;
		  
		  void main() {
			// Sample the texture
			vec4 texColor = texture2D(fontTexture, vUv);
			
			// SDF rendering - use the red channel for the SDF value
			float sdf = texColor.r;
			float smoothing = 0.1;
			float alpha = smoothstep(0.5 - smoothing, 0.5 + smoothing, sdf);
			
			gl_FragColor = vec4(color, alpha);
		  }
		`,
			transparent: true,
			depthTest: false,
			side: THREE.DoubleSide
		});

		// Wait for the font atlas to be ready
		this.fontAtlas.onReady(() => {
			this.isReady = true;

			// Process any pending countdown creations
			this.pendingCountdowns.forEach((pending) => {
				const countdown = this.createCountdownInternal(
					pending.id,
					pending.initialTime,
					pending.color
				);
				pending.callback(countdown);
			});

			this.pendingCountdowns = [];
		});
	}

	// Private method to create countdown once font is loaded
	private createCountdownInternal(id: number, initialTime: number, color: number): CountdownSprite {
		if (this.countdowns.has(id)) {
			console.warn(`Countdown with id ${id} already exists. Returning existing instance.`);
			return this.countdowns.get(id)!;
		}

		const countdown = new CountdownSprite(
			id,
			initialTime,
			color,
			this.fontAtlas,
			this.shaderMaterial
		);
		this.countdowns.set(id, countdown);
		return countdown;
	}

	// Public method that handles font loading asynchronously
	createCountdown(initialTime: number, color = 0xf08080): Promise<CountdownSprite> {
		return new Promise<CountdownSprite>((resolve) => {
			if (this.isReady) {
				resolve(this.createCountdownInternal(this.indexCounter, initialTime, color));
			} else {
				this.pendingCountdowns.push({
					id: this.indexCounter,
					initialTime,
					color,
					callback: resolve
				});
			}
			this.indexCounter++;
		});
	}

	// Get an existing countdown
	getCountdown(id: number): CountdownSprite | undefined {
		return this.countdowns.get(id);
	}

	// Remove a countdown
	removeCountdown(id: number): void {
		const countdown = this.countdowns.get(id);
		if (countdown) {
			countdown.dispose();
			this.countdowns.delete(id);
		}
	}

	// Update all countdowns
	update(deltaTime: number): void {
		this.countdowns.forEach((countdown) => {
			countdown.update(deltaTime);
		});
	}

	// Dispose all resources
	dispose(): void {
		this.countdowns.forEach((countdown) => {
			countdown.dispose();
		});
		this.countdowns.clear();
		this.fontAtlas.texture.dispose();
		this.shaderMaterial.dispose();
	}

	// Check if manager is ready (font loaded)
	isManagerReady(): boolean {
		return this.isReady;
	}
}

export class CountdownSprite {
	private id: number;
	private group: THREE.Group;
	private time: number;
	private color: number;
	private warningColor: number = 0xdc143c;
	private warningThreshold: number = 5.0;

	private circleMesh: THREE.Mesh;
	private ringMesh: THREE.Mesh;
	private textMesh: THREE.Mesh;
	private textGeometry: THREE.BufferGeometry;

	private fontAtlas: SDFFontAtlas;
	private material: THREE.ShaderMaterial;
	private timeStr: string = '';

	// Shared geometry
	private static readonly circleGeometry = new THREE.CircleGeometry(GameConfig.gridSize / 4, 32);
	private static readonly ringGeometry = new THREE.RingGeometry(
		GameConfig.gridSize / 4 - 1,
		GameConfig.gridSize / 4,
		32
	);

	constructor(
		id: string,
		initialTime: number,
		color: number,
		fontAtlas: SDFFontAtlas,
		sharedMaterial: THREE.ShaderMaterial
	) {
		this.id = id;
		this.time = initialTime;
		this.color = color;
		this.fontAtlas = fontAtlas;

		// Create a group to hold all meshes
		this.group = new THREE.Group();
		this.group.renderOrder = 10;

		// Clone the shared material so each countdown can have its own color
		this.material = sharedMaterial.clone();
		this.material.uniforms.time.value = this.time;

		// Create circle background
		const circleMaterial = new THREE.MeshBasicMaterial({
			color: this.color,
			transparent: true,
			depthTest: false
		});
		this.circleMesh = new THREE.Mesh(CountdownSprite.circleGeometry, circleMaterial);

		// Create ring
		const ringMaterial = new THREE.MeshBasicMaterial({
			color: 0x666666,
			transparent: true,
			depthTest: false
		});
		this.ringMesh = new THREE.Mesh(CountdownSprite.ringGeometry, ringMaterial);
		this.ringMesh.position.z = 0.1;

		// Create text geometry (initially empty)
		this.textGeometry = new THREE.BufferGeometry();

		// Create text mesh using the SDF shader
		this.textMesh = new THREE.Mesh(this.textGeometry, this.material);
		this.textMesh.scale.x = 100;
		this.textMesh.scale.y = 100;
		this.textMesh.scale.z = 100;
		this.textMesh.position.z = 0.2;

		// Add all meshes to the group
		this.group.add(this.circleMesh, this.ringMesh, this.textMesh);

		// Update the display
		this.updateDisplay();
	}

	// Get the Three.js group for this countdown
	getGroup(): THREE.Group {
		return this.group;
	}

	// Set position of the countdown
	setPosition(x: number, y: number, z = 0): void {
		this.group.position.set(x, y, z);
	}

	// Set position relative to grid (compatible with your original code)
	setGridPosition(height: number, gridSize: number): void {
		this.group.position.set(0, height + gridSize / 5, 0);
	}

	// Update the countdown time
	setTime(time: number): void {
		this.time = time;
		this.updateDisplay();
	}

	// Set the color
	setColor(color: number): void {
		this.color = color;
		this.material.uniforms.color.value.setHex(color);
		(this.circleMesh.material as THREE.MeshBasicMaterial).color.setHex(
			this.time <= this.warningThreshold ? this.warningColor : this.color
		);
	}

	// Set the warning threshold
	setWarningThreshold(threshold: number): void {
		this.warningThreshold = threshold;
		this.material.uniforms.warningThreshold.value = threshold;
		this.updateDisplay();
	}

	// Set the warning color
	setWarningColor(color: number): void {
		this.warningColor = color;
		this.material.uniforms.warningColor.value.setHex(color);
		this.updateDisplay();
	}

	// THIS IS THE CRITICAL NEW METHOD: Create text geometry with correct UVs
	private createTextGeometry(text: string): THREE.BufferGeometry {
		// Skip if text is unchanged
		if (text === this.timeStr) return this.textGeometry;

		this.timeStr = text;

		// Calculate geometry for the text
		const digitWidth = 0.4; // Width of each digit
		const spacing = -0.1; // Spacing between digits
		const totalWidth = text.length * digitWidth + (text.length - 1) * spacing;

		// Arrays to hold the geometry data
		const positions: number[] = [];
		const uvs: number[] = [];
		const indices: number[] = [];

		// For each character in the text
		for (let i = 0; i < text.length; i++) {
			const char = text[i];

			// Get UV coordinates for this character from the font atlas
			const charUVs = this.fontAtlas.getCharUVs(char);

			// Calculate position of this digit
			const left = -totalWidth / 2 + i * (digitWidth + spacing);
			const right = left + digitWidth;
			const top = digitWidth / 2;
			const bottom = -digitWidth / 2;

			// Current vertex count (4 vertices per digit)
			const vCount = i * 4;

			// Add positions (x, y, z for each vertex)
			positions.push(
				left,
				top,
				0, // Top left
				right,
				top,
				0, // Top right
				right,
				bottom,
				0, // Bottom right
				left,
				bottom,
				0 // Bottom left
			);

			// Add UVs (u, v for each vertex)
			uvs.push(
				charUVs.x,
				charUVs.w, // Top left
				charUVs.z,
				charUVs.w, // Top right
				charUVs.z,
				charUVs.y, // Bottom right
				charUVs.x,
				charUVs.y // Bottom left
			);

			// Add indices (two triangles per digit)
			indices.push(
				vCount,
				vCount + 1,
				vCount + 2, // First triangle
				vCount,
				vCount + 2,
				vCount + 3 // Second triangle
			);
		}

		// Create or update the geometry
		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
		geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
		geometry.setIndex(indices);

		return geometry;
	}

	// Update time-based appearance
	private updateDisplay(): void {
		// Update material uniforms
		this.material.uniforms.time.value = this.time;

		// Update circle color based on warning threshold
		(this.circleMesh.material as THREE.MeshBasicMaterial).color.setHex(
			this.time <= this.warningThreshold ? this.warningColor : this.color
		);

		// Convert time to string and update geometry with proper UVs
		const timeString = Math.ceil(this.time).toString();

		// Create new geometry with the correct UVs for each digit
		const newGeometry = this.createTextGeometry(timeString);

		// Update the mesh with the new geometry
		if (newGeometry !== this.textGeometry) {
			this.textMesh.geometry.dispose(); // Clean up old geometry
			this.textMesh.geometry = newGeometry;
			this.textGeometry = newGeometry;
		}
	}

	update(deltaTime: number): void {
		const newTime = this.time - deltaTime;
		// Check if countdown has completed
		if (newTime <= 0) {
			this.time = 0;
			CountdownManager.getInstance().removeCountdown(this.id);
		} else {
			this.time = newTime;
		}

		// Update the display
		this.updateDisplay();
	}

	// Dispose resources
	dispose(): void {
		this.material.dispose();
		this.textGeometry.dispose();
		(this.circleMesh.material as THREE.MeshBasicMaterial).dispose();
		(this.ringMesh.material as THREE.MeshBasicMaterial).dispose();
		this.group.remove(this.circleMesh, this.ringMesh, this.textMesh);
	}
}
