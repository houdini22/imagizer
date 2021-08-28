import CanvasWrapper from "./CanvasWrapper";
import LayerObject from "./LayerObject";
import { mergeImageData, mergePixelCallback } from "../helpers/common";
import EffectsRepository from "./EffectsRepository";

class Layer {
  objects = [];

  effects = [];

  x = 0;

  y = 0;

  canvas = null;

  imageData = null;

  width = 0;

  height = 0;

  parameters = {
    background_color: "",
    blendingMode: "",
  };

  constructor(
    width: number,
    height: number,
    parameters: {
      background_color?: string;
      blendingMode?: string;
    } = {
      background_color: "",
      blendingMode: "",
    }
  ) {
    this.initialize(width, height, parameters);

    if (
      parameters.background_color &&
      parameters.background_color !== "transparent"
    ) {
      this.applyEffect("fill-color", {
        color: parameters.background_color,
      });
    }
  }

  initialize(width: number, height: number, parameters) {
    this.canvas = new CanvasWrapper(width, height);
    this.imageData = this.canvas.getContext().createImageData(width, height);
    this.width = width;
    this.height = height;
    this.parameters = parameters;
  }

  put(obj: any, x: number, y: number) {
    const put = new LayerObject(obj, this, x, y, {});
    this.objects.push(put);
    return put;
  }

  /*exportTo(selector, imageType = "image/png") {
    this.exportLayer();

    let container = document.querySelector(selector),
      exportedImage = new Image();

    exportedImage.src = canvas.toDataURL(imageType);
    container.appendChild(exportedImage);
  }*/

  exportLayer() {
    for (let i = 0; i < this.objects.length; i += 1) {
      const layerObject = this.objects[i];
      this.imageData = mergeImageData(
        {
          width: this.width,
          height: this.height,
          imageData: this.imageData,
        },
        {
          x: layerObject.getX(),
          y: layerObject.getY(),
          width: layerObject.getWidth(),
          height: layerObject.getHeight(),
          imageData: layerObject.exportObject(),
        },
        mergePixelCallback
      );
    }

    for (let i = 0; i < this.effects.length; i++) {
      this.imageData = this.effects[i].effect.run(
        this.imageData,
        this.effects[i].params
      );
    }

    return this.imageData;
  }

  applyEffect(name: string, parameters) {
    this.effects.push({
      name,
      effect: new (EffectsRepository.get(name))(),
      parameters,
    });
  }

  resize(newWidth: number, newHeight: number, mode: string) {
    this.canvas.destroy();
    this.canvas = null;
    this.imageData = null;

    this.initialize(newWidth, newHeight, this.parameters);

    for (let i = 0; i < this.objects.length; i += 1) {
      this.objects[i].resize(newWidth, newHeight, mode, true);
    }

    return this;
  }

  crop(startX: number, startY: number, width: number, height: number) {
    for (let i = 0; i < this.objects.length; i += 1) {
      this.objects[i].crop(startX, startY, width, height);
    }

    return this;
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

  setX(x: number) {
    this.x = x;
    return this;
  }

  setY(y: number) {
    this.y = y;
    return this;
  }

  setBlendingMode(blendingMode: string) {
    this.parameters.blendingMode = blendingMode;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  getParameter(name: string) {
    return this.parameters[name];
  }
}

export default Layer;
