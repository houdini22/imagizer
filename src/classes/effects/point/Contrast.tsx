import BasePointEffect from "../BasePoint";

interface BeforeData {
  factor: number;
}

export interface ContrastParameters {
  contrast: number;
}

class ContrastEffect extends BasePointEffect {
  static getName(): string {
    return "contrast";
  }

  data: BeforeData = {
    factor: 1,
  };

  getDefaultParameters(): ContrastParameters {
    return {
      contrast: 0.5,
    };
  }

  before(parameters: ContrastParameters): BeforeData {
    return {
      factor:
        (259 * (parameters.contrast * 255 + 255)) /
        (255 * (259 - parameters.contrast * 255)),
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
    parameters: ContrastParameters,
    width: number,
    height: number
  ): {
    r: number;
    g: number;
    b: number;
    a: number;
  } {
    pixel.r = this.data.factor * (pixel.r - 128) + 128;
    pixel.g = this.data.factor * (pixel.g - 128) + 128;
    pixel.b = this.data.factor * (pixel.b - 128) + 128;

    return pixel;
  }
}

export default ContrastEffect;
