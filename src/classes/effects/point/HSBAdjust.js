import BasePointEffect from '../BasePoint'
import {
  RGBtoHSB,
  HSBtoRGB
} from '../../../helpers/color'

class HSBAdjustEffect extends BasePointEffect {
  static getName () {
    return 'hsb-adjust'
  }

  getDefaultParameters () {
    return {
      h: 1,
      s: 1,
      b: 1
    }
  }

  callback (pixel, x, y, parameters, width, height) {
    let hsb = RGBtoHSB(pixel.r, pixel.g, pixel.b)

    hsb.h += parameters.h
    while (hsb.h < 0) {
      hsb.h += Math.PI * 2
    }

    hsb.s += parameters.s
    hsb.s = Math.max(Math.min(hsb.s, 1), 0)

    hsb.b += parameters.b
    hsb.b = Math.max(Math.min(hsb.b, 1), 0)

    let result = HSBtoRGB(hsb.h, hsb.s, hsb.b)
    pixel.r = result.r
    pixel.g = result.g
    pixel.b = result.b

    return pixel
  }
}

export default HSBAdjustEffect