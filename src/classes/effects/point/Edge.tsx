import BasePointEffect from "../BasePoint";

interface BeforeData {
  hEdgeMatrix: Array<number>;
  vEdgeMatrix: Array<number>;
}

interface Parameters {
  matrixes: {
    robertsV: Array<number>;
    robertsH: Array<number>;
    prewittV: Array<number>;
    prewittH: Array<number>;
    sobelV: Array<number>;
    sobelH: Array<number>;
    freiChenV: Array<number>;
    freiChenH: Array<number>;
  };
  hEdgeMatrix: string;
  vEdgeMatrix: string;
}

class EdgeEffect extends BasePointEffect {
  static getName(): string {
    return "edge";
  }

  data: BeforeData = {
    hEdgeMatrix: [],
    vEdgeMatrix: [],
  };

  getDefaultParameters(): Parameters {
    return {
      matrixes: {
        robertsV: [0, 0, -1, 0, 1, 0, 0, 0, 0],
        robertsH: [-1, 0, 0, 0, 1, 0, 0, 0, 0],
        prewittV: [-1, 0, 1, -1, 0, 1, -1, 0, 1],
        prewittH: [-1, -1, -1, 0, 0, 0, 1, 1, 1],
        sobelV: [-1, 0, 1, -2, 0, 2, -1, 0, 1],
        sobelH: [-1, -2, -1, 0, 0, 0, 1, 2, 1],
        freiChenV: [-1, 0, 1, -Math.sqrt(2), 0, Math.sqrt(2), -1, 0, 1],
        freiChenH: [-1, -Math.sqrt(2), -1, 0, 0, 0, 1, Math.sqrt(2), 1],
      },
      hEdgeMatrix: "sobelV",
      vEdgeMatrix: "sobelH",
    };
  }

  before(
    parameters: Parameters,
    width: number,
    height: number,
    imageData: ImageData
  ): BeforeData {
    let _hEdgeMatrix = parameters.hEdgeMatrix,
      _vEdgeMatrix = parameters.vEdgeMatrix,
      hEdgeMatrix,
      vEdgeMatrix;

    if (typeof _hEdgeMatrix === "string") {
      hEdgeMatrix = parameters.matrixes[parameters.hEdgeMatrix];
    }
    if (typeof _vEdgeMatrix === "string") {
      vEdgeMatrix = parameters.matrixes[parameters.vEdgeMatrix];
    }
    return {
      hEdgeMatrix,
      vEdgeMatrix,
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
    let r = 0,
      g = 0,
      b = 0,
      rh = 0,
      gh = 0,
      bh = 0,
      rv = 0,
      gv = 0,
      bv = 0,
      row,
      iy,
      col,
      ix,
      mOffset,
      pixel2,
      h,
      v;

    for (row = -1; row <= 1; row += 1) {
      iy = y + row;
      if (!(0 <= iy && iy < height)) {
        iy = y;
      }
      mOffset = 3 * (row + 1) + 1;
      for (col = -1; col <= 1; col += 1) {
        ix = x + col;
        if (!(0 <= ix && ix < width)) {
          ix = x;
        }
        pixel2 = this.getOriginalPixel(ix, iy);
        h = this.data.hEdgeMatrix[mOffset + col];
        v = this.data.vEdgeMatrix[mOffset + col];

        r = pixel2.r;
        g = pixel2.g;
        b = pixel2.b;

        rh += Math.floor(h * r);
        gh += Math.floor(h * g);
        bh += Math.floor(h * b);

        rv += Math.floor(v * r);
        gv += Math.floor(v * g);
        bv += Math.floor(v + b);
      }
    }
    r = Math.floor(Math.sqrt(rh * rh + rv * rv) / 1.8);
    g = Math.floor(Math.sqrt(gh * gh + gv * gv) / 1.8);
    b = Math.floor(Math.sqrt(bh * bh + bv * bv) / 1.8);
    return {
      r: r,
      g: g,
      b: b,
      a: pixel.a,
    };
  }
}

export default EdgeEffect;
