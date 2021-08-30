import BasePointEffect from "../BasePoint";

export interface RescaleParameters {
  scale: number;
}

class RescaleEffect extends BasePointEffect {
  static getName(): string {
    return "rescale";
  }

  getDefaultParameters(): RescaleParameters {
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
    parameters: RescaleParameters,
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
