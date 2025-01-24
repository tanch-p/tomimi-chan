import * as THREE from "three";
import * as spine from "$lib/spine";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

const texturesToLoad = [
  {
    fileName: "sprite_shadow.png",
    options: [],
    textures: [["sprite_shadow", null]],
  },
  {
    fileName: "floor_icons.png",
    options: ["colorSpace", "filter"],
    textures: [
      ["floorIcons", null],
      [
        "tel_arrow_0",
        {
          UVWidth: 0.04,
          UVHeight: 0.18,
          uvOffsetX: 0.9,
          uvOffsetY: 0.26,
        },
      ],
      [
        "tel_arrow_1",
        {
          UVWidth: 0.04,
          UVHeight: 0.18,
          uvOffsetX: 0.85,
          uvOffsetY: 0.26,
        },
      ],
      [
        "tel_arrow_2",
        {
          UVWidth: 0.04,
          UVHeight: 0.18,
          uvOffsetX: 0.799,
          uvOffsetY: 0.26,
        },
      ],
      [
        "tel_arrow_3",
        {
          UVWidth: 0.04,
          UVHeight: 0.18,
          uvOffsetX: 0.739,
          uvOffsetY: 0.26,
        },
      ],
      [
        "tel_arrow_-1",
        {
          UVWidth: 0.04,
          UVHeight: 0.18,
          uvOffsetX: 0.95,
          uvOffsetY: 0.26,
        },
      ],
      [
        "tel_block_in",
        {
          UVWidth: 0.25,
          UVHeight: 0.25,
          uvOffsetX: 0.75,
          uvOffsetY: 0,
        },
      ],
      [
        "tel_block_out",
        {
          UVWidth: 0.25,
          UVHeight: 0.25,
          uvOffsetX: 0.5,
          uvOffsetY: 0,
        },
      ],
    ],
  },
  {
    fileName: "floor_icons_e.png",
    options: ["colorSpace", "filter"],
    textures: [["tel_e_map", null]],
  },
  {
    fileName: "map_object_texture.png",
    options: ["colorSpace"],
    textures: [
      [
        "blueBox",
        { UVWidth: 0.42, UVHeight: 0.42, uvOffsetX: 0.49, uvOffsetY: 0.49 },
      ],
    ],
  },
  {
    fileName: "T_Map_Trainingroom_A.png",
    options: ["colorSpace", "filter"],
    textures: [
      [
        "tile_wall",
        {
          UVWidth: 0.1445,
          UVHeight: 0.1445,
          uvOffsetX: 0.324,
          uvOffsetY: 0.62,
        },
      ],
    ],
  },
  {
    fileName: "T_common_A.png",
    options: ["colorSpace", "filter"],
    textures: [
      [
        "tile_floor",
        {
          UVWidth: 0.25,
          UVHeight: 0.25,
          uvOffsetX: 0,
          uvOffsetY: 0.75,
        },
      ],
      [
        "hole_hazard_horiz",
        {
          UVWidth: 0.24,
          UVHeight: 0.02,
          uvOffsetX: 0,
          uvOffsetY: 0.75,
        },
      ],
      [
        "hole_hazard_vert",
        {
          UVWidth: 0.02,
          UVHeight: 0.24,
          uvOffsetX: 0,
          uvOffsetY: 0.75,
        },
      ],
    ],
  },
  {
    fileName: "flag.png",
    options: ["colorSpace", "filter"],
    textures: [["flag", null]],
  },
];

export class AssetManager {
  private static instance: AssetManager;

  private textureLoader: THREE.TextureLoader = new THREE.TextureLoader();
  private spineAssetManager: spine.AssetManager = new spine.AssetManager(
    "/spine/"
  );
  public textures = new Map();
  public spineMap = new Map();
  public font;
  public texturesLoaded = false;

  private constructor() {
    // Private constructor to prevent instantiation
  }
  public static getInstance(): AssetManager {
    if (!AssetManager.instance) {
      AssetManager.instance = new AssetManager();
    }
    return AssetManager.instance;
  }

  async loadAssets(enemies) {
    this.spineMap.clear();
    const promises = [];

    if (!this.texturesLoaded) {
      const loader = new FontLoader();
      promises.push(
        new Promise((resolve) => {
          loader.load("/fonts/noto_sans_regular.json", (font) => {
            resolve(font);
          });
        }).then((font) => (this.font = font))
      );
      for (const { fileName, options, textures } of texturesToLoad) {
        promises.push(
          new Promise((resolve, reject) => {
            this.textureLoader.load(
              `/textures/${fileName}`,
              (texture) => {
                resolve(texture);
              },
              undefined,
              (error) => {
                reject(error);
              }
            );
          }).then((texture: THREE.Texture) => {
            if (options.includes("colorSpace")) {
              texture.colorSpace = THREE.SRGBColorSpace;
            }
            if (options.includes("filter")) {
              texture.magFilter = THREE.NearestFilter; // Keeps pixel art sharp
              texture.minFilter = THREE.NearestFilter;
            }
            for (const [name, config] of textures) {
              this.textures.set(name, { texture: texture, config: config });
            }
          })
        );
      }
    }

    for (const enemy of enemies) {
      const key = "enemy_1111_ucommd_2";
      promises.push(
        new Promise((resolve, reject) => {
          this.spineAssetManager.loadBinary(`${key}.skel`);
          this.spineAssetManager.loadTextureAtlas(`${key}.atlas`);

          const checkLoading = () => {
            if (this.spineAssetManager.isLoadingComplete()) {
              resolve();
            } else {
              requestAnimationFrame(checkLoading);
            }
          };

          checkLoading();
        }).then(() => {
          const atlas = this.spineAssetManager.get(`${key}.atlas`);
          const atlasLoader = new spine.AtlasAttachmentLoader(atlas);
          const skeletonBinary = new spine.SkeletonBinary(atlasLoader);
          skeletonBinary.scale = 0.4;
          const skeletonData = skeletonBinary.readSkeletonData(
            this.spineAssetManager.get(`${key}.skel`)
          );
          this.spineMap.set(key, skeletonData);
        })
      );
    }
    return Promise.all(promises);
  }
}
