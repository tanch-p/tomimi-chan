import * as THREE from 'three';
import { AssetManager } from './AssetManager';

export class AnimatedSmoke {
	assetManager: AssetManager;
	constructor(options = {}) {
		this.assetManager = AssetManager.getInstance();
		this.options = {
			scale: options.scale || 1,
			rotationSpeed: options.rotationSpeed || 0.001,
			fadeSpeed: options.fadeSpeed || 0.5,
			color: options.color || 0xffffff
		};

		// Load smoke texture
		this.smokeTexture = this.assetManager.textures.get('smoke').texture;

		// Create material with transparency
		this.smokeMaterial = new THREE.MeshLambertMaterial({
			map: this.smokeTexture,
			transparent: true,
			opacity: 1,
			color: this.options.color,
			blending: THREE.AdditiveBlending,
			depthWrite: false
		});

		// Create plane geometry for the smoke
		this.smokeGeometry = new THREE.PlaneGeometry(1, 1);
		this.smokeMesh = new THREE.Mesh(this.smokeGeometry, this.smokeMaterial);
		this.smokeMesh.scale.set(100, 100, 100);
		this.smokeMesh.position.y = 50;

		// Initialize properties for animation
		this.opacity = 1;
		this.rotating = true;
	}

	getMesh() {
		return this.smokeMesh;
	}

	setPosition(x, y, z) {
		this.smokeMesh.position.set(x, y, z);
	}

	// Method to create multiple smoke planes for a more complex effect
	createSmokeCloud(count = 5, spread = 1) {
		this.smokePlanes = [];

		for (let i = 0; i < count; i++) {
			const plane = new THREE.Mesh(this.smokeGeometry, this.smokeMaterial.clone());

			// Random position within spread range
			plane.position.set(
				(Math.random() - 0.5) * spread,
				(Math.random() - 0.5) * spread,
				(Math.random() - 0.5) * spread
			);

			// Random rotation
			plane.rotation.z = Math.random() * Math.PI * 2;

			// Random scale variation
			const scale = (0.7 + Math.random() * 0.6) * this.options.scale;
			plane.scale.set(scale, scale, scale);

			this.scene.add(plane);
			this.smokePlanes.push({
				mesh: plane,
				rotationSpeed: (Math.random() - 0.5) * this.options.rotationSpeed * 2,
				fadeSpeed: Math.random() * this.options.fadeSpeed
			});
		}
	}

	update(deltaTime) {
		// Single smoke plane animation
		if (this.rotating) {
			this.smokeMesh.rotation.z += this.options.rotationSpeed;
		}

		// Animate multiple smoke planes if they exist
		if (this.smokePlanes) {
			this.smokePlanes.forEach((plane, index) => {
				// Rotate
				plane.mesh.rotation.z += plane.rotationSpeed;

				// Fade in/out
				plane.mesh.material.opacity += Math.sin(Date.now() * 0.001 + index) * 0.01;
				plane.mesh.material.opacity = THREE.MathUtils.clamp(plane.mesh.material.opacity, 0.2, 0.7);

				// Move upward slowly
				plane.mesh.position.y += deltaTime * 0.1;

				// Reset position if too high
				if (plane.mesh.position.y > 2) {
					plane.mesh.position.y = -2;
				}
			});
		}
	}

	// Method to change smoke color
	setColor(color) {
		this.smokeMaterial.color.set(color);
		if (this.smokePlanes) {
			this.smokePlanes.forEach((plane) => {
				plane.mesh.material.color.set(color);
			});
		}
	}

	// Method to dispose of resources
	dispose() {
		this.smokeGeometry.dispose();
		this.smokeMaterial.dispose();
		this.smokeTexture.dispose();

		if (this.smokePlanes) {
			this.smokePlanes.forEach((plane) => {
				this.scene.remove(plane.mesh);
				plane.mesh.material.dispose();
			});
		}

		this.scene.remove(this.smokeMesh);
	}
}
