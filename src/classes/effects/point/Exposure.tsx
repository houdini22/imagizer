import BasePointEffect from "../BasePoint";

interface Parameters {
  exposure: number;
}

class ExposureEffect extends BasePointEffect {
  static getName(): string {
    return "exposure";
  }

  getDefaultParameters(): Parameters {
    return {
      exposure: 1,
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
    pixel.r = (1 - Math.exp((-pixel.r / 255) * parameters.exposure)) * 255;
    pixel.g = (1 - Math.exp((-pixel.g / 255) * parameters.exposure)) * 255;
    pixel.b = (1 - Math.exp((-pixel.b / 255) * parameters.exposure)) * 255;

    return pixel;
  }
}

export default ExposureEffect;
