import BasePointEffect from "../BasePoint";

interface BeforeData {
  remap: (value: number) => number;
  min: number;
  max: number;
}

class AutoContrastEffect extends BasePointEffect {
  static getName(): string {
    return "auto-contrast";
  }

  data: BeforeData = {
    remap: (value) => 0,
    min: 0,
    max: 0,
  };

  before(parameters: object, width: number, height: number): BeforeData {
    let x,
      y,
      pixel,
      min = Infinity,
      max = -1;

    for (y = 0; y < height; y += 1) {
      for (x = 0; x < width; x += 1) {
        pixel = this.getPixel(x, y);

        min = Math.min((pixel.r + pixel.g + pixel.b) / 3, min);
        max = Math.max((pixel.r + pixel.g + pixel.b) / 3, max);
      }
    }

    return {
      min: min,
      max: max,
      remap: function (value) {
        return ((value - min) * 255) / (max - min);
      },
    };
  }

  callback(
    pixel: {
      r: number;
      g: number;
      b: number;
      a: number;
    },
    x: number,
    y: number,
    parameters: object,
    width: number,
    height: number
  ): {
    r: number;
    g: number;
    b: number;
    a: number;
  } {
    pixel.r = this.data.remap(pixel.r);
    pixel.g = this.data.remap(pixel.g);
    pixel.b = this.data.remap(pixel.b);

    return pixel;
  }
}

export default AutoContrastEffect;
