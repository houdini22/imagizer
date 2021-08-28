import BasePointEffect from "../BasePoint";

class GammaEffect extends BasePointEffect {
  static getName() {
    return "gamma";
  }

  data = {
    table: {
      r: {},
      g: {},
      b: {},
    },
  };

  getDefaultParameters() {
    return {
      gammaRed: 1,
      gammaGreen: 1,
      gammaBlue: 1,
    };
  }

  before(
    parameters = { gammaRed: 1, gammaGreen: 1, gammaBlue: 1 },
    width,
    height,
    imageData
  ) {
    let table = {
        r: [],
        g: [],
        b: [],
      },
      i;

    for (i = 0; i < 256; i += 1) {
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

  callback(pixel, x, y, parameters, width, height) {
    return {
      r: this.data.table.r[pixel.r],
      g: this.data.table.g[pixel.g],
      b: this.data.table.b[pixel.b],
      a: pixel.a,
    };
  }
}

export default GammaEffect;
