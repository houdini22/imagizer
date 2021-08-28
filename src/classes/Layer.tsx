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
    width,
    height,
    parameters = {
      background_color: "transparent",
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

  initialize(width, height, parameters) {
    this.canvas = new CanvasWrapper(width, height);
    this.imageData = this.canvas.getContext().createImageData(width, height);
    this.width = width;
    this.height = height;
    this.parameters = parameters;
  }

  put(obj, x, y) {
    let put = new LayerObject(obj, this, x, y, {});
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
    let i, layerObject;

    for (i = 0; i < this.objects.length; i += 1) {
      layerObject = this.objects[i];
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

    for (i = 0; i < this.effects.length; i++) {
      this.imageData = this.effects[i].effect.run(
        this.imageData,
        this.effects[i].params
      );
    }

    return this.imageData;
  }

  applyEffect(name, parameters) {
    this.effects.push({
      name,
      effect: new (EffectsRepository.get(name))(),
      parameters,
    });
  }

  resize(newWidth, newHeight, mode) {
    let i;

    this.canvas.destroy();
    this.canvas = null;
    this.imageData = null;

    this.initialize(newWidth, newHeight, this.parameters);

    for (i = 0; i < this.objects.length; i += 1) {
      this.objects[i].resize(newWidth, newHeight, mode, true);
    }

    return this;
  }

  crop(startX, startY, width, height) {
    let i;

    for (i = 0; i < this.objects.length; i += 1) {
      this.objects[i].crop(startX, startY, width, height);
    }

    return this;
  }

  moveXY(x, y) {
    this.moveX(x);
    this.moveY(y);
    return this;
  }

  moveX(x) {
    this.x += x | 0;
    return this;
  }

  moveY(y) {
    this.y += y | 0;
    return this;
  }

  setX(x) {
    this.x = x;
    return this;
  }

  setY(y) {
    this.y = y;
    return this;
  }

  setBlendingMode(blendingMode) {
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

  getParameter(name) {
    return this.parameters[name];
  }
}

export default Layer;
