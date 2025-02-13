import * as THREE from 'three';
import { GameConfig } from './GameConfig';
import { GameManager } from './GameManager';

export class CountdownSprite {
	private group: THREE.Group;
	private textMesh: THREE.Mesh;
	private color = 0xf08080;
	private circleMaterial: THREE.MeshBasicMaterial;
	private circle: THREE.Mesh;
	private static circleGeometry: THREE.CircleGeometry;
	private static ringGeometry: THREE.RingGeometry;

	constructor(private gameManager: GameManager) {
		// Create static geometries if they don't exist
		if (!CountdownSprite.circleGeometry) {
			CountdownSprite.circleGeometry = new THREE.CircleGeometry(GameConfig.gridSize / 4, 32);
			CountdownSprite.ringGeometry = new THREE.RingGeometry(
				GameConfig.gridSize / 4 - 1,
				GameConfig.gridSize / 4,
				32
			);
		}
		this.group = new THREE.Group();
		this.group.visible = false;
		this.setupMeshes();
	}

	private setupMeshes(): void {
		// Create materials
		this.circleMaterial = new THREE.MeshBasicMaterial({
			color: this.color,
			transparent: true,
			depthTest: false
		});

		const ringMaterial = new THREE.MeshBasicMaterial({
			color: 0x666666,
			transparent: true,
			depthTest: false
		});

		// Create meshes
		this.circle = new THREE.Mesh(CountdownSprite.circleGeometry, this.circleMaterial);
		const ring = new THREE.Mesh(CountdownSprite.ringGeometry, ringMaterial);

		ring.position.z = 1;
		this.group.renderOrder = 10;

		// Initial text mesh
		this.textMesh = this.gameManager.getTextSprite('', 16);

		// Add to group
		this.group.add(ring, this.circle, this.textMesh);
	}

	public updateTimer(time: number): void {
		// Update color based on time
		const color = time <= 5 ? 0xdc143c : this.color;
		this.circleMaterial.color.setHex(color);

		// Update text
		const oldTextMesh = this.textMesh;
		this.textMesh = this.gameManager.getTextSprite(time.toFixed(), 16);
		this.group.remove(oldTextMesh);
		this.group.add(this.textMesh);

		// Dispose old text sprite
		if (oldTextMesh.material) {
			oldTextMesh.material.dispose();
		}
	}

	public setPosition(height: number): void {
		this.group.position.set(0, height + GameConfig.gridSize / 5, 0);
	}

	public getMesh(): THREE.Group {
		return this.group;
	}

	public dispose(): void {
		// Dispose materials
		this.circleMaterial.dispose();

		// Remove from group
		this.group.children.forEach((child) => {
			if (child instanceof THREE.Mesh) {
				if (child.material) {
					(child.material as THREE.Material).dispose();
				}
			}
			if (child instanceof THREE.Sprite) {
				if (child.material) {
					child.material.dispose();
				}
			}
		});

		// Clear group
		while (this.group.children.length > 0) {
			this.group.remove(this.group.children[0]);
		}
	}

	public setColor(val): void {
		this.color = val;
	}

	// Static cleanup method
	public static dispose(): void {
		if (CountdownSprite.circleGeometry) {
			CountdownSprite.circleGeometry.dispose();
			CountdownSprite.circleGeometry = null;
		}
		if (CountdownSprite.ringGeometry) {
			CountdownSprite.ringGeometry.dispose();
			CountdownSprite.ringGeometry = null;
		}
	}
}
