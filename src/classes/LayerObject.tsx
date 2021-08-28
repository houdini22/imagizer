import CanvasWrapper from "./CanvasWrapper";
import { cropImageData } from "../helpers/common";
import EffectsRepository from "./EffectsRepository";

class LayerObject {
  obj = null;

  layer = null;

  x = 0;

  y = 0;

  opts = {};

  effects = [];

  constructor(obj, layer, x: number, y: number, opts: object) {
    this.obj = obj;
    this.layer = this;
    this.x = x;
    this.y = y;
    this.opts = opts;
    this.effects = [];
  }

  getObject() {
    return this.obj;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getWidth() {
    return this.obj.getWidth();
  }

  getHeight() {
    return this.obj.getHeight();
  }

  exportObject() {
    let imageData = this.obj.getImageData();
    for (let i = 0; i < this.effects.length; i += 1) {
      imageData = this.effects[i].effect.run(imageData, this.effects[i].params);
    }
    return imageData;
  }

  applyEffect(name: string, parameters: object = {}) {
    this.effects.push({
      name,
      effect: new (EffectsRepository.get(name))(),
      parameters,
    });
  }

  moveXY(x: number, y: number) {
    this.moveX(x);
    this.moveY(y);
    return this;
  }

  moveX(x: number) {
    this.x += x | 0;
    return this;
  }

  moveY(y: number) {
    this.y += y | 0;
    return this;
  }

  setXY(x: number, y: number) {
    this.setX(x);
    this.setY(y);
    return this;
  }

  setX(x: number) {
    this.x = x;
    return this;
  }

  setY(y: number) {
    this.y = y;
    return this;
  }

  resize(
    newWidth: number,
    newHeight: number,
    mode: string,
    isLayerResize: boolean
  ) {
    let oldWidth = this.getWidth(),
      oldHeight = this.getHeight(),
      ratioX = newWidth / oldWidth,
      ratioY = newHeight / oldHeight;

    if (isLayerResize) {
      this.moveXY(-this.getX() * ratioX, -this.getY() * ratioY);
    }

    this.getObject().resize(newWidth, newHeight, mode);

    return this;
  }

  crop(startX: number, startY: number, width: number, height: number) {
    let object = this.getObject(),
      oldImageData = object.getImageData(),
      canvas = new CanvasWrapper(width, height),
      newImageData = canvas.getContext().createImageData(width, height);

    newImageData = cropImageData(
      oldImageData,
      newImageData,
      startX,
      startY,
      width,
      height
    );

    object.setImageData(newImageData).setWidth(width).setHeight(height);

    this.setXY(startX, startY);

    return this;
  }
}

export default LayerObject;