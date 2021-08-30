import BasePointEffect from "../BasePoint";

export interface DiffusionParameters {
  matrix: Array<number>;
  levels: number;
  colorDither: boolean;
  granulate: boolean;
}

interface BeforeData {
  map: object;
  div: object;
  sum: number;
}

class DiffusionEffect extends BasePointEffect {
  static getName(): string {
    return "diffusion";
  }

  data: BeforeData = {
    map: {},
    div: {},
    sum: 0,
  };

  getDefaultParameters(): DiffusionParameters {
    return {
      matrix: [0, 0, 0, 0, 0, 7, 3, 5, 1],
      levels: 6,
      colorDither: true,
      granulate: true,
    };
  }

  before(
    parameters: DiffusionParameters,
    width: number,
    height: number,
    imageData: ImageData
  ): BeforeData {
    let sum = 0;
    const map = [],
      div = [];

    for (let i = 0; i < parameters.matrix.length; i += 1) {
      sum += parameters.matrix[i];
    }

    for (let i = 0; i < parameters.levels; i += 1) {
      map[i] = ((255 * i) / (parameters.levels - 1)) | 0;
    }

    for (let i = 0; i < 256; i += 1) {
      div[i] = ((parameters.levels * i) / 256) | 0;
    }

    return {
      sum: sum,
      map: map,
      div: div,
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
    parameters: DiffusionParameters,
    width: number,
    height: number
  ): {
    r: number;
    g: number;
    b: number;
    a: number;
  } {
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
      for (let i = -1; i <= 1; i += 1) {
        iy = i + y;
        if (iy < 0 || iy >= height) {
          continue;
        }
        for (let j = -1; j <= 1; j += 1) {
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
