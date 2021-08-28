import BaseEffect from "./Base";

class BaseTransformEffect extends BaseEffect {
  callback(
    x: number,
    y: number,
    parameters: object,
    width: number,
    height: number
  ): Array<number> {
    throw "Extend it.";
  }

  run(imageData: any, parameters: object): ImageData {
    parameters = {
      ...this.getDefaultParameters(),
      ...parameters,
    };

    let x, y;
    const normalizePixelValue = function (value: number): number {
        return Math.min(Math.max(value, 0), 255) | 0;
      },
      sandbox = {
        data: null,
      },
      imageDataCopy = new Uint8ClampedArray(imageData.data);

    sandbox.data = this.before.call(
      sandbox,
      parameters,
      imageData.width,
      imageData.height,
      imageData
    );

    for (y = 0; y < imageData.height; y += 1) {
      for (x = 0; x < imageData.width; x += 1) {
        const newXY = this.callback.call(
            sandbox,
            x,
            y,
            parameters,
            imageData.width,
            imageData.height
          ),
          newX = normalizePixelValue(newXY[0]),
          newY = normalizePixelValue(newXY[1]),
          oldPixelIndex = y * imageData.width * 4 + x * 4,
          newPixelIndex = newY * imageData.width * 4 + newX * 4;

        imageDataCopy[oldPixelIndex + 0] = imageData.data[newPixelIndex + 0];
        imageDataCopy[oldPixelIndex + 1] = imageData.data[newPixelIndex + 1];
        imageDataCopy[oldPixelIndex + 2] = imageData.data[newPixelIndex + 2];
        imageDataCopy[oldPixelIndex + 3] = imageData.data[newPixelIndex + 3];
      }
    }

    imageData.data.set(imageDataCopy);
    return imageData;
  }
}

export default BaseTransformEffect;
