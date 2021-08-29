import CanvasWrapper from "./CanvasWrapper";
import Layer from "./Layer";
import {
  mergeImageData,
  mergePixelCallback,
  isBrowser,
} from "../helpers/common";
import EffectsRepository from "./EffectsRepository";
import BaseEffect from "./effects/Base";

interface EffectType {
  name: string;
  effect: BaseEffect;
  parameters: object;
}

class Project {
  imageData: ImageData = null;

  effects: EffectType[] = [];

  layers: Layer[] = [];

  startTime: Date = new Date();

  parameters: object = {};

  width: number = 0;

  height: number = 0;

  canvas: CanvasWrapper = null;

  constructor(width: number, height: number, parameters: object = {}) {
    this.initialize(width, height, parameters);
  }

  initialize(width: number, height: number, parameters: object = {}): void {
    this.parameters = parameters;
    this.width = width;
    this.height = height;
    this.canvas = new CanvasWrapper(width, height);
    this.imageData = this.canvas.getContext().getImageData(0, 0, width, height);
  }

  createLayer(
    parameters: {
      backgroundColor?: string;
      blendingMode?: string;
    } = { backgroundColor: "", blendingMode: "" }
  ): Layer {
    let layer = new Layer(this.width, this.height, parameters);
    this.layers.push(layer);
    return layer;
  }

  getTime(): number {
    let end = new Date();
    return end.getTime() - this.startTime.getTime();
  }

  save(path: string, imageType: string = "image/png"): void {
    if (isBrowser()) {
      throw new Error("Available only in node.js environment");
    }

    for (let i = 0; i < this.layers.length; i++) {
      this.imageData = mergeImageData(
        {
          width: this.width,
          height: this.height,
          imageData: this.imageData,
        },
        {
          x: this.layers[i].getX(),
          y: this.layers[i].getY(),
          width: this.layers[i].getWidth(),
          height: this.layers[i].getHeight(),
          imageData: this.layers[i].exportLayer(),
          blendingMode: this.layers[i].getParameter("blendingMode"),
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

    this.canvas.getContext().putImageData(this.imageData, 0, 0);

    const fs = require("fs"),
      img = this.canvas.toDataURL(),
      data = img.replace(/^data:image\/\w+;base64,/, ""),
      buff = Buffer.from(data, "base64");

    fs.writeFileSync(path, buff);
  }

  render(imageType: string = "image/png"): HTMLImageElement {
    if (!isBrowser()) {
      throw new Error("Available only in browser environment");
    }

    const exportedImage = new window.Image();

    for (let i = 0; i < this.layers.length; i++) {
      this.imageData = mergeImageData(
        {
          width: this.width,
          height: this.height,
          imageData: this.imageData,
        },
        {
          x: this.layers[i].getX(),
          y: this.layers[i].getY(),
          width: this.layers[i].getWidth(),
          height: this.layers[i].getHeight(),
          imageData: this.layers[i].exportLayer(),
          blendingMode: this.layers[i].getParameter("blendingMode"),
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

    this.canvas.getContext().putImageData(this.imageData, 0, 0);

    exportedImage.src = this.canvas.toDataURL(imageType);
    return exportedImage;
  }

  applyEffect(name: string, parameters: object = {}): Project {
    this.effects.push({
      name,
      effect: new (EffectsRepository.get(name))(),
      parameters,
    });
    return this;
  }

  resize(newWidth: number, newHeight: number, mode: string): Project {
    this.canvas.destroy();
    this.canvas = null;
    this.imageData = null;
    this.initialize(newWidth, newHeight);

    for (let i = 0; i < this.layers.length; i += 1) {
      this.layers[i].resize(newWidth, newHeight, mode);
    }

    return this;
  }
}

export default Project;
