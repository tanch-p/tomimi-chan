export class SpineScaleManager {
  constructor(camera) {
    this.camera = camera;
    this.spineModels = new Map(); // Store models and their base scales
  }

  // Add a spine model to be managed
  addModel(mesh, spineObject) {
    // Store the original scale we want to maintain
    this.spineModels.set(spineObject, mesh);
    this.updateModelScale(spineObject);
  }

  // Remove a spine model from management
  removeModel(spineObject) {
    this.spineModels.delete(spineObject);
  }

  // Update scale for a single model
  updateModelScale(spineObject) {
    const mesh = this.spineModels.get(spineObject);
    const yOffset = mesh.position.y;
    const distanceCompensation = 1 + -yOffset / 1200;
    const finalScale = 1 / distanceCompensation;
    spineObject.scale.set(spineObject.scale.x, finalScale, finalScale);
  }

  // Update all managed models
  updateAll() {
    for (const spineObject of this.spineModels.keys()) {
      this.updateModelScale(spineObject);
    }
  }
}
