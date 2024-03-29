import BasePointEffect from "../BasePoint";

export interface GammaParameters {
  gammaRed: number;
  gammaGreen: number;
  gammaBlue: number;
}

interface BeforeData {
  table: {
    r: object;
    g: object;
    b: object;
  };
}

class GammaEffect extends BasePointEffect {
  static getName(): string {
    return "gamma";
  }

  data: BeforeData = {
    table: {
      r: {},
      g: {},
      b: {},
    },
  };

  getDefaultParameters(): GammaParameters {
    return {
      gammaRed: 1,
      gammaGreen: 1,
      gammaBlue: 1,
    };
  }

  before(
    parameters: GammaParameters,
    width: number,
    height: number,
    imageData: ImageData
  ): BeforeData {
    const table = {
      r: [],
      g: [],
      b: [],
    };

    for (let i = 0; i < 256; i += 1) {
      table.r[i] = (255 * Math.pow(i / 255, 1 / parameters.gammaRed) + 0.5) | 0;
      table.g[i] =
        (255 * Math.pow(i / 255, 1 / parameters.gammaGreen) + 0.5) | 0;
      table.b[i] =
        (255 * Math.pow(i / 255, 1 / parameters.gammaBlue) + 0.5) | 0;
    }

    return {
      table: table,
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
    parameters: GammaParameters,
    width: number,
    height: number
  ): {
    r: number;
    g: number;
    b: number;
    a: number;
  } {
    return {
      r: this.data.table.r[pixel.r],
      g: this.data.table.g[pixel.g],
      b: this.data.table.b[pixel.b],
      a: pixel.a,
    };
  }
}

export default GammaEffect;
