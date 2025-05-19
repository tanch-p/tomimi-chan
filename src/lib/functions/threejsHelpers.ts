import * as THREE from 'three';

export function clearObjects(object: THREE.Object3D) {
	if (!object) {
		return;
	}
	const objectsToRemove: THREE.Object3D[] = [];
	object.traverse((obj) => {
		objectsToRemove.push(obj); // Collect objects
		if (obj?.batches) {
			for (const batch of obj.batches) {
				disposeObject(batch);
			}
		}
	});
	objectsToRemove.forEach((obj) => {
		// Dispose of geometry and material
		disposeObject(obj);
		// Remove from parent
		if (obj.parent) {
			obj.parent.remove(obj);
		}
	});
}
function disposeObject(obj: THREE.Object3D) {
	if ((obj as THREE.Mesh).geometry) {
		(obj as THREE.Mesh).geometry.dispose();
	}

	if ((obj as THREE.Mesh).material) {
		const material = (obj as THREE.Mesh).material;
		if (Array.isArray(material)) {
			material.forEach((mat) => mat.dispose());
		} else {
			material.dispose();
		}
	}
}
