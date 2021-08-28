import BasePointEffect from "../BasePoint";

class ExposureEffect extends BasePointEffect {
  static getName() {
    return "exposure";
  }

  getDefaultParameters() {
    return {
      exposure: 1,
    };
  }

  callback(pixel, x, y, parameters, width, height) {
    pixel.r = (1 - Math.exp((-pixel.r / 255) * parameters.exposure)) * 255;
    pixel.g = (1 - Math.exp((-pixel.g / 255) * parameters.exposure)) * 255;
    pixel.b = (1 - Math.exp((-pixel.b / 255) * parameters.exposure)) * 255;

    return pixel;
  }
}

export default ExposureEffect;
