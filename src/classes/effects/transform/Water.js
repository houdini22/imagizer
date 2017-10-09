import BaseTransformEffect from '../BaseTransform'
import noise from '../../../helpers/noise'

class WaterEffect extends BaseTransformEffect {
  static getName () {
    return 'water'
  }

  getDefaultParameters () {
    return {
      waveLength: 16,
      amplitude: 10,
      phase: 0,
      centreX: 0.5,
      centreY: 0.5,
      radius: 50
    }
  }

  before (parameters, width, height) {
    let iCentreX = width * parameters.centreX,
      iCentreY = height * parameters.centreY,
      radius = parameters.radius,
      radius2

    if (radius === 0) {
      radius = Math.min(iCentreX, iCentreY)
    }
    radius2 = radius * radius

    return {
      iCentreX: iCentreX,
      iCentreY: iCentreY,
      radius: radius,
      radius2: radius2
    }
  }

  callback (x, y, parameters) {
    let dx = x - this.data.iCentreX,
      dy = y - this.data.iCentreY,
      distance2 = dx * dx + dy * dy,
      distance,
      amount

    if (distance2 > this.data.radius2) {
      return [x, y]
    }
    distance = Math.sqrt(distance2)
    amount = parameters.amplitude * Math.sin(distance / parameters.waveLength * Math.PI * 2 - parameters.phase)
    amount *= (parameters.radius - distance) / parameters.radius
    if (distance !== 0) {
      amount *= parameters.waveLength / distance
    }
    return [x + dx * amount, y + dy * amount]
  }
}

export default WaterEffect