import CanvasWrapper from "./CanvasWrapper";
import {
  resizeNearestNeighbour,
  resizeBilinearInterpolation,
  resizeBiquadraticInterpolation,
} from "../helpers/resize";

class BaseOnLayerObject {
  protected imageData: ImageData = null;

  protected canvas: CanvasWrapper = null;

  protected width: number = 0;

  protected height: number = 0;

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  setWidth(value: number): BaseOnLayerObject {
    this.width = value;
    return this;
  }

  setHeight(value: number): BaseOnLayerObject {
    this.height = value;
    return this;
  }

  getImageData(): ImageData {
    if (!this.imageData) {
      this.imageData = this.canvas
        .getContext()
        .getImageData(0, 0, this.getWidth(), this.getHeight());
    }
    return this.imageData;
  }

  setImageData(value: ImageData): BaseOnLayerObject {
    this.imageData = value;
    return this;
  }

  resize(
    newWidth: number,
    newHeight: number,
    mode: string = "nearest-neighbour"
  ): BaseOnLayerObject {
    const oldImageData = this.getImageData(),
      canvas = new CanvasWrapper(newWidth, newHeight);
    let newImageData = canvas.getContext().createImageData(newWidth, newHeight);

    switch (mode) {
      case "nearest-neighbour":
        newImageData = resizeNearestNeighbour(
          oldImageData,
          newImageData,
          newWidth,
          newHeight
        );
        break;

      case "bilinear-interpolation":
        newImageData = resizeBilinearInterpolation(
          oldImageData,
          newImageData,
          newWidth,
          newHeight
        );
        break;

      case "biquadratic-interpolation":
        newImageData = resizeBiquadraticInterpolation(
          oldImageData,
          newImageData,
          newWidth,
          newHeight
        );
        break;

      default:
        canvas.destroy();
        return this;
    }

    canvas.destroy();

    return this.setWidth(newWidth)
      .setHeight(newHeight)
      .setImageData(newImageData);
  }
}

export default BaseOnLayerObject;
