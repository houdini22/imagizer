import { isBrowser } from "../helpers/common";

class CanvasWrapper {
  canvas = null;

  context = null;

  width = 0;

  height = 0;

  constructor(width: number, height: number) {
    this.initialize(width, height);
  }

  initialize(width: number = 0, height: number = 0) {
    if (!isBrowser()) {
      const { createCanvas } = require("canvas");
      this.canvas = createCanvas(width, height);
    } else {
      this.canvas = document.createElement("canvas");

      // hide from viewport
      this.canvas.style.position = "absolute";
      this.canvas.style.left = "-99999px";
      this.canvas.style.top = "-99999px";

      this.setWidth(width);
      this.setHeight(height);

      document.body.appendChild(this.canvas);
    }
  }

  setWidth(value: number) {
    this.canvas.setAttribute("width", "" + value);
    this.width = value;
    return this;
  }

  setHeight(value: number) {
    this.canvas.setAttribute("height", "" + value);
    this.height = value;
    return this;
  }

  getContext() {
    if (!this.context) {
      this.context = this.canvas.getContext("2d");
    }
    return this.context;
  }

  getCanvas() {
    return this.canvas;
  }

  toDataURL(type: string) {
    return this.canvas.toDataURL(type);
  }

  destroy() {
    if (isBrowser()) {
      document.body.removeChild(this.canvas);
    }
    this.canvas = null;
    this.context = null;
  }
}

export default CanvasWrapper;
