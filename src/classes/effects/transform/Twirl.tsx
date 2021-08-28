import BaseTransformEffect from "../BaseTransform";
import noise from "../../../helpers/noise";

class TwirlEffect extends BaseTransformEffect {
  static getName() {
    return "twirl";
  }

  getDefaultParameters() {
    return {
      angle: 0,
      centreX: 0.5,
      centreY: 0.5,
      radius: 100,
    };
  }

  before(parameters, width, height) {
    let iCentreX = width * parameters.centreX,
      iCentreY = height * parameters.centreY,
      radius = parameters.radius,
      radius2;

    if (radius === 0) {
      radius = Math.min(iCentreX, iCentreY);
    }
    radius2 = radius * radius;

    return {
      iCentreX: iCentreX,
      iCentreY: iCentreY,
      radius: radius,
      radius2: radius2,
    };
  }

  callback(x, y, parameters) {
    let dx = x - this.data.iCentreX,
      dy = y - this.data.iCentreY,
      distance = dx * dx + dy * dy,
      a;

    if (distance > parameters.radius2) {
      return [x, y];
    }

    distance = Math.sqrt(distance);
    a =
      Math.atan2(dy, dx) +
      (parameters.angle * (parameters.radius - distance)) / parameters.radius;

    return [
      this.data.iCentreX + distance * Math.cos(a),
      this.data.iCentreY + distance * Math.sin(a),
    ];
  }
}

export default TwirlEffect;
