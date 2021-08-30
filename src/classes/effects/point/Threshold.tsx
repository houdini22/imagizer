import BasePointEffect from "../BasePoint";

class ThresholdEffect extends BasePointEffect {
  static getName(): string {
    return "threshold";
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
    const grayscale = (pixel.r + pixel.g + pixel.b) / 3;

    if (grayscale >= 127) {
      return {
        r: 255,
        g: 255,
        b: 255,
        a: pixel.a,
      };
    }

    return {
      r: 0,
      g: 0,
      b: 0,
      a: pixel.a,
    };
  }
}

export default ThresholdEffect;
