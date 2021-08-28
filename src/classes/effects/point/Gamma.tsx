import BasePointEffect from "../BasePoint";

class GammaEffect extends BasePointEffect {
  static getName() {
    return "gamma";
  }

  getDefaultParameters() {
    return {
      gammaRed: 1,
      gammaGreen: 1,
      gammaBlue: 1,
    };
  }

  before(parameters, width, height, imageData) {
    let table = {
        r: [],
        g: [],
        b: [],
      },
      i;

    for (i = 0; i < 256; i += 1) {
      table.r[i] = parseInt(
        255 * Math.pow(i / 255, 1 / parameters.gammaRed) + 0.5
      );
      table.g[i] = parseInt(
        255 * Math.pow(i / 255, 1 / parameters.gammaGreen) + 0.5
      );
      table.b[i] = parseInt(
        255 * Math.pow(i / 255, 1 / parameters.gammaBlue) + 0.5
      );
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
