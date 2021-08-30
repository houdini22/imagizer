import BaseCustomEffect from "../BaseCustom";
import { hexToRGB } from "../../../helpers/color";

export interface FillColorParameters {
  color: string;
}

class FillColorEffect extends BaseCustomEffect {
  static getName(): string {
    return "fill-color";
  }

  getDefaultParameters(): FillColorParameters {
    return {
      color: "transparent",
    };
  }

  callback(width: number, height: number, parameters: FillColorParameters) {
    let color;

    if (parameters.color === "transparent") {
      color = {
        r: 0,
        g: 0,
        b: 0,
        a: 0,
      };
    } else {
      color = hexToRGB(parameters.color);
      color.a = 255;
    }

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        this.setPixel(x, y, color);
      }
    }
  }
}

export default FillColorEffect;
