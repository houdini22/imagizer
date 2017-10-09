import BaseTransformEffect from '../BaseTransform'

class RotateEffect extends BaseTransformEffect {
  static getName () {
    return 'offset'
  }

  getDefaultParameters () {
    return {
      xOffset: 100,
      yOffset: 100,
      wrap: true
    }
  }

  callback (x, y, parameters, width, height) {
    if (parameters.wrap) {
      return [
        (x + width - parameters.xOffset) % width,
        (y + height - parameters.yOffset) % height
      ]
    }
    else {
      return [
        x - parameters.xOffset,
        y - parameters.yOffset
      ]
    }
  }
}

export default RotateEffect