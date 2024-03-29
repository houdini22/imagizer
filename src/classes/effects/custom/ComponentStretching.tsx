import BaseCustomEffect from "../BaseCustom";

class ComponentStretchingEffect extends BaseCustomEffect {
  static getName(): string {
    return "component-stretching";
  }

  callback(width: number, height: number, parameters: object) {
    let minR = Infinity,
      minG = Infinity,
      minB = Infinity,
      maxR = -1,
      maxG = -1,
      maxB = -1,
      pixel;

    const remap = function remap(value, min, max) {
      return ((value - min) * 255) / (max - min);
    };

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        pixel = this.getPixel(x, y);

        minR = Math.min(pixel.r, minR);
        minG = Math.min(pixel.g, minG);
        minB = Math.min(pixel.b, minB);

        maxR = Math.max(pixel.r, maxR);
        maxG = Math.max(pixel.g, maxG);
        maxB = Math.max(pixel.b, maxB);
      }
    }

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        pixel = this.getPixel(x, y);

        pixel.r = remap(pixel.r, minR, maxR);
        pixel.g = remap(pixel.g, minG, maxG);
        pixel.b = remap(pixel.b, minB, maxB);

        this.setPixel(x, y, pixel);
      }
    }
  }
}

export default ComponentStretchingEffect;
