import BasePointEffect from "../BasePoint";

interface Parameters {
  gain: number;
  bias: number;
}

class GainEffect extends BasePointEffect {
  static getName(): string {
    return "gain";
  }

  getDefaultParameters(): Parameters {
    return {
      gain: 1,
      bias: 1,
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
    let red = (1 / parameters.gain - 2) * (1 - (2 * pixel.r) / 255),
      green = (1 / parameters.gain - 2) * (1 - (2 * pixel.g) / 255),
      blue = (1 / parameters.gain - 2) * (1 - (2 * pixel.b) / 255);

    if (pixel.r / 255 < 0.5) {
      red = pixel.r / 255 / red + 1;
    } else {
      red = (red - pixel.r / 255) / (red - 1);
    }

    if (pixel.g / 255 < 0.5) {
      green = pixel.g / 255 / green + 1;
    } else {
      green = (green - pixel.g / 255) / (green - 1);
    }

    if (pixel.b / 255 < 0.5) {
      blue = pixel.b / 255 / blue + 1;
    } else {
      blue = (blue - pixel.b / 255) / (blue - 1);
    }

    red = red / ((1 / parameters.bias - 2) * (1 - red) + 1);
    green = green / ((1 / parameters.bias - 2) * (1 - green) + 1);
    blue = blue / ((1 / parameters.bias - 2) * (1 - blue) + 1);

    pixel.r = red * 255;
    pixel.g = green * 255;
    pixel.b = blue * 255;

    return pixel;
  }
}

export default GainEffect;
