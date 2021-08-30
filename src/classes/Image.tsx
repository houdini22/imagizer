import BaseOnLayerObject from "./BaseOnLayerObject";
import CanvasWrapper from "./CanvasWrapper";
import { isBrowser } from "../helpers/common";
import { Image as ImageType } from "canvas/types";

class Image extends BaseOnLayerObject {
  protected url: string = null;

  protected image: HTMLImageElement | ImageType = null;

  constructor() {
    super();

    if (!isBrowser()) {
      const canvas = require("canvas");
      this.image = new canvas.Image();
    } else {
      this.image = new window.Image();

      // hide from viewport
      this.image.style.position = "absolute";
      this.image.style.left = "-99999px";
      this.image.style.top = "-99999px";
    }
  }

  load(url: string, callback: () => void): void {
    const load = () => {
      this.setWidth(!isBrowser() ? this.image.width : this.image.clientWidth);
      this.setHeight(
        !isBrowser() ? this.image.height : this.image.clientHeight
      );

      // get image data
      this.canvas = new CanvasWrapper(this.getWidth(), this.getHeight());
      this.canvas
        .getContext()
        .drawImage(this.image, 0, 0, this.getWidth(), this.getHeight());

      if (isBrowser()) {
        document.body.removeChild(this.image);
      }

      if (typeof callback === "function") {
        callback.call(this);
      }
    };

    this.url = url;

    if (isBrowser()) {
      document.body.appendChild(this.image);
      this.image.onload = function () {
        load();
      };
      this.image.src = url;
    } else {
      const fs = require("fs");
      this.image.src = fs.readFileSync(url);
      load();
    }
  }
}

export default Image;
