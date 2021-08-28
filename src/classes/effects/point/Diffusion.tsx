import BasePointEffect from "../BasePoint";

class DiffusionEffect extends BasePointEffect {
  static getName() {
    return "diffusion";
  }

  getDefaultParameters() {
    return {
      matrix: [0, 0, 0, 0, 0, 7, 3, 5, 1],
      levels: 6,
      colorDither: true,
      granulate: true,
    };
  }

  before(parameters, width, height, imageData) {
    let i,
      sum = 0,
      map = [],
      div = [];

    for (i = 0; i < parameters.matrix.length; i += 1) {
      sum += parameters.matrix[i];
    }

    for (i = 0; i < parameters.levels; i += 1) {
      map[i] = parseInt((255 * i) / (parameters.levels - 1));
    }

    for (i = 0; i < 256; i += 1) {
      div[i] = parseInt((parameters.levels * i) / 256);
    }

    return {
      sum: sum,
      map: map,
      div: div,
    };
  }

  callback(pixel, x, y, parameters, width, height) {
    let red1 = pixel.r,
      green1 = pixel.g,
      blue1 = pixel.b,
      red2,
      green2,
      blue2,
      data = this.data,
      tmpPixel,
      tmpRed,
      tmpGreen,
      tmpBlue,
      i,
      j,
      iy,
      jx,
      w,
      grayScale;

    if (!parameters.colorDither) {
      grayScale = (red1 + green1 + blue1) / 3;
      red1 = grayScale;
      green1 = grayScale;
      blue1 = grayScale;
    }

    red2 = data.map[data.div[red1]];
    green2 = data.map[data.div[green1]];
    blue2 = data.map[data.div[blue1]];

    tmpRed = red1 - red2;
    tmpGreen = green1 - green2;
    tmpBlue = blue1 - blue2;

    if (parameters.granulate) {
      for (i = -1; i <= 1; i += 1) {
        iy = i + y;
        if (iy < 0 || iy >= height) {
          continue;
        }
        for (j = -1; j <= 1; j += 1) {
          jx = j + x;
          if (jx < 0 || jx >= width) {
            continue;
          }
          w = parameters.matrix[(i + 1) * 3 + j + 1];
          if (w !== 0) {
            tmpPixel = this.getPixel(jx, iy);
            tmpPixel.r += (tmpRed * w) / data.sum;
            tmpPixel.g += (tmpGreen * w) / data.sum;
            tmpPixel.b += (tmpBlue * w) / data.sum;
            this.setPixel(jx, iy, tmpPixel);
          }
        }
      }
    }

    return {
      r: red2,
      g: green2,
      b: blue2,
      a: pixel.a,
    };
  }
}

export default DiffusionEffect;
