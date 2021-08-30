import BasePointEffect from "../BasePoint";

export interface LevelsParameters {
  low: number;
  high: number;
  lowOutput: number;
  highOutput: number;
}

interface BeforeData {
  lut: Array<Array<number>>;
}

class LevelsEffect extends BasePointEffect {
  static getName(): string {
    return "levels";
  }

  data: BeforeData = {
    lut: [],
  };

  getDefaultParameters(): LevelsParameters {
    return {
      low: 0,
      high: 1,
      lowOutput: 0,
      highOutput: 1,
    };
  }

  before(
    parameters: LevelsParameters,
    width: number,
    height: number,
    imageData: ImageData
  ): BeforeData {
    let Histogram = function (imageData, width, height, offset, stride) {
      let index,
        histogram = new Array(3),
        minValue = new Array(4),
        maxValue = new Array(4),
        minFrequency = new Array(3),
        maxFrequency = new Array(3),
        mean = new Array(3),
        numSamples = width * height,
        isGray = true,
        RED = 0,
        GREEN = 1,
        BLUE = 2,
        GRAY = 3;

      for (let i = 0; i < histogram.length; i += 1) {
        histogram[i] = new Array(256);
        for (let j = 0; j < 256; j += 1) {
          histogram[i][j] = 0;
        }
      }

      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          index = y * width * 4 + x * 4;
          histogram[RED][imageData.data[index]]++;
          histogram[GREEN][imageData.data[index + 1]]++;
          histogram[BLUE][imageData.data[index + 2]]++;
        }
      }

      for (let i = 0; i < 256; i += 1) {
        if (
          histogram[RED][i] !== histogram[GREEN][i] ||
          histogram[GREEN][i] !== histogram[BLUE][i]
        ) {
          isGray = false;
          break;
        }
      }

      for (let i = 0; i < 3; i += 1) {
        for (let j = 0; j < 256; j += 1) {
          if (histogram[i][j] > 0) {
            minValue[i] = j;
            break;
          }
        }
        for (let j = 255; j >= 0; j -= 1) {
          if (histogram[i][j] > 0) {
            maxValue[i] = j;
            break;
          }
        }
        minFrequency[i] = Infinity;
        maxFrequency[i] = 0;
        for (let j = 0; j < 256; j += 1) {
          minFrequency[i] = Math.min(minFrequency[i], histogram[i][j]);
          maxFrequency[i] = Math.max(maxFrequency[i], histogram[i][j]);
          mean[i] += j * histogram[i][j];
        }
        mean[i] /= numSamples;
        minValue[GRAY] = Math.min(
          minValue[RED],
          minValue[GREEN],
          minValue[BLUE]
        );
        maxValue[GRAY] = Math.max(
          maxValue[RED],
          maxValue[GREEN],
          maxValue[BLUE]
        );
      }

      this.getNumSamples = () => {
        return numSamples;
      };

      this.isGray = () => {
        return isGray;
      };

      this.getFrequency = (channel, value) => {
        if (!value) {
          if (numSamples > 0 && isGray && value >= 0 && value <= 255) {
            return histogram[0][value];
          }
          return -1;
        }
        if (
          numSamples < 1 ||
          channel < 0 ||
          channel > 2 ||
          value < 0 ||
          value > 255
        ) {
          return -1;
        }
        return histogram[channel][value];
      };

      this.getMinFrequency = (channel) => {
        if (!channel) {
          if (numSamples > 0 && isGray) {
            return minFrequency[0];
          }
          return -1;
        }
        if (numSamples < 1 || channel < 0 || channel > 2) {
          return -1;
        }
        return minFrequency[channel];
      };

      this.getMaxFrequency = (channel) => {
        if (!channel) {
          if (numSamples > 0 && isGray) {
            return maxFrequency[0];
          }
          return -1;
        }
        if (numSamples < 1 || channel < 0 || channel > 2) {
          return -1;
        }
        return maxFrequency[channel];
      };

      this.getMinValue = (channel) => {
        if (!channel) {
          if (numSamples > 0 && isGray) {
            return minValue[0];
          }
          return -1;
        }
        return minValue[channel];
      };

      this.getMaxValue = (channel) => {
        if (!channel) {
          if (numSamples > 0 && isGray) {
            return maxValue[0];
          }
          return -1;
        }
        return maxValue[channel];
      };

      this.getMeanValue = (channel) => {
        if (!channel) {
          if (numSamples > 0 && isGray) {
            return mean[0];
          }
          return -1;
        }
        return mean[channel];
      };
    };

    let histogram = new Histogram(imageData, width, height, 0, width),
      lut = new Array(3),
      low = parameters.low * 255,
      high = parameters.high * 255;

    for (let i = 0; i < lut.length; i += 1) {
      lut[i] = new Array(256);
    }
    if (low === high) {
      high++;
    }

    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 256; j += 1) {
        lut[i][j] =
          255 *
          (parameters.lowOutput +
            ((parameters.highOutput - parameters.lowOutput) * (j - low)) /
              (high - low));
      }
    }

    histogram.isGray(); // uglify fix - "Side effects in initialization of unused letiable histogram" warning

    return {
      lut,
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
    parameters: LevelsParameters,
    width: number,
    height: number
  ): {
    r: number;
    g: number;
    b: number;
    a: number;
  } {
    return {
      r: this.data.lut[0][pixel.r],
      g: this.data.lut[1][pixel.g],
      b: this.data.lut[2][pixel.b],
      a: pixel.a,
    };
  }
}

export default LevelsEffect;
