import BasePointEffect from '../BasePoint'

class SolarizeEffect extends BasePointEffect {
  static getName () {
    return 'solarize'
  }

  callback (pixel, x, y, parameters, width, height) {
    let red = pixel.r / 255 > 0.5 ? 2 * ((pixel.r / 255) - 0.5) : 2 * (0.5 - (pixel.r / 255)),
      green = pixel.g / 255 > 0.5 ? 2 * ((pixel.g / 255) - 0.5) : 2 * (0.5 - (pixel.g / 255)),
      blue = pixel.b / 255 > 0.5 ? 2 * ((pixel.b / 255) - 0.5) : 2 * (0.5 - (pixel.b / 255))

    return {
      r: red * 255,
      g: green * 255,
      b: blue * 255,
      a: pixel.a
    }
  }
}

export default SolarizeEffect