import CanvasWrapper from "./CanvasWrapper";
import Layer from "./Layer";
import {
  mergeImageData,
  mergePixelCallback,
  isBrowser,
} from "../helpers/common";
import EffectsRepository from "./EffectsRepository";

class Project {
  constructor(width, height, parameters = {}) {
    this.imageData = null;
    this.effects = [];
    this.layers = [];
    this.startTime = new Date();
    this.initialize(width, height, parameters);
  }

  initialize(width, height, parameters) {
    this.parameters = parameters;
    this.width = width;
    this.height = height;
    this.canvas = new CanvasWrapper(width, height);
    this.imageData = this.canvas.getContext().getImageData(0, 0, width, height);
  }

  createLayer(parameters) {
    let layer = new Layer(this.width, this.height, parameters);
    this.layers.push(layer);
    return layer;
  }

  getTime() {
    let end = new Date();
    return end.getTime() - this.startTime.getTime();
  }

  save(selector, imageType = "image/png") {
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

    let fs = require("fs"),
      img = this.canvas.toDataURL(),
      data = img.replace(/^data:image\/\w+;base64,/, ""),
      buff = new Buffer(data, "base64");

    fs.writeFile(selector, buff);
  }

  render(imageType = "image/png") {
    if (!isBrowser()) {
      throw new Error("Available only in browser environment");
    }

    let i,
      exportedImage = new window.Image();

    for (i = 0; i < this.layers.length; i++) {
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

    for (i = 0; i < this.effects.length; i++) {
      this.imageData = this.effects[i].effect.run(
        this.imageData,
        this.effects[i].parameters
      );
    }

    this.canvas.getContext().putImageData(this.imageData, 0, 0);

    exportedImage.src = this.canvas.toDataURL(imageType);
    return exportedImage;
  }

  applyEffect(name, parameters = {}) {
    this.effects.push({
      name,
      effect: new (EffectsRepository.get(name))(),
      parameters,
    });
  }

  resize(newWidth, newHeight, mode) {
    this.canvas.destroy();
    this.canvas = null;
    this.imageData = null;
    this.initialize(newWidth, newHeight, mode);

    for (let i = 0; i < this.layers.length; i += 1) {
      this.layers[i].resize(newWidth, newHeight, mode);
    }

    return this;
  }
}

export default Project;
