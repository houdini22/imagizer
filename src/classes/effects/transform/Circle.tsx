import BaseTransformEffect from "../BaseTransform";
import { mod } from "../../../helpers/common";

class CircleEffect extends BaseTransformEffect {
  static getName() {
    return "circle";
  }

  data = {
    icentreX: 0,
    width: 0,
  };

  getDefaultParameters() {
    return {
      radius: 10,
      height: 20,
      angle: 0,
      spreadAngle: Math.PI,
      centreX: 0.5,
      centreY: 0.5,
    };
  }

  before(parameters, width, height, imageData) {
    return {
      icentreX: width * parameters.centreX,
      icentreY: height * parameters.centreY,
      width: --width,
    };
  }

  callback(x, y, parameters, width, height) {
    let dx = x - this.data.icentreX,
      dy = y - this.data.icentreX,
      theta = Math.atan2(-dy, -dx) + parameters.angle,
      r = Math.sqrt(dx * dx + dy * dy);

    theta = mod(theta, 2 * Math.PI);

    return [
      (this.data.width * theta) / parameters.spreadAngle + 0.00001,
      height * (1 - (r - parameters.radius) / (height + 0.00001)),
    ];
  }
}

export default CircleEffect;
