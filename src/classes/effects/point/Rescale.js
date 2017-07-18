import BasePointEffect from '../BasePoint';

class RescaleEffect extends BasePointEffect {
  static getName() {
    return 'rescale';
  }

  getDefaultParameters() {
    return {
      scale: 1
    };
  }

  callback(pixel, x, y, parameters, width, height) {
    pixel.r = parameters.scale * pixel.r;
    pixel.g = parameters.scale * pixel.g;
    pixel.b = parameters.scale * pixel.b;

    return pixel;
  }
}

export default RescaleEffect;