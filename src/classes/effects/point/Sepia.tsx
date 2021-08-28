import BasePointEffect from "../BasePoint";

interface Parameters {
  sepiaValue: number;
}

class SepiaEffect extends BasePointEffect {
  static getName(): string {
    return "sepia";
  }

  getDefaultParameters(): Parameters {
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
    parameters: Parameters,
    width: number,
    height: number
  ): {
    r: number;
    g: number;
    b: number;
    a: number;
  } {
    let tmp = 0.299 * pixel.r + 0.587 * pixel.g + 0.114 * pixel.b;

    pixel.r = tmp + 2 * parameters.sepiaValue;
    pixel.g = tmp + parameters.sepiaValue;
    pixel.b = tmp;

    return pixel;
  }
}

export default SepiaEffect;
