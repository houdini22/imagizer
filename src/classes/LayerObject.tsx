import CanvasWrapper from "./CanvasWrapper";
import { cropImageData } from "../helpers/common";
import EffectsRepository from "./EffectsRepository";
import Layer from "./Layer";
import BaseEffect from "./effects/Base";
import BaseOnLayerObject from "./BaseOnLayerObject";

interface EffectType {
  name: string;
  effect: BaseEffect;
  parameters: object;
}

class LayerObject {
  protected obj: BaseOnLayerObject = null;

  protected layer: Layer = null;

  protected x: number = 0;

  protected y: number = 0;

  protected opts: object = {};

  protected effects: EffectType[] = [];

  constructor(
    obj: BaseOnLayerObject,
    layer: Layer,
    x: number,
    y: number,
    opts: object
  ) {
    this.obj = obj;
    this.layer = layer;
    this.x = x;
    this.y = y;
    this.opts = opts;
  }

  getObject(): BaseOnLayerObject {
    return this.obj;
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  getWidth(): number {
    return this.obj.getWidth();
  }

  getHeight(): number {
    return this.obj.getHeight();
  }

  exportObject(): ImageData {
    let imageData = this.obj.getImageData();
    for (let i = 0; i < this.effects.length; i += 1) {
      imageData = this.effects[i].effect.run(
        imageData,
        this.effects[i].parameters
      );
    }
    return imageData;
  }

  applyEffect(name: string, parameters: object = {}): LayerObject {
    this.effects.push({
      name,
      effect: new (EffectsRepository.get(name))(),
      parameters,
    });
    return this;
  }

  moveXY(x: number, y: number): LayerObject {
    this.moveX(x);
    this.moveY(y);
    return this;
  }

  moveX(x: number): LayerObject {
    this.x += x | 0;
    return this;
  }

  moveY(y: number): LayerObject {
    this.y += y | 0;
    return this;
  }

  setXY(x: number, y: number): LayerObject {
    this.setX(x);
    this.setY(y);
    return this;
  }

  setX(x: number): LayerObject {
    this.x = x;
    return this;
  }

  setY(y: number): LayerObject {
    this.y = y;
    return this;
  }

  resize(
    newWidth: number,
    newHeight: number,
    mode: string,
    isLayerResize: boolean
  ): LayerObject {
    const oldWidth = this.getWidth(),
      oldHeight = this.getHeight(),
      ratioX = newWidth / oldWidth,
      ratioY = newHeight / oldHeight;

    if (isLayerResize) {
      this.moveXY(-this.getX() * ratioX, -this.getY() * ratioY);
    }

    if (typeof newHeight === "undefined") {
      this.getObject().resize(oldWidth * newWidth, oldHeight * newWidth, mode);
    } else {
      this.getObject().resize(newWidth, newHeight, mode);
    }

    return this;
  }

  crop(
    startX: number,
    startY: number,
    width: number,
    height: number
  ): LayerObject {
    const object = this.getObject(),
      oldImageData = object.getImageData(),
      canvas = new CanvasWrapper(width, height),
      newImageData = canvas.getContext().createImageData(width, height),
      result = cropImageData(
        oldImageData,
        newImageData,
        startX,
        startY,
        width,
        height
      );

    object.setImageData(result).setWidth(width).setHeight(height);

    this.setXY(startX, startY);

    return this;
  }
}

export default LayerObject;
