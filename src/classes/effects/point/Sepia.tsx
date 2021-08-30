import BasePointEffect from "../BasePoint";

export interface SepiaParameters {
  sepiaValue: number;
}

class SepiaEffect extends BasePointEffect {
  static getName(): string {
    return "sepia";
  }

  getDefaultParameters(): SepiaParameters {
    return {
      sepiaValue: 1,
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
    parameters: SepiaParameters,
    width: number,
    height: number
  ): {
    r: number;
    g: number;
    b: number;
    a: number;
  } {
    const tmp = 0.299 * pixel.r + 0.587 * pixel.g + 0.114 * pixel.b;

    pixel.r = tmp + 2 * parameters.sepiaValue;
    pixel.g = tmp + parameters.sepiaValue;
    pixel.b = tmp;

    return pixel;
  }
}

export default SepiaEffect;
