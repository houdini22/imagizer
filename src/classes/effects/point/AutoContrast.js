import BasePointEffect from '../BasePoint'

class AutoContrastEffect extends BasePointEffect {
  static getName () {
    return 'auto-contrast'
  }

  before (parameters, width, height) {
    let x, y,
      pixel,
      min = Infinity, max = -1

    for (y = 0; y < height; y += 1) {
      for (x = 0; x < width; x += 1) {
        pixel = this.getPixel(x, y)

        min = Math.min((pixel.r + pixel.g + pixel.b) / 3, min)
        max = Math.max((pixel.r + pixel.g + pixel.b) / 3, max)
      }
    }

    return {
      min: min,
      max: max,
      remap: function (value) {
        return ((value) - min) * 255 / (max - min)
      }
    }
  }

  callback (pixel, x, y, parameters, width, height) {
    pixel.r = this.data.remap(pixel.r, this.data.min, this.data.max)
    pixel.g = this.data.remap(pixel.g, this.data.min, this.data.max)
    pixel.b = this.data.remap(pixel.b, this.data.min, this.data.max)

    return pixel
  }
}

export default AutoContrastEffect