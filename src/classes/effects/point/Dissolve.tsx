import BasePointEffect from "../BasePoint";
import { smoothStep } from "../../../helpers/common";

export interface DissolveParameters {
  density: number;
  softness: number;
}

interface BeforeData {
  minDensity: number;
  maxDensity: number;
}

class DissolveEffect extends BasePointEffect {
  static getName(): string {
    return "dissolve";
  }

  data: BeforeData = {
    minDensity: 0,
    maxDensity: 0,
  };

  getDefaultParameters(): DissolveParameters {
    return {
      density: 1,
      softness: 0,
    };
  }

  before(
    parameters: DissolveParameters,
    width: number,
    height: number,
    imageData: ImageData
  ): BeforeData {
    const d = (1 - parameters.density) * (1 + parameters.softness);
    return {
      minDensity: d - parameters.softness,
      maxDensity: d,
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
    parameters: DissolveParameters,
    width: number,
    height: number
  ): {
    r: number;
    g: number;
    b: number;
    a: number;
  } {
    const v = Math.random(),
      f = smoothStep(this.data.minDensity, this.data.maxDensity, v);
    pixel.a = pixel.a * f;
    return pixel;
  }
}

export default DissolveEffect;
