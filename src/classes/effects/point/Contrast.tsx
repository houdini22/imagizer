import BasePointEffect from "../BasePoint";

interface BeforeData {
  factor: number;
}

interface Parameters {
  contrast: number;
}

class ContrastEffect extends BasePointEffect {
  static getName(): string {
    return "contrast";
  }

  data: BeforeData = {
    factor: 1,
  };

  getDefaultParameters(): Parameters {
    return {
      contrast: 0.5,
    };
  }

  before(parameters: Parameters): BeforeData {
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
    parameters: Parameters,
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
