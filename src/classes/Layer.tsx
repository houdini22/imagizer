import CanvasWrapper from "./CanvasWrapper";
import LayerObject from "./LayerObject";
import { mergeImageData, mergePixelCallback } from "../helpers/common";
import EffectsRepository from "./EffectsRepository";
import BaseEffect from "./effects/Base";

interface EffectType {
  name: string;
  effect: BaseEffect;
  parameters: object;
}

class Layer {
  objects: LayerObject[] = [];

  effects: EffectType[] = [];

  x: number = 0;

  y: number = 0;

  canvas: CanvasWrapper = null;

  imageData: ImageData = null;

  width: number = 0;

  height: number = 0;

  parameters: {
    backgroundColor?: string;
    blendingMode?: string;
  } = {
    backgroundColor: "",
    blendingMode: "",
  };

  constructor(
    width: number,
    height: number,
    parameters: {
      backgroundColor?: string;
      blendingMode?: string;
    } = {
      backgroundColor: "",
      blendingMode: "",
    }
  ) {
    this.initialize(width, height, parameters);

    if (
      parameters.backgroundColor &&
      parameters.backgroundColor !== "transparent"
    ) {
      this.applyEffect("fill-color", {
        color: parameters.backgroundColor,
      });
    }
  }

  initialize(width: number, height: number, parameters): void {
    this.canvas = new CanvasWrapper(width, height);
    this.imageData = this.canvas.getContext().createImageData(width, height);
    this.width = width;
    this.height = height;
    this.parameters = parameters;
  }

  put(obj: any, x: number, y: number): LayerObject {
    const put = new LayerObject(obj, this, x, y, {});
    this.objects.push(put);
    return put;
  }

  exportLayer(): ImageData {
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
        this.effects[i].parameters
      );
    }

    return this.imageData;
  }

  applyEffect(name: string, parameters: object): Layer {
    this.effects.push({
      name,
      effect: new (EffectsRepository.get(name))(),
      parameters,
    });
    return this;
  }

  resize(newWidth: number, newHeight: number, mode: string): Layer {
    this.canvas.destroy();
    this.canvas = null;
    this.imageData = null;

    this.initialize(newWidth, newHeight, this.parameters);

    for (let i = 0; i < this.objects.length; i += 1) {
      this.objects[i].resize(newWidth, newHeight, mode, true);
    }

    return this;
  }

  crop(startX: number, startY: number, width: number, height: number): Layer {
    for (let i = 0; i < this.objects.length; i += 1) {
      this.objects[i].crop(startX, startY, width, height);
    }

    return this;
  }

  moveXY(x: number, y: number): Layer {
    this.moveX(x);
    this.moveY(y);
    return this;
  }

  moveX(x: number): Layer {
    this.x += x | 0;
    return this;
  }

  moveY(y: number): Layer {
    this.y += y | 0;
    return this;
  }

  setX(x: number): Layer {
    this.x = x;
    return this;
  }

  setY(y: number): Layer {
    this.y = y;
    return this;
  }

  setBlendingMode(blendingMode: string): Layer {
    this.parameters.blendingMode = blendingMode;
    return this;
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  getParameter(name: string): any {
    return this.parameters[name];
  }
}

export default Layer;
