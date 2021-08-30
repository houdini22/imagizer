import BaseCustomEffect from "../BaseCustom";
import { RGBtoCIELab, CIELabToRGB } from "../../../helpers/color";

export interface AutoWhiteBalanceParameters {
  intensity: number;
}

class AutoWhiteBalanceEffect extends BaseCustomEffect {
  static getName(): string {
    return "auto-white-balance";
  }

  getDefaultParameters(): AutoWhiteBalanceParameters {
    return {
      intensity: 50,
    };
  }

  callback(
    width: number,
    height: number,
    parameters: AutoWhiteBalanceParameters
  ) {
    let sumA = 0,
      sumB = 0,
      pixel,
      lab,
      avgSumA,
      avgSumB,
      aDelta,
      bDelta;

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        pixel = this.getPixel(x, y);
        lab = RGBtoCIELab(pixel.r, pixel.g, pixel.b);
        sumA += lab.a;
        sumB += lab.b;
      }
    }

    avgSumA = 0 - sumA / (width * height);
    avgSumB = 0 - sumB / (width * height);

    aDelta = avgSumA * (parameters.intensity / 100) * 1.1;
    bDelta = avgSumB * (parameters.intensity / 100) * 1.1;

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        pixel = this.getPixel(x, y);

        lab = RGBtoCIELab(pixel.r, pixel.g, pixel.b);

        lab.a += aDelta;
        lab.b += bDelta;

        pixel = CIELabToRGB(lab.l, lab.a, lab.b);
        pixel.a = this.getPixel(x, y).a;

        this.setPixel(x, y, pixel);
      }
    }
  }
}

export default AutoWhiteBalanceEffect;
