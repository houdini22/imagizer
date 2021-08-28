import BasePointEffect from "../BasePoint";

interface Parameters {
  scale: number;
}

class RescaleEffect extends BasePointEffect {
  static getName(): string {
    return "rescale";
  }

  getDefaultParameters(): Parameters {
    return {
      scale: 1,
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
    pixel.r = parameters.scale * pixel.r;
    pixel.g = parameters.scale * pixel.g;
    pixel.b = parameters.scale * pixel.b;

    return pixel;
  }
}

export default RescaleEffect;
