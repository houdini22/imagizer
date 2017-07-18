import BasePointEffect from '../BasePoint';

class InvertEffect extends BasePointEffect {
  static getName() {
    return 'invert';
  }

  callback(pixel, x, y, parameters, width, height) {
    pixel.r = 255 - pixel.r;
    pixel.g = 255 - pixel.g;
    pixel.b = 255 - pixel.b;
    return pixel;
  }
}

export default InvertEffect;