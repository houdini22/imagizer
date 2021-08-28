import BaseTransformEffect from "../BaseTransform";

interface BeforeData {
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  F: number;
  G: number;
  H: number;
  I: number;
}

interface Parameters {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
}

class PerspectiveEffect extends BaseTransformEffect {
  static getName(): string {
    return "perspective";
  }

  data: BeforeData = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
    G: 0,
    H: 0,
    I: 0,
  };

  getDefaultParameters(): Parameters {
    return {
      x0: 0,
      y0: 0,
      x1: 1,
      y1: 0,
      x2: 1,
      y2: 1,
      x3: 0,
      y3: 1,
    };
  }

  before(
    parameters: Parameters,
    width: number,
    height: number,
    imageData: ImageData
  ): BeforeData {
    function unitSquareToQuad() {
      let result = {
          a11: 0,
          a21: 0,
          a31: 0,
          a12: 0,
          a22: 0,
          a32: 0,
          a13: 0,
          a23: 0,
          a33: 0,
          A: 0,
          B: 0,
          C: 0,
          D: 0,
          E: 0,
          F: 0,
          G: 0,
          H: 0,
          I: 0,
        },
        x0 = Math.floor(width * parameters.x0),
        y0 = Math.floor(height * parameters.y0),
        x1 = Math.floor(width * parameters.x1),
        y1 = Math.floor(height * parameters.y1),
        x2 = Math.floor(width * parameters.x2),
        y2 = Math.floor(height * parameters.y2),
        x3 = Math.floor(width * parameters.x3),
        y3 = Math.floor(height * parameters.y3),
        dx1 = x1 - x2,
        dy1 = y1 - y2,
        dx2 = x3 - x2,
        dy2 = y3 - y2,
        dx3 = x0 - x1 + x2 - x3,
        dy3 = y0 - y1 + y2 - y3;

      if (dx3 == 0 && dy3 == 0) {
        result.a11 = x1 - x0;
        result.a21 = x2 - x1;
        result.a31 = x0;
        result.a12 = y1 - y0;
        result.a22 = y2 - y1;
        result.a32 = y0;
        result.a13 = result.a23 = 0;
      } else {
        result.a13 = (dx3 * dy2 - dx2 * dy3) / (dx1 * dy2 - dy1 * dx2);
        result.a23 = (dx1 * dy3 - dy1 * dx3) / (dx1 * dy2 - dy1 * dx2);
        result.a11 = x1 - x0 + result.a13 * x1;
        result.a21 = x3 - x0 + result.a23 * x3;
        result.a31 = x0;
        result.a12 = y1 - y0 + result.a13 * y1;
        result.a22 = y3 - y0 + result.a23 * y3;
        result.a32 = y0;
      }

      result.a33 = 1;

      return result;
    }

    let result = unitSquareToQuad();

    result.A = result.a22 * result.a33 - result.a32 * result.a23;
    result.B = result.a31 * result.a23 - result.a21 * result.a33;
    result.C = result.a21 * result.a32 - result.a31 * result.a22;
    result.D = result.a32 * result.a13 - result.a12 * result.a33;
    result.E = result.a11 * result.a33 - result.a31 * result.a13;
    result.F = result.a31 * result.a12 - result.a11 * result.a32;
    result.G = result.a12 * result.a23 - result.a22 * result.a13;
    result.H = result.a21 * result.a13 - result.a11 * result.a23;
    result.I = result.a11 * result.a22 - result.a21 * result.a12;

    return result;
  }

  callback(
    x: number,
    y: number,
    parameters: Parameters,
    width: number,
    height: number
  ): Array<number> {
    return [
      (width * (this.data.A * x + this.data.B * y + this.data.C)) /
        (this.data.G * x + this.data.H * y + this.data.I),
      (height * (this.data.D * x + this.data.E * y + this.data.F)) /
        (this.data.G * x + this.data.H * y + this.data.I),
    ];
  }
}

export default PerspectiveEffect;
