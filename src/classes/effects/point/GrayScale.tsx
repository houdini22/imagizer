import BasePointEffect from "../BasePoint";

class GrayScaleEffect extends BasePointEffect {
  static getName(): string {
    return "gray-scale";
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
    const newRGB = 0.299 * pixel.r + 0.587 * pixel.g + 0.114 * pixel.b;
    return {
      r: newRGB,
      g: newRGB,
      b: newRGB,
      a: pixel.a,
    };
  }
}

export default GrayScaleEffect;
