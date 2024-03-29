import BasePointEffect from "../BasePoint";

interface BeforeData {
  brightness: number;
}

export interface BrightnessParameters {
  brightness: number;
}

class BrightnessEffect extends BasePointEffect {
  static getName(): string {
    return "brightness";
  }

  data: BeforeData = {
    brightness: 0,
  };

  getDefaultParameters(): BrightnessParameters {
    return {
      brightness: 0.5,
    };
  }

  before(parameters: BrightnessParameters): BeforeData {
    return {
      brightness: 255 * parameters.brightness,
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
    pixel.r = pixel.r + this.data.brightness;
    pixel.g = pixel.g + this.data.brightness;
    pixel.b = pixel.b + this.data.brightness;

    return pixel;
  }
}

export default BrightnessEffect;
