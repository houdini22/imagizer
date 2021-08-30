import BasePointEffect from "../BasePoint";
import { RGBtoHSB, HSBtoRGB } from "../../../helpers/color";

export interface HSBAdjustParameters {
  h: number;
  s: number;
  b: number;
}

class HSBAdjustEffect extends BasePointEffect {
  static getName(): string {
    return "hsb-adjust";
  }

  getDefaultParameters(): HSBAdjustParameters {
    return {
      h: 1,
      s: 1,
      b: 1,
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
    parameters: HSBAdjustParameters,
    width: number,
    height: number
  ): {
    r: number;
    g: number;
    b: number;
    a: number;
  } {
    const hsb = RGBtoHSB(pixel.r, pixel.g, pixel.b);

    hsb.h += parameters.h;
    while (hsb.h < 0) {
      hsb.h += Math.PI * 2;
    }

    hsb.s += parameters.s;
    hsb.s = Math.max(Math.min(hsb.s, 1), 0);

    hsb.b += parameters.b;
    hsb.b = Math.max(Math.min(hsb.b, 1), 0);

    let result = HSBtoRGB(hsb.h, hsb.s, hsb.b);
    pixel.r = result.r;
    pixel.g = result.g;
    pixel.b = result.b;

    return pixel;
  }
}

export default HSBAdjustEffect;
