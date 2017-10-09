import BasePointEffect from '../BasePoint'

class BrightnessEffect extends BasePointEffect {
  static getName () {
    return 'brightness'
  }

  getDefaultParameters () {
    return {
      brightness: 0.5
    }
  }

  before (parameters) {
    return {
      brightness: 255 * parameters.brightness
    }
  }

  callback (pixel, x, y, parameters, width, height) {
    pixel.r = pixel.r + this.data.brightness
    pixel.g = pixel.g + this.data.brightness
    pixel.b = pixel.b + this.data.brightness

    return pixel
  }
}

export default BrightnessEffect