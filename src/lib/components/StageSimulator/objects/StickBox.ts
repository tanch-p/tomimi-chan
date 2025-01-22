import * as THREE from "three";
import { GameConfig } from "./GameConfig";

export class StickBox {
  constructor(width = 1, height = 1, depth = 1, color = 'blue',z=50 ) {
    this.group = new THREE.Group();
    const hexCode = color === "blue" ? 0x359dde : 0xca1d00

    const stickMaterial = new THREE.MeshLambertMaterial({
      color: hexCode,
      // alphaMap: GameConfig.sprites.get(color).texture,
      transparent:true,
      opacity:0.8
    });

    // Stick dimensions
    const stickThickness = 5;

    // Create stick geometries
    // Vertical sticks now go along Z axis
    const verticalStickGeometry = new THREE.BoxGeometry(
      stickThickness,
      stickThickness,
      depth
    );
    // Horizontal sticks for XY plane
    const horizontalStickGeometryX = new THREE.BoxGeometry(
      width,
      stickThickness,
      stickThickness
    );
    const horizontalStickGeometryY = new THREE.BoxGeometry(
      stickThickness,
      height,
      stickThickness
    );

    // Create front face with texture
    const frontTexture = GameConfig.sprites.get("blueBox").texture;
    const frontMaterial = new THREE.MeshStandardMaterial({
      map: frontTexture,
      transparent: true,
      color: hexCode,
    });
    const frontGeometry = new THREE.PlaneGeometry(width, height);
    const frontPlane = new THREE.Mesh(frontGeometry, frontMaterial);

    const { UVWidth, UVHeight, uvOffsetX, uvOffsetY } =
      GameConfig.sprites.get("blueBox").config;

    // Modify UV coordinates to match the specific tile in the sprite sheet
    const uvs = frontGeometry.attributes.uv;
    const uvArray = uvs.array;

    // Set UV coordinates for each vertex
    // Bottom left
    uvArray[0] = uvOffsetX;
    uvArray[1] = uvOffsetY;
    // Bottom right
    uvArray[2] = uvOffsetX + UVWidth;
    uvArray[3] = uvOffsetY;
    // Top left
    uvArray[4] = uvOffsetX;
    uvArray[5] = uvOffsetY + UVHeight;
    // Top right
    uvArray[6] = uvOffsetX + UVWidth;
    uvArray[7] = uvOffsetY + UVHeight;

    // Position front plane at the front of the box
    frontPlane.position.z = depth / 2;
    frontPlane.rotateZ(Math.PI);

    // Create vertical sticks (at corners)
    const corners = [
      { x: -width / 2, y: -height / 2 },
      { x: width / 2, y: -height / 2 },
      { x: -width / 2, y: height / 2 },
      { x: width / 2, y: height / 2 },
    ];

    corners.forEach((corner) => {
      const stick = new THREE.Mesh(verticalStickGeometry, stickMaterial);
      stick.position.set(corner.x, corner.y, 0);
      this.group.add(stick);
      stick.renderOrder=-1;
    });

    // Create horizontal frame at front and back
    const createHorizontalFrame = (zPos) => {
      // X-axis sticks (top and bottom)
      [-height / 2, height / 2].forEach((y) => {
        const stick = new THREE.Mesh(horizontalStickGeometryX, stickMaterial);
        stick.position.set(0, y, zPos);
        this.group.add(stick);
        stick.renderOrder=-1;

      });

      // Y-axis sticks (left and right)
      [-width / 2, width / 2].forEach((x) => {
        const stick = new THREE.Mesh(horizontalStickGeometryY, stickMaterial);
        stick.position.set(x, 0, zPos);
        this.group.add(stick);
        stick.renderOrder=-1;

      });
    };

    // Create front and back frames
    createHorizontalFrame(-depth / 2); // Back frame
    createHorizontalFrame(depth / 2); // Front frame

    // Add front plane
    this.group.add(frontPlane);
    this.group.position.set(0,0,z)
  }

  getMesh() {
    return this.group;
  }
}
