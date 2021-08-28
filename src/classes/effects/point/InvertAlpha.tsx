import BasePointEffect from "../BasePoint";

class InvertAlphaEffect extends BasePointEffect {
  static getName(): string {
    return "invert-alpha";
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
    pixel.a = 255 - pixel.a;
    return pixel;
  }
}

export default InvertAlphaEffect;
