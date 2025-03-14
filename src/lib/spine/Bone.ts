/******************************************************************************
 * Spine Runtimes License Agreement
 * Last updated January 1, 2020. Replaces all prior versions.
 *
 * Copyright (c) 2013-2020, Esoteric Software LLC
 *
 * Integration of the Spine Runtimes into software or otherwise creating
 * derivative works of the Spine Runtimes is permitted under the terms and
 * conditions of Section 2 of the Spine Editor License Agreement:
 * http://esotericsoftware.com/spine-editor-license
 *
 * Otherwise, it is permitted to integrate the Spine Runtimes into software
 * or otherwise create derivative works of the Spine Runtimes (collectively,
 * "Products"), provided that each user of the Products must obtain their own
 * Spine Editor license and redistribution of the Products in any form must
 * include this license and copyright notice.
 *
 * THE SPINE RUNTIMES ARE PROVIDED BY ESOTERIC SOFTWARE LLC "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ESOTERIC SOFTWARE LLC BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES,
 * BUSINESS INTERRUPTION, OR LOSS OF USE, DATA, OR PROFITS) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THE SPINE RUNTIMES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *****************************************************************************/

import { BoneData, TransformMode } from "./BoneData";
import { Skeleton } from "./Skeleton";
import { MathUtils, Vector2 } from "./Utils";

/** Stores a bone's current pose.
 *
 * A bone has a local transform which is used to compute its world transform. A bone also has an applied transform, which is a
 * local transform that can be applied to compute the world transform. The local transform and applied transform may differ if a
 * constraint or application code modifies the world transform after it was computed from the local transform. */
export class Bone implements Updatable {
  /** The bone's setup pose data. */
  data: BoneData;

  /** The skeleton this bone belongs to. */
  skeleton: Skeleton;

  /** The parent bone, or null if this is the root bone. */
  parent: Bone;

  /** The immediate children of this bone. */
  children = new Array<Bone>();

  /** The local x translation. */
  x = 0;

  /** The local y translation. */
  y = 0;

  /** The local rotation in degrees, counter clockwise. */
  rotation = 0;

  /** The local scaleX. */
  scaleX = 0;

  /** The local scaleY. */
  scaleY = 0;

  /** The local shearX. */
  shearX = 0;

  /** The local shearY. */
  shearY = 0;

  /** The applied local x translation. */
  ax = 0;

  /** The applied local y translation. */
  ay = 0;

  /** The applied local rotation in degrees, counter clockwise. */
  arotation = 0;

  /** The applied local scaleX. */
  ascaleX = 0;

  /** The applied local scaleY.   */
  ascaleY = 0;

  /** The applied local shearX. */
  ashearX = 0;

  /** The applied local shearY. */
  ashearY = 0;

  /** If true, the applied transform matches the world transform. If false, the world transform has been modified since it was
   * computed and {@link #updateAppliedTransform()} must be called before accessing the applied transform. */
  appliedValid = false;

  /** Part of the world transform matrix for the X axis. If changed, {@link #appliedValid} should be set to false. */
  a = 0;

  /** Part of the world transform matrix for the Y axis. If changed, {@link #appliedValid} should be set to false. */
  b = 0;

  /** Part of the world transform matrix for the X axis. If changed, {@link #appliedValid} should be set to false. */
  c = 0;

  /** Part of the world transform matrix for the Y axis. If changed, {@link #appliedValid} should be set to false. */
  d = 0;

  /** The world X position. If changed, {@link #appliedValid} should be set to false. */
  worldY = 0;

  /** The world Y position. If changed, {@link #appliedValid} should be set to false. */
  worldX = 0;

  sorted = false;
  active = false;

  /** @param parent May be null. */
  constructor(data: BoneData, skeleton: Skeleton, parent: Bone) {
    if (data == null) throw new Error("data cannot be null.");
    if (skeleton == null) throw new Error("skeleton cannot be null.");
    this.data = data;
    this.skeleton = skeleton;
    this.parent = parent;
    this.setToSetupPose();
  }

  /** Returns false when the bone has not been computed because {@link BoneData#skinRequired} is true and the
   * {@link Skeleton#skin active skin} does not {@link Skin#bones contain} this bone. */
  isActive() {
    return this.active;
  }

  /** Same as {@link #updateWorldTransform()}. This method exists for Bone to implement {@link Updatable}. */
  update() {
    this.updateWorldTransformWith(
      this.x,
      this.y,
      this.rotation,
      this.scaleX,
      this.scaleY,
      this.shearX,
      this.shearY
    );
  }

  /** Computes the world transform using the parent bone and this bone's local transform.
   *
   * See {@link #updateWorldTransformWith()}. */
  updateWorldTransform() {
    this.updateWorldTransformWith(
      this.x,
      this.y,
      this.rotation,
      this.scaleX,
      this.scaleY,
      this.shearX,
      this.shearY
    );
  }

  /** Computes the world transform using the parent bone and the specified local transform. Child bones are not updated.
   *
   * See [World transforms](http://esotericsoftware.com/spine-runtime-skeletons#World-transforms) in the Spine
   * Runtimes Guide. */
  updateWorldTransformWith(
    x: number,
    y: number,
    rotation: number,
    scaleX: number,
    scaleY: number,
    shearX: number,
    shearY: number
  ) {
    this.ax = x;
    this.ay = y;
    this.arotation = rotation;
    this.ascaleX = scaleX;
    this.ascaleY = scaleY;
    this.ashearX = shearX;
    this.ashearY = shearY;
    this.appliedValid = true;

    let parent = this.parent;
    if (parent == null) {
      // Root bone.
      let skeleton = this.skeleton;
      let rotationY = rotation + 90 + shearY;
      let sx = skeleton.scaleX;
      let sy = skeleton.scaleY;
      this.a = MathUtils.cosDeg(rotation + shearX) * scaleX * sx;
      this.b = MathUtils.cosDeg(rotationY) * scaleY * sx;
      this.c = MathUtils.sinDeg(rotation + shearX) * scaleX * sy;
      this.d = MathUtils.sinDeg(rotationY) * scaleY * sy;
      this.worldX = x * sx + skeleton.x;
      this.worldY = y * sy + skeleton.y;
      return;
    }

    let pa = parent.a,
      pb = parent.b,
      pc = parent.c,
      pd = parent.d;
    this.worldX = pa * x + pb * y + parent.worldX;
    this.worldY = pc * x + pd * y + parent.worldY;

    switch (this.data.transformMode) {
      case TransformMode.Normal: {
        let rotationY = rotation + 90 + shearY;
        let la = MathUtils.cosDeg(rotation + shearX) * scaleX;
        let lb = MathUtils.cosDeg(rotationY) * scaleY;
        let lc = MathUtils.sinDeg(rotation + shearX) * scaleX;
        let ld = MathUtils.sinDeg(rotationY) * scaleY;
        this.a = pa * la + pb * lc;
        this.b = pa * lb + pb * ld;
        this.c = pc * la + pd * lc;
        this.d = pc * lb + pd * ld;
        return;
      }
      case TransformMode.OnlyTranslation: {
        let rotationY = rotation + 90 + shearY;
        this.a = MathUtils.cosDeg(rotation + shearX) * scaleX;
        this.b = MathUtils.cosDeg(rotationY) * scaleY;
        this.c = MathUtils.sinDeg(rotation + shearX) * scaleX;
        this.d = MathUtils.sinDeg(rotationY) * scaleY;
        break;
      }
      case TransformMode.NoRotationOrReflection: {
        let s = pa * pa + pc * pc;
        let prx = 0;
        if (s > 0.0001) {
          s = Math.abs(pa * pd - pb * pc) / s;
          pa /= this.skeleton.scaleX;
          pc /= this.skeleton.scaleY;
          pb = pc * s;
          pd = pa * s;
          prx = Math.atan2(pc, pa) * MathUtils.radDeg;
        } else {
          pa = 0;
          pc = 0;
          prx = 90 - Math.atan2(pd, pb) * MathUtils.radDeg;
        }
        let rx = rotation + shearX - prx;
        let ry = rotation + shearY - prx + 90;
        let la = MathUtils.cosDeg(rx) * scaleX;
        let lb = MathUtils.cosDeg(ry) * scaleY;
        let lc = MathUtils.sinDeg(rx) * scaleX;
        let ld = MathUtils.sinDeg(ry) * scaleY;
        this.a = pa * la - pb * lc;
        this.b = pa * lb - pb * ld;
        this.c = pc * la + pd * lc;
        this.d = pc * lb + pd * ld;
        break;
      }
      case TransformMode.NoScale:
      case TransformMode.NoScaleOrReflection: {
        let cos = MathUtils.cosDeg(rotation);
        let sin = MathUtils.sinDeg(rotation);
        let za = (pa * cos + pb * sin) / this.skeleton.scaleX;
        let zc = (pc * cos + pd * sin) / this.skeleton.scaleY;
        let s = Math.sqrt(za * za + zc * zc);
        if (s > 0.00001) s = 1 / s;
        za *= s;
        zc *= s;
        s = Math.sqrt(za * za + zc * zc);
        if (
          this.data.transformMode == TransformMode.NoScale &&
          pa * pd - pb * pc < 0 !=
            (this.skeleton.scaleX < 0 != this.skeleton.scaleY < 0)
        )
          s = -s;
        let r = Math.PI / 2 + Math.atan2(zc, za);
        let zb = Math.cos(r) * s;
        let zd = Math.sin(r) * s;
        let la = MathUtils.cosDeg(shearX) * scaleX;
        let lb = MathUtils.cosDeg(90 + shearY) * scaleY;
        let lc = MathUtils.sinDeg(shearX) * scaleX;
        let ld = MathUtils.sinDeg(90 + shearY) * scaleY;
        this.a = za * la + zb * lc;
        this.b = za * lb + zb * ld;
        this.c = zc * la + zd * lc;
        this.d = zc * lb + zd * ld;
        break;
      }
    }
    this.a *= this.skeleton.scaleX;
    this.b *= this.skeleton.scaleX;
    this.c *= this.skeleton.scaleY;
    this.d *= this.skeleton.scaleY;
  }

  /** Sets this bone's local transform to the setup pose. */
  setToSetupPose() {
    let data = this.data;
    this.x = data.x;
    this.y = data.y;
    this.rotation = data.rotation;
    this.scaleX = data.scaleX;
    this.scaleY = data.scaleY;
    this.shearX = data.shearX;
    this.shearY = data.shearY;
  }

  /** The world rotation for the X axis, calculated using {@link #a} and {@link #c}. */
  getWorldRotationX() {
    return Math.atan2(this.c, this.a) * MathUtils.radDeg;
  }

  /** The world rotation for the Y axis, calculated using {@link #b} and {@link #d}. */
  getWorldRotationY() {
    return Math.atan2(this.d, this.b) * MathUtils.radDeg;
  }

  /** The magnitude (always positive) of the world scale X, calculated using {@link #a} and {@link #c}. */
  getWorldScaleX() {
    return Math.sqrt(this.a * this.a + this.c * this.c);
  }

  /** The magnitude (always positive) of the world scale Y, calculated using {@link #b} and {@link #d}. */
  getWorldScaleY() {
    return Math.sqrt(this.b * this.b + this.d * this.d);
  }

  /** Computes the applied transform values from the world transform. This allows the applied transform to be accessed after the
   * world transform has been modified (by a constraint, {@link #rotateWorld()}, etc).
   *
   * If {@link #updateWorldTransform()} has been called for a bone and {@link #appliedValid} is false, then
   * {@link #updateAppliedTransform()} must be called before accessing the applied transform.
   *
   * Some information is ambiguous in the world transform, such as -1,-1 scale versus 180 rotation. The applied transform after
   * calling this method is equivalent to the local tranform used to compute the world transform, but may not be identical. */
  updateAppliedTransform() {
    this.appliedValid = true;
    let parent = this.parent;
    if (parent == null) {
      this.ax = this.worldX;
      this.ay = this.worldY;
      this.arotation = Math.atan2(this.c, this.a) * MathUtils.radDeg;
      this.ascaleX = Math.sqrt(this.a * this.a + this.c * this.c);
      this.ascaleY = Math.sqrt(this.b * this.b + this.d * this.d);
      this.ashearX = 0;
      this.ashearY =
        Math.atan2(
          this.a * this.b + this.c * this.d,
          this.a * this.d - this.b * this.c
        ) * MathUtils.radDeg;
      return;
    }
    let pa = parent.a,
      pb = parent.b,
      pc = parent.c,
      pd = parent.d;
    let pid = 1 / (pa * pd - pb * pc);
    let dx = this.worldX - parent.worldX,
      dy = this.worldY - parent.worldY;
    this.ax = dx * pd * pid - dy * pb * pid;
    this.ay = dy * pa * pid - dx * pc * pid;
    let ia = pid * pd;
    let id = pid * pa;
    let ib = pid * pb;
    let ic = pid * pc;
    let ra = ia * this.a - ib * this.c;
    let rb = ia * this.b - ib * this.d;
    let rc = id * this.c - ic * this.a;
    let rd = id * this.d - ic * this.b;
    this.ashearX = 0;
    this.ascaleX = Math.sqrt(ra * ra + rc * rc);
    if (this.ascaleX > 0.0001) {
      let det = ra * rd - rb * rc;
      this.ascaleY = det / this.ascaleX;
      this.ashearY = Math.atan2(ra * rb + rc * rd, det) * MathUtils.radDeg;
      this.arotation = Math.atan2(rc, ra) * MathUtils.radDeg;
    } else {
      this.ascaleX = 0;
      this.ascaleY = Math.sqrt(rb * rb + rd * rd);
      this.ashearY = 0;
      this.arotation = 90 - Math.atan2(rd, rb) * MathUtils.radDeg;
    }
  }

  /** Transforms a point from world coordinates to the bone's local coordinates. */
  worldToLocal(world: Vector2) {
    let a = this.a,
      b = this.b,
      c = this.c,
      d = this.d;
    let invDet = 1 / (a * d - b * c);
    let x = world.x - this.worldX,
      y = world.y - this.worldY;
    world.x = x * d * invDet - y * b * invDet;
    world.y = y * a * invDet - x * c * invDet;
    return world;
  }

  /** Transforms a point from the bone's local coordinates to world coordinates. */
  localToWorld(local: Vector2) {
    let x = local.x,
      y = local.y;
    local.x = x * this.a + y * this.b + this.worldX;
    local.y = x * this.c + y * this.d + this.worldY;
    return local;
  }

  /** Transforms a world rotation to a local rotation. */
  worldToLocalRotation(worldRotation: number) {
    let sin = MathUtils.sinDeg(worldRotation),
      cos = MathUtils.cosDeg(worldRotation);
    return (
      Math.atan2(this.a * sin - this.c * cos, this.d * cos - this.b * sin) *
        MathUtils.radDeg +
      this.rotation -
      this.shearX
    );
  }

  /** Transforms a local rotation to a world rotation. */
  localToWorldRotation(localRotation: number) {
    localRotation -= this.rotation - this.shearX;
    let sin = MathUtils.sinDeg(localRotation),
      cos = MathUtils.cosDeg(localRotation);
    return (
      Math.atan2(cos * this.c + sin * this.d, cos * this.a + sin * this.b) *
      MathUtils.radDeg
    );
  }

  /** Rotates the world transform the specified amount and sets {@link #appliedValid} to false.
   * {@link #updateWorldTransform()} will need to be called on any child bones, recursively, and any constraints reapplied. */
  rotateWorld(degrees: number) {
    let a = this.a,
      b = this.b,
      c = this.c,
      d = this.d;
    let cos = MathUtils.cosDeg(degrees),
      sin = MathUtils.sinDeg(degrees);
    this.a = cos * a - sin * c;
    this.b = cos * b - sin * d;
    this.c = sin * a + cos * c;
    this.d = sin * b + cos * d;
    this.appliedValid = false;
  }
}
