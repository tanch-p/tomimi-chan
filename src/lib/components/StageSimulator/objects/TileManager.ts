import * as THREE from "three";
import { GameConfig } from "./GameConfig";
import { TextSprite } from "./TextSprite";

export class TileManager {
  edgesMaterial: THREE.LineBasicMaterial;
  constructor(map = "") {
    const gridSize = GameConfig.gridSize;
    const floorIcons = GameConfig.sprites.get("floorIcons");
    this.edgesMaterial = new THREE.LineBasicMaterial({
      color: 0x484848,
      transparent: true,
      opacity: 0.4,
    });
  }

  get(tileName: string, blackboard) {
    const boxGroup = new THREE.Group();
    let geometry;
    let topTexture;
    let depth = 0,
      size = 1;

    switch (tileName) {
      case "tile_telin":
      case "tile_telout":
        boxGroup.add(
          this.createTeleport(
            blackboard.direction,
            tileName,
            blackboard.colorIndex,
            blackboard.type
          )
        );
        return boxGroup;
      case "tile_forbidden":
        return this.createBox(40, 0xb8b8b8, 0x292929);
      case "tile_wall":
        return this.createBox(40, 0xff8108, 0xc1c1c1, "tile_wall");
      case "tile_hole":
        const hollowBox = this.createHollowBox();
        boxGroup.add(hollowBox);
        const material = new THREE.MeshStandardMaterial({
          color: 0xc1c1c1,
          side: THREE.DoubleSide,
        });
        const topAttachmentDepth = 7;
        const topHazardDepth = 9;
        const topHazardWidth = GameConfig.gridSize - topAttachmentDepth * 2;
        const vertHazard = GameConfig.sprites.get("hole_hazard_vert");
        const vertHazardTexture = this.getTopTexture(
          vertHazard,
          null,
          size,
          topHazardDepth,
          new THREE.PlaneGeometry(topHazardDepth, topHazardWidth)
        );
        const horizHazard = GameConfig.sprites.get("hole_hazard_horiz");
        const horizHazardTexture = this.getTopTexture(
          horizHazard,
          null,
          size,
          topHazardDepth,
          new THREE.PlaneGeometry(topHazardWidth, topHazardDepth)
        );
        // Bottom
        const btmTopAttachment = new THREE.Mesh(
          new THREE.BoxGeometry(
            GameConfig.gridSize,
            topAttachmentDepth,
            topAttachmentDepth
          ),
          material
        );
        btmTopAttachment.position.y =
          -GameConfig.gridSize / 2 + topAttachmentDepth / 2;
        btmTopAttachment.position.z =
          GameConfig.gridSize / 2 - topAttachmentDepth / 2;
        boxGroup.add(btmTopAttachment);
        const btmBtmAttachment = new THREE.Mesh(
          new THREE.BoxGeometry(GameConfig.gridSize, 10, 10),
          material
        );
        btmBtmAttachment.position.y = -GameConfig.gridSize / 2 + 10 / 2;
        btmBtmAttachment.position.z = -GameConfig.gridSize / 2 + 10 / 2;
        boxGroup.add(btmBtmAttachment);
        //hazard
        const btmTopHazard = new THREE.Mesh(
          new THREE.BoxGeometry(topHazardWidth, topHazardDepth, topHazardDepth),
          material
        );
        const btmHazardGroup = new THREE.Group();
        btmHazardGroup.position.y =
          -GameConfig.gridSize / 2 + topHazardDepth / 2 + topAttachmentDepth;
        btmHazardGroup.position.z =
          GameConfig.gridSize / 2 - topAttachmentDepth / 2 - 10;
        btmHazardGroup.add(btmTopHazard);
        btmHazardGroup.add(horizHazardTexture.clone());
        boxGroup.add(btmHazardGroup);

        // Top
        const topTopAttachment = new THREE.Mesh(
          new THREE.BoxGeometry(
            GameConfig.gridSize,
            topAttachmentDepth,
            topAttachmentDepth
          ),
          material
        );
        topTopAttachment.position.y =
          GameConfig.gridSize / 2 - topAttachmentDepth / 2;
        topTopAttachment.position.z =
          GameConfig.gridSize / 2 - topAttachmentDepth / 2;
        boxGroup.add(topTopAttachment);
        const topBtmAttachment = new THREE.Mesh(
          new THREE.BoxGeometry(GameConfig.gridSize, 10, 10),
          material
        );
        topBtmAttachment.position.y = GameConfig.gridSize / 2 - 10 / 2;
        topBtmAttachment.position.z = -GameConfig.gridSize / 2 + 10 / 2;
        boxGroup.add(topBtmAttachment);
        //hazard
        const topTopHazard = new THREE.Mesh(
          new THREE.BoxGeometry(topHazardWidth, topHazardDepth, topHazardDepth),
          material
        );
        const topHazardGroup = new THREE.Group();
        topHazardGroup.position.y =
          GameConfig.gridSize / 2 - topHazardDepth / 2 - topAttachmentDepth;
        topHazardGroup.position.z =
          GameConfig.gridSize / 2 - topAttachmentDepth / 2 - 10;
        topHazardGroup.add(topTopHazard);
        topHazardGroup.add(horizHazardTexture.clone());
        boxGroup.add(topHazardGroup);

        // Left wall
        const leftTopAttachment = new THREE.Mesh(
          new THREE.BoxGeometry(
            topAttachmentDepth,
            GameConfig.gridSize,
            topAttachmentDepth
          ),
          material
        );
        leftTopAttachment.position.x =
          -GameConfig.gridSize / 2 + topAttachmentDepth / 2;
        leftTopAttachment.position.z =
          GameConfig.gridSize / 2 - topAttachmentDepth / 2;
        boxGroup.add(leftTopAttachment);
        const leftBtmAttachment = new THREE.Mesh(
          new THREE.BoxGeometry(10, GameConfig.gridSize, 10),
          material
        );
        leftBtmAttachment.position.x = -GameConfig.gridSize / 2 + 10 / 2;
        leftBtmAttachment.position.z = -GameConfig.gridSize / 2 + 10 / 2;
        boxGroup.add(leftBtmAttachment);

        //hazard
        const leftTopHazard = new THREE.Mesh(
          new THREE.BoxGeometry(topHazardDepth, topHazardWidth, topHazardDepth),
          material
        );
        const leftHazardGroup = new THREE.Group();
        leftHazardGroup.position.x =
          -GameConfig.gridSize / 2 + topHazardDepth / 2 + topAttachmentDepth;
        leftHazardGroup.position.z =
          GameConfig.gridSize / 2 - topHazardDepth / 2 - 10;
        leftHazardGroup.add(leftTopHazard);
        leftHazardGroup.add(vertHazardTexture.clone());
        boxGroup.add(leftHazardGroup);

        // Right wall
        const rightTopAttachment = new THREE.Mesh(
          new THREE.BoxGeometry(
            topAttachmentDepth,
            GameConfig.gridSize,
            topAttachmentDepth
          ),
          material
        );
        rightTopAttachment.position.x =
          GameConfig.gridSize / 2 - topAttachmentDepth / 2;
        rightTopAttachment.position.z =
          GameConfig.gridSize / 2 - topAttachmentDepth / 2;
        boxGroup.add(rightTopAttachment);
        const rightBtmAttachment = new THREE.Mesh(
          new THREE.BoxGeometry(10, GameConfig.gridSize, 10),
          material
        );
        rightBtmAttachment.position.x = GameConfig.gridSize / 2 + 10 / 2;
        rightBtmAttachment.position.z = -GameConfig.gridSize / 2 + 10 / 2;
        boxGroup.add(rightBtmAttachment);
        //hazard
        const rightTopHazard = new THREE.Mesh(
          new THREE.BoxGeometry(topHazardDepth, topHazardWidth, topHazardDepth),
          material
        );
        const rightHazardGroup = new THREE.Group();
        rightHazardGroup.position.x =
          GameConfig.gridSize / 2 - topHazardDepth / 2 - topAttachmentDepth;
        rightHazardGroup.position.z =
          GameConfig.gridSize / 2 - topHazardDepth / 2 - 10;
        rightHazardGroup.add(rightTopHazard);
        rightHazardGroup.add(vertHazardTexture.clone());
        boxGroup.add(rightHazardGroup);

        // Black material for the base (hole effect)
        const baseMaterial = new THREE.MeshStandardMaterial({
          color: 0x232323,
          side: THREE.DoubleSide,
        });

        const base = new THREE.Mesh(
          new THREE.BoxGeometry(
            GameConfig.gridSize - 10,
            GameConfig.gridSize - 10,
            2
          ),
          baseMaterial
        );
        // Position at the back of the box
        base.position.z = -(GameConfig.gridSize / 2 + 2);
        boxGroup.add(base);

        return boxGroup;
      case "tile_floor":
        topTexture = GameConfig.sprites.get("tile_floor");
        size = 0.84;
        break;
      default:
        break;
    }
    geometry = new THREE.PlaneGeometry(
      GameConfig.gridSize,
      GameConfig.gridSize
    );
    const box = new THREE.Mesh(
      geometry,
      new THREE.MeshStandardMaterial({
        color: 0xd1d1d1,
        roughness: 0.8,
      })
    );
    const edges = new THREE.EdgesGeometry(geometry);
    const edgeLines = new THREE.LineSegments(edges, this.edgesMaterial);
    boxGroup.add(box);
    boxGroup.add(edgeLines);
    if (topTexture) {
      const frontPlane = this.getTopTexture(topTexture, null, size, depth);
      boxGroup.add(frontPlane);
    }
    if (
      !["tile_floor", "tile_road", "tile_end", "tile_start"].includes(tileName)
    ) {
      const sprite = new TextSprite(tileName.replace("tile_", "")).get();
      sprite.position.z = 1;
      sprite.position.x = -5;
      boxGroup.add(sprite);
    }
    return boxGroup;
  }
  getTopTexture(topTexture, eMapName, size = 1, depth, customGeometry?: any) {
    const { texture, config } = topTexture;
    const { UVWidth, UVHeight, uvOffsetX, uvOffsetY } = config;
    const materialAddons = {};
    if (eMapName) {
      materialAddons.emissiveMap = GameConfig.sprites.get(eMapName).texture;
      materialAddons.emissive = new THREE.Color(0xefefef);
    }
    const frontMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      ...materialAddons,
    });
    const frontGeometry =
      customGeometry ||
      new THREE.PlaneGeometry(
        GameConfig.gridSize * size,
        GameConfig.gridSize * size
      );
    const frontPlane = new THREE.Mesh(frontGeometry, frontMaterial);

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
    frontPlane.position.z = depth / 2 + 1;
    frontPlane.rotateZ(Math.PI);
    frontPlane.renderOrder = -10;
    return frontPlane;
  }

  createBox(depth, sideColor, topColor, topTextureName?: any) {
    const group = new THREE.Group();
    const geometry = new THREE.BoxGeometry(
      GameConfig.gridSize,
      GameConfig.gridSize,
      40
    );
    const sideMaterial = new THREE.MeshStandardMaterial({
      color: sideColor,
    });
    const topMaterial = new THREE.MeshStandardMaterial({
      color: topColor,
    });

    const materials = [
      sideMaterial, // right
      sideMaterial, // left
      sideMaterial, // front
      sideMaterial, // back
      topMaterial, // top (+Z)
      topMaterial, // bottom (-Z)
    ];

    const box = new THREE.Mesh(geometry, materials);
    const edges = new THREE.EdgesGeometry(geometry);
    const edgeLines = new THREE.LineSegments(edges, this.edgesMaterial);
    group.add(box);
    group.add(edgeLines);
    if (topTextureName) {
      const topTexture = GameConfig.sprites.get(topTextureName);
      const frontPlane = this.getTopTexture(topTexture, null, 1, depth);
      group.add(frontPlane);
    }
    return group;
  }

  createHollowBox() {
    const group = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({
      color: 0xc1c1c1,
      side: THREE.DoubleSide,
    });
    const bottomWall = new THREE.Mesh(
      new THREE.BoxGeometry(GameConfig.gridSize, 2, GameConfig.gridSize),
      material
    );
    bottomWall.position.y = -GameConfig.gridSize / 2;
    const topWall = bottomWall.clone();
    topWall.position.y = GameConfig.gridSize / 2;
    const leftWall = new THREE.Mesh(
      new THREE.BoxGeometry(2, GameConfig.gridSize, GameConfig.gridSize),
      material
    );
    leftWall.position.x = -GameConfig.gridSize / 2;
    const rightWall = leftWall.clone();
    rightWall.position.x = GameConfig.gridSize / 2;
    group.add(bottomWall, topWall, leftWall, rightWall);

    group.renderOrder = -1;
    return group;
  }

  createTeleport(direction = "left", tileName, index = 0, type = "arrow") {
    const group = new THREE.Group();
    const darkMaterial = new THREE.MeshStandardMaterial({
      color: 0x666666,
      side: THREE.DoubleSide,
    });
    const bottomWall = new THREE.Mesh(
      new THREE.BoxGeometry(GameConfig.gridSize, 2, GameConfig.gridSize),
      darkMaterial
    );
    bottomWall.position.y = -GameConfig.gridSize / 2;
    const topWall = bottomWall.clone();
    topWall.position.y = GameConfig.gridSize / 2;
    const leftWall = new THREE.Mesh(
      new THREE.BoxGeometry(2, GameConfig.gridSize, GameConfig.gridSize),
      darkMaterial
    );
    leftWall.position.x = -GameConfig.gridSize / 2;
    const rightWall = leftWall.clone();
    rightWall.position.x = GameConfig.gridSize / 2;
    group.add(bottomWall, topWall, leftWall, rightWall);
    const stepMaterial = new THREE.MeshStandardMaterial({
      color: 0xc1c1c1,
      side: THREE.DoubleSide,
    });
    const stepWidth = (GameConfig.gridSize * 4) / 10;
    const stepHeight = 30;
    const stepGeometry = new THREE.BoxGeometry(
      stepWidth,
      GameConfig.gridSize,
      stepHeight
    );
    const stepEdges = new THREE.EdgesGeometry(stepGeometry);

    [20, 50, 80].map((zOffset, i) => {
      const stepGroup = new THREE.Group();
      const step = new THREE.Mesh(stepGeometry, stepMaterial);
      const stepLines = new THREE.LineSegments(stepEdges, this.edgesMaterial);
      stepGroup.add(step, stepLines);
      stepGroup.position.z = GameConfig.gridSize / 2 - stepHeight / 2 - zOffset;
      stepGroup.position.x =
        (i === 0
          ? GameConfig.gridSize / 2 - stepWidth / 2
          : i === 1
          ? 0
          : -GameConfig.gridSize / 2 + stepWidth / 2) - 2.5;
      group.add(stepGroup);
    });
    const teleport = GameConfig.sprites.get(
      type === "arrow"
        ? `tel_arrow_${index}`
        : tileName === "tile_telin"
        ? "tel_block_in"
        : "tel_block_out"
    );
    const arrowGroup = new THREE.Group();
    const arrowWidth = (GameConfig.gridSize * 2) / 10;
    const arrowPlaneGeometry = new THREE.PlaneGeometry(
      type === "arrow" ? arrowWidth : GameConfig.gridSize,
      GameConfig.gridSize
    );
    const arrowTexture = this.getTopTexture(
      teleport,
      "tel_e_map",
      1,
      0,
      arrowPlaneGeometry
    );
    const arrowPlane = new THREE.Mesh(
      arrowPlaneGeometry,
      new THREE.MeshStandardMaterial({
        color: 0xe1e1e1,
      })
    );
    arrowGroup.add(arrowPlane, arrowTexture);
    arrowGroup.position.z = GameConfig.gridSize / 2;
    if (type === "arrow") {
      arrowGroup.position.x = GameConfig.gridSize / 2 - arrowWidth / 2;
      if (tileName === "tile_telout") {
        arrowGroup.rotation.z = Math.PI;
        arrowGroup.position.x = GameConfig.gridSize / 2 + arrowWidth / 2;
        arrowGroup.position.z = GameConfig.gridSize / 2 + 2;
      }
    }

    group.add(arrowGroup);
    let rotation =
      direction === "right"
        ? Math.PI
        : direction === "up"
        ? -Math.PI / 2
        : direction === "down"
        ? Math.PI / 2
        : 0;
    if (type === "block") {
      rotation =
        direction === "right"
          ? Math.PI / 2
          : direction === "up"
          ? Math.PI
          : direction === "down"
          ? 0
          : -Math.PI / 2;
      if (tileName === "tile_telout") {
        rotation = -rotation;
      }
    }
    group.renderOrder = -1;
    group.rotation.z = rotation;
    group.position.z = -1;
    return group;
  }
}
