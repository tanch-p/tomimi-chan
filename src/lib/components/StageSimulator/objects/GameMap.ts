import * as THREE from "three";
import * as spine from "$lib/spine";
import { Enemy } from "./Enemy";
import {
  convertMovementConfig,
  getVectorCoordinates,
} from "$lib/functions/mazeHelpers";
import { Theta } from "./Theta";
import { GameConfig } from "./GameConfig";
import { StickBox } from "./StickBox";
import { TileManager } from "./TileManager";

export class GameMap {
  config;
  scene: THREE.Scene;
  enemies: Enemy[] = [];
  cubeGeo: THREE.BoxGeometry;
  cubeMaterial: THREE.MeshLambertMaterial;
  objects: THREE.Mesh[];
  raycaster: THREE.Raycaster;
  pointer: THREE.Vector2;
  gameTime: number;
  cost: number;
  tileManager: TileManager;
  spineAssetManager: spine.AssetManager;
  textureLoader: THREE.TextureLoader;
  pathFinder: Theta;
  constructor(scene: THREE.Scene, config, spineAssetManager) {
    this.config = config;
    this.scene = scene;
    this.objects = [];
    this.spineAssetManager = spineAssetManager;
    this.pathFinder = new Theta(GameConfig.mazeLayout);
    this.textureLoader = new THREE.TextureLoader();
    this.tileManager = new TileManager();
    this.initTextures();
    // this.textureLoader.load("level_ro4_n_1_1.webp", (texture) => {
    //   texture.colorSpace = THREE.SRGBColorSpace; // Correct color space

    //   const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    //   const sprite = new THREE.Sprite(spriteMaterial);
    //   const aspect = texture.image.width / texture.image.height;
    //   const desiredHeight = 840; // Set desired height
    //   const desiredWidth = desiredHeight * aspect;

    //   sprite.scale.set(desiredWidth, desiredHeight, 1);
    //   sprite.position.set(0,-30,0)
    //   sprite.renderOrder = -1;
    //   scene.add(sprite);
    // });

    // const tile = this.createTile(2, 0, 0);
    // red cube which appears on mouse hover
    // const rollOverGeo = new THREE.BoxGeometry(100, 100, 100);
    // const rollOverMaterial = new THREE.MeshBasicMaterial({
    //   color: 0xff0000,
    //   opacity: 0.5,
    //   transparent: true,
    // });
    // const rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
    // this.scene.add(rollOverMesh);

    // cubes
    // const map = new THREE.TextureLoader().load("/textures/square-outline-textured.png");
    // map.colorSpace = THREE.SRGBColorSpace;
    // this.cubeGeo = new THREE.BoxGeometry(100, 100, 50);
    // this.cubeMaterial = new THREE.MeshLambertMaterial({
    //   color: 0xfeb74c,
    //   map: map,
    // });
    this.setTiles(config.mapData);

    const geometry = new THREE.PlaneGeometry(
      GameConfig.mazeLayout[0].length * GameConfig.gridSize,
      GameConfig.mazeLayout.length * GameConfig.gridSize
    );
    const plane = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({ visible: false })
    );
    this.scene.add(plane);
    this.objects.push(plane);
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
  }

  initTextures() {
    let texture;
    const shadow = this.textureLoader.load("/textures/sprite_shadow.png");
    GameConfig.sprites.set("shadow", { texture: shadow, config: null });
    texture = this.textureLoader.load("/textures/floor_icons.png");
    texture.magFilter = THREE.NearestFilter; // Keeps pixel art sharp
    texture.minFilter = THREE.NearestFilter;
    GameConfig.sprites.set("floorIcons", {
      texture: texture,
      config: null,
    });
    GameConfig.sprites.set("tel_arrow_0", {
      texture: texture,
      config: {
        UVWidth: 0.04,
        UVHeight: 0.18,
        uvOffsetX: 0.9,
        uvOffsetY: 0.26,
      },
    });
    GameConfig.sprites.set("tel_arrow_1", {
      texture: texture,
      config: {
        UVWidth: 0.04,
        UVHeight: 0.18,
        uvOffsetX: 0.85,
        uvOffsetY: 0.26,
      },
    });
    GameConfig.sprites.set("tel_arrow_2", {
      texture: texture,
      config: {
        UVWidth: 0.04,
        UVHeight: 0.18,
        uvOffsetX: 0.799,
        uvOffsetY: 0.26,
      },
    });
    GameConfig.sprites.set("tel_arrow_3", {
      texture: texture,
      config: {
        UVWidth: 0.04,
        UVHeight: 0.18,
        uvOffsetX: 0.739,
        uvOffsetY: 0.26,
      },
    });
    GameConfig.sprites.set("tel_arrow_-1", {
      texture: texture,
      config: {
        UVWidth: 0.04,
        UVHeight: 0.18,
        uvOffsetX: 0.95,
        uvOffsetY: 0.26,
      },
    });
    GameConfig.sprites.set("tel_block_in", {
      texture: texture,
      config: {
        UVWidth: 0.25,
        UVHeight: 0.25,
        uvOffsetX: 0.75,
        uvOffsetY: 0,
      },
    });
    GameConfig.sprites.set("tel_block_out", {
      texture: texture,
      config: {
        UVWidth: 0.25,
        UVHeight: 0.25,
        uvOffsetX: 0.5,
        uvOffsetY: 0,
      },
    });
    texture = this.textureLoader.load("/textures/floor_icons_e.png");
    texture.magFilter = THREE.NearestFilter; // Keeps pixel art sharp
    texture.minFilter = THREE.NearestFilter;
    GameConfig.sprites.set("tel_e_map", {
      texture: texture,
    });
    const mapObjTexture = this.textureLoader.load("/textures/map_object_texture.png");
    mapObjTexture.colorSpace = THREE.SRGBColorSpace;
    GameConfig.sprites.set("blueBox", {
      texture: mapObjTexture,
      config: {
        UVWidth: 0.42,
        UVHeight: 0.42,
        uvOffsetX: 0.49,
        uvOffsetY: 0.49,
      },
    });
    texture = this.textureLoader.load("/textures/red_mask.png");
    GameConfig.sprites.set("red", {
      texture: texture,
      config: null,
    });
    texture = this.textureLoader.load("/textures/blue_mask.png");
    GameConfig.sprites.set("blue", {
      texture: texture,
      config: null,
    });
    texture = this.textureLoader.load("/textures/T_Map_Trainingroom_A.png");
    texture.colorSpace = THREE.SRGBColorSpace;

    texture.magFilter = THREE.NearestFilter; // Keeps pixel art sharp
    texture.minFilter = THREE.NearestFilter;
    GameConfig.sprites.set("tile_wall", {
      texture: texture,
      config: {
        UVWidth: 0.145,
        UVHeight: 0.145,
        uvOffsetX: 0.324,
        uvOffsetY: 0.62,
      },
    });
    texture = this.textureLoader.load("/textures/T_common_A.png");
    texture.magFilter = THREE.NearestFilter; // Keeps pixel art sharp
    texture.minFilter = THREE.NearestFilter;
    GameConfig.sprites.set("tile_floor", {
      texture: texture,
      config: {
        UVWidth: 0.25,
        UVHeight: 0.25,
        uvOffsetX: 0,
        uvOffsetY: 0.75,
      },
    });
    GameConfig.sprites.set("hole_hazard_horiz", {
      texture: texture,
      config: {
        UVWidth: 0.24,
        UVHeight: 0.02,
        uvOffsetX: 0,
        uvOffsetY: 0.75,
      },
    });
    GameConfig.sprites.set("hole_hazard_vert", {
      texture: texture,
      config: {
        UVWidth: 0.02,
        UVHeight: 0.24,
        uvOffsetX: 0,
        uvOffsetY: 0.75,
      },
    });
  }

  setTiles(mapData) {
    const { map, tiles } = mapData;
    map.forEach((row, rowIdx) =>
      row.forEach((tileIndex, colIdx) => {
        const [tileName, heightType, mask, blackboard] = tiles[tileIndex];
        const group = this.tileManager.get(tileName, blackboard);

        const { x, y } = getVectorCoordinates({ row: rowIdx, col: colIdx },null);
        let z = 100; //elevation for everything if not -z things will get truncated
        switch (tileName) {
          case "tile_end":
            group.add(new StickBox(100, 100, 100, "blue").getMesh());
            break;
          case "tile_start":
            group.add(new StickBox(100, 100, 100, "red").getMesh());
            break;
          case "tile_telin":
          case "tile_telout":
          case "tile_hole":
            z = 50;
            break;
          case "tile_forbidden":
          case "tile_wall":
            z = 120;
            break;
          default:
            break;
        }
        group.position.set(x, y, z);
        this.scene.add(group);
      })
    );
  }

  addEnemy(action: any): void {
    const originalRoute = this.config.routes[action["routeIndex"]];
    const route = convertMovementConfig(originalRoute);

    // Create two geometries with different sizes
    const hitBoxGeo = new THREE.CircleGeometry(GameConfig.gridSize * 0.1, 32);
    const shadowGeometry = new THREE.PlaneGeometry(
      GameConfig.gridSize * 0.8,
      GameConfig.gridSize * 0.4
    );

    // Apply different materials
    const hitBoxMaterial = new THREE.MeshBasicMaterial({
      color: 0xc51009,
      depthTest: false,
      // transparent:true
    });
    const shadowMaterial = new THREE.MeshBasicMaterial({
      map: GameConfig.sprites.get("shadow").texture,
      depthTest: false,
      opacity: 0.85,
      transparent: true, // Enable alpha transparency if the image has it
    });

    // Create two meshes
    const hitBoxMesh = new THREE.Mesh(hitBoxGeo, hitBoxMaterial);
    const shadowMesh = new THREE.Mesh(shadowGeometry, shadowMaterial);
    // Offset the small mesh so they don't overlap perfectly
    hitBoxMesh.position.set(0.5, 0.5, 0.5);
    shadowMesh.renderOrder = -1;
    // Group both meshes
    const group = new THREE.Group();
    group.add(shadowMesh);
    group.add(hitBoxMesh);

    const enemyData = {
      key: action["key"],
      stats: {
        hp: 1,
        speed: 1,
      },
    };
    const atlas = this.spineAssetManager.get("enemy_1111_ucommd_2.atlas");
    const atlasLoader = new spine.AtlasAttachmentLoader(atlas);
    const skeletonBinary = new spine.SkeletonBinary(atlasLoader);
    skeletonBinary.scale = 0.4;
    const skeletonData = skeletonBinary.readSkeletonData(
      this.spineAssetManager.get("enemy_1111_ucommd_2.skel")
    );
    const skeletonMesh = new spine.SkeletonMesh(skeletonData, (parameters) => {
      parameters.depthTest = false;
      parameters.alphaTest = 0.001;
    });
    group.add(skeletonMesh);
    const enemy = new Enemy(enemyData, route, group, skeletonMesh);
    this.objects.push(skeletonMesh);
    this.enemies.push(enemy);
    this.scene.add(group);
  }

  update(deltaTime: number): void {
    for (const enemy of this.enemies.filter((e) => e.alive)) {
      enemy.update(deltaTime);
    }
  }
}
