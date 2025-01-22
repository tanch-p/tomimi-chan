import * as THREE from "three";
import * as spine from "$lib/spine";
import { GameConfig } from "./GameConfig";
import { getVectorCoordinates as getVectorCoordinates } from "$lib/functions/lib";

export class Enemy {
  actions: any[];
  hp: number;
  speed: number;
  currentActionIndex: number = 0;
  mesh: THREE.Mesh;
  state: string;
  skel: spine.SkeletonMesh;
  alive: boolean = true;
  direction = 1;
  motionMode: "WALK" | "FLY";
  currentPos: THREE.Vector3;
  targetPos: THREE.Vector3;
  isMoving: boolean = false;
  waitElapsedTime: number = 0;
  entry: boolean = true;
  entryElapsedTime: number = 0;
  exit: boolean = false;
  exitElapsedTime: number = 0;

  constructor(data, route, mesh, skeletonMesh) {
    this.motionMode = route.motionMode;
    this.actions = this.getActions(route);
    this.mesh = mesh;
    this.skel = skeletonMesh;
    this.hp = data.stats.hp;
    this.speed = data.stats.speed;
    this.state = "Idile";
    this.skel.state.setAnimation(0, "Idile", true);
    this.skel.skeleton.color.r = 0.2;
    this.skel.skeleton.color.g = 0.2;
    this.skel.skeleton.color.b = 0.2;

    const { x, y } = getVectorCoordinates(route.startPosition);
    this.mesh.position.set(x, y, GameConfig.baseZIndex);
    this.currentPos = new THREE.Vector3(x, y, GameConfig.baseZIndex);
  }

  getActions(route) {
    if (this.motionMode === "FLY") {
      return [
        ...route.checkpoints.map((cp) => {
          return { ...cp, pathType: "cp" };
        }),
        {
          type: "MOVE",
          time: 0.0,
          position: route.endPosition,
          reachOffset: {
            x: 0.0,
            y: 0.0,
          },
          randomizeReachOffset: false,
          reachDistance: 0.0,
          pathType: "end",
        },
      ];
    }

    // WALK
    let endCalcStartPos = route.startPosition;
    for (const checkpoint of route.checkpoints) {
      if (["MOVE", "APPEAR_AT_POS"].includes(checkpoint.type)) {
        endCalcStartPos = checkpoint.position;
      }
    }

    const paths = GameConfig.pathFinder.findPath(
      endCalcStartPos,
      route.endPosition
    );
    return [
      ...route.checkpoints.map((cp) => {
        return { ...cp, pathType: "cp" };
      }),
      ...paths.slice(1).map(({ row, col }) => {
        return {
          type: "MOVE",
          time: 0.0,
          position: { row, col },
          reachOffset: {
            x: 0.0,
            y: 0.0,
          },
          randomizeReachOffset: false,
          reachDistance: 0.0,
          pathType: "end",
        };
      }),
    ];
  }

  entryColorChange(delta) {
    if (this.entryElapsedTime > 0.5) {
      this.entry = false;
      this.skel.skeleton.color.r = 1;
      this.skel.skeleton.color.g = 1;
      this.skel.skeleton.color.b = 1;
      return;
    }
    this.entryElapsedTime += delta * 2;
    this.skel.skeleton.color.r += delta * 2;
    this.skel.skeleton.color.g += delta * 2;
    this.skel.skeleton.color.b += delta * 2;
  }

  exitColorChange(delta) {
    if (this.exitElapsedTime > 0.5) {
      this.exit = false;
      this.mesh.visible = false;
      this.alive = false;
      return;
    }
    this.exitElapsedTime += delta * 2;
    this.skel.skeleton.color.r -= delta * 2;
    this.skel.skeleton.color.g -= delta * 2;
    this.skel.skeleton.color.b -= delta * 2;
    this.skel.skeleton.color.a -= delta * 2;
  }

  update(delta: number) {
    this.skel.update(delta);
    if (this.entry) {
      this.entryColorChange(delta);
    }
    if (this.exit) {
      this.exitColorChange(delta);
    }
    if (this.currentActionIndex >= this.actions.length) {
      this.onEnd();
      return;
    }
    const { type, position, pathType, time, reachOffset } =
      this.actions[this.currentActionIndex];

    switch (type) {
      case "MOVE":
        if (!this.isMoving) {
          // Start new movement
          const { x, y } = getVectorCoordinates(position, reachOffset);
          this.targetPos = new THREE.Vector3(x, y, GameConfig.baseZIndex);
          this.isMoving = true;
          this.state = "Move";
          this.skel.state.setAnimation(0, "Move", true);
        }
        const direction = new THREE.Vector3()
          .subVectors(this.targetPos, this.mesh.position)
          .normalize();
        if (direction.x !== 0) {
          this.direction = direction.x;
          this.skel.scale.x = this.direction;
        }
        const distance = this.mesh.position.distanceTo(this.targetPos);
        const adjustedSpeed = this.speed * delta * GameConfig.gridSize;
        if (distance > adjustedSpeed) {
          // speed = 1 means 1 tile/s
          const dx = this.targetPos.x - this.mesh.position.x;
          const dy = this.targetPos.y - this.mesh.position.y;
          this.mesh.position.x += (dx / distance) * adjustedSpeed;
          this.mesh.position.y += (dy / distance) * adjustedSpeed;
        } else {
          // Movement complete
          this.mesh.position.copy(this.targetPos);
          this.isMoving = false;
          this.currentActionIndex++;
        }

        break;

      case "WAIT_FOR_SECONDS":
        if (this.waitElapsedTime === 0) {
          this.state = "Idile";
          this.skel.state.setAnimation(0, "Idile", true);
          this.waitElapsedTime += delta;
        } else {
          this.waitElapsedTime += delta;
        }

        if (this.waitElapsedTime >= time) {
          this.waitElapsedTime = 0;
          this.currentActionIndex++;
        }
        break;

      case "DISAPPEAR":
        this.mesh.visible = false;
        this.currentActionIndex++;
        break;

      case "APPEAR_AT_POS":
        this.mesh.visible = true;
        const { x, y } = getVectorCoordinates(position, reachOffset);
        this.mesh.position.set(x, y, GameConfig.baseZIndex);
        this.currentPos = new THREE.Vector3(x, y, GameConfig.baseZIndex);
        this.currentActionIndex++;
        break;
      default:
        console.log(type);
    }
  }

  takeDamage(damage: number): void {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.onDeath();
    }
  }
  onEnd(): void {
    this.skel.state.setAnimation(0, "Default", false);
    this.exit = true;
  }

  onDeath(): void {
    this.skel.state.setAnimation(0, "Die", false);
    this.exit = true;
  }
}
