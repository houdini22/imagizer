import BasePointEffect from "../BasePoint";

class ContrastEffect extends BasePointEffect {
  static getName() {
    return "contrast";
  }

  data = {
    factor: 1,
  };

  getDefaultParameters() {
    return {
      contrast: 0.5,
    };
  }

  before(parameters) {
    return {
      factor:
        (259 * (parameters.contrast * 255 + 255)) /
        (255 * (259 - parameters.contrast * 255)),
    };
  }

  callback(pixel, x, y, parameters, width, height) {
    pixel.r = this.data.factor * (pixel.r - 128) + 128;
    pixel.g = this.data.factor * (pixel.g - 128) + 128;
    pixel.b = this.data.factor * (pixel.b - 128) + 128;

    return pixel;
  }
}

export default ContrastEffect;
